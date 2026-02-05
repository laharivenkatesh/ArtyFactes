import Image from "next/image";
import ContactUs from "../ui/components/ContactUs";
import Link from "next/link";
import JoinButton from "./workshopForms/joinworkshop";
import { GetAllFaculty, GetYoutubeLinks, getWorkshops } from "../lib/data";
import { marked } from "marked";
import { Suspense } from "react";
import Loading from "./(admin)/dashboard/Loading";
import { Button } from "../ui/components/ui/button";
import DeleteButton from "./(admin)/dashboard/youtube/DeleteButton";
import FacultyView from "./(admin)/dashboard/faculty/view";
import { Item } from "@radix-ui/react-accordion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <Intro />
      <IntroPic />
      <AboutUs />
      <Suspense fallback={<Loading />}>
        <WorkshopNew />
        <CoursesTitle />
        <Courses />
        <Team />
        <YoutubeComponent adm={false} />
      </Suspense>
      <ContactUs />
    </>
  );
}

// Function to extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string): string {
  try {
    // Handle various YouTube URL formats
    if (url.includes("youtu.be/")) {
      // Short URL format: https://youtu.be/VIDEO_ID
      return url.split("youtu.be/")[1].split("?")[0].split("&")[0];
    } else if (url.includes("youtube.com/watch")) {
      // Standard format: https://youtube.com/watch?v=VIDEO_ID or with additional params
      const urlParams = new URLSearchParams(url.split("?")[1]);
      return urlParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      // Embed format: https://youtube.com/embed/VIDEO_ID
      return url.split("youtube.com/embed/")[1].split("?")[0].split("&")[0];
    } else if (url.includes("youtube.com/v/")) {
      // Old format: https://youtube.com/v/VIDEO_ID
      return url.split("youtube.com/v/")[1].split("?")[0].split("&")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      // Shorts format: https://youtube.com/shorts/VIDEO_ID
      return url.split("youtube.com/shorts/")[1].split("?")[0].split("&")[0];
    }

    // Fallback to original method (for backward compatibility)
    return (
      url.split("v=")[1]?.split("&")[0] ||
      url.split("https://youtube.com/")[1] ||
      ""
    );
  } catch (error) {
    console.error("Error parsing YouTube URL:", url);
    return "";
  }
}

export async function YoutubeComponent({
  adm,
  dash,
}: {
  adm: Boolean;
  dash?: Boolean;
}) {
  const data = await GetYoutubeLinks(dash ? 100 : 8);

  if (data.length < 1) return null;

  return (
    <div className="py-4 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Our Videos
        </h2>
        <p className="text-gray-600 text-lg mb-12">Watch our latest artistic performances and educational content</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => {
            const videoId = getYoutubeVideoId(item.link);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : "/placeholder-video.jpg";

            return (
              <div
                key={item._id.toString()}
                className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="group relative">
                  <Link href={item.link} target="_blank">
                    <div className="relative h-48 w-full">
                      <Image
                        src={thumbnailUrl}
                        alt={item.title || "YouTube Video"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        priority={data.indexOf(item) < 4}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white ml-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="p-4">
                  <Link href={item.link} target="_blank">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
                      {item.title || "YouTube Video"}
                    </h3>
                  </Link>

                  {adm && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-3 border-t border-gray-200">
                      <Link
                        href={`/dashboard/youtube/edit/${item._id}`}
                        className="text-center p-2 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={item._id.toString()} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-40 opacity-60"
        src="/dance.mp4"
        autoPlay
        loop
        playsInline={true}
        disablePictureInPicture={true}
        muted
      ></video>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Arty Facets
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl drop-shadow-lg">
            Unleash Your Creativity, Master Your Craft
          </p>
        </div>
        <Image
          className="rounded-2xl shadow-2xl border-4 border-white hover:scale-105 transition-transform"
          priority
          src="/logo1.png"
          width={500}
          height={350}
          alt="ARTY FACETS IMAGE"
        />
      </div>
    </section>
  );
}

function AboutUs() {
  // Define content sections to make the JSX more readable
  const featureSections = [
    {
      id: "holistic",
      title: "Holistic Learning Approach",
      features: [
        {
          subtitle: "Mind-Body Integration:",
          description:
            "We emphasize the integration of mind and body techniques across disciplines, incorporating mindfulness practices within art, dance, and yoga sessions.",
        },
        {
          subtitle: "Holistic learning approach:",
          description:
            "We blend traditional and modern techniques in art at Arty Facets for a holistic learning experience by integrating time-honored practices with contemporary approaches that address both the technical and expressive aspects of art.",
        },
      ],
    },
    {
      id: "hybrid",
      title: "Hybrid Learning Models",
      features: [
        {
          subtitle: "Online and Offline Classes:",
          description:
            "We offer flexibility through in-person and virtual classes for music, dance, art, and yoga, making learning more accessible.",
        },
        {
          subtitle: "Recorded Sessions:",
          description:
            "We also provide access to recorded classes for students to review techniques and lessons at their own pace.",
        },
      ],
    },
    {
      id: "workshops",
      title: "Interactive Workshops",
      features: [
        {
          subtitle: "Guest Instructors:",
          description:
            "We host special workshops with experts from various fields, including visiting artists or renowned yogis, offering students exposure to different styles.",
        },
        {
          subtitle: "Collaboration Projects:",
          description:
            "We encourage collaborative projects between music, dance, art, and yoga students to foster interdisciplinary learning.",
        },
      ],
    },
    {
      id: "personalized",
      title: "Personalized Learning Plans",
      features: [
        {
          subtitle: "Individual Progress Tracking:",
          description:
            "At Arty Facets, we implement systems to monitor each student's progress, offering tailored feedback and adjusting lesson plans accordingly.",
        },
        {
          subtitle: "Customized Training Paths:",
          description:
            "Based on students' interests and goals, we offer specialized paths (e.g., focused Kathak training or therapeutic yoga sessions).",
        },
      ],
    },
  ];

  const renderFeature = (feature: {
    subtitle: string;
    description: string;
  }) => (
    <div key={feature.subtitle} className="mb-4">
      <span className="font-semibold text-indigo-600">
        {feature.subtitle}
      </span>{" "}
      <span className="text-gray-700">{feature.description}</span>
    </div>
  );

  return (
    <section
      className="bg-gradient-to-b from-indigo-50 via-white to-blue-50 py-16 px-4"
      id="about-us"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4">
            About Arty Facets
          </h2>
          <h3 className="text-2xl md:text-3xl text-gray-700 font-light mb-8">
            Expand Your Skills with Our Diploma Courses
          </h3>

          <div className="text-lg text-gray-700 max-w-3xl mx-auto space-y-4">
            <p>
              At Arty Facets, we are dedicated to nurturing creativity, physical and mental well-being, and artistic expression. Since 2010, we have been offering a wide range of courses to help individuals explore and excel in various disciplines.
            </p>
            <p>
              We provide a plethora of art classes: from basic clay modeling to intricate pottery work, candle making to jewelry making, Indian classical music, musical instruments, classical dance to Bollywood dancing and various other craft forms.
            </p>
            <p className="font-semibold text-indigo-600">
              New strategies for learning: At Arty Facets, we emphasize innovative approaches to teaching that blend tradition with contemporary methods.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featureSections.map((section, index) => (
            <div
              key={section.id}
              className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl border-2 border-indigo-100 transition-all duration-300 hover:-translate-y-2"
            >
              <h4 className="text-2xl font-bold text-indigo-700 mb-6 border-b-4 border-blue-300 pb-3">
                {section.title}
              </h4>
              <div className="space-y-4">
                {section.features.map(renderFeature)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroPic() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 pb-4 border-b-4 border-indigo-500 inline-block">
          Meet Our Founder
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1 relative aspect-video border-4 border-indigo-200">
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube-nocookie.com/embed/wOmTUQkzqlA?si=du57cEZKo7mrVfgv&rel=0"
              title="Gomati Joshi - Founder of Arty Facets"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              loading="lazy"
              aria-label="Video introduction of Gomati Joshi, founder of Arty Facets"
            ></iframe>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-xl border-2 border-indigo-200">
              <h3 className="text-3xl font-bold text-indigo-700 mb-6">
                Gomati Joshi
              </h3>

              <div className="prose text-gray-700 max-w-none space-y-4 text-lg">
                <p>
                  Bangalore-based civil engineer-turned-artist,{" "}
                  <span className="font-semibold text-indigo-600">Gomati Joshi</span>, is the
                  driving force behind Arty Facets. This vibrant institution
                  offers a diverse range of artistic disciplines, from music and
                  musical instruments to art, crafts, and yoga, catering to both
                  children and adults.
                </p>

                <p>
                  Gomati&apos;s artistic journey began with the creation of
                  exquisite terracotta jewelry. Her unique designs quickly
                  gained popularity, leading to nationwide shipping of her
                  handcrafted pieces. Her love for traditional Indian art forms
                  such as classical music and dance, as well as her passion for
                  sharing her knowledge and skills with others, drove her to
                  establish the institute. Gomati is deeply committed to
                  preserving and promoting traditional art forms. Through Arty
                  Facets, she strives to nurture creativity and inspire the next
                  generation of artists.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="bg-indigo-200 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full">
                  Terracotta Artist
                </span>
                <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                  Civil Engineer
                </span>
                <span className="bg-purple-200 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
                  Art Educator
                </span>
                <span className="bg-indigo-300 text-indigo-900 text-sm font-semibold px-4 py-2 rounded-full">
                  Entrepreneur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesTitle() {
  return (
    <section
      className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 py-16 px-4"
      id="coursestitle"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl text-white font-bold mb-4">
          Diploma Courses
        </h2>
        <p className="text-xl md:text-2xl text-indigo-100 font-light">
          Expand Your Skills with Our Comprehensive Programs
        </p>
      </div>
    </section>
  );
}

function Courses() {
  const courses = [
    {
      image: "https://arty-facet.s3.ap-south-1.amazonaws.com/DSC_1500.JPG",
      title: "Dance",
      info: "Unleash your inner rhythm! Our dance classes nurture creativity and confidence, offering a variety of styles for all ages and abilities.",
      detailsLink: "/courses/dance",
    },
    {
      image: "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0411.JPG",
      title: "Music",
      info: "Find your voice! Our singing lessons develop vocal techniques and performance skills, fostering a love for music in a supportive environment.",
      detailsLink: "/courses/music",
    },
    {
      image: "https://arty-facet.s3.ap-south-1.amazonaws.com/IMG_0450.JPG",
      title: "Instruments",
      info: "Make music your own! Our instrument instruction provides a fun and interactive way to learn guitar, piano, drums and more!",
      detailsLink: "/courses/instruments",
    },
    {
      image: "/dawn_img.png",
      title: "Arts",
      info: "Explore your artistic side! Our arts programs delve into drawing, painting, yoga and pottery, encouraging self- expression and exploration.",
      detailsLink: "/courses/arts",
    },
    {
      image: "/yoga.png",
      title: "Yoga",
      info: "Discover the transformative power of yoga and improve your overall health and well-being even if you're a beginner or a experienced practitioner. Join us on the mat and experience the numerous benefits of yoga for yourself.",
      detailsLink: "/courses/yoga",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-blue-50 to-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Our Courses
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Explore our comprehensive range of artistic disciplines
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-300 flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={`${course.title} Course`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-700 hover:scale-110`}
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {course.title}
                </h3>

                <p className="text-gray-700 mb-6 flex-grow leading-relaxed">{course.info}</p>

                <Link
                  href={course.detailsLink}
                  className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg mt-auto"
                >
                  Explore {course.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function WorkshopNew() {
  const workshops = await getWorkshops();

  if (!workshops || workshops.length === 0) {
    return (
      <section className="bg-teal-800 py-20 text-center" id="workshop">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl text-zinc-200 font-light mb-4">Workshops</h2>
          <p className="text-zinc-300 text-xl">
            No workshops are currently scheduled. Please check back soon for
            upcoming events!
          </p>
        </div>
      </section>
    );
  }

  // Helper function to format dates
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to calculate workshop duration in days
  const calculateDuration = (fromDate: string, toDate: string): number => {
    const start = new Date(fromDate).getTime();
    const end = new Date(toDate).getTime();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <section className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-white py-16 px-4" id="workshop">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Workshops
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100">
            Engaging and Informative Skill-Building Sessions
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-indigo-50 to-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {workshops.map((workshop: any, index: any) => (
              <div
                key={workshop._id || index}
                className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left column: Workshop information */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-teal-900 mb-4">
                        {workshop.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center text-teal-800">
                          <Calendar size={18} className="mr-2" />
                          <span>
                            {formatDate(workshop.fromdate)} -{" "}
                            {formatDate(workshop.todate)}
                          </span>
                        </div>

                        {workshop.duration && (
                          <div className="flex items-center text-teal-800">
                            <Clock size={18} className="mr-2" />
                            <span>{workshop.duration}</span>
                          </div>
                        )}

                        {!workshop.duration && (
                          <div className="flex items-center text-teal-800">
                            <Clock size={18} className="mr-2" />
                            <span>
                              {calculateDuration(
                                workshop.fromdate,
                                workshop.todate,
                              )}{" "}
                              days
                            </span>
                          </div>
                        )}

                        {workshop.location && (
                          <div className="flex items-center text-teal-800">
                            <MapPin size={18} className="mr-2" />
                            <span>{workshop.location}</span>
                          </div>
                        )}

                        {workshop.participantLimit && (
                          <div className="flex items-center text-teal-800">
                            <Users size={18} className="mr-2" />
                            <span>
                              Limited to {workshop.participantLimit}{" "}
                              participants
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-teal-950 prose max-w-none">
                        <article
                          dangerouslySetInnerHTML={{
                            __html: marked(workshop.markdown, { breaks: true }),
                          }}
                        ></article>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <JoinButton workshop={workshop._id} />

                      {workshop.brochureLink && (
                        <a
                          href={workshop.brochureLink}
                          className="inline-flex items-center px-4 py-2 border border-teal-800 text-teal-800 bg-transparent hover:bg-teal-50 rounded font-medium transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Brochure
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right column: Workshop image and quick info */}
                  <div className="md:py-8 md:pr-8 flex flex-col">
                    <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={workshop.mainImg || "/placeholder-workshop.jpg"}
                        className="object-cover"
                        layout="fill"
                        alt={`${workshop.title} workshop`}
                        priority={index === 0}
                      />

                      {workshop.featured && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white p-6 rounded-xl mt-6 shadow-md">
                      <h4 className="text-xl font-semibold mb-3">Quick Info</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="font-medium mr-2">When:</span>
                          <span>
                            {formatDate(workshop.fromdate)} -{" "}
                            {formatDate(workshop.todate)}
                          </span>
                        </li>

                        {workshop.price && (
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Fee:</span>
                            <span>₹{workshop.price}</span>
                          </li>
                        )}

                        {workshop.instructor && (
                          <li className="flex items-start">
                            <span className="font-medium mr-2">
                              Instructor:
                            </span>
                            <span>{workshop.instructor}</span>
                          </li>
                        )}

                        {workshop.skillLevel && (
                          <li className="flex items-start">
                            <span className="font-medium mr-2">Level:</span>
                            <span>{workshop.skillLevel}</span>
                          </li>
                        )}
                      </ul>

                      <div className="mt-4 pt-4 border-t border-teal-600">
                        <p className="text-amber-300 font-medium">
                          {workshop.registrationOpen !== false
                            ? "Registration Open!"
                            : "Registration Coming Soon"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add an FAQ or testimonials section if desired */}
      <section className="bg-teal-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-semibold text-teal-900 mb-6">
            Why Join Our Workshops?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-teal-800 mb-3">
                Expert Instructors
              </h3>
              <p className="text-gray-700">
                Learn from industry professionals with years of experience in
                their respective fields.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-teal-800 mb-3">
                Hands-on Learning
              </h3>
              <p className="text-gray-700">
                Our workshops focus on practical skills you can apply
                immediately in your creative journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-teal-800 mb-3">
                Community Connection
              </h3>
              <p className="text-gray-700">
                Connect with like-minded creatives and build lasting
                relationships in your artistic community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function Team() {
  const data = await GetAllFaculty();
  if (data.length >= 1)
    return (
      <div className="bg-gradient-to-b from-indigo-50 via-white to-blue-50 pb-20" id="team">
        <div className="max-w-7xl mx-auto p-4 pt-20">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-2xl text-indigo-600 font-semibold">
              Meet with our Top Professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                Our Team
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At Arty Facets, we are proud of our team of dedicated and
                highly skilled professionals who are passionate about their
                work. Our team comprises experts from various fields, each
                bringing a wealth of experience and knowledge. From creative
                designers to strategic thinkers, every member plays a
                crucial role in delivering exceptional results for our
                students. Our top professionals are not only leaders in their
                respective domains but also mentors and innovators who drive
                our vision forward. They have been carefully selected for
                their expertise, creativity, and commitment to excellence.
                Whether it&apos;s developing cutting-edge solutions,
                crafting compelling designs, or providing insightful
                strategies, our team members are here to meet and exceed
                your expectations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-8 rounded-2xl shadow-lg border-2 border-indigo-200">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                Personal Development
              </h3>
              <p className="text-gray-700 leading-relaxed">
                As a school committed to nurturing creativity, we offer a
                diverse range of arts, music, dance, and other creative
                programs. Our expert instructors provide rigorous training and
                inspiration, guiding students to explore their passions, develop
                their skills, and express themselves freely. Through performance
                opportunities and collaborative projects, students gain
                confidence, build essential life skills such as discipline,
                teamwork, and time management, and become well-rounded
                individuals ready to make a positive impact on the world.
              </p>
            </div>
          </div>

          <FacultyView data={data} />
        </div>
      </div>
    );
}
