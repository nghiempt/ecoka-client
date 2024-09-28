'use client'

import { Product } from "@/components/global/product"
import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { total_products } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProductPage() {
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
                        SẢN PHẨM
                    </h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">Sản phẩm</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                <div className="w-full">
                    <Product products={total_products} />
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
