"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { ArrowRight } from "lucide-react";

export default function CursorRevealShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the floating image
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="w-full py-32 bg-[#050505] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-24">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-zinc-700"></span>
            05 // The Vault
          </h2>
          <p className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-300 max-w-2xl leading-tight">
            Hover to reveal. A brutalist approach to project discovery.
          </p>
        </div>

        <div className="flex flex-col w-full border-t border-zinc-800">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative py-12 md:py-16 border-b border-zinc-800 cursor-pointer flex flex-col md:flex-row md:items-center justify-between transition-colors hover:bg-zinc-900/40 -mx-6 px-6 md:mx-0 md:px-8"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 z-10">
                <span className="text-zinc-600 font-mono text-lg md:text-xl transition-colors group-hover:text-indigo-500">
                  0{index + 1}
                </span>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-500 group-hover:text-white transition-all duration-500 group-hover:translate-x-4">
                  {project.title}
                </h3>
              </div>

              {/* Mobile Inline Image (Hidden on Desktop) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: hoveredIndex === index ? "auto" : 0,
                  opacity: hoveredIndex === index ? 1 : 0,
                  marginTop: hoveredIndex === index ? 24 : 0
                }}
                className="md:hidden overflow-hidden w-full relative aspect-video rounded-xl z-10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Action Area */}
              <div className="mt-8 md:mt-0 flex items-center gap-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10 hidden sm:flex">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-zinc-300 font-medium">{project.tech[0]} & {project.tech[1]}</span>
                  <span className="text-zinc-500 text-sm">View Case Study</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cursor Image (Desktop Only) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] aspect-[4/3] pointer-events-none z-50 hidden md:block overflow-hidden rounded-2xl shadow-2xl shadow-black/50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={projects[hoveredIndex].image}
                alt={projects[hoveredIndex].title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle overlay to make it blend better */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
