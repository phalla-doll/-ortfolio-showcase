"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";

export default function AppleCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Defer the initial state update to avoid synchronous setState in effect
    const initSelect = () => onSelect(emblaApi);
    initSelect();
    
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-24 md:py-32 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Selected Projects
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            A collection of products, experiments and tools I&apos;ve built.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex items-center gap-3"
        >
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 pl-6 md:pl-12 max-w-[1400px] mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8 pr-6 md:pr-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_90%] sm:flex-[0_0_65%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0"
              >
                <div className="group relative bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:-translate-y-1">
                  
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-t-3xl pointer-events-none" />
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 flex-1 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <a href={project.demo} className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 px-4 py-2.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        Live Demo
                      </a>
                      <a href={project.github} className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                        <Github className="w-4 h-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
