"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909]">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <div className="text-xl font-black tracking-widest">
          DXM<span className="text-red-600">.</span>
        </div>

        <nav className="hidden gap-8 text-sm uppercase tracking-wider md:flex">
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#artists">Artists</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-5 text-lg">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </header>

      <section className="flex min-h-[85vh] flex-col justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-red-500">
            Diabolus Ex Machina
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-8xl">
            The underground
            <br />
            has no limits.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/50 md:text-lg">
            Extreme metal events, tours and artists. Building connections across
            the underground metal scene.
          </p>

          <a
            href="#events"
            className="mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-sm uppercase tracking-widest transition hover:border-red-500 hover:bg-red-600"
          >
            Explore Events <FaArrowRight />
          </a>
        </motion.div>
      </section>

      <section
        id="events"
        className="border-t border-white/10 px-6 py-24 md:px-12"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-red-500">
          What's happening
        </p>
        <h2 className="mt-4 text-4xl font-bold uppercase md:text-6xl">
          Upcoming Events
        </h2>
        <p className="mt-5 text-white/40">
          Event listings will be implemented here.
        </p>
      </section>
    </main>
  );
}
