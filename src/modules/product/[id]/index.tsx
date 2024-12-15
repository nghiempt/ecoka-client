"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaStar, FaYoutube } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { truncateText } from "@/utils/helper";
import { Product } from "@/components/global/product";

export interface Color {
  color: string,
  bg: string
}

interface Product {
  row: number;
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
};

const ProductDetailPage = ({ dictionary, lang }: { dictionary: any; lang: string }) => {
  const pathname = usePathname();
  const [currentData, setCurrentData] = useState<Product>({} as Product);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const sizes = ["L", "XL", "XS"];
  const colors: Color[] = [
    { color: "purple-600", bg: "bg-purple-600" },
    { color: "black", bg: "bg-black" },
    { color: "yellow-500", bg: "bg-yellow-500" },
  ];

  const fetchProducts = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ method: "GET", lang: lang });

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

      console.log("check data: ", data)
      return transformedProducts.sort((a, b) => b.id - a.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = (amount: number) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let id = 0;
      const regex = /\/san-pham\/(\d+)/;
      const match = pathname.match(regex);
      const products = await fetchProducts();
      if (match && match[1]) {
        id = parseInt(match[1], 10);
        products?.forEach((product: Product) => {
          if (product?.id === id) {
            const filteredProducts = products.filter(p => p.category === product?.category);
            setRelatedProducts(filteredProducts);
            setCurrentData(product);
          }
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header page={`san-pham/${currentData?.id}`} lang={lang} dictionary={dictionary} />
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="relative w-full bg-cover bg-center h-[250px] flex justify-center items-center z-10"
            style={{ backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725346/ecoka/ea06mx34c2bjgjqoggsf.png')` }}>
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="relative w-full flex flex-col justify-center text-white items-center">
              <Image
                src={IMAGES?.BANNER_LOGO}
                alt='Meubel House'
                width={50}
                height={50}
                className="text-center"
              />
              <h1 className="text-4xl font-semibold mb-2">{dictionary?.PRODUCT_breadcrumb_main}</h1>
              <div className="flex gap-2 items-center">
                <Link href={`/${lang}`} className="font-semibold text-sm">{dictionary?.PRODUCT_breadcrumb_submain_1}</Link>
                <ChevronRight size={20} />
                <Link href={`/${lang}/san-pham`} className="font-semibold text-sm">{dictionary?.DETAIL_PRODUCT_breadcrumb_submain_2}</Link>
                <ChevronRight size={20} />
                <h1 className="text-sm">{truncateText(currentData?.name, 12)}</h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center z-10">
            <div className="w-full flex flex-col items-center bg-white">
              <div className="flex flex-col md:flex-row w-full max-w-6xl p-4 mt-5 space-y-6 md:space-y-0">
                <div className="flex md:flex-row flex-col-reverse items-start md:space-x-4">
                  <div className="flex md:flex-col flex-row md:space-y-4 mt-2 space-x-2 md:space-x-0 overflow-x-auto">
                    {currentData.images?.map((src: any, index: any) => (
                      <Image
                        key={index}
                        src={currentData?.images[index]}
                        alt="img"
                        width={80}
                        height={80}
                        className="rounded-lg cursor-pointer flex-shrink-0"
                        onClick={() => handleThumbnailClick(currentData?.images[index])}
                      />
                    ))}
                  </div>
                  <div className="w-full flex justify-center mt-2 mb-6 md:mb-0 lg:mb-0">
                    <Image
                      src={mainImage || currentData?.images[0]}
                      alt="img"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 space-y-6 md:ml-20">
                  <h1 className="text-2xl font-bold text-center md:text-left">
                    {currentData?.name}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 font-semibold text-center md:text-left">
                    {Intl.NumberFormat('de-DE').format(currentData?.price)} VND
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                    <div className="border-l-2 h-6 mx-2 md:mx-4 border-gray-300"></div>
                    <p className="text-sm text-gray-600">99 {dictionary?.DETAIL_PRODUCT_rating}</p>
                  </div>
                  <p className="text-gray-600 text-center md:text-left">
                    {currentData?.description}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                      {dictionary?.DETAIL_PRODUCT_size}
                    </h3>
                    <div className="flex justify-center md:justify-start space-x-2 mt-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant="outline"
                          size="sm"
                          className={`px-4 ${activeSize === size
                            ? "bg-[#B88E2F] text-white"
                            : "bg-white text-black"
                            }`}
                          onClick={() => setActiveSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-center md:text-left">
                      {dictionary?.DETAIL_PRODUCT_color}
                    </h3>
                    <div className="flex justify-center md:justify-start space-x-2 mt-2">
                      {colors.map((colorObj) => (
                        <Button
                          key={colorObj.color}
                          aria-label={`Select color ${colorObj.color}`}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedColor(colorObj.color)}
                          className={`w-8 h-8 ${colorObj.bg} rounded-full ${selectedColor === colorObj.color
                            ? "border-2 border-[#B88E2F]"
                            : "border border-transparent"
                            } hover:${colorObj.bg} focus:${colorObj.bg}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-4">
                    <div className="flex items-center justify-center md:justify-start border border-gray-300 rounded-full px-3 py-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-none text-lg"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        -
                      </Button>
                      <p className="px-3 text-lg">{quantity}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-none text-lg"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-4">
                      <Button
                        variant="outline"
                        className="border-black border-2  px-6 py-2 w-full md:w-auto font-semibold"
                      >
                        {dictionary?.DETAIL_PRODUCT_cart}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-black border-2  px-6 py-2 w-full md:w-auto font-semibold"
                      >
                        {dictionary?.DETAIL_PRODUCT_get_quote}
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="text-sm text-gray-600 mt-4 space-y-2">
                    <div className="flex items-center">
                      <p className="w-24 font-semibold">{dictionary?.DETAIL_PRODUCT_sub_description_1}:</p>
                      <p>Thời trang</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-24 font-semibold">{dictionary?.DETAIL_PRODUCT_sub_description_2}:</p>
                      <p>Việt Nam</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-24 font-semibold">{dictionary?.DETAIL_PRODUCT_sub_description_3}:</p>
                      <p>Da</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-24 font-semibold">{dictionary?.DETAIL_PRODUCT_sub_description_origin}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="p-1 border-none">
                          <FaFacebook className="text-lg" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-1 border-none">
                          <SiShopee className="text-lg" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-1 border-none">
                          <FaYoutube className="text-lg" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-1 bg-[rgb(var(--primary-rgb))] mt-16"></div>
              <div className="w-full flex flex-col justify-start items-start mt-8">
                <div className="text-2xl font-bold text-left mb-8">{dictionary?.DETAIL_PRODUCT_subtitle_1}</div>
                <div className="w-full z-10">
                  <Product lang={lang} dictionary={dictionary} products={relatedProducts} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
          <Footer dictionary={dictionary} />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;