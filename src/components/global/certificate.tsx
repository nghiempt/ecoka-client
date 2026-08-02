"use client";

import { CertificateService } from "@/utils/api";
import { pickByLang } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Certificate {
  _id: string;
  name_vn: string;
  name_en: string;
  name_jp: string;
  icon: string;
  file: string;
  file_name: string;
}

// Chỉ dùng khi KHÔNG gọi được API. Nếu admin thật sự chưa có chứng nhận nào
// thì ẩn hẳn mục này, tránh việc web hiển thị dữ liệu mà admin không quản lý.
const FALLBACK_ICONS = [
  "https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/hhzrcqlvmhrylzwwqqi5.jpg",
  "https://res.cloudinary.com/farmcode/image/upload/v1732782449/ecoka/kypqpxwuqlrzivuqulfd.png",
  "https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/ccrn8pxro2oayevqrg4d.jpg",
  "https://res.cloudinary.com/farmcode/image/upload/v1732724892/ecoka/pjqmxyre74hfxhs7vras.png",
];

export function Certificates({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: any;
}) {
  // null = chưa gọi xong hoặc gọi API thất bại
  const [certificates, setCertificates] = useState<Certificate[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    CertificateService.getAll()
      .then((data) => {
        if (mounted) setCertificates(data as Certificate[] | null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Admin không có chứng nhận nào đang hiển thị -> ẩn hẳn mục này.
  if (!loading && certificates !== null && certificates.length === 0) {
    return null;
  }

  return (
    <div className="w-full pb-14 mt-10 flex flex-col justify-center items-center">
      <div className="w-full text-gray-800 text-3xl font-bold mb-8 text-center">
        {dictionary?.HOME_subtitle_2}
      </div>
      {loading ? (
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[110px] bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : certificates === null ? (
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {FALLBACK_ICONS.map((icon, index) => (
            <Image
              key={index}
              src={icon}
              alt="certificate"
              width={280}
              height={140}
              className="h-[110px] w-auto object-contain"
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-start gap-x-10 gap-y-8">
          {certificates.map((certificate) => {
            const name = pickByLang(certificate, "name", lang);
            const icon = (
              <div className="flex flex-col items-center gap-3 w-[200px]">
                <div className="h-[110px] w-full flex items-center justify-center">
                  <Image
                    src={certificate.icon}
                    alt={name || "certificate"}
                    width={280}
                    height={140}
                    className="h-[110px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                {name && (
                  <span className="text-sm text-center text-[rgb(var(--quaternary-rgb))] line-clamp-2">
                    {name}
                  </span>
                )}
              </div>
            );

            return certificate.file ? (
              <a
                key={certificate._id}
                href={certificate.file}
                target="_blank"
                rel="noreferrer"
                title={name}
                className="group cursor-pointer"
              >
                {icon}
              </a>
            ) : (
              <div key={certificate._id} className="group">
                {icon}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
