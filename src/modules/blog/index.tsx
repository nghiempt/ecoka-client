'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { total_blogs } from "@/utils/constant"
import { truncateText } from "@/utils/helper"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BlogPage() {
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
                        BÀI VIẾT
                    </h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">Bài viết</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {
                        total_blogs?.map((blog: any, index: any) => {
                            return (
                                <div key={index} className="flex flex-col items-start justify-center gap-2 hover:opacity-80 cursor-pointer">
                                    <div className='relative w-full h-[240px] rounded-lg'>
                                        <Image
                                            src={blog?.thumbnail}
                                            alt="img"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className='rounded-lg'
                                        />
                                    </div>
                                    <h1 className="text-[13px] font-medium mt-1">{blog?.date}</h1>
                                    <h1 className="text-[16px] font-semibold max-h-[48px]">{truncateText(blog?.title, 76)}</h1>
                                    <h1 className="text-[14px] font-medium bg-[rgb(var(--secondary-rgb))] rounded-md px-2 py-1">Tác giả: {blog?.author}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
