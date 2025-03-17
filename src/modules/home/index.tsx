'use client'

import { Product } from "@/components/global/product"
import { Button } from "@/components/ui/button"
import { Footer } from "@/layout/footer"
import { categories, languages, URL } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Slider } from "./slider"
import { ROUTES } from "@/utils/route"
import Image from "next/image"
import { NavMobile } from "@/layout/nav-mobile"
import { truncateText } from "@/utils/helper"
import { useEffect, useRef, useState } from "react"
import { getAll } from "@/utils/api"
import { useMediaQuery } from "@/utils/media"
import { DATA } from "@/utils/data.bk"

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
    const [esgs, setEsgs] = useState<ESG[]>([]);
    const [filterProducts, setFilterProducts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            // setLoading(true);

            // const fetchProducts = fetch("https://n8n.khiemfle.com/webhook/b68e20ce-4e9a-4d96-8c48-c28f61bdc4cb", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ method: "GET", lang }),
            // }).then(res => res.json());

            // const fetchEsgs = fetch("https://n8n.khiemfle.com/webhook/ec20cfc2-50bf-461c-b625-5f0eb0a72648", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ method: "GET", lang }),
            // }).then(res => res.json());

            // const fetchBlogs = fetch("https://n8n.khiemfle.com/webhook/f3608e3a-c00a-415d-b7e2-d6184b5d27d3", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ method: "GET", lang }),
            // }).then(res => res.json());

            // const [productsData, esgsData, blogsData] = await Promise.all([fetchProducts, fetchEsgs, fetchBlogs]);

            const productsData: any = []
            const esgsData: any = lang === "vi" ? DATA.ESG : lang === "en" ? DATA.ESG_EN : DATA.ESG_JP
            const blogsData: any = lang === "vi" ? DATA.BLOG : lang === "en" ? DATA.BLOG_EN : DATA.BLOG_JP

            // Xử lý dữ liệu products
            const groupedProducts: { [key: string]: Product[] } = {};
            productsData.forEach((item: any) => {
                const category = item.category;
                if (!groupedProducts[category]) groupedProducts[category] = [];
                groupedProducts[category].push({
                    row: item.row_number,
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    description: item.description,
                    images: [item.i_one, item.i_two, item.i_three, item.i_four, item.i_five, item.i_six].filter(url => url !== ""),
                });
            });
            setProducts(groupedProducts);

            // Lấy thông tin filtered products
            // await getProductsHomePage(productsData);

            // Xử lý dữ liệu esgs
            const transformedEsgs: ESG[] = esgsData.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
            }));
            setEsgs(transformedEsgs);

            // Xử lý dữ liệu blogs
            const transformedBlogs: Blog[] = blogsData.map((item: any) => ({
                row: item.row_number,
                id: item.id,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                author: item.author,
                date: new Date(item.date).toLocaleString("vi-VN"),
            }));
            setBlogs(transformedBlogs);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getProductsHomePage = async (productOrigin: any) => {
        try {
            const response = await fetch("https://n8n.khiemfle.com/webhook/7a9b383f-1381-4e46-82a6-800e6fb2f122", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ method: "GET" }),
            });
            const result = await response.json();

            const groupedProducts: { [key: string]: any[] } = {};
            result.forEach((item: any) => {
                const product = productOrigin.find((pro: any) => pro.id.toString() === item.product_id.toString());
                if (product) {
                    const category = product.category;
                    if (!groupedProducts[category]) groupedProducts[category] = [];
                    groupedProducts[category].push({
                        row: product.row,
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        description: product.description,
                        images: [product.i_one, product.i_two, product.i_three, product.i_four, product.i_five, product.i_six].filter(url => url !== ""),
                    });
                }
            });

            setFilterProducts(groupedProducts);
        } catch (error) {
            console.error("Error fetching homepage products:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [currentLang, setCurrentLang] = useState(() =>
        languages.find((l) => l.lang === lang) || languages[0]
    );

    const handleLanguageChange = (lang: string) => {
        const selectedLang = languages.find((l) => l.lang === lang);
        if (selectedLang) {
            setCurrentLang(selectedLang);
        }
        setIsOpen(false);
    };

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    if (isMobile) {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const target = event.target as HTMLElement;

                if (!target.closest(".dropdown-container")) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);
    } else {

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        useEffect(() => {
            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <NavMobile lang={lang} dictionary={dictionary} />
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                <div className="w-2/3 py-6 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <h1 className="hidden lg:flex text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                    <div className="md:hidden lg:hidden w-full flex justify-between items-center">
                        <h1 className="text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                        {isMobile ? (
                            <div className="dropdown-container relative ">
                                <div onClick={toggleDropdown} className="px-2 py-1 flex flex-row justify-center items-center gap-1 bg-opacity-60 bg-white cursor-pointer rounded-lg">
                                    <Image src={currentLang.flag} alt={currentLang.label} width={23} height={23} />
                                    <div className={`transition-transform duration-300 ${isOpen ? "-translate-y-0.5" : "-rotate-90"} mt-1`}>
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="black" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                {isOpen && (
                                    <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-opacity-80 bg-white shadow-lg ring-1 ring-black/5">
                                        {languages
                                            .filter(({ lang }) => lang !== currentLang.lang)
                                            .map(({ lang, label, flag }) => (
                                                <li
                                                    key={lang}
                                                    className="flex justify-center m-3 cursor-pointer"
                                                    onClick={() => handleLanguageChange(lang)}
                                                >
                                                    <Link href={`/${lang}`}>
                                                        <Image src={flag} alt={label} width={23} height={23} />
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <div onClick={toggleDropdown} className="px-2 py-1 flex flex-row justify-center items-center gap-1 bg-opacity-60 bg-white cursor-pointer rounded-lg">
                                    <Image src={currentLang.flag} alt={currentLang.label} width={23} height={23} />
                                    <div className={`transition-transform duration-300 ${isOpen ? "-translate-y-0.5" : "-rotate-90"} mt-1`}>
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="black" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                {isOpen && (
                                    <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-opacity-80 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {languages
                                            .filter(({ lang }) => lang !== currentLang.lang)
                                            .map(({ lang, label, flag }) => (
                                                <Link href={`/${lang}`}>
                                                    <li key={lang} className="flex justify-center m-3" onClick={() => handleLanguageChange(lang)}>
                                                        <Image src={flag} alt={label} width={23} height={23} />
                                                    </li>
                                                </Link>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <Link href={URL?.FACEBOOK} target="_blank">
                            <Image className="rounded-sm" src={IMAGES.FACEBOOK} alt="fb" width={23} height={23} />
                        </Link>
                        <Link href={URL?.TIKTOK} target="_blank">
                            <Image src={IMAGES.TIKTOK} alt="fb" width={27} height={27} />
                        </Link>
                        <Link href={URL?.YOUTUBE} target="_blank">
                            <Image src={IMAGES.YOUTUBE} alt="youtube" width={23} height={23} />
                        </Link>
                        <Link href={URL?.MAIL} target="_blank">
                            <Image src={IMAGES.EMAIL} alt="mail" width={26} height={26} />
                        </Link>
                        <Link href={URL?.SHOPPING} target="_blank">
                            <Image src={IMAGES.SHOPEE} alt="shopee" width={23} height={23} />
                        </Link>
                        <div className="relative" ref={dropdownRef}>
                            <div onClick={toggleDropdown} className="px-2 py-1 flex flex-row justify-center items-center gap-1 bg-opacity-60 bg-white cursor-pointer rounded-lg">
                                <Image src={currentLang.flag} alt={currentLang.label} width={23} height={23} />
                                <div className={`transition-transform duration-300 ${isOpen ? "-translate-y-0.5" : "-rotate-90"} mt-1`}>
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="black" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {isOpen && (
                                <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-opacity-80 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    {languages
                                        .filter(({ lang }) => lang !== currentLang.lang)
                                        .map(({ lang, label, flag }) => (
                                            <Link href={`/${lang}`}>
                                                <li key={lang} className="flex justify-center m-3" onClick={() => handleLanguageChange(lang)}>
                                                    <Image src={flag} alt={label} width={23} height={23} />
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            )}
                        </div>
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
                        <h1 className='text-[14px] w-full md:w-3/4 lg:w-3/4 lg:text-[20px] font-light'>{dictionary?.HOME_description}</h1>
                    </div>
                    <Link href={`/${lang}${ROUTES.PRODUCT}`} className="flex flex-row justify-center items-center py-2 bg-[rgb(var(--primary-rgb))] rounded-lg text-[12px] md:text-[14px] lg:text-[14px] font-medium px-6 hover:bg-[rgb(var(--primary-rgb))] hover:opacity-80">
                        {dictionary?.HOME_discovery} <ArrowUpRight className="ml-2" size={18} />
                    </Link>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="md:px-20 lg:px-20 py-14 flex flex-col justify-start items-center">
                    <div className="text-center text-3xl text-gray-800 font-bold mb-14">{dictionary?.HOME_subtitle_1}</div>
                    <div className="flex flex-col lg:flex-row gap-10">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="animate-pulse flex flex-col items-center">
                                        <div className="w-40 h-4 bg-gray-300 rounded-md mb-8 mr-10"></div>
                                        <div className="w-60 h-4 bg-gray-300 rounded-md mb-3 mr-10"></div>
                                        <div className="w-16 h-4 bg-gray-300 rounded-md mb-4 mr-10"></div>
                                        <div className="w-24 h-4 bg-gray-300 rounded-md mr-10"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            esgs.map((esg, index) => (
                                <Link href={`/${lang}${ROUTES.ESG}`} key={index}>
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
                            ))
                        )}
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
                                        <div className="w-56 h-60 bg-gray-300 rounded-md mb-4"></div>
                                        <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                                        <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {
                                    Object.entries(filterProducts)
                                        // .filter(([category, items]: [category: any, items: any]) => items.length >= 4)
                                        .flatMap(([category, items]: [category: any, items: any]) => items?.map((product: any) => (
                                            <Link href={`${lang}/san-pham/${product?.id}`} key={product?.id} className="relative group cursor-pointer rounded-lg">
                                                <div className="rounded-lg bg-gray-50 flex flex-col border-none">
                                                    <div className="relative w-full h-[160px] md:h-[280px] lg:h-[280px] rounded-lg">
                                                        {product?.images?.[0] ? (
                                                            <Image
                                                                src={product?.images[0]}
                                                                alt={`${product?.name} image`}
                                                                fill
                                                                style={{ objectFit: "cover" }}
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                className="rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                                <span>No Image</span>
                                                            </div>
                                                        )}
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
                                        )))}
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
                        {loading ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="animate-pulse flex flex-col items-start">
                                        <div className="w-full h-[240px] bg-gray-300 rounded-md mb-4"></div>
                                        <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
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
                        )}
                        <Link className="w-full flex justify-center items-center mt-14" href={`/${lang}${ROUTES.BLOG}`}>
                            <Button className="w-full md:w-1/5 lg:w-1/5 rounded-sm bg-white border border-[rgb(var(--primary-rgb))] text-[rgb(var(--primary-rgb))] font-bold hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate">
                                {dictionary?.HOME_button_more}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer lang={lang} dictionary={dictionary} />
        </div>
    )
}
