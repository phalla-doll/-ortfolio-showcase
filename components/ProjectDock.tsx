"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import { projects } from "../app/data/projects";
import { ExternalLink, Github, X } from "lucide-react";

function DockItem({ project, mouseX, onClick }: { project: any, mouseX: any, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale width based on distance to mouse
  const widthSync = useTransform(distance, [-200, 0, 200], [200, 320, 200]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex flex-col origin-bottom cursor-pointer group"
    >
      {/* Blurred glow behind active card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-4 bg-indigo-500/20 blur-xl rounded-3xl -z-10"
          />
        )}
      </AnimatePresence>

      <motion.div 
        layoutId={`dock-card-${project.id}`}
        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-2xl w-full"
      >
        <motion.div layoutId={`dock-image-${project.id}`} className="relative w-full aspect-video shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div layoutId={`dock-content-${project.id}`} className="flex flex-col px-4 py-3 bg-white dark:bg-zinc-900 relative z-10">
          <motion.h3 layoutId={`dock-title-${project.id}`} className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {project.title}
          </motion.h3>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                <div className="pt-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-white bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 py-1.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors" 
                      onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank'); }}
                    >
                      Demo <ExternalLink className="w-3 h-3" />
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 py-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" 
                      onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }}
                    >
                      GitHub <Github className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectDock() {
  const mouseX = useMotionValue(Infinity);
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
    <section className="w-full py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-200/50 dark:to-zinc-900/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interactive Dock
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            Hover over the projects to see the dock effect.
          </p>
        </div>

        <div className="flex justify-center overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
          <div 
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-end gap-4 h-[380px] px-8 pb-8 min-w-max md:min-w-0"
          >
            {projects.map((project) => (
              <DockItem 
                key={project.id} 
                project={project} 
                mouseX={mouseX} 
                onClick={() => setSelectedId(project.id)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`dock-card-${selectedProject.id}`}
                className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] border border-zinc-200/50 dark:border-zinc-800/50"
              >
                <motion.div layoutId={`dock-image-${selectedProject.id}`} className="relative aspect-video w-full shrink-0 bg-zinc-100 dark:bg-zinc-800">
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

                <motion.div layoutId={`dock-content-${selectedProject.id}`} className="p-8 overflow-y-auto bg-white dark:bg-zinc-900">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <motion.h3 layoutId={`dock-title-${selectedProject.id}`} className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        {selectedProject.title}
                      </motion.h3>
                      <p className="text-lg text-zinc-500 dark:text-zinc-400">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <a href={selectedProject.demo} className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-500/20">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">About the project</h4>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {selectedProject.details}
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
