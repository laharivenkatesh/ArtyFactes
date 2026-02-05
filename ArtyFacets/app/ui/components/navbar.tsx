"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Mail, Menu, X, ChevronDown } from "lucide-react";

const NavBar = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  const MenuItems = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/#about-us",
    },
    {
      title: "Workshops",
      link: "/#workshop",
    },
    {
      title: "Courses",
      link: "/#coursestitle",
    },
    {
      title: "Team",
      link: "/#team",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  const isActive = (menuLink: any) => {
    if (menuLink === "/") {
      return path === menuLink;
    }
    return path.includes(menuLink.replace("#", ""));
  };

  return (
    <nav
      className={`fixed bg-teal-950 bg-opacity-95 w-full z-20 transition-all duration-300 ${isScrolled
        ? "shadow-lg h-16"
        : "hover:bg-teal-950 hover:bg-opacity-90 h-24"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" scroll={true} passHref>
              <div className="relative overflow-hidden flex items-center">
                <Image
                  src="/wlogo.png"
                  alt="Arty Facets Logo"
                  height={isScrolled ? 60 : 75}
                  width={isScrolled ? 60 : 75}
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              {MenuItems.map((menu) => (
                <Link key={menu.link} href={menu.link} passHref>
                  <button
                    className={`px-4 py-2 mx-1 rounded-xl transition-all duration-200 text-sm font-medium ${isActive(menu.link)
                      ? "text-black bg-yellow-500 shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-teal-800"
                      }`}
                  >
                    {menu.title}
                  </button>
                </Link>
              ))}
            </div>

            {/* Admin Dashboard Link */}
            {session?.user?.admin && (
              <Link href="/dashboard" passHref>
                <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors duration-200 text-sm font-medium flex items-center">
                  Dashboard
                </button>
              </Link>
            )}

            {/* Register Button */}
            <Link href="/join" passHref>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 shadow-md transition-all duration-200 text-sm font-medium flex items-center">
                Register Now
              </button>
            </Link>

            {/* Contact Icon */}
            <Link href="/#contact-us" scroll={true} passHref>
              <button
                className="p-2 rounded-full hover:bg-teal-800 transition-colors duration-200"
                aria-label="Contact Us"
              >
                <Mail size={24} className="text-white" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-teal-800 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-teal-950 bg-opacity-95 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "translate-y-full hidden"
          }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
          {MenuItems.map((menu) => (
            <Link key={menu.link} href={menu.link} passHref>
              <button
                onClick={toggleMenu}
                className={`w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${isActive(menu.link)
                  ? "text-black bg-yellow-500"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
                  }`}
              >
                {menu.title}
              </button>
            </Link>
          ))}

          {/* Mobile Register Button */}
          <div className="pt-2 pb-3">
            <Link href="/join" passHref>
              <button className="w-full bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-500 transition-colors duration-200 text-base font-medium">
                Register Now
              </button>
            </Link>
          </div>

          {/* Mobile Admin Dashboard Link */}
          {session?.user?.admin && (
            <div className="pt-1 pb-2">
              <Link href="/dashboard" passHref>
                <button className="w-full bg-sky-600 text-white px-4 py-3 rounded-md hover:bg-sky-500 transition-colors duration-200 text-base font-medium">
                  Dashboard
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Contact Link */}
          <Link href="/#contact-us" passHref>
            <button className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-teal-800 transition-colors duration-200">
              <Mail size={20} className="mr-2" />
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
