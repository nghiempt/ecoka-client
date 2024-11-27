'use client'

import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { getAll } from "@/utils/api"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ESG {
    id: number;
    row: number;
    title: string;
    description: string;
    thumbnail: string;
}

export function ESGPage() {
    const [esgs, setEsgs] = useState<ESG[]>([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = "https://n8n.khiemfle.com/webhook/aa7f04f4-7833-49c2-8c86-7a043f4a8a5a";

    const fetchEsgs = async () => {
        try {
            const data = await getAll(apiUrl);
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
        fetchEsgs();
    }, []);

    function SkeletonLoader() {
        return (
            <div className="w-5/6 md:w-2/3 lg:w-2/3 py-10 animate-pulse">
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <div className="lg:w-1/2">
                        <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-5/6 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-full mb-4"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded-md my-6"></div>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                        <div className="w-64 h-40 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <div className="lg:w-1/2">
                        <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-5/6 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-full mb-4"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded-md my-6"></div>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                        <div className="w-64 h-40 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <div className="lg:w-1/2">
                        <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-5/6 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded-md w-full mb-4"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded-md my-6"></div>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                        <div className="w-64 h-40 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header />
            <NavMobile />
            <div className="bg-cover bg-center h-[250px] w-full flex justify-center items-center text-white"
                style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')` }}>
                <div className="w-full flex flex-col justify-center items-center">
                    <Image
                        src={IMAGES.BANNER_LOGO}
                        alt='img'
                        width={50}
                        height={50}
                        className="text-center"
                    />
                    <h1 className="text-4xl font-semibold mb-2">
                        ESG
                    </h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">ESG</h1>
                    </div>
                </div>
            </div>
            {loading ? (
                <SkeletonLoader />
            ) : (
                <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                    <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                    <section className="w-full py-10">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                                    {esgs[0].title}
                                </h2>
                                <p className="mt-4 text-lg text-gray-700">
                                    {esgs[0].description}
                                </p>
                                <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                                <Image
                                    src={esgs[0].thumbnail}
                                    alt="img"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </section>
                    {/* <section className="flex md:hidden lg:hidden w-full py-10">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                                    {esgs[1].title}
                                </h2>
                                <p className="mt-4 text-lg text-gray-700">
                                    {esgs[1].description}
                                </p>
                                <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                                <Image
                                    src={esgs[1].thumbnail}
                                    alt="img"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </section> */}
                    <section className="hidden md:flex lg:flex w-full py-10">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                                <Image
                                    src={esgs[1].thumbnail}
                                    alt="img"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                            <div className="lg:w-1/2 mt-10 md:mt-0 lg:mt-0">
                                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                                    {esgs[1].title}
                                </h2>
                                <p className="mt-4 text-lg text-gray-700">
                                    {esgs[1].description}
                                </p>
                                <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full py-10">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                                    {esgs[2].title}
                                </h2>
                                <p className="mt-4 text-lg text-gray-700">
                                    {esgs[2].description}
                                </p>
                                <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                                <Image
                                    src={esgs[2].thumbnail}
                                    alt="img"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </section>
                </div>)}
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    )
}
