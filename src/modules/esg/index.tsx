"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { NavMobile } from "@/layout/nav-mobile";
import { ESGService } from "@/services/esg";
import { getAll } from "@/utils/api";
import { DATA } from "@/utils/data.bk";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ESG {
  _id: string;
  name_vn: string;
  name_en: string;
  name_jp: string;
  thumbnail: string;
  description_vn: string;
  description_en: string;
  description_jp: string;
}

export function ESGPage({ lang, dictionary }: { lang: any; dictionary: any }) {
  const [esgs, setEsgs] = useState([] as ESG[]);
  const [loading, setLoading] = useState(true);

  const render = (data: any) => {
    setEsgs(data);
    setLoading(false);
  };

  const init = async () => {
    const res = await ESGService.getAll();
    if (res && res.data.length > 0) {
      render(res.data);
      setLoading(false);
    } else {
      setEsgs([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
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
      <Header lang={lang} page={"esg"} dictionary={dictionary} />
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
          <h1 className="text-4xl font-semibold mb-2">ESG</h1>
          <div className="flex gap-2 items-center">
            <Link
              href={`/${lang}${ROUTES.HOME}`}
              className="font-semibold text-sm"
            >
              {dictionary?.PRODUCT_breadcrumb_submain_1}
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
          {esgs?.map((esg: any) => (
            <section key={esg.id} className="w-full py-10">
              <div className="w-full flex flex-col lg:flex-row items-center lg:gap-7 justify-center">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                    {lang === "vi"
                      ? esg?.name_vn
                      : lang === "en"
                      ? esg?.name_en
                      : esg?.name_jp}
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    {lang === "vi"
                      ? esg?.description_vn
                      : lang === "en"
                      ? esg?.description_en
                      : esg?.description_jp}
                  </p>
                  <div className="w-1/2 h-4 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center">
                  <Image
                    src={esg?.thumbnail}
                    alt="img"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
      <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
