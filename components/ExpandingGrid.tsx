"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { ExternalLink, Github, X, ArrowRight } from "lucide-react";

export default function ExpandingGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className="group cursor-pointer bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div layoutId={`image-container-${project.id}`} className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="p-6">
                <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`desc-${project.id}`} className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-1">
                  {project.description}
                </motion.p>
                <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded-md">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
              >
                <motion.div layoutId={`image-container-${selectedProject.id}`} className="relative aspect-[21/9] sm:aspect-[16/9] md:aspect-[21/9] w-full shrink-0">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>

                <div className="p-6 md:p-10 overflow-y-auto">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        {selectedProject.title}
                      </motion.h3>
                      <motion.p layoutId={`desc-${selectedProject.id}`} className="text-lg text-zinc-500 dark:text-zinc-400">
                        {selectedProject.description}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-3 shrink-0"
                    >
                      <a href={selectedProject.demo} className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href={selectedProject.github} className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        GitHub <Github className="w-4 h-4" />
                      </a>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">About the project</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {selectedProject.details}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">Technologies</h4>
                      <motion.div layoutId={`tech-${selectedProject.id}`} className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md border border-zinc-200/50 dark:border-zinc-700/50">
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                      
                      <div className="mt-10">
                        <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                          Read Case Study <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
