import AppleCarousel from "@/components/AppleCarousel";
import ExpandingGrid from "@/components/ExpandingGrid";
import ScrollStory from "@/components/ScrollStory";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-32 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-6">
          Portfolio Showcase
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10">
          Three different ways to showcase your projects. Scroll down to see the Apple-style carousel, the expanding grid, and the scroll story.
        </p>
      </section>

      {/* 1. Apple-Style Card Carousel */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <AppleCarousel />
      </div>

      {/* 2. Expanding Grid */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <ExpandingGrid />
      </div>

      {/* 3. Scroll Story */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <ScrollStory />
      </div>
    </main>
  );
}
