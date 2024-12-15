'use client'

import { Product } from "@/components/global/product"
import { Button } from "@/components/ui/button"
import { Footer } from "@/layout/footer"
import { categories, URL } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ArrowUpRight, Facebook, LayoutGrid, Mail } from "lucide-react"
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

interface Blog {
    row: number;
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    date: string;
};

export function HomePage({ lang, dictionary }: { lang: string; dictionary: any }) {
    const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [esgs, setEsgs] = useState<ESG[]>([]);

    const formatDateTime = (dateString: string | undefined) => {
        const date = dateString ? new Date(dateString) : new Date();
        const formattedDate = date.toLocaleDateString('vi-VN');
        const formattedTime = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} - ${formattedTime}`;
    };

    const fetchProducts = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                method: "GET",
                lang: lang
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect,
            };

            const res = await fetch(
                "https://n8n.khiemfle.com/webhook/b68e20ce-4e9a-4d96-8c48-c28f61bdc4cb",
                requestOptions
            );

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            const groupedProducts: { [key: string]: Product[] } = {};
            data.forEach((item: any) => {
                const category = item.category;
                if (!groupedProducts[category]) {
                    groupedProducts[category] = [];
                }
                groupedProducts[category].push({
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
                });
            });

            Object.keys(groupedProducts).forEach((category) => {
                groupedProducts[category] = groupedProducts[category]
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 4);
            });

            const filteredCategories = Object.keys(groupedProducts)
                .filter((category) => groupedProducts[category].length >= 4);

            const limitedCategories = filteredCategories.slice(0, 4);

            const limitedProducts: { [key: string]: Product[] } = {};
            limitedCategories.forEach((category) => {
                limitedProducts[category] = groupedProducts[category];
            });

            setProducts(limitedProducts);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const fetchEsgs = async () => {
        try {
            const data = await getAll('https://n8n.khiemfle.com/webhook/ec20cfc2-50bf-461c-b625-5f0eb0a72648', lang);
            const transformedEsgs: ESG[] = data.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
            }));
            setEsgs(transformedEsgs);
            // console.log(transformedEsgs);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                method: "GET",
                lang: lang
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect,
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/f3608e3a-c00a-415d-b7e2-d6184b5d27d3", requestOptions);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            const transformedBlogs: Blog[] = data.map((item: any) => ({
                row: item.row_number,
                id: item.id,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                author: item.author,
                date: formatDateTime(item.date),
            }));
            setBlogs(transformedBlogs.sort((a, b) => b.id - a.id));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchEsgs();
        fetchBlogs();
    }, []);
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <NavMobile lang={lang} dictionary={dictionary} />
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                <div className="w-2/3 py-6 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <h1 className="text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <Link href={URL.FACEBOOK} target="_blank"><Facebook className="text-white" size={19} /></Link>
                        <Link href={URL.YOUTUBE} target="_blank"><Youtube className="text-white" /></Link>
                        <Link href={URL.MAIL} target="_blank"><Mail className="text-white" /></Link>
                        <Link href={URL.SHOPPING} target="_blank"><ShoppingBag className="text-white" size={19} /></Link>
                        <Link href="/vi">
                            <Image src={IMAGES?.FLAG_VI} alt="img" width={21} height={21} />
                        </Link>
                        <Link href="/en">
                            <Image src={IMAGES?.FLAG_EN} alt="img" width={21} height={21} />
                        </Link>
                        <Link href="/jp">
                            <Image src={IMAGES?.FLAG_JP} alt="img" width={21} height={21} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full relative">
                <video className="w-full h-[680px] md:h-[1000px] lg:h-[1000px] object-cover" autoPlay loop muted>
                    <source src={IMAGES?.VIDEO_HOME} type="video/mp4" />
                </video>
                <div className='w-full absolute top-0 pt-6 flex flex-col justify-center items-center gap-10 text-white'>
                    <nav className="w-full hidden lg:flex flex-row justify-center items-center gap-4 py-6 uppercase">
                        <Link href={`/${lang}/`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                            {dictionary?.HEADER_title[0]}
                        </Link>

                        <div className="relative group h-full">
                            <Link href={`/${lang}${ROUTES.PRODUCT}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                                {dictionary?.HEADER_title[1]}
                            </Link>

                            <div className="absolute top-full left-0 flex flex-col gap-3 mt-2 w-64 p-5 pl-7 bg-white opacity-80 text-black shadow-lg rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out">
                                {categories.map((category: any, index: number) => (
                                    <Link href={`/${lang}${ROUTES.PRODUCT}${category.path}`} className="text-lg font-semibold transform duration-300 hover:scale-110">
                                        {lang === "vi" && category?.name}
                                        {lang === "en" && category?.name_en}
                                        {lang === "jp" && category?.name_jp}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href={`/${lang}${ROUTES.ABOUT}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                            {dictionary?.HEADER_title[2]}
                        </Link>
                        <Link href={`/${lang}${ROUTES.ESG}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                            {dictionary?.HEADER_title[3]}
                        </Link>
                        <Link href={`/${lang}${ROUTES.BLOG}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                            {dictionary?.HEADER_title[4]}
                        </Link>
                        <Link href={`/${lang}${ROUTES.CONTACT}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                            {dictionary?.HEADER_title[5]}
                        </Link>
                    </nav>
                    <img className="w-28 h-28 lg:w-44 lg:h-44 object-cover mt-10 md:mt-0 lg:mt-0" src={IMAGES?.LOGO_CIRCLE} alt="logo" />
                    <h1 className='text-[22px] lg:text-[60px] font-black'>{dictionary?.HOME_title}</h1>
                    <div className="text-center flex flex-col items-center gap-4 px-8">
                        <h1 className='text-[14px] w-3/4 lg:text-[20px] font-light'>{dictionary?.HOME_description}</h1>
                    </div>
                    <Link href={`/${lang}${ROUTES.PRODUCT}`} className="flex flex-row justify-center items-center py-2 bg-[rgb(var(--primary-rgb))] rounded-lg text-[12px] md:text-[14px] lg:text-[14px] font-medium px-6 hover:bg-[rgb(var(--primary-rgb))] hover:opacity-80">
                        {dictionary?.HOME_discovery} <ArrowUpRight className="ml-2" size={18} />
                    </Link>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="px-20 py-14 flex flex-col justify-start items-center">
                    <div className="text-3xl text-gray-800 font-bold mb-14">{dictionary?.HOME_subtitle_1}</div>
                    <div className="flex flex-col lg:flex-row gap-10">
                        {esgs.map((esg, index) => (
                            <Link href="/vi/esg" key={index}>
                                <div
                                    className="flex flex-col justify-center items-center gap-5 transform transition-transform hover:scale-110 hover:cursor-pointer"
                                >
                                    <div className="font-bold text-gray-800 text-xl lg:text-2xl md:text-2xl text-center">
                                        {esg.title}
                                    </div>
                                    <div
                                        className="hidden md:flex lg:flex font-light text-md text-center line-clamp-3"
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
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))] mb-10"></div>
                <div className="w-full pb-14 mt-10 flex flex-col justify-center items-center">
                    <div className="w-full text-gray-800 text-3xl font-bold mb-8 text-center">{dictionary?.HOME_subtitle_2}</div>
                    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
                        <Image src="https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/hhzrcqlvmhrylzwwqqi5.jpg" alt="img" width={200} height={0} />
                        <Image src="https://res.cloudinary.com/farmcode/image/upload/v1732782449/ecoka/kypqpxwuqlrzivuqulfd.png" alt="img" width={280} height={0} />
                        <Image src="https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/ccrn8pxro2oayevqrg4d.jpg" alt="img" width={260} height={0} />
                        <Image src="https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/pjqmxyre74hfxhs7vras.png" alt="img" width={200} height={0} />
                    </div>
                </div>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-full flex flex-col justify-start items-center mb-14 mt-8">
                    <div className="text-3xl text-gray-800 font-bold text-center mb-8">{dictionary?.HOME_subtitle_3}</div>
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.entries(products)
                                    .filter(([category, items]) => items.length >= 4)
                                    .flatMap(([category, items]) =>
                                        items.map((product) => (
                                            <Link href={`${lang}/san-pham/${product?.id}`} key={product?.id} className="relative group cursor-pointer rounded-lg">
                                                <div className="rounded-lg bg-gray-50 flex flex-col border-none">
                                                    <div className="relative w-full h-[280px] rounded-lg">
                                                        <Image
                                                            src={product?.images[0]}
                                                            alt={`${product?.name} image`}
                                                            fill
                                                            style={{ objectFit: "cover" }}
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center p-3 text-start">
                                                        <div className="text-lg font-bold mb-1 max-h-[28px] truncate">{product?.name}</div>
                                                        <div className="text-xs font-semibold text-gray-400 text-left mb-2 max-h-[32px] text-clip overflow-hidden">
                                                            {product?.description}
                                                        </div>
                                                        <div className="w-full grid grid-cols-5 items-center">
                                                            <p className="col-span-3 max-h-[24px] text-md font-semibold text-left truncate">
                                                                {Intl.NumberFormat("de-DE").format(product?.price)} VND
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-2 right-2 h-10 w-10 rounded-full bg-[#E97171] text-white text-[12px] font-semibold flex items-center justify-center">
                                                    {dictionary?.HOME_new_tag}
                                                </div>
                                            </Link>
                                        ))
                                    )}
                            </div>
                        )}
                    </div>
                    <Link className="w-full flex justify-center items-center" href={`/${lang}${ROUTES.PRODUCT}`}>
                        <Button className="w-full md:w-1/5 lg:w-1/5 rounded-sm bg-white border border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] font-bold hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate">
                            {dictionary?.HOME_button_more}
                        </Button>
                    </Link>
                </div>
                <div className="w-full py-10 bg-[rgb(var(--secondary-rgb))] px-10 lg:lx-0 md:px-0 mb-24 rounded-lg">
                    <Slider lang={lang} dictionary={dictionary} />
                </div>
                <div className="bg-cover bg-center h-[300px] lg:h-[600px] md:h-[600px] w-full mb-20" style={{ backgroundImage: `url(${IMAGES?.HOME_GRID})` }}>
                    <div className="flex flex-col items-center justify-center" style={{ marginTop: '-40px' }}>
                        <div className="text-sm text-gray-500 font-semibold">{dictionary?.HOME_decor_tag}</div>
                        <div className="text-2xl text-gray-700 font-extrabold">{dictionary?.HOME_hashtag}</div>
                    </div>
                </div>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-full flex flex-col justify-start items-center mt-8">
                    <div className="text-3xl font-bold text-center mb-8">{dictionary?.HOME_subtitle_4}</div>
                    <div className="w-full mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {
                                blogs?.slice(0, 3)?.map((blog: any, index: any) => {
                                    return (
                                        <div key={index}>
                                            <Link href={`/${lang}/bai-viet/${blog?.id}`}>
                                                <div className="flex flex-col items-start justify-center gap-2 hover:opacity-80 cursor-pointer">
                                                    <div className='relative w-full h-[220px] rounded-lg'>
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
                                                    <h1 className="text-[16px] font-semibold max-h-[48px] line-clamp-2">{truncateText(blog?.title, 76)}</h1>
                                                    <h1 className="text-[14px] font-medium bg-[rgb(var(--secondary-rgb))] rounded-md px-2 py-1">{dictionary?.HOME_blog_author}: {blog?.author}</h1>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Link className="w-full flex justify-center items-center mt-14" href={`/${lang}${ROUTES.BLOG}`}>
                            <Button className="w-full md:w-1/5 lg:w-1/5 rounded-sm bg-white border border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] font-bold hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate">
                                {dictionary?.HOME_button_more}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer dictionary={dictionary} />
        </div>
    )
}
