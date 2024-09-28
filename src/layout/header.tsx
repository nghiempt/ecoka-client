import Link from "next/link"
import { Facebook, Youtube, Mail, ShoppingBag } from "lucide-react"
import { ROUTES } from "@/utils/route"
import Image from "next/image"
import { IMAGES } from "@/utils/image"
import { URL } from "@/utils/constant"

export const Header = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                <div className="w-2/3 py-6 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <h1 className="text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <Link href={URL.FACEBOOK} target="_blank"><Facebook className="text-white" size={19} /></Link>
                        <Link href={URL.YOUTUBE} target="_blank"><Youtube className="text-white" /></Link>
                        <Link href={URL.MAIL} target="_blank"><Mail className="text-white" /></Link>
                        <Link href={URL.SHOPPING} target="_blank"><ShoppingBag className="text-white" size={19} /></Link>
                        <Image src={IMAGES.FLAG_VN} alt="img" width={21} height={21} />
                    </div>
                </div>
            </div>
            <nav className="w-full hidden lg:flex flex-row justify-center items-center gap-4 py-6">
                <Link href={ROUTES.HOME} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Trang Chủ</Link>
                <Link href={ROUTES.PRODUCT} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Sản Phẩm</Link>
                <Link href={ROUTES.ABOUT} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Giới Thiệu</Link>
                <Link href={ROUTES.ESG} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">ESG</Link>
                <Link href={ROUTES.BLOG} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Bài Viết</Link>
                <Link href={ROUTES.CONTACT} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Liên Hệ</Link>
            </nav>
        </div>
    )
}