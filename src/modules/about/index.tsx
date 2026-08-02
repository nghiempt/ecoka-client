"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { NavMobile } from "@/layout/nav-mobile";
import { IMAGES } from "@/utils/image";
import { pickByLang } from "@/utils/helper";
import Image from "next/image";

interface AboutSection {
  title_vn: string;
  title_en: string;
  title_jp: string;
  content_vn: string;
  content_en: string;
  content_jp: string;
}

/**
 * Khi API chưa có dữ liệu thì dựng lại nội dung từ file ngôn ngữ để trang
 * không bị trống.
 */
const sectionsFromDictionary = (dictionary: any): AboutSection[] => {
  const build = (section: any): string => {
    if (!Array.isArray(section)) return "";
    // Mục "Quy mô & Cơ sở vật chất" có dạng [tiêu đề, [nhãn...], [giá trị...]]
    if (Array.isArray(section[1]) && Array.isArray(section[2])) {
      return section[1]
        .map(
          (label: string, index: number) =>
            `<p><strong>${label}:</strong> ${section[2][index] || ""}</p>`
        )
        .join("");
    }
    return `<p>${section[1] || ""}</p>`;
  };

  return [1, 2, 3, 4]
    .map((index) => dictionary?.[`ABOUT_section_${index}`])
    .filter(Boolean)
    .map((section: any) => ({
      title_vn: section[0],
      title_en: section[0],
      title_jp: section[0],
      content_vn: build(section),
      content_en: build(section),
      content_jp: build(section),
    }));
};

export function AboutPage({
  lang,
  dictionary,
  about,
}: {
  lang: string;
  dictionary: any;
  about?: any;
}) {
  const title = pickByLang(about, "title", lang) || dictionary?.ABOUT_title;
  const brief = pickByLang(about, "brief", lang) || dictionary?.ABOUT_brief;
  // Đã có bản ghi trong DB thì hiển thị đúng những gì admin đang thấy.
  // Chỉ khi chưa có bản ghi nào (hoặc API lỗi) mới dựng lại từ file ngôn ngữ.
  const sections: AboutSection[] = about
    ? Array.isArray(about.sections)
      ? about.sections
      : []
    : sectionsFromDictionary(dictionary);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header lang={lang} page={"ve-chung-toi"} dictionary={dictionary} />
      <NavMobile lang={lang} dictionary={dictionary} />
      <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center gap-10 mt-10 md:mt-0 lg:mt-0">
        {!about?.video && about?.banner ? (
          <Image
            src={about.banner}
            alt={title}
            width={1600}
            height={900}
            className="w-full max-h-[520px] object-cover rounded-lg"
            priority
          />
        ) : (
          <video
            key={about?.video || IMAGES?.VIDEO_ABOUT}
            className="w-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src={about?.video || IMAGES?.VIDEO_ABOUT}
              type="video/mp4"
            />
          </video>
        )}
        <div className="w-full h-1 bg-[rgb(var(--primary-rgb))]"></div>
        <div className="w-5/6 md:w-2/3 lg:w-2/3 text-center">
          <h1 className="text-4xl font-bold text-[rgb(var(--quaternary-rgb))] mb-5">
            {title}
          </h1>
          {brief && (
            <p className="text-lg text-justify text-[rgb(var(--quaternary-rgb))]">
              {brief}
            </p>
          )}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {sections.map((section, index) => (
            <div key={index} className="w-full text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                {pickByLang(section, "title", lang)}
              </h2>
              <div
                className="article-content text-md text-[rgb(var(--quaternary-rgb))]"
                dangerouslySetInnerHTML={{
                  __html: pickByLang(section, "content", lang),
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
      <Footer lang={lang} dictionary={dictionary} />
    </div>
  );
}
