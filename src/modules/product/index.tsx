'use client'

import { Product } from "@/components/global/product";
import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { NavMobile } from "@/layout/nav-mobile";
import { IMAGES } from "@/utils/image";
import { ROUTES } from "@/utils/route";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Share2, ArrowRightLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
}

export function ProductPage({ dictionary, lang }: { dictionary: any; lang: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);

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
                redirect: "follow" as RequestRedirect,
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/b68e20ce-4e9a-4d96-8c48-c28f61bdc4cb", requestOptions);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
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
            setProducts(transformedProducts.sort((a, b) => b.id - a.id));

            const uniqueCategories = Array.from(new Set(transformedProducts.map((p) => p.category)));
            setCategories(uniqueCategories);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((product) => product.category === category));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((product) => product.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
            <Header lang={lang} page="san-pham" dictionary={dictionary} />
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
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            {dictionary?.PRODUCT_breadcrumb_submain_1}
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">{dictionary?.DETAIL_PRODUCT_breadcrumb_submain_2}</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col lg:flex-row justify-between mt-8 gap-8 ">
                <div className="w-full lg:w-[22%] rounded-lg mb-6 lg:mb-0 md:min-h-[900px] lg:min-h-[900px]">
                    <h3 className="text-lg font-semibold mb-4">{dictionary?.PRODUCT_filter}</h3>
                    <ul className="space-y-2">
                        <li
                            className={`cursor-pointer py-2.5 px-4 rounded-md ${selectedCategory === "all" ? " bg-white text-gray-950 border font-medium" : "text-black"
                                }`}
                            onClick={() => handleFilterChange("all")}
                        >
                            {dictionary?.PRODUCT_all_products}
                        </li>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`hover:border-2 hover:bg-gray-100 uppercase cursor-pointer py-2.5 px-4 rounded-md ${selectedCategory === category ? " bg-white text-gray-950 border font-medium " : "text-black"
                                    }`}
                                onClick={() => handleFilterChange(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full lg:w-3/4">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse flex flex-col items-center">
                                    <div className="w-56 h-60 bg-gray-300 rounded-md mb-4"></div>
                                    <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link href={`/${lang}/san-pham/${product.id}`} key={product.id} className="relative group cursor-pointer rounded-lg">
                                    <div className="rounded-lg bg-gray-50 flex flex-col border-none">
                                        <div className="relative w-full h-[160px] md:h-[280px] lg:h-[280px] rounded-lg">
                                            <Image
                                                src={product.images[0]}
                                                alt={`${product.name} image`}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center p-3 text-start">
                                            <div className="text-lg font-bold mb-1 max-h-[28px] truncate">{product.name}</div>
                                            <div className="text-xs font-semibold text-gray-400 text-left mb-2 max-h-[32px] text-clip overflow-hidden">
                                                {product.description}
                                            </div>
                                            <div className="w-full grid grid-cols-5 items-center">
                                                <p className="col-span-3 max-h-[24px] text-md font-semibold text-left truncate">
                                                    {Intl.NumberFormat("de-DE").format(product.price)} VND
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 h-10 w-10 rounded-full bg-[#E97171] text-white text-[12px] font-semibold flex items-center justify-center">
                                        {dictionary?.HOME_new_tag}
                                    </div>
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                    <div className="absolute inset-0 w-full flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button className="w-2/3 mb-5 items-center font-bold rounded-sm bg-white opacity-100 text-[rgb(var(--quaternary-rgb))] hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate">
                                            {dictionary?.PRODUCT_button_detail}
                                        </Button>
                                        <div className="w-full p-3 flex flex-wrap justify-center items-center gap-2">
                                            <div className="flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer">
                                                <Share2 size={14} />
                                                {dictionary?.PRODUCT_button_share}
                                            </div>
                                            <div className="flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer">
                                                <ArrowRightLeft size={14} />
                                                {dictionary?.PRODUCT_button_compare}
                                            </div>
                                            <div className="flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer">
                                                <Heart size={14} />
                                                {dictionary?.PRODUCT_button_like}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer lang={lang} dictionary={dictionary} />
        </div>
    );
}
