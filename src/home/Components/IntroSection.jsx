
import person from '../../assets/person_intro.png'
import { CircleCheckBig } from 'lucide-react'

const IntroSection = () => {
    return (
        <section className="w-full h-auto bg-gradient-to-b from-[#fffff] to-[#A78FFD] pt-[60px] min-w-[400px]">
            <div className="flex items-center justify-center pb-10">
                <div className="w-full max-w-[1280px] p-2 bg-gradient-to-b from-[#ffffff] to-transparent lg:max-h-[495px]">
                    <div className="flex flex-col md:flex-row items-center gap-10 lg:min-w-[960px]">
                        <div className="intro-text ">
                            <div className="line-1 flex gap-2 items-end">
                                <h2 className='text-[#9237F6] font-semibold text-4xl'>Luyện thi</h2>
                                <h1 className='text-[#0c2247] font-semibold text-6xl'>IELTS</h1>
                            </div>
                            <div className="line-2 mt-5">
                                <h1 className='text-[#0c2247] font-semibold text-4xl sm:text-6xl uppercase'>Chất lượng cao</h1>
                            </div>
                            <div className="line-3 mt-7 text-[#0c2247] font-semibold text-md uppercase">
                                <div className="item-1 flex gap-2"><span className='text-[#1948a6]'><CircleCheckBig /></span><h3>Học lại miễn phí nếu không đạt đầu ra</h3></div>
                                <div className="item-2 flex gap-2 mt-2"><span className='text-[#1948a6]'><CircleCheckBig /></span><h3>Lộ trình ngắn gọn, cá nhân hóa</h3></div>
                                <div className="item-3 flex gap-2 mt-1 items-center"><span className='text-[#1948a6]'><CircleCheckBig /></span><h3>Học bổng lên tới <span className='text-[#9237F6] text-2xl pl-1'>5.000.000Đ</span></h3></div>
                            </div>
                            <div className="line-4 mt-8">
                                <button className='rounded-3xl bg-gradient-to-r from-[#9237F6] to-[#898BEF]  text-white font-semibold px-6 py-1.75 cursor-pointer uppercase'>Tư vấn lộ trình</button>
                            </div>
                        </div>
                            
                        <div className="sm:w-[400px] sm:h-[550px] w-[380px] h-[450px]">
                            <img className='sm:pt-1' src={person} />
                        </div>
                    </div>
                </div>
            </div>
 
        </section>

    )
}

export default IntroSection