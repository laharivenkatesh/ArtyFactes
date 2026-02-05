"use client";

import { GetImages } from "@/app/lib/data";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";

export default function Gal() {
  const [images, setImages] = useState<any[]>([]);
  const [viewImage, setViewImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      const img = await GetImages();
      setImages(img.sort(() => Math.random() - 0.5));
    }
    loadImages();
  }, []);

  const grids = new Array(Math.ceil(images.length / 3)).fill(0);

  return (
    <>
      {grids.map((_, i) => (
        <div className="grid gap-6" key={i}>
          {images.slice(i * 3, i * 3 + 3).map((img: any, j: any) => (
            <div
              key={j}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                loading="lazy"
                height={350}
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
                width={550}
                className="w-full h-auto rounded-xl transition-all duration-500 ease-in-out transform group-hover:scale-105"
                src={img.link}
                alt="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <span 
                    onClick={() => setViewImage(img.link)}
                    className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white/30"
                  >
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {viewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
          onClick={() => setViewImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full z-10 hover:bg-white/40"
              onClick={() => setViewImage(null)}
            >
              ✕
            </button>
            <div className="overflow-hidden">
              <Image
                src={viewImage}
                alt="Zoomed image"
                layout="intrinsic"
                width={1200}
                height={800}
                objectFit="contain"
                className="transform scale-100"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
