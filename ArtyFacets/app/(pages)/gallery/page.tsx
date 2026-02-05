import { Suspense } from "react";
import Loading from "../(admin)/dashboard/Loading";
import Gal from "./gal";
import Link from "next/link";

export default function Gallery() {
  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore our creative journey and artistic expressions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Loading />}>
            <Gal />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

