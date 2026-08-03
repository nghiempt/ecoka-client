"use client";

import { GalleryService } from "@/utils/api";
import { IMAGES } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  image: string;
}

/**
 * Khuôn xếp ô lặp lại để bộ hình trông so le, "nghệ thuật" nhưng vẫn ổn định
 * giữa server và client (không dùng random để tránh lệch hydrate).
 * Kết hợp grid-flow-row-dense nên các khoảng trống được lấp tự động.
 */
const TILE_PATTERN = [
  "col-span-1 row-span-3",
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-2 row-span-3",
  "col-span-1 row-span-3",
  "col-span-1 row-span-2",
  "col-span-1 row-span-3",
];

export function DecorGallery({ dictionary }: { dictionary: any }) {
  // null = chưa tải xong hoặc gọi API thất bại
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    GalleryService.getAll()
      .then((data) => {
        if (mounted) setItems(data as GalleryItem[] | null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const heading = (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="text-sm text-gray-500 font-semibold">
        {dictionary?.HOME_decor_tag}
      </div>
      <div className="text-2xl text-gray-700 font-extrabold">
        {dictionary?.HOME_hashtag}
      </div>
    </div>
  );

  // Chưa có hình do admin quản lý -> giữ nguyên tấm hình ghép mặc định.
  if (loading || !items || items.length === 0) {
    return (
      <div className="w-full mb-20">
        <div
          className="bg-cover bg-center h-[300px] lg:h-[600px] md:h-[600px] w-full"
          style={{ backgroundImage: `url(${IMAGES?.HOME_GRID})` }}
        >
          <div
            className="flex flex-col items-center justify-center"
            style={{ marginTop: "-40px" }}
          >
            <div className="text-sm text-gray-500 font-semibold">
              {dictionary?.HOME_decor_tag}
            </div>
            <div className="text-2xl text-gray-700 font-extrabold">
              {dictionary?.HOME_hashtag}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-20">
      {heading}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense auto-rows-[70px] md:auto-rows-[100px] lg:auto-rows-[120px] gap-3">
        {items.map((item, index) => (
          <div
            key={item._id}
            className={`relative overflow-hidden rounded-lg group ${
              TILE_PATTERN[index % TILE_PATTERN.length]
            }`}
          >
            <Image
              src={item.image}
              alt={`${dictionary?.HOME_decor_tag || "decor"} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
