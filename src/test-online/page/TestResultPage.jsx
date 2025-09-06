import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reviewSubmission } from "../services/TestSubmitService";

const TestResultPage = () => {
    const { submissionId } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // số câu mỗi trang

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setIsLoading(true);
                const data = await reviewSubmission(submissionId);
                setSubmission(data);
            } catch (error) {
                console.error("Error loading submission:", error);
                alert("Không thể tải kết quả bài thi");
            } finally {
                setIsLoading(false);
            }
        };
        fetchResult();
    }, [submissionId]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Đang tải kết quả...</div>;
    if (!submission) return <div className="min-h-screen flex items-center justify-center text-red-600">Không tìm thấy kết quả</div>;

    const totalPages = Math.ceil((submission.answers?.length || 0) / pageSize);
    const paginatedAnswers = submission.answers?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

    const renderAnswer = (answer) => (
        <div className="border-l-4 border-blue-200 pl-4 py-2 mb-2">
            <div className="flex justify-between items-center">
                <span className="font-semibold">Câu {answer.questionId}:</span>
                <span className={`font-semibold ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {answer.score || 0} điểm
                </span>
            </div>
            <div className="mt-1">
                <div><strong>Nội dung:</strong> {answer.questionText}</div>
                <div><strong>Đáp án đúng:</strong> {answer.correctAnswers?.join(", ") || 'Chưa có'}</div>
                <div><strong>Câu trả lời của bạn:</strong> {answer.userAnswer || 'Chưa trả lời'}</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    <h1 className="text-2xl font-bold mb-2">{submission.testTitle}</h1>
                    <div className="text-sm text-gray-600">
                        Bắt đầu: {submission.startedAt ? new Date(submission.startedAt).toLocaleString() : '-'} |
                        Nộp: {submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : '-'}
                    </div>
                    <div className="mt-4 flex space-x-6">
                        <div><span className="font-semibold">Điểm tổng:</span> {submission.totalScore || 0}</div>
                        <div><span className="font-semibold">Listening:</span> {submission.listeningScore || 0}</div>
                        <div><span className="font-semibold">Reading:</span> {submission.readingScore || 0}</div>
                    </div>
                </div>

                {/* Answers */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Chi tiết từng câu hỏi</h2>
                    {paginatedAnswers.map((answer) => (
                        <div key={answer.answerId}>
                            {renderAnswer(answer)}
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                        >
                            ← Trước
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                        >
                            Tiếp →
                        </button>
                    </div>
                )}

                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={() => navigate('/student/my-courses')} 
                        className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                     Về khóa học
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestResultPage;
