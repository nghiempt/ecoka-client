'use client'

import { Product } from "@/components/global/product"
import { Button } from "@/components/ui/button"
import { Footer } from "@/layout/footer"
import { categories, home_blogs, home_products, URL } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ArrowUpRight, Facebook, Mail } from "lucide-react"
import { ShoppingBag, Youtube } from "lucide-react"
import Link from "next/link"
import { Slider } from "./slider"
import { ROUTES } from "@/utils/route"
import Image from "next/image"
import { NavMobile } from "@/layout/nav-mobile"
import { truncateText } from "@/utils/helper"
import { useEffect, useState } from "react"
import { getAll } from "@/utils/api"

interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
};

interface ESG {
    id: number;
    row: number;
    title: string;
    description: string;
    thumbnail: string;
}

export function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [esgs, setEsgs] = useState<ESG[]>([]);

    const fetchProducts = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                method: "GET"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64", requestOptions);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            console.log(data);
            const transformedProducts: Product[] = data.map((item: any) => ({
                row: item.row_number,
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                description: item.description,
                images: [
                    item.i_one,
                    item.i_two,
                    item.i_three,
                    item.i_four,
                    item.i_five,
                    item.i_six,
                ].filter((url) => url !== ""),
            }));
            setProducts(transformedProducts.sort((a, b) => b.id - a.id).slice(0, 8));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEsgs = async () => {
        try {
            const data = await getAll('https://n8n.khiemfle.com/webhook/aa7f04f4-7833-49c2-8c86-7a043f4a8a5a');
            const transformedEsgs: ESG[] = data.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
            }));
            setEsgs(transformedEsgs);
            console.log(transformedEsgs);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchEsgs();
    }, []);
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <NavMobile />
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
            <div className="w-full relative">
                <video className="w-full h-[680px] md:h-[1000px] lg:h-[1000px] object-cover" autoPlay loop muted>
                    <source src={IMAGES.VIDEO_HOME} type="video/mp4" />
                </video>
                <div className='w-full absolute top-0 pt-6 flex flex-col justify-center items-center gap-10 text-white'>
                    <nav className="w-full hidden lg:flex flex-row justify-center items-center gap-4 py-6">
                        <Link href={ROUTES.HOME} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Trang Chủ</Link>

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

                        <Link href={ROUTES.ABOUT} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Giới Thiệu</Link>
                        <Link href={ROUTES.ESG} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">ESG</Link>
                        <Link href={ROUTES.BLOG} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Bài Viết</Link>
                        <Link href={ROUTES.CONTACT} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">Liên Hệ</Link>
                    </nav>
                    <img className="w-28 h-28 lg:w-44 lg:h-44 object-cover mt-10 md:mt-0 lg:mt-0" src={IMAGES.LOGO_CIRCLE} alt="logo" />
                    <h1 className='text-[22px] lg:text-[60px] font-black'>Bring Nature To Your Life</h1>
                    <div className="text-center flex flex-col gap-4 px-8">
                        <h1 className='text-[14px] lg:text-[20px] font-medium'>Công Ty Cổ Phần ECOKA Là công ty sản xuất và xuất khẩu các sản phẩm thủ công mỹ nghệ truyền thống</h1>
                        <h1 className='text-[14px] lg:text-[20px] font-medium'>từ các nguyên liệu 100% từ thiên nhiên như: lục bình, mây, tre, macrame.</h1>
                    </div>
                    <Link href={ROUTES.PRODUCT} className="flex flex-row justify-center items-center py-2 bg-[rgb(var(--primary-rgb))] rounded-lg text-[12px] md:text-[14px] lg:text-[14px] font-medium px-6 hover:bg-[rgb(var(--primary-rgb))] hover:opacity-80">
                        KHÁM PHÁ <ArrowUpRight className="ml-2" size={18} />
                    </Link>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="px-20 py-14 flex flex-col justify-start items-center">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* {esgs.map((esg, index) => (
                            <div className="flex flex-col justify-center items-center gap-5 transform transition-transform hover:scale-110 hover:cursor-pointer">
                                <div className="font-bold text-xl lg:text-2xl md:text-2xl text-center">{esg.title}</div>
                                <div className="hidden md:flex lg:flex font-medium text-md text-center">{esg.description}</div>
                            </div>
                        ))} */}
                        {esgs.map((esg, index) => (
                            <Link href="/esg" key={index}>
                                <div
                                    className="flex flex-col justify-center items-center gap-5 transform transition-transform hover:scale-110 hover:cursor-pointer"
                                >
                                    <div className="font-bold text-xl lg:text-2xl md:text-2xl text-center">
                                        {esg.title}
                                    </div>
                                    <div
                                        className="hidden md:flex lg:flex font-medium text-md text-center line-clamp-3"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {esg.description}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-full flex flex-col justify-start items-center mb-14 mt-8">
                    <div className="text-3xl font-bold text-center mb-8">Sản Phẩm</div>
                    <div className="w-full mb-8">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="animate-pulse flex flex-col items-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-md mb-4"></div>
                                        <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                                        <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Product products={products} />
                        )}
                    </div>
                    <Link className="w-full flex justify-center items-center" href={ROUTES.PRODUCT}>
                        <Button className="w-full md:w-1/5 lg:w-1/5 rounded-sm bg-white border border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] font-bold hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate">
                            Xem thêm
                        </Button>
                    </Link>
                </div>
                <div className="w-full py-10 bg-[rgb(var(--secondary-rgb))] px-10 lg:lx-0 md:px-0 mb-24 rounded-lg">
                    <Slider />
                </div>
                <div className="bg-cover bg-center h-[300px] lg:h-[600px] md:h-[600px] w-full mb-20" style={{ backgroundImage: `url(${IMAGES.HOME_GRID})` }}>
                    <div className="flex flex-col items-center justify-center" style={{ marginTop: '-40px' }}>
                        <div className="text-sm text-gray-500 font-semibold">Chia sẽ góc decor</div>
                        <div className="text-2xl text-gray-700 font-extrabold">#TrangTriNoiThat</div>
                    </div>
                </div>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-full flex flex-col justify-start items-center mt-8">
                    <div className="text-3xl font-bold text-center mb-8">Bài Viết</div>
                    <div className="w-full mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {
                                home_blogs?.map((blog: any, index: any) => {
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
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
