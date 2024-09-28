'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft, Heart, Share2 } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import Link from 'next/link';

interface Product {
    id: number
    name: string
    price: number
    image: string
    description: string
    status: string
    discount: number
    currentPrice: number
}

interface ProductProps {
    products: Product[]
}

export const Product: React.FC<ProductProps> = ({ products }) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((product: Product, index: any) => (
                <Link href={ROUTES.PRODUCT + `/${product?.id}`} key={index} className='relative group cursor-pointer rounded-lg'>
                    <Card className="rounded-lg bg-gray-50 flex flex-col border-none">
                        <div className='relative w-full h-[280px] rounded-lg'>
                            <Image
                                src={product?.image}
                                alt={product?.name + ' image'}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className='rounded-lg'
                            />
                        </div>
                        <div className='flex flex-col justify-center p-3 text-start'>
                            <div className="text-lg font-bold mb-1 max-h-[28px] truncate">
                                {product?.name}
                            </div>
                            <div className="text-xs font-semibold text-gray-400 text-left mb-2 max-h-[32px] text-clip overflow-hidden">
                                {product?.description}
                            </div>
                            <div className='w-full grid grid-cols-5 items-center'>
                                <p className="col-span-3 max-h-[24px] text-md font-semibold text-left truncate">
                                    {product?.price} VND
                                </p>
                            </div>
                        </div>
                    </Card>
                    <div className={`absolute top-2 right-2 h-10 w-10 rounded-full bg-[#E97171] text-white text-[12px] font-semibold flex items-center justify-center`}>
                        New
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                    <div className='absolute inset-0 w-full flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <Button className='w-2/3 mb-5 items-center font-bold rounded-sm bg-white opacity-100 text-[rgb(var(--quaternary-rgb))] hover:bg-[rgb(var(--primary-rgb))] hover:text-white truncate'>
                            Chi tiết
                        </Button>
                        <div className='w-full p-3 flex flex-wrap justify-center items-center gap-2'>
                            <div className='flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer'>
                                <Share2 size={14} />
                                Share
                            </div>
                            <div className='flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer'>
                                <ArrowRightLeft size={14} />
                                Compare
                            </div>
                            <div className='flex justify-center items-center text-white text-sm font-semibold gap-1 hover:cursor-pointer'>
                                <Heart size={14} />
                                Like
                            </div>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div >
    );
};
