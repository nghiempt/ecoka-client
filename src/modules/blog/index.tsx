'use client';

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { NavMobile } from "@/layout/nav-mobile";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
    row: number;
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    date: string;
};

export function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const formatDateTime = (dateString: string | undefined) => {
        const date = dateString ? new Date(dateString) : new Date();
        const formattedDate = date.toLocaleDateString('vi-VN');
        const formattedTime = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} - ${formattedTime}`;
    };

    const fetchBlogs = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                method: "GET",
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect,
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/ff9f5835-275b-4ecb-a4be-0392ae325ca6", requestOptions);
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
        fetchBlogs();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header />
            <NavMobile />
            <div className="bg-cover bg-center h-[250px] w-full flex justify-center items-center text-white"
                style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')` }}>
                <div className="w-full flex flex-col justify-center items-center">
                    <Image
                        src={IMAGES.BANNER_LOGO}
                        alt="img"
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
                <div className="w-full">
                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse flex flex-col items-start">
                                    <div className="w-full h-[240px] bg-gray-300 rounded-md mb-4"></div>
                                    <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
                                    <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <Link key={blog.row} href={`/bai-viet/${blog.id}`}>
                                    <div className="flex flex-col items-start justify-center gap-2 hover:opacity-80 cursor-pointer">
                                        <div className="relative w-full h-[240px] rounded-lg">
                                            <Image
                                                src={blog.thumbnail}
                                                alt="img"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <h1 className="text-[13px] font-medium mt-1">{blog.date}</h1>
                                        <h1 className="w-full text-[16px] font-semibold max-h-[48px] line-clamp-2">{blog.title}</h1>
                                        <h1 className="text-[14px] font-medium bg-[rgb(var(--secondary-rgb))] rounded-md px-2 py-1">Tác giả: {blog.author}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    );
}
