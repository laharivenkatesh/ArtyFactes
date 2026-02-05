import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../ui/utility/globals.css";
import Footer from "../ui/components/footer";
import Navbar from "../ui/components/navbar";
import Providers from "../ui/utility/providers";
import { Toaster } from "../ui/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ARTY FACETS",
    description: "Explore a world where Creativity, Fun and Rhythm Interwine",
    generator: 'Arty Facets - AF',
    applicationName: 'Arty Facets - AF',
    keywords: [
        'Arty Facets website', 'Arty Facets website India', 'Arty facets', 'Arty Facets Bangalore', 'Gomati Joshi Arty Facets',
        'Arty Facets', 'dance classes in bangalore', 'Western Dance', 'Bollywood Dance', 'certification courses in arts and crafts',
        'AF website', 'drawing classes in bangalore', 'vocal classes in bangalore', 'singing classes in bangalore', 'arts school in bangalore',
        'Arty Facets website', 'instrumental classes in bangalore', 'hindustani vocal classes in bangalore', 'arts school', 'arts and crafts school',
        'Arty Facets', 'music classes in bangalore', 'carnatic vocal classes in bangalore', 'yoga classes in bangalore', 'arts and crafts school in bangalore',
        'Arty Facets Website', 'pottery classes in bangalore', 'bharatnatyam classes in bangalore', 'fitness classes in bangalore',
        'School of Arts', 'kathak classes in bangalore', 'flute classes in bangalore', 'certification courses in bangalore', 
        'Arty Facets School', 'tabla classes in bangalore', 'arty facets bangalore', 'diploma in arts and crafts', 'school for arts',
        'arts and crafts', 'guitar classes in bangalore', 'contemporary dance classes in bangalore', 'certification courses in bangalore for arts',
        'arts and crafts school center', 'piano classes in bangalore', 'co scolastic activities in bangalore',
    ],
    authors: [{ name: 'Lahari Venkatesh Yegi' }],
    openGraph: {
        title: 'ARTY FACETS',
        description: 'Explore a world where Creativity, Fun and Rhythm Interwine. At Arty Facets, we offer a wide range of courses in arts and crafts, music and dance.',
            url: 'https://artyfacets.com/',
            siteName: 'Arty Facets',
            images: [
                {
                    url: 'https://artyfacets.com/logo1.png',
                    width: 800,
                    height: 600,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="min-h-screen">
                        <Navbar />
                        <div className="">
                            {children}
                        </div>
                        <Toaster />
                    </div>
                </Providers>
                <Footer />
            </body>
        </html>
    );
}
