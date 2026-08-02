'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { IMAGES } from "@/utils/image"
import { pickByLang } from "@/utils/helper"
import Image from "next/image"

export function AboutPage({ lang, dictionary, about }: { lang: string; dictionary: any; about?: any }) {
    const title = pickByLang(about, "title", lang) || dictionary?.ABOUT_title
    const brief = pickByLang(about, "brief", lang) || dictionary?.ABOUT_brief
    const content = pickByLang(about, "content", lang)
    const hasContent = Boolean(content && content.replace(/<[^>]*>/g, "").trim())

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header lang={lang} page={"ve-chung-toi"} dictionary={dictionary} />
            <NavMobile lang={lang} dictionary={dictionary} />
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center gap-10 mt-10 md:mt-0 lg:mt-0">
                {about?.banner && !about?.video ? (
                    <Image
                        src={about.banner}
                        alt={title}
                        width={1600}
                        height={900}
                        className="w-full max-h-[520px] object-cover rounded-lg"
                        priority
                    />
                ) : (
                    <video className="w-full object-cover rounded-lg" autoPlay loop muted>
                        <source src={about?.video || IMAGES?.VIDEO_ABOUT} type="video/mp4" />
                    </video>
                )}
                <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
                <div className="w-5/6 md:w-2/3 lg:w-2/3 text-center">
                    <h1 className="text-4xl font-bold text-[rgb(var(--quaternary-rgb))] mb-5">{title}</h1>
                    {brief && (
                        <p className="text-lg text-justify text-[rgb(var(--quaternary-rgb))]">
                            {brief}
                        </p>
                    )}
                </div>
                {hasContent ? (
                    <div
                        className="w-full article-content text-[rgb(var(--quaternary-rgb))]"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                ) : (
                    <>
                        <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_1[0]}</h1>
                                <p className="text-md text-justify text-[rgb(var(--quaternary-rgb))]">
                                    {dictionary?.ABOUT_section_1[1]}
                                </p>
                            </div>
                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_2[0]}</h1>
                                <p className="text-md text-justify text-[rgb(var(--quaternary-rgb))]">
                                    {dictionary?.ABOUT_section_2[1]}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center items-start gap-10">
                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_3[0]}</h1>
                                <p className="text-md text-justify text-[rgb(var(--quaternary-rgb))]">
                                    {dictionary?.ABOUT_section_3[1]}
                                </p>
                            </div>
                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-5">{dictionary?.ABOUT_section_4[0]}</h1>
                                <p className="text-md text-justify text-[rgb(var(--quaternary-rgb))]">
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
                    </>
                )}
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer lang={lang} dictionary={dictionary} />
        </div>
    )
}
