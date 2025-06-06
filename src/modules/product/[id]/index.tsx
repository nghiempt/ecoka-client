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
import { formatCurrency, truncateText } from "@/utils/helper";
import { Product } from "@/components/global/product";

export interface Color {
  color: string;
  bg: string;
}

interface Product {
  _id: string;
  main_image: string;
  side_images: string[];
  vietnam_name: string;
  english_name: string;
  japan_name: string;
  vietnam_description: string;
  english_description: string;
  japan_description: string;
  category: string;
  price: number;
}

const ProductDetailPage = ({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: string;
}) => {
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

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        "https://api.farmcode.io.vn/v1/ecoka/product",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          return data.data.map((item: any) => ({
            _id: item._id,
            main_image: item.main_image,
            side_images: item.side_images || [],
            vietnam_name: item.vietnam_name,
            english_name: item.english_name,
            japan_name: item.japan_name,
            vietnam_description: item.vietnam_description,
            english_description: item.english_description,
            japan_description: item.japan_description,
            category: item.category,
            price: item.price,
          }));
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          return [];
        });
      return response;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      setLoading(false);
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
      let id = "";
      const regex = /\/san-pham\/(\d+)/;
      const match = pathname.match(regex);
      const pathnameSplit = pathname.split("/");

      const products: Product[] = await fetchProducts();

      if (match && match[1]) {
        id = pathnameSplit[3];
        products?.forEach((product: Product) => {
          if (product?._id === id.toString()) {
            const filteredProducts = products.filter(
              (p) => p.category === product?.category
            );
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
      <Header
        page={`san-pham/${currentData?._id}`}
        lang={lang}
        dictionary={dictionary}
      />
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full bg-cover bg-center h-[250px] flex justify-center items-center z-10"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/farmcode/image/upload/v1732725346/ecoka/ea06mx34c2bjgjqoggsf.png')`,
            }}
          >
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="relative w-full flex flex-col justify-center text-white items-center">
              <Image
                src={IMAGES?.BANNER_LOGO}
                alt="Meubel House"
                width={50}
                height={50}
                className="text-center"
              />
              <h1 className="text-4xl font-semibold mb-2">
                {dictionary?.PRODUCT_breadcrumb_main}
              </h1>
              <div className="flex gap-2 items-center">
                <Link href={`/${lang}`} className="font-semibold text-sm">
                  {dictionary?.PRODUCT_breadcrumb_submain_1}
                </Link>
                <ChevronRight size={20} />
                <Link
                  href={`/${lang}/san-pham`}
                  className="font-semibold text-sm"
                >
                  {dictionary?.DETAIL_PRODUCT_breadcrumb_submain_2}
                </Link>
                <ChevronRight size={20} />
                <h1 className="text-sm">
                  {truncateText(currentData?.vietnam_name, 12)}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center z-10">
            <div className="w-full flex flex-col items-center bg-white">
              <div className="flex flex-col md:flex-row w-full max-w-6xl p-4 mt-5 space-y-6 md:space-y-0">
                <div className="flex md:flex-row flex-col-reverse items-start md:space-x-4">
                  <div className="flex md:flex-col flex-row md:space-y-4 mt-2 space-x-2 md:space-x-0 overflow-x-auto">
                    {currentData.side_images?.map((src: any, index: any) => (
                      <Image
                        key={index}
                        src={currentData?.side_images[index]}
                        alt="img"
                        width={80}
                        height={80}
                        className="rounded-lg cursor-pointer flex-shrink-0"
                        onClick={() =>
                          handleThumbnailClick(currentData?.side_images[index])
                        }
                      />
                    ))}
                  </div>
                  <div className="w-full flex justify-center mt-2 mb-6 md:mb-0 lg:mb-0">
                    <Image
                      src={mainImage || currentData?.main_image}
                      alt="img"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 space-y-6 md:ml-20">
                  <h1 className="text-2xl font-bold text-center md:text-left">
                    {lang === "vi"
                      ? currentData.vietnam_name
                      : lang === "en"
                        ? currentData.english_name
                        : currentData.japan_name}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 font-semibold text-center md:text-left">
                    {formatCurrency(currentData?.price, lang)}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                    <div className="border-l-2 h-6 mx-2 md:mx-4 border-gray-300"></div>
                    <p className="text-sm text-gray-600">
                      99 {dictionary?.DETAIL_PRODUCT_rating}
                    </p>
                  </div>
                  <p className="text-gray-600 text-center md:text-left">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          lang === "vi"
                            ? currentData.vietnam_description
                            : lang === "en"
                              ? currentData.english_description
                              : currentData.japan_description,
                      }}
                    />
                    {/* {lang === "vi"
                      ? currentData.vietnam_description
                      : lang === "en"
                      ? currentData.english_description
                      : currentData.japan_description} */}
                  </p>
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
                      <p className="w-24 font-semibold">
                        {dictionary?.DETAIL_PRODUCT_sub_description_1}:
                      </p>
                      <p>Thời trang</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-24 font-semibold">
                        {dictionary?.DETAIL_PRODUCT_sub_description_2}:
                      </p>
                      <p>Việt Nam</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-1 bg-[rgb(var(--primary-rgb))] mt-16"></div>
              <div className="w-full flex flex-col justify-start items-start mt-8">
                <div className="text-2xl font-bold text-left mb-8">
                  {dictionary?.DETAIL_PRODUCT_subtitle_1}
                </div>
                <div className="w-full z-10">
                  <Product
                    lang={lang}
                    dictionary={dictionary}
                    products={relatedProducts}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
          <Footer lang={lang} dictionary={dictionary} />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
