"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { ExternalLink, Github } from "lucide-react";

export default function AppleCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  return (
    <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Subtle background noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      
      {/* Gradient background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Selected Projects
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl">
            A collection of products, experiments and tools I&apos;ve built.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 pl-6 md:pl-12 max-w-[1400px] mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8 pr-6 md:pr-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0"
              >
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-white dark:bg-zinc-900 rounded-[24px] p-2 shadow-sm hover:shadow-xl transition-shadow duration-500 ease-out border border-zinc-200/50 dark:border-zinc-800/50 h-full flex flex-col"
                >
                  {/* Glassy hover highlight */}
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="relative overflow-hidden rounded-[18px] aspect-[16/10] mb-6">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="px-4 pb-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <a href={project.demo} className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 px-5 py-2.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
