"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const image = section.querySelector(".project-image");
        const content = section.querySelector(".project-content");
        const chips = section.querySelectorAll(".tech-chip");

        // Image parallax and fade
        gsap.fromTo(
          image,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );

        // Content fade and slide
        gsap.fromTo(
          content,
          { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );

        // Tech chips stagger
        gsap.fromTo(
          chips,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-zinc-950 text-zinc-50 py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Things I&apos;ve Built
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl">
          A deep dive into my most significant projects, showcasing the problems solved and the technologies used.
        </p>
      </div>

      <div className="space-y-32 md:space-y-48">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              ref={(el) => {
                sectionsRef.current[index] = el;
              }}
              className="max-w-7xl mx-auto px-6 md:px-12"
            >
              <div
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 lg:gap-24 items-center`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 project-image">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10">
                    <div className="absolute inset-0 bg-zinc-900/20 mix-blend-overlay z-10 pointer-events-none" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 project-content">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-mono text-indigo-400">
                      0{index + 1}
                    </span>
                    <div className="h-px bg-zinc-800 flex-1" />
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                    {project.details}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="tech-chip px-4 py-2 text-sm font-medium bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={project.demo}
                      className="group flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-500 transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href={project.github}
                      className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
