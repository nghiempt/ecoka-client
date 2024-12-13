"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { truncateText } from "@/utils/helper";

interface BlogDetail {
  row: number;
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  s1_title: string;
  s1_content: string;
  s1_thumbnail: string;
  s2_title: string;
  s2_content: string;
  s2_thumbnail: string;
  s3_title: string;
  s3_content: string;
  s3_thumbnail: string;
}

const BlogDetailPage = ({ dictionary, lang }: { dictionary: any; lang: string }) => {
  const pathname = usePathname();
  const [currentData, setCurrentData] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlogs = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ method: "GET" });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      const res = await fetch("https://n8n.khiemfle.com/webhook/ff9f5835-275b-4ecb-a4be-0392ae325ca6", requestOptions);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      const transformedBlogs: BlogDetail[] = data.map((item: any) => ({
        row: item.row_number,
        id: item.id,
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        author: item.author,
        s1_title: item.s1_title,
        s1_content: item.s1_content,
        s1_thumbnail: item.s1_thumbnail,
        s2_title: item.s2_title,
        s2_content: item.s2_content,
        s2_thumbnail: item.s2_thumbnail,
        s3_title: item.s3_title,
        s3_content: item.s3_content,
        s3_thumbnail: item.s3_thumbnail,
      }));
      return transformedBlogs.sort((a, b) => b.id - a.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let id = 0;
      const regex = /\/bai-viet\/(\d+)/;
      const match = pathname.match(regex);
      const blogs = await fetchBlogs();
      if (match && match[1]) {
        id = parseInt(match[1], 10);
        blogs?.forEach((blog: BlogDetail) => {
          if (blog?.id === id) {
            setCurrentData(blog);
          }
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header page={`bai-viet`} lang={lang} dictionary={dictionary} />
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="w-full md:w-2/3 lg:w-2/3 bg-cover bg-center h-[250px] flex justify-center items-center md:rounded-lg lg:rounded-lg z-10"
            style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')` }}>
            <div className="w-full flex flex-col justify-center items-center text-white">
              <Image
                src={IMAGES.BANNER_LOGO}
                alt="Meubel House"
                width={50}
                height={50}
                className="text-center"
              />
              <h1 className="text-4xl font-semibold mb-2">{dictionary.BLOG_breadcrumb_main}</h1>
              <div className="flex gap-2 items-center">
                <Link href={`/${lang}`} className="font-semibold text-sm">{dictionary.PRODUCT_breadcrumb_submain_1}</Link>
                <ChevronRight size={20} />
                <Link href={`/${lang}/bai-viet`} className="font-semibold text-sm">{dictionary.BLOG_breadcrumb_submain_3}</Link>
                <ChevronRight size={20} />
                <h1 className="text-sm">{truncateText(currentData?.title || '', 12)}</h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3">
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                    {currentData?.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    {currentData?.description}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={currentData?.thumbnail || IMAGES.BLOG_01_MAIN}
                    alt="Main Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                  <Image
                    src={currentData?.s1_thumbnail || IMAGES.BLOG_01_MAIN}
                    alt="Section 1 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s1_title}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s1_content}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 flex flex-col justify-center items-start">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s2_title}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s2_content}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={currentData?.s2_thumbnail || IMAGES.BLOG_01_MAIN}
                    alt="Section 2 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                  <Image
                    src={currentData?.s3_thumbnail || IMAGES.BLOG_01_MAIN}
                    alt="Section 3 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s3_title}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s3_content}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
          <Footer dictionary={dictionary} />
        </>
      )}
    </div>
  );
};

export default BlogDetailPage;
