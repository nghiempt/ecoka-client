"use client"

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/utils/route";
import { IMAGES } from "@/utils/image";
import { categories, languages, URL } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";

export const Header = ({ page, lang, dictionary }: { page: string; lang: string; dictionary: any }) => {

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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full bg-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                <div className="w-2/3 py-6 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <h1 className="text-[16px] text-white font-semibold">ECOKA HANDICRAFTS</h1>
                    <div className="hidden lg:flex items-center justify-center gap-4">
                        <Link href={URL?.FACEBOOK} target="_blank">
                            <Image className="rounded-sm" src={IMAGES.FACEBOOK} alt="fb" width={23} height={23} />
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

                        {/* <Link href={`/vi/${page}`}>
                            <Image src={IMAGES?.FLAG_VI} alt="Vietnamese" width={21} height={21} />
                        </Link>
                        <Link href={`/en/${page}`}>
                            <Image src={IMAGES?.FLAG_EN} alt="English" width={21} height={21} />
                        </Link>
                        <Link href={`/jp/${page}`}>
                            <Image src={IMAGES?.FLAG_JP} alt="Japanese" width={21} height={21} />
                        </Link> */}

                        <div className="relative" ref={dropdownRef}>
                            <div onClick={toggleDropdown} className="px-2 py-1 flex flex-row justify-center items-center gap-1 bg-opacity-60 bg-white cursor-pointer rounded-lg">
                                <Image className="" src={currentLang.flag} alt={currentLang.label} width={23} height={23} />
                                <div className={`transition-transform duration-300  ${isOpen ? "" : "-rotate-90"} mt-1`}>
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
                                            <Link href={`/${lang}/${page}`}>
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
