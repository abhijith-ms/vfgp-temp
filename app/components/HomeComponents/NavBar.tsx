"use client";

import React, { useEffect, useRef, useState } from "react";
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
  }, [industriesOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-3.5 relative">
        {/* Technical VFG Industrial Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/fulllogo.png?v=1"
            alt="logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 xl:gap-10 items-center text-white/80 font-cond font-semibold tracking-widest uppercase text-[13px]">
          <li>
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about_us"
              className="hover:text-brand-orange transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/product"
              className="hover:text-brand-orange transition-colors"
            >
              Products
            </Link>
          </li>
          <li className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setIndustriesOpen((value) => !value)}
              className="flex items-center gap-1 hover:text-brand-orange transition-colors cursor-pointer uppercase font-semibold"
            >
              Industries
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {industriesOpen && (
              <div className="absolute top-full left-0 mt-3.5 w-48 bg-brand-navy-mid border border-white/10 shadow-2xl rounded-sm py-2 z-50">
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    onClick={() => setIndustriesOpen(false)}
                    className="block px-5 py-2.5 text-xs text-white/90 font-cond uppercase tracking-wider hover:bg-white/5 hover:text-brand-orange transition-colors"
                  >
                    {industry.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* CTA Quote Button */}
        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className="bg-brand-orange hover:bg-brand-orange-light text-white px-6 py-2.5 font-cond font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-brand-orange/10"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setOpen((value) => !value)}
            className="text-white p-2 -mr-2 focus:outline-none hover:text-brand-orange transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-brand-navy border-t border-white/10 lg:hidden z-50 shadow-2xl">
          <ul className="flex flex-col items-center gap-5 py-8 text-white/90 font-cond font-bold tracking-widest uppercase text-sm">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="hover:text-brand-orange transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about_us"
                onClick={closeMenu}
                className="hover:text-brand-orange transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                onClick={closeMenu}
                className="hover:text-brand-orange transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="w-full max-w-xs text-center" ref={mobileDropdownRef}>
              <button
                onClick={() => setIndustriesOpen((value) => !value)}
                className="w-full flex items-center justify-center gap-1.5 hover:text-brand-orange transition-colors cursor-pointer"
              >
                Industries
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {industriesOpen && (
                <div className="mt-3 flex flex-col items-center gap-2.5 bg-brand-navy-mid/50 py-3 rounded-md border border-white/5">
                  {industries.map((industry) => (
                    <Link
                      key={industry.href}
                      href={industry.href}
                      onClick={closeMenu}
                      className="text-xs text-white/80 hover:text-brand-orange transition-colors"
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
                className="hover:text-brand-orange transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="mt-2 w-full px-8">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex justify-center bg-brand-orange text-white px-5 py-3 font-cond font-bold text-xs uppercase tracking-wider hover:bg-brand-orange-light transition-colors w-full shadow-lg"
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
