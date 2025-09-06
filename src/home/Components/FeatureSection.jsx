import React from 'react'
import {
  ShieldCheck,
  DollarSign,
  GraduationCap,
  Flag
} from 'lucide-react'

const reasons = [
  {
    title: 'CAM KẾT ĐẦU RA',
    desc: 'Tài trợ 100% chi phí học lại nếu học viên không đạt đầu ra theo cam kết trên văn bản.',
    icon: <ShieldCheck size={35} className="text-[#9237f6]" />,
    border: '#baabf7',
    background: '#efebfa'
  },
  {
    title: 'HỌC PHÍ PHÙ HỢP',
    desc: 'Chỉ với chi phí từ 89k/h, học viên tự tin chinh phục IELTS với các lớp học chất lượng cao.',
    icon: <DollarSign size={35} className="text-[#9237f6]" />,
    border: '#b4cfbd',
    background: '#f7faf8'
  },
  {
    title: 'GIÁO VIÊN KINH NGHIỆM',
    desc: '100% giáo viên chuyên môn giỏi với trình độ 7.5+ IELTS trở lên.',
    icon: <GraduationCap size={35} className="text-[#9237f6]" />,
    border: '#de9b99',
    background: '#fcf7f7'
  },
  {
    title: 'LỘ TRÌNH TINH GỌN',
    desc: 'Chương trình học cá nhân hóa thành các chặng nhỏ phù hợp với trình độ.',
    icon: <Flag size={35} className="text-[#9237f6]" />,
    border: '#6686d9',
    background: '#f5f7fc'
  },
]

const Card = ({ item }) => (
  <div
    className="rounded-lg shadow-sm p-5 flex flex-col justify-between text-left border relative overflow-hidden h-[250px] flex-shrink-0 w-[280px] sm:w-auto sm:h-[230px]"
    style={{
      borderColor: item.border,
      backgroundColor: item.background,
    }}
  >
    <div>
      <h3 className="text-md font-semibold text-[#0c2247] uppercase mb-2">{item.title}</h3>
      <p className="text-sm text-gray-700">{item.desc}</p>
    </div>
    <div
      className="absolute -bottom-4 -right-4 md:-bottom-2 md:-right-2 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-opacity-60"
      style={{ backgroundColor: item.border }}
    >
      <div className="flex items-center justify-center p-2 rounded-full"
        style={{ backgroundColor: item.background }}>
        {item.icon}
      </div>
    </div>
  </div>
)

const FeatureSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-50 px-4 text-center">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2247] uppercase leading-tight">
          TẠI SAO 300.000+ HỌC VIÊN
        </h2>
        <p className="text-lg sm:text-xl text-red-600 mt-2 max-w-[500px] mx-auto">
          TIN TƯỞNG LỰA CHỌN IELTS FIGHTER TRONG GẦN 10 NĂM QUA
        </p>
      </div>

      {/* Container */}
      <div className="
        flex overflow-x-auto scrollbar-hide space-x-6 pb-4
        sm:grid sm:grid-cols-2 sm:gap-6 sm:space-x-0
        md:grid-cols-3 
        lg:grid-cols-4
        w-full max-w-7xl sm:px-4">
        {reasons.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

export default FeatureSection
