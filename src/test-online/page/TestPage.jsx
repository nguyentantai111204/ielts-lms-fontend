// TestPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestDetail } from '../services/TestOnlineService';
import { saveAnswer, submitTest, getInProgressSubmission, startTest } from '../services/TestSubmitService';
import { useAuth } from '../../auth/Context/AuthContext';

const TestPage = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { user } = useAuth();

  const [testData, setTestData] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const localKey = `test_${testId}`;

  const saveToLocal = (key, value) => localStorage.setItem(`${localKey}_${key}`, JSON.stringify(value));
  const loadFromLocal = (key, defaultValue) => {
    const val = localStorage.getItem(`${localKey}_${key}`);
    return val ? JSON.parse(val) : defaultValue;
  };

  const calculateTotalTime = (data) => {
    let totalTime = 0;
    data.sections.forEach(section => section.parts?.forEach(part => {
      totalTime += Number(part.durationMinutes || 0);
    }));
    if (totalTime === 0) {
      data.sections.forEach(section => {
        totalTime += Number(section.durationMinutes || section.duration || 0);
      });
    }
    return totalTime * 60;
  };

  useEffect(() => {
    const initializeTest = async () => {
      try {
        setIsLoading(true);
        const data = await getTestDetail(testId);
        setTestData(data);

        let submission = await getInProgressSubmission(testId, user.userId);
        if (!submission) submission = await startTest(testId, user.userId);
        if (!submission) throw new Error('Không nhận được submission từ server.');

        // Nếu bài đã nộp
        const submitted = submission.status === 'SUBMITTED' || submission.status === 'COMPLETED';
        if (submitted) {
          navigate(`/test-result/${submission.submissionId || submission.id || submission.testSubmissionId}`);
          return;
        }

        const sid = submission.submissionId || submission.id || submission.testSubmissionId || submission.submission_id;
        if (!sid) throw new Error('Bạn đã hoàn thành bài test này rồi');

        setSubmissionId(sid);
        setIsTestStarted(true);

        const savedAnswers = loadFromLocal('answers', {});
        const initialAnswers = {};
        data.sections.forEach(section =>
          section.parts.forEach(part =>
            part.groups.forEach(group =>
              group.questions.forEach(question => {
                initialAnswers[question.questionId] =
                  savedAnswers[question.questionId] ?? submission.answers?.[question.questionId] ?? '';
              })
            )
          )
        );
        setAnswers(initialAnswers);
        setCurrentSectionIndex(loadFromLocal('section', 0) ?? submission.currentSection ?? 0);
        setCurrentPartIndex(loadFromLocal('part', 0) ?? submission.currentPart ?? 0);

        const totalTimeInSeconds = calculateTotalTime(data);
        const savedTime = loadFromLocal('time', null);
        if (savedTime !== null) setTimeRemaining(savedTime);
        else if (submission.timeRemaining !== undefined) setTimeRemaining(submission.timeRemaining);
        else if (submission.startTime) {
          const elapsed = Math.floor((Date.now() - new Date(submission.startTime).getTime()) / 1000);
          setTimeRemaining(Math.max(0, totalTimeInSeconds - elapsed));
        } else setTimeRemaining(totalTimeInSeconds);

      } catch (error) {
        console.error('Error initializing test:', error);
        alert('Không thể tải bài thi: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTest();
  }, [testId, user.userId, navigate]);

  // Lưu localStorage khi answers/section/part/time thay đổi
  useEffect(() => {
    if (!isTestStarted) return;
    saveToLocal('answers', answers);
    saveToLocal('section', currentSectionIndex);
    saveToLocal('part', currentPartIndex);
    saveToLocal('time', timeRemaining);
  }, [answers, currentSectionIndex, currentPartIndex, timeRemaining, isTestStarted]);

  // Auto-save server mỗi 30s
  useEffect(() => {
    if (isTestStarted && submissionId && Object.keys(answers).length > 0) {
      const saveProgress = async () => {
        try {
          for (const [questionId, answer] of Object.entries(answers)) {
            if (answer && answer.toString().trim() !== '') {
              await saveAnswer(submissionId, parseInt(questionId), answer);
            }
          }
        } catch (error) { console.error('Error saving progress:', error); }
      };
      const interval = setInterval(saveProgress, 30000);
      return () => clearInterval(interval);
    }
  }, [isTestStarted, submissionId, answers]);

  // Timer countdown
  useEffect(() => {
    if (!isTestStarted || hasSubmitted) return;
    if (timeRemaining <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        saveToLocal('time', newTime);
        if (newTime <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isTestStarted, hasSubmitted]);

  useEffect(() => {
    if (timeRemaining === 0 && isTestStarted && !hasSubmitted) handleSubmit();
  }, [timeRemaining, isTestStarted, hasSubmitted]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (hasSubmitted) return;
    if (!submissionId) { alert('Không tìm thấy submissionId'); return; }
    setHasSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      // Chuẩn hóa answers trước khi lưu
      const normalizedAnswers = {};
      Object.entries(answers).forEach(([questionId, value]) => {
        const question = testData.sections
          .flatMap(s => s.parts.flatMap(p => p.groups.flatMap(g => g.questions)))
          .find(q => q.questionId === parseInt(questionId));

        if (!question) return;

        if (question.questionType === 'MULTIPLE_CHOICE_SINGLE') {
          const letter = typeof value === 'string' ? value.trim().charAt(0).toUpperCase() : '';
          normalizedAnswers[questionId] = letter;
        } else if (question.questionType === 'MULTIPLE_CHOICE_MULTIPLE') {
          if (Array.isArray(value)) {
            normalizedAnswers[questionId] = value
              .map(v => v.trim().charAt(0).toUpperCase())
              .join(",");
          } else {
            normalizedAnswers[questionId] = "";
          }
        } else {
          normalizedAnswers[questionId] = value;
        }
      });

      // Lưu từng câu
      for (const [questionId, userAnswer] of Object.entries(normalizedAnswers)) {
        await saveAnswer(submissionId, parseInt(questionId), userAnswer);
      }

      await submitTest(submissionId);

      // Xóa localStorage
      localStorage.removeItem(`${localKey}_answers`);
      localStorage.removeItem(`${localKey}_section`);
      localStorage.removeItem(`${localKey}_part`);
      localStorage.removeItem(`${localKey}_time`);

      navigate(`/test-result/${submissionId}`);
    } catch (error) {
      console.error('Submit error:', error);
      alert('Lỗi khi nộp bài: ' + (error.message || 'Không xác định'));
      setHasSubmitted(false);
    }
  };


  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!testData) return 0;
    const currentSection = testData.sections[currentSectionIndex];
    const currentPart = currentSection.parts[currentPartIndex];
    const questionsInPart = currentPart.groups.flatMap(g => g.questions);
    if (!questionsInPart.length) return 0;
    const answeredInPart = questionsInPart.filter(q => answers[q.questionId] && answers[q.questionId].toString().trim() !== '').length;
    return Math.round((answeredInPart / questionsInPart.length) * 100);
  };

  const renderQuestion = (question, group) => {
    switch (question.questionType) {
      case 'FILL_IN_THE_BLANK':
      case 'OPEN_ENDED':
        return (
          <input
            type="text"
            value={answers[question.questionId] || ''}
            onChange={e => handleAnswerChange(question.questionId, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={hasSubmitted}
          />
        );
      case 'TRUE_FALSE':
        return (
          <div className="flex flex-wrap gap-4">
            {['TRUE', 'FALSE', 'NOT GIVEN'].map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`answer-${question.questionId}`}
                  value={option}
                  checked={answers[question.questionId] === option}
                  onChange={() => handleAnswerChange(question.questionId, option)}
                  disabled={hasSubmitted}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'MULTIPLE_CHOICE_MULTIPLE':
        const options = group.questionGroupText.split('\n')
          .filter(line => line.trim() && /^[A-E]/.test(line.trim()))
          .map(line => line.trim().charAt(0));
        return (
          <div className="space-y-2">
            {options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(answers[question.questionId] || []).includes(option)}
                  onChange={e => {
                    const current = answers[question.questionId] || [];
                    handleAnswerChange(question.questionId,
                      e.target.checked ? [...current, option] : current.filter(v => v !== option)
                    );
                  }}
                  disabled={hasSubmitted}
                  className="text-blue-600 focus:ring-blue-500 rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'MULTIPLE_CHOICE_SINGLE':
        // Lấy options từ question.options nếu có, còn không lấy từ group.questionGroupText
        const singleOptions = question.options ||
          group.questionGroupText.split('\n')
            .filter(line => line.trim() && /^[A-E]/.test(line.trim()))
            .map(line => line.trim());

        return (
          <div className="flex flex-col space-y-2">
            {singleOptions.map((option, idx) => {
              // Lấy chữ cái đầu cho value, nhưng hiển thị toàn bộ text
              const optionLetter = option.match(/^([A-E])\.?/) ? option.match(/^([A-E])\.?/)[1] : option;

              return (
                <label key={idx} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`answer-${question.questionId}`}
                    value={optionLetter}
                    checked={answers[question.questionId] === optionLetter}
                    onChange={() => handleAnswerChange(question.questionId, optionLetter)}
                    disabled={hasSubmitted}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex-1">{option}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return <div>Loại câu hỏi không được hỗ trợ: {question.questionType}</div>;
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Đang tải bài thi...</div>;
  if (!testData) return <div className="min-h-screen flex items-center justify-center text-red-600">Không thể tải bài thi</div>;

  const currentSection = testData.sections[currentSectionIndex];
  const currentPart = currentSection.parts[currentPartIndex];
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div>
            <h1 className="text-xl font-bold">{testData.title}</h1>
            <p className="text-sm">{currentSection.sectionType} - Part {currentPart.partNumber}</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-green-600'}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-gray-500">Thời gian còn lại</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{progress}%</div>
              <div className="text-xs text-gray-500">Hoàn thành</div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={hasSubmitted}
              className={`px-6 py-2 rounded-lg font-semibold ${hasSubmitted ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              {hasSubmitted ? 'Đã nộp bài' : '📤 Nộp bài'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Audio */}
        {currentPart.audioUrl && (
          <div className="bg-blue-50 p-4 rounded-xl mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-blue-800">🎵 Audio:</span>
              <button onClick={toggleAudio} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                {isPlaying ? '⏸️ Tạm dừng' : '▶️ Phát audio'}
              </button>
            </div>
            <audio ref={audioRef} src={currentPart.audioUrl} onEnded={() => setIsPlaying(false)} preload="metadata" />
          </div>
        )}

        {/* Passage */}
        {currentPart.passage && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Đọc đoạn văn:</h3>
            <div className="prose max-w-none border-l-4 border-blue-500 pl-4">
              {currentPart.passage.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-8">
          {currentPart.groups.map((group, groupIndex) => (
            <div key={group.groupId || groupIndex} className="bg-white p-6 rounded-xl shadow-sm">
              {group.title && <h3 className="text-lg font-semibold mb-3">{group.title}</h3>}
              {group.description && <div className="bg-blue-50 p-3 rounded-lg mb-4">{group.description}</div>}
              {group.questionGroupText && <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-line">{group.questionGroupText}</div>}
              <div className="space-y-6">
                {group.questions.map(question => (
                  <div key={question.questionId} className="border-l-4 border-blue-200 pl-4 py-2">
                    <label className="block text-gray-800 font-medium mb-3">
                      <span className="text-blue-600 font-semibold">Câu {question.questionNumber}:</span>
                      {question.content && <span className="ml-1 font-normal">{question.content}</span>}
                    </label>
                    {renderQuestion(question, group)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center space-x-4">
          <button
            onClick={() => {
              if (currentPartIndex === 0 && currentSectionIndex > 0) {
                setCurrentSectionIndex(prev => prev - 1);
                setCurrentPartIndex(testData.sections[currentSectionIndex - 1].parts.length - 1);
              } else setCurrentPartIndex(prev => Math.max(prev - 1, 0));
            }}
            disabled={currentPartIndex === 0 && currentSectionIndex === 0}
            className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            ← Phần trước
          </button>

          <div className="text-sm text-gray-600">
            Phần {currentPartIndex + 1} của {currentSection.parts.length} |
            Section {currentSectionIndex + 1} của {testData.sections.length}
          </div>

          <button
            onClick={() => {
              if (currentPartIndex === currentSection.parts.length - 1 && currentSectionIndex < testData.sections.length - 1) {
                setCurrentSectionIndex(prev => prev + 1);
                setCurrentPartIndex(0);
              } else setCurrentPartIndex(prev => Math.min(prev + 1, currentSection.parts.length - 1));
            }}
            disabled={currentPartIndex === currentSection.parts.length - 1 && currentSectionIndex === testData.sections.length - 1}
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Phần tiếp →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
