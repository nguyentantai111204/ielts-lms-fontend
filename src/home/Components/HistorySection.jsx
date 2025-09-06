import React from 'react';
import {
  CalendarDays,
  Users,
  MapPin,
  GraduationCap,
  Laptop,
  Handshake
} from 'lucide-react';

const stats = [
  {
    icon: <CalendarDays className="w-8 h-8 text-[#0c2247]" />,
    number: '7+',
    label: 'Năm hoạt động',
  },
  {
    icon: <Users className="w-8 h-8 text-[#0c2247]" />,
    number: '500+',
    label: 'Giáo viên tài năng',
  },
  {
    icon: <MapPin className="w-8 h-8 text-[#0c2247]" />,
    number: '60+',
    label: 'Cơ sở trên toàn quốc',
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-[#0c2247]" />,
    number: '300.000+',
    label: 'Học viên đã cán đích thành công',
  },
  {
    icon: <Laptop className="w-8 h-8 text-[#0c2247]" />,
    number: '120.000+',
    label: 'Học viên online',
  },
  {
    icon: <Handshake className="w-8 h-8 text-[#0c2247]" />,
    number: '350+',
    label: 'Đối tác uy tín tin tưởng đồng hành',
  },
];

const HistorySection = () => {
  return (
    <section className="bg-white py-12 px-4 w-full mt-20 mb-30">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between gap-10 items-end md:items-center">
        <div className="flex-1 space-y-8 w-full">
          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold text-[#0c2247] uppercase"><span className='text-[#8b40ed]'>VIETBRIDE </span> tự hào với hành trình</h2>
            <h3 className="text-3xl font-semibold text-[#e11d48] uppercase mt-1">Gần 1 thập kỷ qua</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div key={index} className="flex  flex-col items-center text-center gap-2">
                {item.icon}
                <h4 className="text-2xl font-bold text-[#e11d48]">{item.number}</h4>
                <p className="text-sm text-gray-700 max-w-[120px]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full max-w-[560px]">
          <div className="relative overflow-hidden rounded-lg aspect-video w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/U1usrHw-GvI?si=bi2rfN7V8CjQqNKc"
              title="YouTube video player"
              frameBorder="0"                   // đổi từ frameborder
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" // đổi từ referrerpolicy
              allowFullScreen                   // đổi từ allowfullscreen
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;
