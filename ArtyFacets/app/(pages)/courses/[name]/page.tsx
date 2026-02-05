"use client"
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaGuitar, FaPalette, FaYinYang } from "react-icons/fa";

type CourseName = "dance" | "music" | "instruments" | "arts" | "yoga";

interface CourseDetail {
    image: string;
    title: string;
    description: string;
    subcategories: SubCategory[];
    gallery: string[];
}

interface SubCategory {
    title: string;
    description: string;
}

const courseDetails: Record<CourseName, CourseDetail> = {
    dance: {
        image: "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1500.JPG",
        title: "Dance",
        description:
            "Unleash your inner rhythm! Our dance classes nurture creativity and confidence, offering a variety of styles for all ages and abilities.",
        subcategories: [
            {
                title: "Kathak",
                description:
                    "Kathak, the timeless art of storytelling through dance, traces its origins back to ancient India, where it flourished as a heartfelt homage to Lord Krishna. Derived from the evocative Sanskrit words 'Katha' for 'story' and 'Kathakar' for 'storyteller', this classical dance form weaves narratives with every graceful hand gesture, intricate footstep, and emotive expression. Kathak is more than just movement; it's a mesmerizing journey through tales, told with passion and precision, captivating hearts with each step.",
            },
            {
                title: "Bharatanatyam",
                description:
                    "Embark on a rhythmic journey through the vibrant heritage of Bharatanatyam! Originating from the heartland of Tamil Nadu, this classical dance form epitomizes the essence of Indian tradition and history. With each precise movement and expressive gesture, Bharatanatyam weaves a mesmerizing tale, breathing life into ancient narratives. Despite facing years of suppression, it has emerged triumphant, thanks to the dedication of passionate teachers and students worldwide. Today, it reigns supreme, igniting hearts and captivating souls with its timeless allure. Join the celebration and immerse yourself in the resplendent glory of Bharatanatyam!",
            },
            {
                title: "Bollywood Style Dance",
                description:
                    "Get ready to ignite the dance floor with Bollywood's signature flair! From the rhythmic beats to the mesmerizing moves, Bollywood style dance is a celebration of joy and culture.With its fusion of classical Indian and contemporary dance forms, every step tells a story of passion and vibrancy.Embark on a journey through dynamic choreography and colourful costumes. Let your spirit soar as you lose yourself in the infectious energy of Bollywood dance.",
            },
        ],
        gallery: [
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0037.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0279.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0200.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0269.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0361.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0358.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0372.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1334.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0433.JPG",
        ],
    },
    music: {
        image: "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0411.JPG",
        title: "Music",
        description:
            "Find your voice! Our singing lessons develop vocal techniques and performance skills, fostering a love for music in a supportive environment.",
        subcategories: [
            {
                title: "Hindustani",
                description:
                    "Immerse yourself in the world of Hindustani music! Built on a foundation of Ragas, melodic scales with unique note combinations, Hindustani music takes you on a journey of vocal expression. Instruments mimic the human voice, creating a tapestry of sound! Dive deeper into the magic of Khayal, Dhrupad, and Thumri, the major vocal forms, and embark on a captivating musical experience!",
            },
            {
                title: "Carnatic",
                description:
                    "Travel south to the soul-stirring melodies of Carnatic music. This ancient tradition reigns supreme in South India, a captivating counterpart to North India's Hindustani stylings.Though rooted in similar techniques, Carnatic music boasts unique influences, weaving a tapestry of emotion that transcends mere entertainment.It's a spiritual journey for both performer and listener, a chance to connect with the divine through the power of sound.",
            },
        ],
        gallery: [
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0121.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0130.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_0301.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1418.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0053.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0078.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0517.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0565.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0411.JPG",
        ],
    },
    instruments: {
        image: "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0450.JPG",
        title: "Instruments",
        description:
            "Make music your own! Our instrument instruction provides a fun and interactive way to learn guitar, piano, drums and more!",
        subcategories: [
            {
                title: "Keyboard",
                description:
                    "These versatile instruments unlock a world of sound, from tinkling melodies to earth-shaking basslines. With just a touch, you can create almost any kind of music, making keyboards a true playground for musical creativity.",
            },
            {
                title: "Guitar",
                description:
                    "The guitar: six strings with endless possibilities. From gentle folk melodies to face-melting rock solos, this versatile instrument speaks volumes without a single word. Whether strummed by a campfire or cranked through an amp, the guitar's sound cuts through genres and generations, making it a true musical icon.",
            },
            {
                title: "Flute",
                description:
                    "With a breath of air, the flute comes alive, its clear melody weaving through the music. From breathy whispers to soaring notes, this versatile instrument adds a touch of magic to any song, making it a favorite for both soloist and orchestra.",
            },
            {
                title: "Tabla",
                description:
                    "The tabla, a pair of hand-played drums, is the heartbeat of Indian classical music. With its intricate rhythms and dynamic tones, the tabla is a versatile instrument that can be played solo or as part of an ensemble. Whether you're a seasoned musician or a beginner, the tabla is a rewarding instrument to learn, offering a lifetime of musical exploration.",
            },
        ],
        gallery: [
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1525.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1532.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1533.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1534.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0087.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0088.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0307.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0450.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0665.JPG",
        ],
    },
    arts: {
        image: "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0266.JPG",
        title: "Arts",
        description:
            "Explore your artistic side! Our arts programs delve into drawing, painting, yoga and pottery, encouraging self- expression and exploration.",
        subcategories: [
            {
                title: "Pottery",
                description:
                    "where the earth gets a second life as stunning forms. From delicate vases to bold sculptures, clay transforms into functional art, each piece holding the imprint of the artist's hand and imagination.",
            },
            {
                title: "Fine Arts",
                description:
                    "Unleash your inner artist! Fine arts classes aren't just about learning techniques, they're about exploring your creativity, building confidence, and having a blast. Discover your artistic voice, experiment with mediums, and create something amazing - all with the guidance of experienced instructors. It's time to turn your passion into art!",
            },
            {
                title: "Digital Arts",
                description:
                    "Unleash your creativity in the world of digital arts! From graphic design to digital painting, our courses offer a hands-on experience in creating stunning visual art using digital tools. Explore the endless possibilities of digital art and bring your imagination to life on the digital canvas. Join our digital arts program and embark on a journey of artistic expression in the digital realm.",
            },
        ],
        gallery: [
            "/dawn_img.png",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PS02.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PS01.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/BB01.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PB04.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PB03.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PB02.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/PB01.JPG",
            "https://arty-facet.s3.ap-south-1.amazonaws.com/Image:AF-1718484716694.jpeg",
        ],
    },
    yoga: {
        image: "/yoga.png",
        title: "Yoga",
        description:
            "Experience the harmony of body, mind, and spirit! Our yoga classes offer a holistic approach to fitness and well-being, guiding you through a series of postures, breathing exercises, and meditation techniques. Whether you're a beginner or an experienced yogi, our classes will help you build strength, increase flexibility, and find your inner peace.",
        subcategories: [
            {
                title: "Yoga",
                description:
                    "Unwind, de-stress, and impress! Yoga isn't just about limbering up, it's a path to inner peace, physical strength, and maybe even that headstand you've always wanted to master. Join a class and feel the difference - mind, body, and soul!",
            },
        ],
        gallery: [
            "/p1.jpeg",
            "/p2.jpeg",
            "/p3.jpeg",
            "/p4.jpeg",
            "/p5.jpeg",
            "/p6.jpeg",
            "/p7.jpeg",
        ],
    },
};

interface CoursePageProps {
    params: Readonly<{ name: string }>;
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
    const { name } = params;
    const course = courseDetails[name as CourseName];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!course) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold">Course Not Found</h1>
                <p className="text-lg mt-5">
                    The course you are looking for does not exist.
                </p>
                <Link href="/#coursestitle" passHref>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mt-8 bg-teal-700 p-3 px-6 rounded-md border border-black text-zinc-200 shadow-lg hover:bg-teal-600 transition-all duration-300"
                    >
                        Back To Courses
                    </motion.div>
                </Link>
            </div>
        );
    }

    const getCourseIcon = () => {
        switch(name as CourseName) {
            case 'dance': return <FaMusic className="text-amber-700 text-3xl" />;
            case 'music': return <FaMusic className="text-amber-700 text-3xl" />;
            case 'instruments': return <FaGuitar className="text-amber-700 text-3xl" />;
            case 'arts': return <FaPalette className="text-amber-700 text-3xl" />;
            case 'yoga': return <FaYinYang className="text-amber-700 text-3xl" />;
            default: return null;
        }
    };

    return (
        <section className="bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-white md:py-12 lg:py-16 sm:py-5 min-h-screen">
            <div className="max-w-6xl p-4 mx-auto sm:p-1">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="shadow-2xl bg-zinc-200 border mt-12 border-black rounded-lg mb-12 overflow-hidden hover:shadow-amber-700/50 transition-all duration-300"
                >
                    <div className="relative h-[450px] w-full">
                        <Image
                            src={course.image}
                            alt={`${course.title} Image`}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-[0.85] hover:brightness-100 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent flex items-end">
                            <div className="p-8 w-full">
                                <div className="flex items-center justify-center mb-3">
                                    {getCourseIcon()}
                                </div>
                                <h1 className="text-5xl font-bold text-center text-white mb-4 drop-shadow-lg">
                                    {course.title}
                                </h1>
                                <p className="text-xl font-medium text-center text-zinc-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                                    {course.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8 drop-shadow-sm">Our {course.title} Programs</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {course.subcategories.map((subcategory, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="shadow-lg bg-white border border-black rounded-lg p-6 hover:shadow-xl transition-all duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-amber-700 mb-3 border-b border-amber-200 pb-2">
                                {subcategory.title}
                            </h2>
                            <p className="text-base text-zinc-700 leading-relaxed">
                                {subcategory.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link href="/join" passHref>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mx-2 bg-teal-700 px-8 py-4 rounded-xl border border-black text-zinc-200 text-xl font-semibold shadow-lg hover:bg-teal-600 hover:shadow-2xl transition-all duration-300"
                        >
                            Start Your Journey Today!
                        </motion.div>
                    </Link>
                </div>

                <div>
                    <Gallery images={course.gallery} setSelectedImage={setSelectedImage} />
                </div>

                <div className="text-center mt-12">
                    <Link href="/#coursestitle" passHref>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mx-2 bg-teal-700 p-3 px-6 rounded-md border border-black text-zinc-200 shadow-lg hover:bg-teal-600 transition-all duration-300"
                        >
                            Explore Other Courses
                        </motion.div>
                    </Link>
                </div>
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged gallery image"
                            width={900}
                            height={600}
                            className="rounded-lg shadow-2xl object-contain"
                        />
                        <button 
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

function Gallery({ images, setSelectedImage }: { images: string[], setSelectedImage: (img: string) => void }) {
    if (images.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-zinc-800 relative inline-block">
                    Gallery
                    <div className="absolute h-1 w-full bg-amber-500 bottom-0 left-0 rounded-full"></div>
                </h2>
                <p className="text-zinc-700 mt-3 max-w-2xl mx-auto">
                    Explore our vibrant collection of moments, inspirations, and achievements
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-6">
                {images.map((img, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className="relative h-64 w-full">
                            <Image
                                src={img}
                                alt={`Gallery image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default CoursePage;
