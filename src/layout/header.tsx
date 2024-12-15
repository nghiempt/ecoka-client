"use client"

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/utils/route";
import { IMAGES } from "@/utils/image";
import { categories, URL } from "@/utils/constant";

export const Header = ({ page, lang, dictionary }: { page: string; lang: string; dictionary: any }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                <div className="w-2/3 py-6 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <h1 className="text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <Link href={URL?.FACEBOOK} target="_blank">
                            <Image src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png" alt="fb" width={21} height={21} />
                        </Link>
                        <Link href={URL?.YOUTUBE} target="_blank">
                        <Image src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png" alt="youtube" width={21} height={21} />
                        </Link>
                        <Link href={URL?.MAIL} target="_blank">
                        <Image src="https://cdn-icons-png.flaticon.com/128/6806/6806987.png" alt="mail" width={21} height={21} />
                        </Link>
                        <Link href={URL?.SHOPPING} target="_blank">
                        <Image src="https://res.cloudinary.com/farmcode/image/upload/v1734257182/ecoka/lkincykzxzjszovtjbgq.png" alt="shopee" width={21} height={21} />
                        </Link>
                        <Link href={`/vi/${page}`}>
                            <Image src={IMAGES?.FLAG_VI} alt="Vietnamese" width={21} height={21} />
                        </Link>
                        <Link href={`/en/${page}`}>
                            <Image src={IMAGES?.FLAG_EN} alt="English" width={21} height={21} />
                        </Link>
                        <Link href={`/jp/${page}`}>
                            <Image src={IMAGES?.FLAG_JP} alt="Japanese" width={21} height={21} />
                        </Link>
                    </div>
                </div>
            </div>
            <nav className="w-full hidden lg:flex flex-row justify-center items-center gap-4 py-6 uppercase">
                <Link href={`/${lang}/`} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                    {dictionary?.HEADER_title[0]}
                </Link>
                <div className="relative group h-full">
                    <Link href={`/${lang}${ROUTES.PRODUCT}`} className="bg-gray-50 bg-opacity-60 text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg h-full flex items-center justify-center hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                        {dictionary?.HEADER_title[1]}
                    </Link>
                    <div className="absolute top-full left-0 flex flex-col gap-3 mt-2 w-64 p-5 pl-7 bg-white opacity-80 text-black shadow-lg rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out z-20">
                        {categories?.map((category: any) => (
                            <Link href={`/${lang}${ROUTES.PRODUCT}${category.path}`} key={category.name} className="text-lg font-semibold transform duration-300 hover:scale-110">
                                {lang === "vi" && category?.name}
                                {lang === "en" && category?.name_en}
                                {lang === "jp" && category?.name_jp}
                            </Link>
                        ))}
                    </div>
                </div>
                <Link href={`/${lang}${ROUTES.ABOUT}`} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                    {dictionary?.HEADER_title[2]}
                </Link>
                <Link href={`/${lang}${ROUTES.ESG}`} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                    {dictionary?.HEADER_title[3]}
                </Link>
                <Link href={`/${lang}${ROUTES.BLOG}`} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                    {dictionary?.HEADER_title[4]}
                </Link>
                <Link href={`/${lang}${ROUTES.CONTACT}`} className="text-[20px] text-[rgb(var(--quaternary-rgb))] font-bold px-4 py-2 rounded-lg hover:bg-[rgb(var(--quaternary-rgb))] hover:opacity-70 hover:text-white">
                    {dictionary?.HEADER_title[5]}
                </Link>
            </nav>
        </div>
    );
};
