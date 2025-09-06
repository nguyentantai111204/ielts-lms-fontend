import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Award, Users, Lightbulb } from 'lucide-react'
import useMedia from 'use-media'
import 'swiper/css'


import SignUpPage from '../../auth/Pages/SignUpPage'
import { getAllInstructors } from '../Services/InstructorService'

const highlights = [
  {
    title: 'CHUYÊN MÔN GIỎI',
    icon: <Award size={42} className="text-violet-600 mx-auto mb-3" />,
    description:
      'Đội ngũ giáo viên chuyên môn giỏi, xuất thân từ các trường uy tín trong và ngoài nước. Sở hữu chứng chỉ IELTS/TESOL và kỹ năng sư phạm vững vàng.',
  },
  {
    title: 'NHIỆT TÌNH',
    icon: <Users size={42} className="text-violet-600 mx-auto mb-3" />,
    description:
      'Luôn tận tâm, trách nhiệm và chính trực. Giảng viên không ngừng đổi mới để mang lại hiệu quả học tập cao nhất.',
  },
  {
    title: 'SÁNG TẠO',
    icon: <Lightbulb size={42} className="text-violet-600 mx-auto mb-3" />,
    description:
      'Luôn sáng tạo trong phương pháp giảng dạy, lấy học viên làm trung tâm, học đi đôi với hành.',
  },
]

const InstructorCard = ({ instructor }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
    <img
      src={instructor.avatar || '/default-avatar.png'}
      alt={instructor.firstName + ' ' + instructor.lastName}
      className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-[#A78BFA] mb-4"
    />
    <h3 className="text-lg font-semibold text-[#4C1D95]">{instructor.firstName} {instructor.lastName}</h3>
    <p className="text-sm font-medium text-[#7C3AED]">{instructor.position}</p>
    <p className="text-gray-600 text-sm mt-2">{instructor.achievements}</p>
  </div>
)

const Instructors = () => {
  const [instructors, setInstructors] = useState([])
  const isMobile = useMedia({ maxWidth: 767 })

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await getAllInstructors()
        setInstructors(data)
      } catch (err) {
        console.error('Lỗi load instructors:', err)
      }
    }
    fetchInstructors()
  }, [])

  return (
    <div className="w-full bg-gradient-to-b from-[#faf8ff] to-[#f5f3ff] py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* GIẢNG VIÊN */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center  text-slate-800 mb-10 uppercase">Đội ngũ giảng viên</h2>
          {isMobile ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {instructors.map((instructor, index) => (
                <SwiperSlide key={index}>
                  <InstructorCard instructor={instructor} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <InstructorCard key={index} instructor={instructor} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
            500+ GIÁO VIÊN TRUYỀN CẢM HỨNG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-violet-100 rounded-xl p-6 text-center hover:shadow-lg transition"
              >
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full border-b border-b-[#e0e0e0] shadow-sm mt-10"></div>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#8647e6] uppercase mt-20"><h2>Khuyến mãi dành cho bạn</h2></div>
        <div className="w-full mt-10 mb-20">
          <SignUpPage />
        </div>
      </div>
    </div>
  )
}

export default Instructors
