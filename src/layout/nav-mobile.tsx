import Link from "next/link"
import { ROUTES } from "@/utils/route"
import { ContactRound, FileMinus, GlobeLock, House, Package, Users } from "lucide-react"

export const NavMobile = ({ dictionary }: { dictionary: any }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center fixed bottom-0 z-20">
            <nav className="w-full bg-white border shadow md:hidden lg:hidden flex flex-row justify-center items-center gap-6 pb-2 pt-4">
                <Link
                    href={ROUTES.HOME}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <House size={16} />
                    {dictionary.HEADER_title[0]}
                </Link>
                <Link
                    href={ROUTES.PRODUCT}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <Package size={16} />
                    {dictionary.HEADER_title[1]}
                </Link>
                <Link
                    href={ROUTES.ABOUT}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <Users size={16} />
                    {dictionary.HEADER_title[2]}
                </Link>
                <Link
                    href={ROUTES.ESG}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <GlobeLock size={16} />
                    {dictionary.HEADER_title[3]}
                </Link>
                <Link
                    href={ROUTES.BLOG}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <FileMinus size={16} />
                    {dictionary.HEADER_title[4]}
                </Link>
                <Link
                    href={ROUTES.CONTACT}
                    className="text-[10px] text-[rgb(var(--quaternary-rgb))] font-medium flex flex-col justify-center items-center gap-1"
                >
                    <ContactRound size={16} />
                    {dictionary.HEADER_title[5]}
                </Link>
            </nav>
        </div>
    )
}