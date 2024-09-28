'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ESGPage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header />
            <NavMobile />
            <div className="bg-cover bg-center h-[250px] w-full md:w-2/3 lg:w-2/3 flex justify-center items-center md:rounded-lg lg:rounded-lg"
                style={{ backgroundImage: `url('/breadcrumb.png')` }}>
                <div className="w-full flex flex-col justify-center items-center">
                    <Image
                        src={IMAGES.BANNER_LOGO}
                        alt='img'
                        width={50}
                        height={50}
                        className="text-center"
                    />
                    <h1 className="text-4xl font-semibold mb-2">
                        ESG
                    </h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">ESG</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                <section className="w-full py-10">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-[rgb(var(--primary-rgb))] leading-tight">
                                MÔI TRƯỜNG
                            </h2>
                            <p className="mt-4 text-lg text-gray-700">
                            ECOKA cam kết bảo vệ môi trường thông qua việc sử dụng các nguyên liệu 100% tự nhiên như lục bình để sản xuất túi xách thủ công. Nguyên liệu này không chỉ thân thiện với môi trường mà còn có khả năng tự phân hủy sau một thời gian dài tiếp xúc với thiên nhiên, giảm thiểu rác thải nhựa và các chất ô nhiễm. Quy trình sản xuất của ECOKA được thiết kế để tối ưu hóa tài nguyên, hạn chế tiêu thụ năng lượng và nước, góp phần vào việc bảo tồn hệ sinh thái tự nhiên.
                            </p>
                            <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                        </div>
                        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                            <Image
                                src={IMAGES.ESG_ENV}
                                alt="img"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>
                <section className="flex md:hidden lg:hidden w-full py-10">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-[rgb(var(--primary-rgb))] leading-tight">
                                XÃ HỘI
                            </h2>
                            <p className="mt-4 text-lg text-gray-700">
                                ECOKA tạo việc làm ổn định cho các nghệ nhân tại miền Tây, nơi nổi tiếng với kỹ năng thủ công truyền thống. Công ty không chỉ giúp bảo tồn và phát triển nghề thủ công mỹ nghệ truyền thống mà còn nâng cao đời sống kinh tế cho người lao động địa phương. Ngoài ra, ECOKA đóng góp vào các hoạt động cộng đồng, xây dựng môi trường làm việc công bằng và hỗ trợ các sáng kiến phát triển bền vững cho cộng đồng.
                            </p>
                            <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                        </div>
                        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                            <Image
                                src={IMAGES.ESG_SOCIAL}
                                alt="img"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>
                <section className="hidden md:flex lg:flex w-full py-10">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                            <Image
                                src={IMAGES.ESG_SOCIAL}
                                alt="img"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                        <div className="lg:w-1/2 mt-10 md:mt-0 lg:mt-0">
                            <h2 className="text-3xl font-bold text-[rgb(var(--primary-rgb))] leading-tight">
                                XÃ HỘI
                            </h2>
                            <p className="mt-4 text-lg text-gray-700">
                                ECOKA tạo việc làm ổn định cho các nghệ nhân tại miền Tây, nơi nổi tiếng với kỹ năng thủ công truyền thống. Công ty không chỉ giúp bảo tồn và phát triển nghề thủ công mỹ nghệ truyền thống mà còn nâng cao đời sống kinh tế cho người lao động địa phương. Ngoài ra, ECOKA đóng góp vào các hoạt động cộng đồng, xây dựng môi trường làm việc công bằng và hỗ trợ các sáng kiến phát triển bền vững cho cộng đồng.
                            </p>
                            <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-10">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-[rgb(var(--primary-rgb))] leading-tight">
                                QUẢN TRỊ
                            </h2>
                            <p className="mt-4 text-lg text-gray-700">
                            ECOKA thực hiện các chính sách quản trị minh bạch và có trách nhiệm, đảm bảo sự phát triển bền vững và tuân thủ các quy định pháp luật về lao động và môi trường. Công ty luôn cam kết duy trì đạo đức kinh doanh cao, tạo ra các sản phẩm chất lượng đáp ứng tiêu chuẩn quốc tế, đồng thời không ngừng cải tiến quy trình sản xuất để tăng cường hiệu suất và giảm thiểu tác động tiêu cực đến môi trường và xã hội.
                            </p>
                            <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                        </div>
                        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                            <Image
                                src={IMAGES.ESG_MANAGE}
                                alt="img"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
