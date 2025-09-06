import React, { useState } from 'react';
import SignUpPage from '../../auth/Pages/SignUpPage';


const branches = {
    "HÀ NỘI": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.674613285485!2d105.79780367587274!3d21.045701687195365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3c99d19f19%3A0x737c49deb6d9a38f!2zTmfDtSAxMjMgSG_DoG5nIFF14buRYyBWaeG7h3QsIE5naMSpYSDEkMO0LCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1753109269990!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '123 Hoàng Quốc Việt, Cầu Giấy', phone: '0243 123 4567' }],
    },
    "TP. HỒ CHÍ MINH": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.224965634416!2d106.67907318421544!3d10.794074531439977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d3bf426d1d%3A0x88a3f37756c30868!2zODkgxJAuIFBoYW4gxJDDrG5oIFBow7luZywgUGjGsOG7nW5nIDE1LCBQaMO6IE5odeG6rW4sIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753109311621!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '89 Phan Đình Phùng, Q. Phú Nhuận', phone: '0909 123 456' }],
    },
    "ĐÀ NẴNG": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.129221918589!2d108.20337608456609!3d16.058782793444554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142191354fd2abb%3A0x4b1a12042c571852!2zVGnhur9uZyBBbmggR2lhbyBUaeG6v3AgfCBBbmggTmfhu68gTXMgSG9hIC0gTmd1eeG7hW4gVsSDbiBMaW5oLCBRdeG6rW4gVGhhbmggS2jDqiwgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1753109396085!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '12 Nguyễn Văn Linh, Q. Hải Châu', phone: '0236 888 999' }],
    },
    "HẢI PHÒNG": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.03520857089435!2d106.68948043320655!3d20.8493322788566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a91ed1e3f43%3A0x31a644239a8f429c!2zVHJ1bmcgdMOibSBBbmggTmfhu68gUXXhu5FjIFThur8gUEVDIENTIDQxLTQ1IEzhuqFjaCBUcmF5!5e0!3m2!1svi!2s!4v1753109505568!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '45 Lạch Tray, Ngô Quyền', phone: '0225 888 666' }],
    },
    "BẮC NINH": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.396814251722!2d106.05717257587523!3d21.17638988269037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350f18ae464c89%3A0xf0ac93542108001d!2zNzYgTmd1eeG7hW4gVHLDo2ksIFAuTmluaCBYw6EsIELhuq9jIE5pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1753109537653!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '76 Nguyễn Trãi, TP. Bắc Ninh', phone: '0222 123 456' }],
    },
    "QUẢNG NINH": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d276.9563948263191!2d107.1293045863833!3d20.941820962241735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a57bc60cad859%3A0x634d5efbb87cafe!2zMzMgVHLhuqduIFF14buRYyBOZ2hp4buFbiwgSOG7k25nIEjDoCwgSOG6oSBMb25nLCBRdeG6o25nIE5pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1753109632769!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '33 Trần Quốc Nghiễn, Hạ Long', phone: '0203 888 999' }],
    },
    "THANH HÓA": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234.60113169939498!2d105.78112887484909!3d19.8137828999648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f7fe176fa049%3A0x3789f34be01a3d54!2zMjEgxJAuIEzDqiBIb8OgbiwgUC4gTGFtIFPGoW4sIFRoYW5oIEjDs2EsIDQwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753109694486!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '21 Lê Hoàn, TP. Thanh Hóa', phone: '0237 567 890' }],
    },
    "NGHỆ AN": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.5665260671735!2d105.67233577583133!3d18.683437964177795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139ce6d12a3555b%3A0xa5a096a82a3fe91d!2zNTQgTMOqIEzhu6NpLCBIxrBuZyBCw6xuaCwgVmluaCwgTmdo4buHIEFuLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753109743550!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '54 Lê Lợi, TP. Vinh', phone: '0238 999 888' }],
    },
    "HÀ TĨNH": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.1057431857075!2d105.88954167582574!3d18.342459674589396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31384e136bc8e64d%3A0xbfbe37a53508a454!2zOTAgVHLhuqduIFBow7osIELhuq9jIEjDoCwgSMOgIFTEqW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753109804993!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '90 Trần Phú, TP. Hà Tĩnh', phone: '0239 777 999' }],
    },
    "KHÁNH HÒA": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.165153829441!2d109.1850233757485!3d12.237094430554611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d87f36fd627%3A0x8da7942301a7da23!2zMTAyIE5ndXnhu4VuIFRo4buLIE1pbmggS2hhaSwgUGjGsOG7m2MgSG_DoCwgTmhhIFRyYW5nLCBLaMOhbmggSMOyYSA1NzEyNywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1753109832661!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '102 Nguyễn Thị Minh Khai, Nha Trang', phone: '0258 666 777' }],
    },
    "BÌNH DƯƠNG": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.958873025253!2d106.68010487573748!3d10.966476955657983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d0d364f1a7bb%3A0x18221ea65990d9a9!2zODEgUUwxMywgUGjDuiBUaOG7jSwgVGjhu6cgROG6p3UgTeG7mXQsIELDrG5oIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1753109872098!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '81 Đại lộ Bình Dương, Thủ Dầu Một', phone: '0274 123 456' }],
    },
    "ĐỒNG NAI": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7834.43693540061!2d106.82527047573731!3d10.946863256025429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deafc0a7e557%3A0xf0be73fb904a365a!2zMTcyIMSQLiBWw7UgVGjhu4sgU8OhdSwgVGjhu5FuZyBOaOG6pXQsIEJpw6puIEjDsmEsIMSQ4buTbmcgTmFpIDgxMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1753109916671!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [
            { address: '172 Võ Thị Sáu, TP. Biên Hòa', phone: '0251 2200 555' },
            { address: '63 Đồng Khởi, Biên Hòa', phone: '0966 531 066' },
        ],
    },
    "VŨNG TÀU": {
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.336475374606!2d107.10269067573317!3d10.394827766115046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317571def42a24a3%3A0xb40b7219dac672d8!2zNTYgQ2FvIELDoSBRdcOhdCwgUGjGsOG7nW5nIFLhuqFjaCBS4burYSwgVsWpbmcgVMOgdSwgQsOgIFLhu4thIC0gVsWpbmcgVMOgdSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1753109950846!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
        locations: [{ address: '56 Trần Phú, TP. Vũng Tàu', phone: '0254 888 555' }],
    },
};

const provinces = Object.keys(branches);

const About = () => {
    const [selectedProvince, setSelectedProvince] = useState(provinces[0]);

    return (
        <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="w-full max-w-[1080px] pt-[60px]">
                <div className="p-4 sm:p-6 mt-15">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#8647e6] uppercase">
                        HỆ THỐNG CƠ SỞ VIETBRIDGE
                    </h2>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                        {provinces.map((province) => (
                            <button
                                key={province}
                                onClick={() => setSelectedProvince(province)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 ${selectedProvince === province
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                                    }`}
                            >
                                {province}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-md">
                        <div className="w-full aspect-video">
                            <iframe
                                src={branches[selectedProvince].mapUrl}
                                className="w-full h-full rounded-md border"
                                allowFullScreen=""
                                loading="lazy"
                                title={`Google Map - ${selectedProvince}`}
                            ></iframe>
                        </div>

                        <div className="text-left flex flex-col gap-4 p-2">
                            {branches[selectedProvince].locations.map((loc, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <span className="text-red-600 text-xl leading-6">📍</span>
                                    <div>
                                        <strong className="block text-base text-[#333]">{loc.address}</strong>
                                        <div className="text-sm text-gray-700">{loc.phone}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full border-b border-b-[#e0e0e0] shadow-sm mt-10"></div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#8647e6] uppercase mt-20"><h2>Khuyến mãi dành cho bạn</h2></div>
                <div className="w-full mt-10 mb-20">
                    <SignUpPage/>
                </div>
            </div>
        </div>
    );
};

export default About;
