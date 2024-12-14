import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

export function Slider({ dictionary }: { dictionary: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(0)
    const [slidesData, setSlidesData] = useState([
        { id: "01", image: "https://res.cloudinary.com/farmcode/image/upload/v1729000454/ecoka/ecoka-product-22-main_sjbc4d.webp", title: 'Thảm Cói Trải Sàn', roomType: 'Nhà Cửa' },
        { id: "02", image: 'https://res.cloudinary.com/farmcode/image/upload/v1729000247/ecoka/ecoka-product-12-main_jlmsvh.webp', title: 'Dĩa Lục Bình', roomType: 'Nhà Bếp' },
        { id: "03", image: "https://res.cloudinary.com/farmcode/image/upload/v1729000296/ecoka/ecoka-product-14-main_ng8hln.webp", title: 'Lồng Mèo Handmade', roomType: 'Nhà Thú Cưng' },
        { id: "04", image: "https://res.cloudinary.com/farmcode/image/upload/v1729000394/ecoka/ecoka-product-19-main_rvl1ul.webp", title: 'Giỏ Xách Đẹp', roomType: 'Thời Trang' }
    ]);

    const totalSlides = slidesData.length;

    const handleNext = () => {
        if (containerRef.current) {
            const updatedSlides = [...slidesData];
            const firstSlide = updatedSlides.shift();
            if (firstSlide) {
                updatedSlides.push(firstSlide);
            }
            setSlidesData(updatedSlides);
            setCurrentIndex(0);
            setPaginationIndex((prevIndex) => (prevIndex + 1) % totalSlides);
            containerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    }, [currentIndex]);

    return (
        <div className="flex flex-col md:grid md:grid-cols-5 lg:grid lg:grid-cols-5">
            <div className="col-span-2 md:p-10 lg:p-10 flex flex-col justify-center">
                <div className="text-black text-3xl font-bold mb-2 text-clip overflow-hidden text-center md:text-start lg:text-start">{dictionary?.HOME_discovery_title}</div>
                <div className="text-sm font-medium text-gray-600 mb-5 text-clip overflow-hidden text-center md:text-start lg:text-start">{dictionary?.HOME_discovery_brief}</div>
                <Link className="w-full flex justify-center items-center md:justify-start lg:justify-start" href="/san-pham">
                    <Button className="bg-[rgb(var(--primary-rgb))] rounded-lg lg:w-1/2 hover:opacity-80 hover:bg-[rgb(var(--primary-rgb))] text-ellipsis overflow-hidden whitespace-nowrap">
                        {dictionary?.HOME_button_discovery}
                    </Button>
                </Link>
            </div>
            <div className="col-span-3 w-full relative flex flex-col items-center justify-center h-[550px]">
                <div className="relative w-full h-full overflow-hidden">
                    <div
                        className="w-full h-full carousel flex snap-x snap-mandatory gap-4 scroll-smooth items-center"
                        ref={containerRef}
                    >
                        {slidesData?.map((slide: any, index: any) => (
                            <div
                                key={index}
                                className={`relative shrink-0 snap-start rounded-xl transition-all duration-300 ease-in-out transform ${currentIndex === index ? 'scale-110' : 'scale-100'}`}
                                style={{
                                    width: currentIndex === index ? '270px' : '225px',
                                    height: currentIndex === index ? '360px' : '300px',
                                    marginRight: currentIndex === index ? '20px' : '10px',
                                }}
                            >
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <Image
                                        src={slide?.image}
                                        alt={slide?.roomType + ' image'}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className='rounded-lg'
                                    />
                                    <div className="absolute inset-0 flex items-end justify-start px-7 py-5 rounded-b-lg z-10">
                                        <div className='bg-white bg-opacity-80 p-5 rounded-lg'>
                                            <div className='text-xs font-semibold text-gray-400 mb-1'>{slide?.id} --- {slide?.roomType}</div>
                                            <div className={`font-bold text-black opacity-100 ${currentIndex === index ? 'text-lg' : 'text-sm'}`}>{slide?.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-1/2 right-10">
                    <button
                        className="bg-white p-2 rounded-full shadow-md"
                        onClick={handleNext}
                    >
                        <ChevronRight color='rgb(236,152,55)' />
                    </button>
                </div>
                <div className="absolute md:left-1/2 lg:left-1/2 bottom-5 flex gap-2 items-center">
                    {slidesData?.map((_, index) => (
                        <span
                            key={index}
                            className={`relative h-3 w-3 flex items-center justify-center 
                        ${paginationIndex === index ? 'h-8 w-8 rounded-full border-2 border-[rgb(var(--primary-rgb))]' : ''}`}
                        >
                            <span
                                className={`h-3 w-3 rounded-full transition-all duration-300 
                            ${paginationIndex === index ? 'bg-[rgb(var(--primary-rgb))]' : 'bg-gray-300'}`}
                            />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
