
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FiMenu,
    FiX,
    FiArrowUpRight,
    FiXCircle,
} from "react-icons/fi";

const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "#events" },
    { label: "About DXM", href: "#about" },
    { label: "Bands / Artists", href: "#artists" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Detect scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Lock background scrolling when mobile menu is open
    useEffect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}

            <header
                className={`sticky top-0  z-50 w-full border-b transition-colors duration-300 ${scrolled
                        ? "border-white/10 bg-neutral-950/90 shadow-lg backdrop-blur-xl"
                        : "border-white/10 bg-neutral-950/40 backdrop-blur-md"
                    }`}
            >
                <nav
                    className="flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-10"
                    aria-label="Main navigation"
                >
                    {/* Logo */}

                    <Link
                        href="/"
                        className="flex shrink-0 flex-col leading-none text-white"
                        aria-label="DXM India homepage"
                    >
                        <span className="text-3xl font-black tracking-tighter">
                            DXM
                        </span>

                        <span className="mt-1 text-[9px] font-semibold tracking-[0.45em] text-neutral-400">
                            INDIA
                        </span>
                    </Link>

                    {/* Desktop Navigation */}

                    <div className="hidden items-center gap-7 lg:flex xl:gap-9">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* For Bands CTA */}

                        <Link
                            href="#contact"
                            className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-black transition-colors duration-200 hover:bg-neutral-300"
                        >
                            For Bands

                            <FiArrowUpRight
                                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="flex size-11 shrink-0 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
                        aria-label="Open navigation menu"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <FiMenu size={23} />
                    </button>
                </nav>
            </header>

            {/* ================= MOBILE DRAWER ================= */}

            <div
                className={`fixed inset-0 z-60 lg:hidden ${menuOpen
                        ? "visible"
                        : "invisible pointer-events-none"
                    }`}
                aria-hidden={!menuOpen}
            >
                {/* Backdrop */}

                <button
                    type="button"
                    onClick={closeMenu}
                    className={`absolute inset-0 h-full w-full bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${menuOpen
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                    aria-label="Close navigation menu"
                    tabIndex={menuOpen ? 0 : -1}
                />

                {/* Drawer Panel */}

                <aside
                    id="mobile-navigation"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    inert={!menuOpen}
                    className={`absolute right-10 top-10 flex h-dvh w-[85%] max-w-90 flex-col overflow-y-auto border-l border-white/10 bg-neutral-950 p-6 shadow-2xl transition-transform duration-300 ease-out sm:p-7 ${menuOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                        }`}
                >
                    {/* Drawer Header */}

                    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-6">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            tabIndex={menuOpen ? 0 : -1}
                            className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white"
                        >
                            DXM

                            <span className="text-xs font-semibold tracking-widest text-neutral-400">
                                INDIA
                            </span>
                        </Link>

                        <button
                            type="button"
                            onClick={closeMenu}
                            tabIndex={menuOpen ? 0 : -1}
                            className="flex size-11 shrink-0 items-center justify-center rounded-md  text-crimson-700 transition-colors hover:bg-white/10"
                            aria-label="Close navigation menu"
                        >
                            <FiX size={32} />
                        </button>
                    </div>

                    {/* Drawer Navigation Links */}

                    <div className="mt-8 flex flex-col">
                        {navigationLinks.map((link, index) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                tabIndex={menuOpen ? 0 : -1}
                                className="flex items-center justify-between border-b border-white/10 py-5 text-lg font-semibold text-neutral-300 transition-colors hover:text-white"
                            >
                                <span>{link.label}</span>

                                <span className="text-sm text-neutral-600">
                                    0{index + 1}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Drawer CTA */}

                    <div className="mt-auto shrink-0 border-t border-white/100 pt-6">
                        <Link
                            href="#contact"
                            onClick={closeMenu}
                            tabIndex={menuOpen ? 0 : -1}
                            className="flex items-center justify-between rounded-md bg-black px-5 py-4 font-bold text-white"
                        >
                            For Bands

                            <FiArrowUpRight size={20} />
                        </Link>

                        <p className="mt-5 text-xs tracking-wide text-neutral-500">
                            DXM INDIA — UNDERGROUND MUSIC CULTURE
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
}
