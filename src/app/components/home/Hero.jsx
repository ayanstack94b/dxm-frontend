
"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {FiArrowUpRight,FiVolume2,FiVolumeX,FiPause,FiPlay,} from "react-icons/fi";

const DEFAULT_EVENT = {
    title: "Featured Event",
    date: "Details coming soon",
    location: "Location to be announced",
    href: "/events",
};

export default function Hero({
    videoSrc = "/videos/dxm-hero.mp4",
    posterSrc = "/images/dxm-hero-poster.jpg",
    headline = "THE UNDERGROUND HAS A HOME.",
    description = "Bringing together underground metal culture, independent artists and live music experiences across India.",
    featuredEvent = DEFAULT_EVENT,
}) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const shouldReduceMotion = useReducedMotion();

    // Keep playback state synchronized with the video element.
    const togglePlayback = async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch {
                setIsPlaying(false);
            }
        } else {
            video.pause();
        }
    };

    // Background video starts muted to support browser autoplay policies.
    const toggleMute = () => {
        const video = videoRef.current;

        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 24,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const animationProps = shouldReduceMotion
        ? {}
        : {
            initial: "hidden",
            animate: "visible",
            variants: contentVariants,
        };

    return (
        <section
            aria-label="DXM India introduction"
            className="relative isolate flex min-h-[720px] w-full max-w-none items-center overflow-hidden bg-black text-white sm:min-h-[760px] lg:min-h-[820px] lg:h-[calc(100svh-80px)] lg:max-h-[1000px]"
        >
            {/* Background video */}
            <div className="absolute inset-0 -z-30">
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover object-center"
                    src={videoSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            </div>

            {/* Dark overlays for text readability */}
            <div className="absolute inset-0 -z-20 bg-black/55" />

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/65 to-black/15" />

            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

            {/* Main hero content */}
            <div className="mx-auto grid w-full grid-cols-1 items-center justify-between gap-12 px-5 pb-24 pt-5 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8 lg:px-16 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-12 xl:px-20">

                {/* DXM identity */}
                <motion.div
                    className="max-w-3xl"
                    {...animationProps}
                >
                    <span className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                        <span className="h-px w-8 bg-red-500" />
                        DXM India
                    </span>

                    <h1 className="w-full max-w-[750px] text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl">
                        {headline}
                    </h1>

                    <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 md:text-lg">
                        {description}
                    </p>

                    {/* Primary and secondary navigation */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href="/events"
                            className="group main-cta inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-red-600 hover:text-white"
                        >
                            Explore Events
                            <FiArrowUpRight
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                size={18}
                            />
                        </a>

                        <a
                            href="/about"
                            className="group secondary-btn inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                            About DXM
                            <FiArrowUpRight
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                size={18}
                            />
                        </a>
                    </div>
                </motion.div>

                {/* Featured event card */}
                <motion.aside
                    className="w-full max-w-md justify-self-start lg:justify-self-end"
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.8, delay: 0.25, ease: "easeOut" }
                    }
                    aria-label="Featured event"
                >
                    <div className="relative border border-white/20 bg-black/65 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                                Featured Event
                            </span>

                            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                        </div>

                        <h2 className="text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                            {featuredEvent.title}
                        </h2>

                        <div className="my-6 h-px w-full bg-white/20" />

                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                    Date
                                </p>
                                <p className="mt-1 text-sm font-medium text-white/90">
                                    {featuredEvent.date}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                    Location
                                </p>
                                <p className="mt-1 text-sm font-medium text-white/90">
                                    {featuredEvent.location}
                                </p>
                            </div>
                        </div>

                        <a
                            href={featuredEvent.href || "/events"}
                            className="group mt-8 flex min-h-12 w-full items-center justify-between border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:border-red-600 hover:bg-red-600"
                        >
                            Explore Tour
                            <FiArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                    </div>
                </motion.aside>
            </div>

            {/* Video playback controls */}
            <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2 sm:bottom-8 sm:right-10">
                <button
                    type="button"
                    onClick={togglePlayback}
                    aria-label={isPlaying ? "Pause background video" : "Play background video"}
                    aria-pressed={!isPlaying}
                    className="flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                    {isPlaying ? <FiPause size={17} /> : <FiPlay size={17} />}
                </button>

                <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute background video" : "Mute background video"}
                    aria-pressed={!isMuted}
                    className="flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                    {isMuted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
                </button>
            </div>
        </section>
    );
}
