'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { IMAGES } from "@/utils/image"

export function AboutPage({ lang, dictionary }: { lang: string; dictionary: any }) {
    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header lang={lang} page={"ve-chung-toi"} dictionary={dictionary} />
            <NavMobile lang={lang} dictionary={dictionary} />
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center gap-10 mt-10 md:mt-0 lg:mt-0">
                <video className="w-full object-cover rounded-lg" autoPlay loop muted>
                    <source src={IMAGES?.VIDEO_ABOUT} type="video/mp4" />
                </video>
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-5/6 md:w-2/3 lg:w-2/3 text-center">
                    <h1 className="text-4xl font-bold text-[rgb(var(--quaternary-rgb))] mb-5">{dictionary?.ABOUT_title}</h1>
                    <p className="text-lg text-[rgb(var(--quaternary-rgb))]">
                        {dictionary?.ABOUT_brief}
                    </p>
                </div>
                <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_1[0]}</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            {dictionary?.ABOUT_section_1[1]}
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_2[0]}</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            {dictionary?.ABOUT_section_2[1]}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_3[0]}</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            {dictionary?.ABOUT_section_3[1]}
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_4[0]}</h1>
                        <p className="text-md text-[rgb(var(--quaternary-rgb))]">
                            <strong>{dictionary?.ABOUT_section_4[1][0]}:</strong> {dictionary?.ABOUT_section_4[2][0]}
                            <br />
                            <strong>{dictionary?.ABOUT_section_4[1][1]}:</strong> {dictionary?.ABOUT_section_4[2][1]}
                            <br />
                            <strong>{dictionary?.ABOUT_section_4[1][2]}:</strong> {dictionary?.ABOUT_section_4[2][2]}
                            <br />
                            <strong>{dictionary?.ABOUT_section_4[1][3]}:</strong> {dictionary?.ABOUT_section_4[2][3]}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer dictionary={dictionary} />
        </div>
    )
}
