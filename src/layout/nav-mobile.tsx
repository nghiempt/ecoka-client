import Link from "next/link"
import { ROUTES } from "@/utils/route"
import { ContactRound, FileMinus, GlobeLock, House, Package, Users } from "lucide-react"

export const NavMobile = ({ lang, dictionary }: { lang: any, dictionary: any }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center fixed bottom-0 z-20">
            <nav className="w-full bg-white border shadow md:hidden lg:hidden flex flex-row justify-center items-center gap-6 p-4">
                <Link
                    href={`/${lang}${ROUTES.HOME}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <House size={28} />
                    {dictionary?.HEADER_title[0]}
                </Link>
                <Link
                    href={`/${lang}${ROUTES.PRODUCT}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <Package size={28} />
                    {dictionary?.HEADER_title[1]}
                </Link>
                <Link
                    href={`/${lang}${ROUTES.ABOUT}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <Users size={28} />
                    {dictionary?.HEADER_title[2]}
                </Link>
                <Link
                    href={`/${lang}${ROUTES.ESG}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <GlobeLock size={28} />
                    {dictionary?.HEADER_title[3]}
                </Link>
                <Link
                    href={`/${lang}${ROUTES.BLOG}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <FileMinus size={28} />
                    {dictionary?.HEADER_title[4]}
                </Link>
                <Link
                    href={`/${lang}${ROUTES.CONTACT}`}
                    className="text-[8px] text-[rgb(var(--quaternary-rgb))] font-medium text-center flex flex-col justify-center items-center gap-1"
                >
                    <ContactRound size={28} />
                    {dictionary?.HEADER_title[5]}
                </Link>
            </nav>
        </div>
    )
}