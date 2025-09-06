import React from 'react'
import RegisterForm from './RegisterForm'
import { BadgeDollarSign, Gift, Ticket } from 'lucide-react'

const bonuses = [
    {
        icon: <BadgeDollarSign className="text-red-600 w-8 h-8" />,
        title: 'ƯU ĐÃI HỌC PHÍ 15.000.000Đ',
        desc: 'Dành cho khoá học trọn gói 7.0+ IELTS cam kết đầu ra.',
    },
    {
        icon: <Gift className="text-red-600 w-8 h-8" />,
        title: 'COMBO QUÀ TẶNG ĐỘC QUYỀN',
        desc: 'Sách luyện thi IELTS, balo, nón, sổ tay, ...',
    },
    {
        icon: <Ticket className="text-red-600 w-8 h-8" />,
        title: 'THẺ THAM GIA KHÓA HỌC FREE',
        desc: 'Trải nghiệm lớp học IELTS tiêu chuẩn, giảng dạy theo phương pháp RIPL',
    },
]

const FormBlock = () => {
  return (
    <section  className="w-full bg-gradient-to-b from-[#ffffff] to-[#A78FFD] py-10 px-4 sm:p-4 p-2 min-w-[400px]">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:gap-10 items-center justify-center gap-20 relative">
                <div className="form-register">
                    <RegisterForm />
                </div>

                <div className="flex justify-center flex-col gap-4 max-w-md w-full">
                    <h3 className="text-3xl font-bold text-[#0c2247] uppercase">
                        30 bạn đăng ký đầu tiên <br />
                        <span className="text-[#e11d48] font-sans mt-1">Nhận ngay</span>
                    </h3>

                    {bonuses.map((item, index) => (
                        <div key={index} className="bg-white rounded-md p-4 flex items-start gap-3 shadow-sm border border-red-100">
                            <div className="p-2 bg-white rounded-full shadow ">{item.icon}</div>
                            <div>
                                <p className="text-red-600 font-bold text-xl">{item.title}</p>
                                <p className="text-md text-gray-700 mt-1 text-shadow-2xs">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
  )
}

export default FormBlock