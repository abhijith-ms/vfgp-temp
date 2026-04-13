"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import icon from "../../../public/logo.png";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLLIElement>(null);
  const mobileDropdownRef = useRef<HTMLLIElement>(null);

  const industries = [
    { label: "Automobile", href: "/industries/automobile" },
    { label: "Defence", href: "/industries/defence" },
    { label: "Engineering", href: "/industries/engineering" },
  ];

  const closeMenu = () => {
    setOpen(false);
    setIndustriesOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedDesktopDropdown =
        desktopDropdownRef.current?.contains(target) ?? false;
      const clickedMobileDropdown =
        mobileDropdownRef.current?.contains(target) ?? false;

      if (
        industriesOpen &&
        !clickedDesktopDropdown &&
        !clickedMobileDropdown
      ) {
        setIndustriesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center px-6 md:px-12 py-4 relative">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src={icon}
            alt="logo"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
          />
          <h1 className="text-[13px] sm:text-[15px] md:text-[16px] leading-tight font-black uppercase text-[#1b2a52]">
            Venkateshwara <br /> Fibreglass Products
          </h1>
        </Link>

        <ul className="hidden lg:flex gap-8 xl:gap-10 items-center text-[#1b2a52] font-bold text-[15px]">
          <li>
            <Link href="/" className="hover:text-[#F27A22] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about_us"
              className="hover:text-[#F27A22] transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/product"
              className="hover:text-[#F27A22] transition-colors"
            >
              Products
            </Link>
          </li>
          <li className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setIndustriesOpen((value) => !value)}
              className="flex items-center gap-1 hover:text-[#F27A22] transition-colors"
            >
              Industries
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {industriesOpen && (
              <div className="absolute top-full left-0 mt-3 w-48 bg-white shadow-xl rounded-md border border-gray-100 py-2 z-50">
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    onClick={() => setIndustriesOpen(false)}
                    className="block px-4 py-2 text-sm text-[#1b2a52] hover:bg-[#f8f9fb] hover:text-[#F27A22] transition-colors"
                  >
                    {industry.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className="bg-[#1b2a52] hover:bg-[#283266] text-white px-7 py-3 rounded-md font-bold text-sm transition-colors shadow-md"
          >
            Get a Quote
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setOpen((value) => !value)}
            className="text-[#1b2a52] p-2 -mr-2 focus:outline-none hover:text-[#F27A22] transition-colors"
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 lg:hidden z-50">
          <ul className="flex flex-col items-center gap-6 py-8 text-[#1b2a52] font-bold text-base">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="hover:text-[#F27A22] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about_us"
                onClick={closeMenu}
                className="hover:text-[#F27A22] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                onClick={closeMenu}
                className="hover:text-[#F27A22] transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="w-full max-w-xs" ref={mobileDropdownRef}>
              <button
                onClick={() => setIndustriesOpen((value) => !value)}
                className="w-full flex items-center justify-center gap-2 hover:text-[#F27A22] transition-colors"
              >
                Industries
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {industriesOpen && (
                <div className="mt-3 flex flex-col items-center gap-3">
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      href={industry.href}
                      onClick={closeMenu}
                      className="hover:text-[#F27A22] transition-colors"
                    >
                      {industry.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="hover:text-[#F27A22] transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="mt-4 w-full px-6">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex justify-center bg-[#F27A22] text-white px-4 py-3.5 rounded-md shadow-md hover:bg-[#c96414] transition-colors w-full"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
