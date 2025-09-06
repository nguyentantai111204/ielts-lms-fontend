import React from "react";
import { useNavigate } from "react-router-dom";

const MiniTestSection = ({ tests }) => {
  const navigate = useNavigate();

  const handleClick = (testId) => {
    navigate(`/test-online/${testId}`);
  };

  return (
    <section className="w-full px-4 py-12 bg-white text-center mt-20">
      <h2 className="text-3xl font-bold mb-10 text-[#6B47DC]">
        Đề thi IELTS rút gọn -{" "}
        <span className="text-[#1b1b1b]">IELTS MINI TEST</span>
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.testId}
            className="bg-[#F8F6FF] shadow-sm rounded-xl p-5 text-left border border-[#E0D8FB] hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer"
            onClick={() => handleClick(test.testId)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500">
                Tổng câu hỏi:{" "}
                {test.sections?.reduce(
                  (sum, s) => sum + (s.totalQuestions || 0),
                  0
                )}
              </div>
              <span className="bg-[#8E69F4] text-white text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                Thời gian: {test.totalDurationMinutes} phút
              </span>
            </div>
            <h3 className="font-bold text-[16px] text-[#1b1b1b] leading-snug mb-3 min-h-[48px]">
              {test.title}
            </h3>
            <a
              href="#"
              className="text-[#9237F6] text-sm font-medium hover:underline inline-flex items-center mt-auto"
            >
              Kiểm tra ngay <span className="ml-1">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiniTestSection;
