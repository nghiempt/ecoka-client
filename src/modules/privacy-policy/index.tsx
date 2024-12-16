'use client'

import { languages } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function PrivacyPolicyPage({ lang, dictionary }: {
  lang: string, dictionary: any
}) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentLang, setCurrentLang] = useState(() =>
    languages.find((l) => l.lang === lang) || languages[0]
  );

  const handleLanguageChange = (lang: string) => {
    const selectedLang = languages.find((l) => l.lang === lang);
    if (selectedLang) {
      setCurrentLang(selectedLang);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="flex flex-row justify-around items-center py-3 shadow-lg">
        <div>
          <Link href={`/${lang}/`}>
            <Image src={IMAGES?.LOGO} alt="logo" width={180} height={150} />
          </Link>
        </div>
        <div className="flex flex-row gap-7 pr-24">
          <Link href={`#`}>
            <p>{dictionary?.FOOTER_section_5[4]}</p>
          </Link>
          <div className="relative group cursor-pointer">
            <div>{dictionary?.FOOTER_section_5[1]}</div>
            <div className="absolute -left-10 top-5 mt-1 hidden w-max rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md group-hover:block z-30">
              <p>
                {lang === "vi" ? "Đang phát triển" : lang === "en" ? "Developing" : lang === "jp" ? "現像" : ""}
              </p>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div>{dictionary?.FOOTER_section_5[2]}</div>
            <div className="absolute left-0 top-5 mt-1 hidden w-max rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md group-hover:block z-30">
              <p>
                {lang === "vi" ? "Đang phát triển" : lang === "en" ? "Developing" : lang === "jp" ? "現像" : ""}
              </p>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div>{dictionary?.FOOTER_section_5[3]}</div>
            <div className="absolute left-0 top-5 mt-1 hidden w-max rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md group-hover:block z-30">
              <p>
                {lang === "vi" ? "Đang phát triển" : lang === "en" ? "Developing" : lang === "jp" ? "現像" : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div onClick={toggleDropdown} className="px-2 py-1 flex flex-row justify-center items-center gap-1 bg-opacity-60 bg-white cursor-pointer rounded-lg">
            <Image className="" src={currentLang.flag} alt={currentLang.label} width={23} height={23} />
            <div className={`transition-transform duration-300  ${isOpen ? "" : "-rotate-90"} mt-1`}>
              <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="black" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          {isOpen && (
            <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-opacity-80 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              {languages
                .filter(({ lang }) => lang !== currentLang.lang)
                .map(({ lang, label, flag }) => (
                  <Link href={`/${lang}/${ROUTES?.PRIVACY_POLICY}`}>
                    <li key={lang} className="flex justify-center m-3" onClick={() => handleLanguageChange(lang)}>
                      <Image src={flag} alt={label} width={23} height={23} />
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="">
        <div className="flex justify-center items-center py-16 text-3xl font-extrabold">
          {dictionary?.PRIVACY_POLICY_title}
        </div>

        <div className="px-40 flex flex-col">
          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[0]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[0]}</div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[1]}</div>
            <div className="text-justify text-gray-500">
              {dictionary?.PRIVACY_POLICY_content[1]}
            </div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[2]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[2]}</div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[3]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[3]}</div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[4]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[4]}</div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[5]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[5]}</div>
          </div>

          <div className="mb-10 text-md">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[6]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[6]}</div>
          </div>

          <div className="mb-20">
            <div className="font-semibold text-lg mb-2">{dictionary?.PRIVACY_POLICY_subtitle[7]}</div>
            <div className="text-justify text-gray-500">{dictionary?.PRIVACY_POLICY_content[7]}</div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 flex flex-col md:flex-row lg:flex-row justify-center items-center text-gray-400 gap-2 py-2 border-t border-t-gray-300 bg-white">
        <div className="flex justify-center items-center gap-2 text-[8px] md:text-[14px] lg:text-[14px]">
          <div>
            Copyright © 2024 ECOKA HANDICRAFTS
          </div>
          <div>|</div>
          <div>
            All Rights Reserved
          </div>
          <div>|</div>
        </div>
        <div className="flex justify-center items-center gap-2 text-[8px] md:text-[14px] lg:text-[14px]">
          <Link href={'https://nghiempt.github.io'} className="text-gray-500" target="_blank">
            Powered by <strong>Nghiem Thanh Pham</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}