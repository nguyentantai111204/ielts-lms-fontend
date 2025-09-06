import React from 'react';
import { PlayCircle, Users } from 'lucide-react'; // bạn có thể thay bằng icon SVG khác

const reasons = [
  {
    icon: <PlayCircle size={70} className="text-[#9237F6]" />,
    title: 'Đề thi IELTS mới nhất & nhiều nhất',
    desc: 'Cập nhật đề thi IELTS mới với những đề thật, được tổng hợp từ các nguồn uy tín giúp các bạn luyện tập và kiểm tra sát đề thi thật mới nhất.',
  },
  {
    icon: <Users size={70} className="text-[#9237F6]" />,
    title: 'Thi thử biết điểm nhanh',
    desc: 'Sau khi bạn hoàn tất thi thử mỗi đề, bạn sẽ biết điểm trực tiếp và đáp án để check lại các lỗi sai, giúp cải thiện kỹ năng sau mỗi lần test.',
  },
  {
    icon: <PlayCircle size={70} className="text-[#9237F6]" />,
    title: 'Công cụ phân tích toàn diện',
    desc: 'Với đa dạng đề thi và câu hỏi, bạn sẽ được luyện tập tối đa theo từng kỹ năng và làm quen với các dạng đề nhuần nhuyễn.',
  },
];

const ReasonSection = () => {
  return (
    <section className="w-full px-4 py-16 bg-white text-center mt-15">
      <h2 className="text-3xl md:text-4xl font-bold text-[#6B47DC] mb-12">
        Vì sao nên chọn IELTS Fighter Online Tests?
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center px-4">
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg text-[#1b1b1b] mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonSection;
