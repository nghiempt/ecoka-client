"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { NavMobile } from "@/layout/nav-mobile";
import { BlogService } from "@/services/blog";
import { DATA } from "@/utils/data.bk";
import { formatDate } from "@/utils/helper";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  author: string;
  s1_title_vn: string;
  s1_title_en: string;
  s1_title_jp: string;
  s1_content_vn: string;
  s1_content_en: string;
  s1_content_jp: string;
  s1_thumbnail: string;
  s2_title_vn: string;
  s2_title_en: string;
  s2_title_jp: string;
  s2_content_vn: string;
  s2_content_en: string;
  s2_content_jp: string;
  s2_thumbnail: string;
  s3_title_vn: string;
  s3_title_en: string;
  s3_title_jp: string;
  s3_content_vn: string;
  s3_content_en: string;
  s3_content_jp: string;
  s3_thumbnail: string;
  s4_content_en: string;
  s4_content_jp: string;
  s4_content_vn: string;
  s4_thumbnail: string;
  s4_title_en: string;
  s4_title_jp: string;
  s4_title_vn: string;
  created_at: string;
}

export function BlogPage({ lang, dictionary }: { lang: any; dictionary: any }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const render = (data: any) => {
    setBlogs(data);
    setLoading(false);
  };

  const init = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      render(res.data);
      setLoading(false);
    } else {
      setBlogs([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header lang={lang} page={"bai-viet"} dictionary={dictionary} />
      <NavMobile lang={lang} dictionary={dictionary} />
      <div
        className="relative bg-cover bg-center h-[250px] w-full flex justify-center items-center text-white"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="relative w-full flex flex-col justify-center items-center">
          <Image
            src={IMAGES?.BANNER_LOGO}
            alt="img"
            width={50}
            height={50}
            className="text-center"
          />
          <h1 className="text-4xl font-semibold mb-2">
            {dictionary?.BLOG_breadcrumb_main}
          </h1>
          <div className="flex gap-2 items-center">
            <Link href={`/${lang}`} className="font-semibold text-sm">
              {dictionary?.PRODUCT_breadcrumb_submain_1}
            </Link>
            <ChevronRight size={20} />
            <h1 className="text-sm">{dictionary?.BLOG_breadcrumb_submain_3}</h1>
          </div>
        </div>
      </div>
      <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
        <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-start"
                >
                  <div className="w-full h-[240px] bg-gray-300 rounded-md mb-4"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {blogs?.map((blog) => (
                <Link key={blog?._id} href={`/${lang}/bai-viet/${blog?._id}`}>
                  <div className="flex flex-col items-start justify-center gap-2 hover:opacity-80 cursor-pointer">
                    <div className="relative w-full h-[240px] rounded-lg">
                      <Image
                        src={blog?.s1_thumbnail}
                        alt="img"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg"
                      />
                    </div>
                    <h1 className="text-[13px] font-medium mt-1">
                      {formatDate(blog?.created_at)}
                    </h1>
                    <h1 className="w-full text-[16px] font-semibold max-h-[48px] line-clamp-2">
                      {blog?.s1_title_vn}
                    </h1>
                    <h1 className="text-[14px] font-medium bg-[rgb(var(--secondary-rgb))] rounded-md px-2 py-1">
                      {dictionary?.HOME_blog_author}: {blog?.author}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
