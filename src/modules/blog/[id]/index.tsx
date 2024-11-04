"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { truncateText } from "@/utils/helper";

const ProductDetailPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header />
      {false ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="w-full md:w-2/3 lg:w-2/3 bg-cover bg-center h-[250px] flex justify-center items-center md:rounded-lg lg:rounded-lg z-10"
            style={{ backgroundImage: `url('/breadcrumb.png')` }}>
            <div className="w-full flex flex-col justify-center items-center">
              <Image
                src={IMAGES.BANNER_LOGO}
                alt='Meubel House'
                width={50}
                height={50}
                className="text-center"
              />
              <h1 className="text-4xl font-semibold mb-2">BÀI VIẾT</h1>
              <div className="flex gap-2 items-center">
                <Link href="/" className="font-semibold text-sm">Trang chủ</Link>
                <ChevronRight size={20} />
                <Link href="/product" className="font-semibold text-sm">Bài viết</Link>
                <ChevronRight size={20} />
                <h1 className="text-sm">{truncateText('ECOKA chia sẻ hành trình', 12)}</h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3">
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-[rgb(var(--primary-rgb))] leading-tight">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={IMAGES.BLOG_01_MAIN}
                    alt="img"
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
                    src={IMAGES.BLOG_01_MAIN}
                    alt="img"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-600 leading-tight">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
            <section className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="lg:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-600 leading-tight">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={IMAGES.BLOG_01_MAIN}
                    alt="img"
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
                    src={IMAGES.BLOG_01_MAIN}
                    alt="img"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center items-end text-right">
                  <h2 className="text-2xl font-bold text-gray-600 leading-tight">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </h2>
                  <p className="mt-4 text-md text-gray-700">
                    ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ. ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT Cần Thơ
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
              </div>
            </section>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;