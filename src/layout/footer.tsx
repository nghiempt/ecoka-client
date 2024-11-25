import { IMAGES } from "@/utils/image"
import { Facebook, Youtube, Mail, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="w-5/6 md:w-2/3 lg:w-2/3 pb-6">
            <div className="w-full grid grid-row-1 md:grid-cols-6 lg:grid-cols-6 gap-10 md:gap-24 lg:gap-24">
                <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-center items-center md:items-start lg:items-start gap-4">
                    <Image src={IMAGES.LOGO} width={160} height={160} alt="logo" />
                    <div className="text-center md:text-left lg:text-left text-[14px]">Là công ty sản xuất và thương mại các sản phẩm thủ công mỹ nghệ truyền thống từ các nguyên liệu 100% từ thiên nhiên.</div>
                    <div className="flex justify-start items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <Facebook />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <Youtube />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <Mail />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <ShoppingBag />
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-[14px]">
                    <div className="flex flex-col justify-center items-center md:items-start lg:items-start gap-4">
                        <div className="text-gray-700 font-semibold">Trang Chủ</div>
                        <div className="flex flex-col justify-center items-center md:items-start lg:items-start text-gray-400 gap-2">
                            <div>Giới Thiệu</div>
                            <div>Bài Viết</div>
                            <div>Liên Hệ</div>
                            <div>ESG</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start lg:items-start gap-4">
                        <div className="text-gray-700 font-semibold">Sản Phẩm</div>
                        <div className="flex flex-col justify-center items-center md:items-start lg:items-start text-gray-400 gap-2">
                            <div>Nhà Cửa</div>
                            <div>Nhà Bếp</div>
                            <div>Nhà Thú Cưng</div>
                            <div>Thời Trang</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start lg:items-start gap-4">
                        <div className="text-gray-700 font-semibold">Chúng Tôi</div>
                        <div className="flex flex-col justify-center items-center md:items-start lg:items-start text-gray-400 gap-2">
                            <div>Facebook</div>
                            <div>Youtube</div>
                            <div>Shopee</div>
                            <div>Email</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start lg:items-start gap-4">
                        <div className="text-gray-700 font-semibold">Hỗ Trợ</div>
                        <div className="flex flex-col justify-center items-center md:items-start lg:items-start text-gray-400 gap-2">
                            <div>Ưu Đãi</div>
                            <div>Nhượng Quyền</div>
                            <div>Điều Khoản</div>
                            <div>Chính Sách</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-6"></div>
            <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-center text-gray-400 gap-2 pb-16 md:pb-0 lg:pb-0">
                <div className="flex justify-center items-center gap-2 text-[8px] md:text-[14px] lg:text-[14px]">
                    <div>
                        Copyright © 2024 ECOKA HANDICRAFTS
                    </div>
                    <div>|</div>
                    <div>
                        All Rights Reserved
                    </div>
                    <div>|</div>
                </div>
                <div className="flex justify-center items-center gap-2 text-[8px] md:text-[14px] lg:text-[14px]">
                    <Link href={'https://nghiempt.github.io'} className="text-gray-500" target="_blank">
                        Powered by <strong>Nghiem Thanh Pham</strong>
                    </Link>
                </div>
            </div>
        </div>
    )
}