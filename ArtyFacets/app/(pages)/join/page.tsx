import Link from "next/link";
import { JoinForm } from "./form";

export default function FormPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-indigo-50 min-h-screen">
      <div className="pt-32 max-w-4xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Arty Facets
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out this form and our team will assist you soon to get you started on your creative journey!
          </p>
        </div>
        <JoinForm />
      </div>
    </div>
  );
}
