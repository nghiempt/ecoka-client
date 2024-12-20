'use client'

import { Product } from "@/components/global/product"
import { Footer } from "@/layout/footer"
import { Header } from "@/layout/header"
import { NavMobile } from "@/layout/nav-mobile"
import { categories } from "@/utils/constant"
import { IMAGES } from "@/utils/image"
import { ROUTES } from "@/utils/route"
import { ChevronRight } from "lucide-react"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
};

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export function ProductByCategoryPage({ dictionary, lang }: { dictionary: any; lang: string }) {
    const pathname = usePathname();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<string>("");
    const [breadscumbCategory, setBreadscumbCategory] = useState<string>("");

    const fetchProducts = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                method: "GET",
                lang: lang
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/b68e20ce-4e9a-4d96-8c48-c28f61bdc4cb", requestOptions);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            const transformedProducts: Product[] = data.map((item: any) => ({
                row: item.row_number,
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                description: item.description,
                images: [
                    item.i_one,
                    item.i_two,
                    item.i_three,
                    item.i_four,
                    item.i_five,
                    item.i_six,
                ].filter((url) => url !== ""),
            }));
            return transformedProducts.sort((a, b) => b.id - a.id);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let id = 0;
            const regex = /\/san-pham\/([^/]+)/;
            const match = pathname.match(regex);
            const allProducts = await fetchProducts();
            if (match && match[1]) {
                const categoryPath = '/' + match[1];
                const category = categories.find((cate: any) => cate.path === `${categoryPath}`);
                const filteredProducts = allProducts?.filter((product: Product) => lang === "vi" ? (product.category === category?.name) : lang === "en" ? (product.category === category?.name_en) : lang === "jp" ? (product.category === category?.name_jp) : (product.category === category?.name));
                setCategory(category?.path ?? "");
                if (lang === "vi") {
                    setBreadscumbCategory(category.name);
                } else if (lang === "en") {
                    setBreadscumbCategory(category.name_en);
                }
                else if (lang === "jp") {
                    setBreadscumbCategory(category.name_jp);
                }
                setProducts(filteredProducts ?? []);
            }
            setLoading(false);
        };
        fetchData();
    }, [pathname]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header page={`san-pham${category}`} lang={lang} dictionary={dictionary} />
            <NavMobile lang={lang} dictionary={dictionary} />
            <div
                className="relative bg-cover bg-center h-[250px] w-full flex justify-center items-center text-white"
                style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725346/ecoka/ea06mx34c2bjgjqoggsf.png')` }}
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
                    <h1 className="text-4xl font-semibold mb-2">{dictionary?.PRODUCT_breadcrumb_main}</h1>
                    <div className="flex gap-2 items-center">
                        <Link href={`/${lang}${ROUTES.HOME}`} className="font-semibold text-sm">
                            {dictionary?.PRODUCT_breadcrumb_submain_1}
                        </Link>
                        <ChevronRight size={20} />
                        <Link href={`/${lang}${ROUTES.PRODUCT}`}>
                            <h1 className="text-sm">{dictionary?.DETAIL_PRODUCT_breadcrumb_submain_2}</h1>
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">{breadscumbCategory}</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center">
                <div className="w-full h-10 rounded-md bg-[rgb(var(--primary-rgb))] opacity-30 my-6"></div>
                <div className="w-full">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="animate-pulse flex flex-col items-center">
                                    <div className="w-56 h-60 bg-gray-300 rounded-md mb-4"></div>
                                    <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Product lang={lang} dictionary={dictionary} products={products} />
                    )}
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer lang={lang} dictionary={dictionary} />
        </div>
    )
}