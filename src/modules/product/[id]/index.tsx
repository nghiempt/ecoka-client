"use client";

import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaStar } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/components/global/product";
import { related_products, total_products } from "@/utils/constant";
import { NavMobile } from "@/layout/nav-mobile";
import { ROUTES } from "@/utils/route";
import { usePathname } from "next/navigation";
import { truncateText } from "@/utils/helper";

export interface Color {
  color: string,
  bg: string
}

const ProductDetailPage: React.FC = () => {

  const pathname = usePathname();
  const [currentData, setCurrentData] = useState<any>({} as any);

  const [quantity, setQuantity] = useState<number>(1);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const sizes = ["L", "XL", "XS"];

  const handleQuantityChange = (amount: number) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const [mainImage, setMainImage] = useState("");

  const thumbnails = [
    IMAGES.LOGO,
    IMAGES.LOGO,
    IMAGES.LOGO,
    IMAGES.LOGO,
    IMAGES.LOGO,
    IMAGES.LOGO,
  ];

  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  const colors: Color[] = [
    { color: "purple-600", bg: "bg-purple-600" },
    { color: "black", bg: "bg-black" },
    { color: "yellow-500", bg: "bg-yellow-500" },
  ];

  useEffect(() => {
    let id = 0;
    const regex = /\/san-pham\/(\d+)/;
    const match = pathname.match(regex);
    if (match && match[1]) {
      id = parseInt(match[1], 10);
      total_products?.forEach((product: any) => {
        if (product?.id === id) {
          setCurrentData(product);
        }
      })
    }
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <Header />
      <NavMobile />
      <div className="w-full md:w-2/3 lg:w-2/3 bg-cover bg-center h-[250px] flex justify-center items-center md:rounded-lg lg:rounded-lg z-10"
        style={{ backgroundImage: `url('/breadcrumb.png')` }}>
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={IMAGES.BANNER_LOGO}
            alt='Meubel House'
            width={50}
            height={50}
            className="text-center"
          />
          <h1 className="text-4xl font-semibold mb-2">
            SẢN PHẨM
          </h1>
          <div className="flex gap-2 items-center">
            <Link href={ROUTES.HOME} className="font-semibold text-sm">
              Trang chủ
            </Link>
            <ChevronRight size={20} />
            <Link href={ROUTES.PRODUCT} className="font-semibold text-sm">
              Sản phẩm
            </Link>
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
                {thumbnails?.map((src: any, index: any) => (
                  <Image
                    key={index}
                    src={currentData?.image}
                    alt="img"
                    width={80}
                    height={80}
                    className="rounded-lg cursor-pointer flex-shrink-0"
                    onClick={() => handleThumbnailClick(src)}
                  />
                ))}
              </div>
              <div className="w-full flex justify-center mt-2 mb-6 md:mb-0 lg:mb-0">
                <Image
                  src={currentData?.image}
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
                {currentData?.price} VND
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                <div className="border-l-2 h-6 mx-2 md:mx-4 border-gray-300"></div>
                <p className="text-sm text-gray-600">99 đánh giá</p>
              </div>
              <p className="text-gray-600 text-center md:text-left">
                {currentData?.description}
              </p>
              <div>
                <h3 className="text-lg font-semibold text-center md:text-left">
                  Size
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
                  Color
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
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black border-2  px-6 py-2 w-full md:w-auto font-semibold"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
              <hr />
              <div className="text-sm text-gray-600 mt-4 space-y-2">
                <div className="flex items-center">
                  <p className="w-24 font-semibold">Danh mục:</p>
                  <p>Thời trang</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-semibold">Xuất xứ:</p>
                  <p>Việt Nam</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-semibold">Chất liệu:</p>
                  <p>Da</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-semibold">Nguồn</p>
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
            <div className="text-2xl font-bold text-left mb-8">Sản Phẩm Liên Quan</div>
            <div className="w-full z-10">
              <Product products={related_products} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/6 md:w-2/3 lg:w-2/3 h-[3px] bg-[rgb(var(--quaternary-rgb))] my-10"></div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
