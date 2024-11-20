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

interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
}

export function ProductPage() {
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
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect,
            };

            const res = await fetch("https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64", requestOptions);
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

            // Extract unique categories
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
            <Header />
            <NavMobile />
            <div
                className="bg-cover bg-center h-[250px] w-full md:w-2/3 lg:w-2/3 flex justify-center items-center md:rounded-lg lg:rounded-lg"
                style={{ backgroundImage: `url('/breadcrumb.png')` }}
            >
                <div className="w-full flex flex-col justify-center items-center">
                    <Image
                        src={IMAGES.BANNER_LOGO}
                        alt="img"
                        width={50}
                        height={50}
                        className="text-center"
                    />
                    <h1 className="text-4xl font-semibold mb-2">SẢN PHẨM</h1>
                    <div className="flex gap-2 items-center">
                        <Link href={ROUTES.HOME} className="font-semibold text-sm">
                            Trang chủ
                        </Link>
                        <ChevronRight size={20} />
                        <h1 className="text-sm">Sản phẩm</h1>
                    </div>
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col lg:flex-row mt-8 gap-8">
                <div className="w-full lg:w-1/5 rounded-lg mb-6 lg:mb-0">
                    <h3 className="text-lg font-semibold mb-4">Lọc theo danh mục</h3>
                    <ul className="space-y-3">
                        <li
                            className={`cursor-pointer py-2.5 px-4 rounded-md ${selectedCategory === "all" ? " bg-white text-gray-950 shadow-lg font-medium" : "text-black"
                                }`}
                            onClick={() => handleFilterChange("all")}
                        >
                            Tất Cả Sản Phẩm
                        </li>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`cursor-pointer py-2.5 px-4 rounded-md ${selectedCategory === category ? " bg-white text-gray-950 shadow-lg font-medium " : "text-black"
                                    }`}
                                onClick={() => handleFilterChange(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full lg:w-4/5">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="animate-pulse flex flex-col items-center">
                                    <div className="w-32 h-32 bg-gray-300 rounded-md mb-4"></div>
                                    <div className="w-24 h-4 bg-gray-300 rounded-md mb-2"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Product products={filteredProducts} />
                    )}
                </div>
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
            <Footer />
        </div>
    );
}
