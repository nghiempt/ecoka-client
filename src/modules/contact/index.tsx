'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { IMAGES } from "@/utils/image"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { NavMobile } from "@/layout/nav-mobile"
import { ROUTES } from "@/utils/route"
import { useEffect, useState } from "react"
import { getAll } from "@/utils/api"


interface Company {
    id: number;
    row: number;
    name: string;
    description: string;
    phone: string;
    address: string;
    email: string;
}

export function ContactPage() {
    const [company, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const apiUrl = "https://n8n.khiemfle.com/webhook/e984f33a-ffd7-48b7-bea7-3899a97e284e";

    const mapContainerStyle = {
        width: "100%",
        height: "800px",
    };

    const center = {
        lat: 9.695273295299064,
        lng: 105.48511737301513
    };

    const fetchCompany = async () => {
        try {
            const data = await getAll(apiUrl);
            const transformedCompany: Company[] = data.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                name: item.name,
                description: item.description,
                phone: item.phone,
                address: item.address,
                email: item.email,
            }));
            setCompany(transformedCompany);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    function SkeletonLoader() {
        return (
            <div className="animate-pulse space-y-4 w-full max-w-7xl p-4">
                <div className="h-8 bg-gray-300 rounded-md w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded-md w-1/2 mt-4"></div>
                <div className="h-40 bg-gray-300 rounded-md mt-6"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header />
            <NavMobile />
            <div className="bg-cover bg-center h-[250px] w-full flex justify-center items-center text-white"
                style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')` }}>
                <div className="w-full flex flex-col justify-center items-center">
                    <Image
                        src={IMAGES.BANNER_LOGO}
                        alt='img'
                        width={50}
                        height={50}
                        className="text-center"
                    />
                    <h1 className="text-4xl font-semibold mb-2">
                        LIÊN HỆ
                    </h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">Liên hệ</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                {loading ? <SkeletonLoader /> : (
                    <div className="w-full bg-white mt-8 md:mt-0 lg:mt-0 md:py-8 lg:py-8 flex justify-center">
                        <div className="w-full max-w-3xl text-center px-4">
                            <h1 className="text-2xl md:text-3xl font-bold">Liên Hệ Với Chúng Tôi</h1>
                            <p className="mt-2 text-gray-500 text-sm md:text-base">
                                Để biết thêm thông tin về sản phẩm và dịch vụ của chúng tôi. Vui lòng gửi email cho chúng tôi. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn. Đừng ngần ngại!
                            </p>
                        </div>
                    </div>
                )}

                {loading ? <SkeletonLoader /> : (
                    <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between px-4 md:px-20 py-10 md:gap-10 lg:gap-10">
                        <div className="flex-1 space-y-8">
                            <div className="flex items-start space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-map-pin"
                                >
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-lg">Địa chỉ</h3>
                                    <p className="text-gray-600">
                                        {company[0]?.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-phone"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-lg">Số điện thoại</h3>
                                    <p className="text-gray-600">Mobile: {company[0]?.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-clock-10"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 8 10" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-lg">Thời gian làm việc</h3>
                                    <p className="text-gray-600">Thứ hai - Thứ bảy: 7:00 - 17:00</p>
                                    <p className="text-gray-600">Chủ nhật: Đóng cửa</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 mt-10 md:mt-0 lg:mt-0">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Tên của bạn
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Nhập tên của bạn"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Địa chỉ email
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="nguyenvana@gmail.com"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                        Tiêu đề
                                    </label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        placeholder="Đây là tiêu đề"
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                        Nội dung
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Viết nội dung vào đây"
                                        className="w-full border border-gray-300 p-2 rounded h-32"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full py-2 bg-[rgb(var(--primary-rgb))] hover:bg-[rgb(var(--primary-rgb))] hover:opacity-80 text-white text-sm font-medium rounded-md focus:ring-0"
                                >
                                    Gửi
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 mt-4 rounded-lg">
                {/* <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={14}
                    >
                        <Marker
                            position={{
                                lat: 9.695273295299064,
                                lng: 105.48511737301513
                            }}
                        />
                    </GoogleMap>
                </LoadScript> */}
                <div style={{ width: '100%' }} className="rounded-lg">
                    <iframe className="rounded-lg" width="100%" height="600" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=9.69591039500916,%20105.48758524851372+(ECOKA)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
