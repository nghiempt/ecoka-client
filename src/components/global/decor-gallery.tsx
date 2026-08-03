"use client";

import { GalleryService } from "@/utils/api";
import { IMAGES } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  image: string;
}

// Xếp kiểu masonry bằng CSS multi-column: mỗi tấm giữ đúng tỉ lệ gốc nên
// chiều cao so le tự nhiên, và không bao giờ để lại ô trống dù admin tải lên
// bao nhiêu hình. Không dùng random để tránh lệch giữa server và client.

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
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="mb-3 break-inside-avoid overflow-hidden rounded-lg group"
          >
            <Image
              src={item.image}
              alt={`${dictionary?.HOME_decor_tag || "decor"} ${index + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
