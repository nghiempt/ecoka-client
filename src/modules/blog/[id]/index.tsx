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
import { BlogService } from "@/services/blog";

interface BlogDetail {
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

const BlogDetailPage = ({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: string;
}) => {
  const pathname = usePathname();
  const [currentData, setCurrentData] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const render = (data: any) => {
    setCurrentData(data);
    setLoading(false);
  };

  const init = async () => {
    const segments = pathname.split("/").filter(Boolean);
    const id = segments[segments.length - 1];

    const res = await BlogService.getBlogById(id);

    if (res) {
      render(res.data);
      setLoading(false);
      console.log("========= Blog Detail:kkk");
    } else {
      setCurrentData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header
        page={`bai-viet/${currentData?._id}`}
        lang={lang}
        dictionary={dictionary}
      />
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full bg-cover bg-center h-[250px] flex justify-center items-center z-10"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725270/ecoka/xzv2x6cxsflrtzwojc4j.png')`,
            }}
          >
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="relative w-full flex flex-col justify-center items-center text-white">
              <Image
                src={IMAGES?.BANNER_LOGO}
                alt="Meubel House"
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
                <Link
                  href={`/${lang}/bai-viet`}
                  className="font-semibold text-sm"
                >
                  {dictionary?.BLOG_breadcrumb_submain_3}
                </Link>
                <ChevronRight size={20} />
                <h1 className="text-sm">
                  {truncateText(currentData?.s1_title_vn || "", 12)}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3">
            <section className="w-full py-10">
              <div className="w-full flex flex-col gap-5 lg:flex-row items-center justify-center">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                    {currentData?.s1_title_vn}
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    {currentData?.s2_content_vn}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={
                      currentData?.s1_thumbnail ||
                      "https://res.cloudinary.com/farmcode/image/upload/v1729695322/ecoka/ecoka-esg-manage_fagyf9.jpg"
                    }
                    alt="Main Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col gap-5 lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                  <Image
                    src={
                      currentData?.s2_thumbnail ||
                      "https://res.cloudinary.com/farmcode/image/upload/v1729695322/ecoka/ecoka-esg-manage_fagyf9.jpg"
                    }
                    alt="Section 1 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s2_title_vn}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s2_content_vn}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col gap-5 lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 flex flex-col justify-center items-start">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s3_title_vn}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s3_content_vn}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={
                      currentData?.s3_thumbnail ||
                      "https://res.cloudinary.com/farmcode/image/upload/v1729695322/ecoka/ecoka-esg-manage_fagyf9.jpg"
                    }
                    alt="Section 2 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col gap-5 lg:flex-row items-center justify-center">
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-start items-center">
                  <Image
                    src={
                      currentData?.s4_thumbnail ||
                      "https://res.cloudinary.com/farmcode/image/upload/v1729695322/ecoka/ecoka-esg-manage_fagyf9.jpg"
                    }
                    alt="Section 3 Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {currentData?.s4_title_vn}
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    {currentData?.s4_content_vn}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
          <Footer lang={lang} dictionary={dictionary} />
        </>
      )}
    </div>
  );
};

export default BlogDetailPage;
