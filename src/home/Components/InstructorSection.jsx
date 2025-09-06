import React from 'react'
import teacher from '../../assets/instructor.png'
import InstructorCard from './InstructorCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const instructors = [
  {
    overall: 8.5,
    name: "Nguyễn Thanh An",
    position: "Giảng viên IELTS Senior",
    degree: "Thạc sĩ Giảng dạy Tiếng Anh (TESOL)",
    image: teacher
  },
  {
    overall: 8.0,
    name: "Trần Thị Minh",
    position: "Giảng viên IELTS Chuyên trách Speaking & Writing",
    degree: "Cử nhân Ngôn ngữ Anh, Chứng chỉ CELTA",
    image: teacher
  },
  {
    overall: 7.5,
    name: "Lê Hoàng Quân",
    position: "Giảng viên IELTS Luyện thi cấp tốc",
    degree: "Cử nhân Sư phạm Tiếng Anh",
    image: teacher
  },
  {
    overall: 8.0,
    name: "Phạm Thị Thu",
    position: "Giảng viên IELTS Tổng hợp",
    degree: "Cử nhân Ngôn ngữ Anh, Chứng chỉ TESOL",
    image: teacher
  },
  {
    overall: 7.5,
    name: "Vũ Anh Khoa",
    position: "Giảng viên IELTS Chuyên trách Reading & Listening",
    degree: "Cử nhân Kinh tế đối ngoại, Chứng chỉ IELTS Trainer",
    image: teacher
  },
  {
    overall: 8.5,
    name: "Đặng Thị Mai Hương",
    position: "Giảng viên IELTS Cao cấp",
    degree: "Thạc sĩ Ngôn ngữ học ứng dụng",
    image: teacher
  },
  {
    overall: 7.5,
    name: "Hoàng Văn Tuấn",
    position: "Giảng viên IELTS Nền tảng",
    degree: "Cử nhân Tiếng Anh Thương mại",
    image: teacher
  },
  {
    overall: 8.0,
    name: "Bùi Ngọc Diệp",
    position: "Giảng viên IELTS & Phát triển tài liệu",
    degree: "Cử nhân Sư phạm Tiếng Anh, Chứng chỉ Train The Trainer",
    image: teacher
  },
  {
    overall: 7.5,
    name: "Đỗ Duy Mạnh",
    position: "Giảng viên IELTS Kèm cặp cá nhân",
    degree: "Cử nhân Ngôn ngữ Anh",
    image: teacher
  },
  {
    overall: 8.0,
    name: "Ngô Phương Thảo",
    position: "Giảng viên IELTS Định hướng mục tiêu",
    degree: "Cử nhân Quan hệ Quốc tế, Chứng chỉ Giảng dạy IELTS",
    image: teacher
  }
]

const InstructorSection = () => {
  return (
    <div className="w-full flex flex-col items-center mt-30 mb-20 px-4 text-center bg-[#f5f7fc] pt-10 pb-30">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2247] uppercase leading-tight">
          Đội ngũ giáo viên
        </h2>
        <div className="mt-8 mb-2">
          <span className='text-lg text-[#0c2247] font-serif'>VIETBRIDE bao gồm 30 giáo viên</span>
        </div>
        <p className="text-md text-[#262a38] max-w-[610px] flex items-center">
          Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên, đi dạy vì cái tâm và luôn khát khao cải tiến việc học Tiếng Anh ở Việt Nam.
        </p>
      </div>

      <div className="max-w-[1280px] w-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
        >
          {instructors.map((instructor, index) => (
            <SwiperSlide key={index}>
              <div className="mx-3">
                <InstructorCard instructor={instructor} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-20">
          <button className="px-6 py-3 border-2 border-[#6c86d4] text-[#6c86d4] rounded-md hover:bg-[#6c86d4] hover:text-white transition-all duration-300 cursor-pointer">
            Xem thêm tất cả giáo viên
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
