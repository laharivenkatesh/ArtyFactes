import Link from "next/link";
import Image from "next/legacy/image";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import YoutubeForm from "@/app/(pages)/(admin)/dashboard/youtube/page";

export default function Footer() {

    const footerImg = [
        { src: <Instagram size={50} className="text-white" />, label: 'Instagram', link: 'https://www.instagram.com/artyfacets/' },
        { src: <Facebook size={50} className="text-white" />, label: 'Facebook', link: 'https://www.facebook.com' },
        { src: <Youtube size={50} className="text-white"/>, label: 'Youtube', link: 'https://www.youtube.com/@artyfacets4914' },
        { src: <Linkedin size={50} className="text-white"/>, label: 'LinkedIn', link: 'https://www.linkedin.com/company/arty-facets/posts' },
    ]

    return (
        <div className="bg-teal-950 border-t border-t-black" >
            {/* <div className="text-black text-3xl max-w-7xl mx-auto text-center font-sans font-bold tracking tracking-widest border-b-2 pb-3 w-2/6 border-black">ARTY FACETS</div> */}
            {/* <div className="grid grid-cols-2 max-w-7xl mx-auto gap-6 px-2 md:grid-cols-3 text-slate-300 pt-5">
                <div className="md:text-center">
                    <div className="text-xl text-white font-bold">Head Office</div>
                    <div className="text-gray-300">Arty Facets</div>
                    <div className="text-gray-300">123, XYZ Street</div>
                    <div className="text-gray-300">City, Country</div>
                </div>
                <div className="md:text-center">
                    <div className="text-xl text-white font-bold">Location</div>
                    <div className="text-gray-300">Arty Facets</div>
                    <div className="text-gray-300">123, XYZ Street</div>
                    <div className="text-gray-300">City, Country</div>
                </div>
                <div className="md:text-center">
                    <div className="text-xl text-white font-bold">Contact</div>
                    <div className="text-gray-300">Number</div>
                    <div className="text-gray-300">Number</div>
                    <div className="text-gray-300">Number</div>
                </div>
            </div> */}
            <div className=" max-w-md text-center mx-auto gap-6 p-3 md:grid-cols-4 text-slate-300">
                        <ul className='grid grid-flow-col justify-evenly w-full '>
                            {footerImg.map((img) => {
                                return (
                                    <li key={img.label}>
                                        <a href={img.link} target="_blank" rel="noopener noreferrer">
                                            {img.src}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
            </div>
            <div className="md:hover:underline text-white text-center">2024 © | All rights reserved.</div>
        </div>
    )
}