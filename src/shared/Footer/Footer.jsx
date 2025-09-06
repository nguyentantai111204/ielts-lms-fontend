import React from 'react';
import logo from '../../assets/logo_white.png'
import {
    Facebook,
    Youtube,
    Globe
} from 'lucide-react';

const locations = [
    'HÀ NỘI', 'TP. HỒ CHÍ MINH', 'ĐÀ NẴNG', 'HẢI PHÒNG',
    'BẮC NINH', 'QUẢNG NINH', 'THANH HÓA', 'NGHỆ AN',
    'HÀ TĨNH', 'KHÁNH HÒA', 'BÌNH DƯƠNG', 'ĐỒNG NAI', 'VŨNG TÀU',
];

const Footer = () => {
    return (
        <footer className="bg-[#8b40ed] text-white pt-10 pb-6 px-4 w-full h-auto">
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 justify-between">
                <div className="flex-1 min-w-[250px]">
                    <div className="w-38 scale-180">
                        <img className="w-full object-center" src={logo} alt="" />
                    </div>

                    <p className="mb-3 text-sm leading-relaxed">
                        VIETBRIDE - trung tâm luyện thi IELTS số 1 Việt Nam. Với sứ mệnh giúp hàng triệu người Việt đạt 6.5-7.0 IELTS, VIETBRIDE nỗ lực mỗi ngày để cùng các bạn học IELTS dễ như ăn bánh, chinh phục được đỉnh cao IELTS!
                    </p>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                        <li>Đào tạo 70.000 học viên IELTS mỗi năm</li>
                        <li>Đối tác Bạch kim của IDP Việt Nam</li>
                        <li>Đối tác uy tín lâu năm của VnExpress, Viettel, Panasonic...</li>
                    </ul>
                </div>

                <div className="flex-[0.6] grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h3 className="font-bold mb-3 text-white">Thông tin</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Về chúng tôi</a></li>
                            <li><a href="#">Đội ngũ giảng viên</a></li>
                            <li><a href="#">Hệ thống 50 cơ sở</a></li>
                            <li><a href="#">Phương pháp đào tạo</a></li>
                            <li><a href="#">Hoạt động tiêu biểu</a></li>
                            <li><a href="#">Học viên điểm cao</a></li>
                            <li><a href="#">Feedback của học viên</a></li>
                            <li><a href="#">Thi thử IELTS miễn phí</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3 text-white">Khóa học</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Khóa IELTS online</a></li>
                            <li><a href="#">Khóa IELTS mất gốc</a></li>
                            <li><a href="#">Khóa IELTS cấp tốc</a></li>
                            <li><a href="#">Khóa IELTS 1 kèm 1</a></li>
                            <li><a href="#">Khóa IELTS 7.0+</a></li>
                            <li><a href="#">Khóa IELTS 6.0-6.5</a></li>
                            <li><a href="#">Khóa IELTS 5.0-5.5</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3 text-white">Liên hệ</h3>
                        <p>Hotline: <strong>0903 411 666</strong></p>
                        <p>Email: <a href="mailto:chienbinh@ielts-fighter.com" className="underline">vietbride-ielts.edu.vn</a></p>
                        <div className="flex gap-3 mt-4">
                            <Youtube className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                            <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                            <Globe className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>

   
            <div className="max-w-[1280px] mx-auto mt-10">
                <h4 className="text-xl font-bold mb-4">Hệ thống cơ sở trải dài khắp 3 miền</h4>
                <div className="flex flex-wrap gap-3">
                    {locations.map((loc, index) => (
                        <div
                            key={index}
                            className="bg-white text-[#c6261f] px-4 py-2 rounded-sm font-semibold text-sm hover:bg-red-100 cursor-pointer"
                        >
                            {loc}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
