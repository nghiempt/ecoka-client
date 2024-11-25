import Link from "next/link"
import { Facebook, Youtube, Mail, ShoppingBag } from "lucide-react"
import { ROUTES } from "@/utils/route"
import Image from "next/image"
import { IMAGES } from "@/utils/image"
import { categories, URL } from "@/utils/constant"

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
                        <Image src={IMAGES.FLAG_VI} alt="img" width={21} height={21} />
                        <Image src={IMAGES.FLAG_EN} alt="img" width={21} height={21} />
                        <Image src={IMAGES.FLAG_JP} alt="img" width={21} height={21} />
                    </div>
                </div>
            </div>
            <nav className="w-full hidden lg:flex flex-row justify-center items-center gap-4 py-6 uppercase">
                <Link href={ROUTES.HOME} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Trang Chủ</Link>
                <div className="relative group h-full">
                    <Link href={ROUTES.PRODUCT} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                        Sản Phẩm
                    </Link>

                    <div className="absolute top-full left-0 flex flex-col gap-3 mt-2 w-64 p-5 pl-7 bg-white opacity-80 text-black shadow-lg rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out">
                        {categories.map((category: any, index: number) => (
                            <Link href={ROUTES.PRODUCT + `${category.path}`} className="text-lg font-semibold transform duration-300 hover:scale-110">{category.name}</Link>
                        ))}
                    </div>
                </div>
                <Link href={ROUTES.ABOUT} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Giới Thiệu</Link>
                <Link href={ROUTES.ESG} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">ESG</Link>
                <Link href={ROUTES.BLOG} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Bài Viết</Link>
                <Link href={ROUTES.CONTACT} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Liên Hệ</Link>
            </nav>
        </div>
    )
}