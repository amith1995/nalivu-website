"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSanityData, urlFor } from "@/lib/sanity";

const DEFAULT_STORIES = [
  {
    slug: "meena-education",
    category: "Education",
    location: "Krishnagiri, Tamil Nadu",
    title: "I was the first in my family to finish school",
    name: "Meena, 17",
    summary: "When Meena's father lost his job, she was pulled out of school. Nalivu's education program helped her return and complete her Class 12 exams.",
    image: "https://images.unsplash.com/photo-1503676263881-5727677464e5?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "rajan-livelihoods",
    category: "Livelihoods",
    location: "Tumkur, Karnataka",
    title: "My farm finally feeds my family and earns us income",
    name: "Rajan, 42",
    summary: "A smallholder farmer for two decades, Rajan could never break even. After joining Nalivu's agriculture program, his yield doubled in one season.",
    image: "https://images.unsplash.com/photo-1500382008063-7b1f79a7e28b?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "srinivas-health",
    category: "Health",
    location: "Mandya, Karnataka",
    title: "The diagnosis that saved a life",
    name: "Srinivas, 58",
    summary: "Regular screening camps in the village brought health care to the doorstep of those who could never afford to travel to the city.",
    image: "https://images.unsplash.com/photo-1584526366323-7b323895801e?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "arjun-education",
    category: "Education",
    location: "Hosur, Tamil Nadu",
    title: "Now I teach the younger kids in my village",
    name: "Arjun, 21",
    summary: "Arjun joined Nalivu's skills program in 2021 and is now a role model for children in his village, running weekend learning sessions.",
    image: "https://images.unsplash.com/photo-1497633762265-1d135a27535c?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "savitha-livelihoods",
    category: "Livelihoods",
    location: "Mysuru, Karnataka",
    title: "I started with ₹5,000 and now run a small business",
    name: "Savitha, 29",
    summary: "With a micro-grant and training, Savitha turned her tailoring hobby into a business that now employs two other women from her community.",
    image: "https://images.unsplash.com/photo-1556740758-947665972291?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "prabhu-health",
    category: "Health",
    location: "Mandya, Karnataka",
    title: "Clean water changed everything for our village",
    name: "Prabhu, 51",
    summary: "Nalivu installed a low-cost filtration system that dropped waterborne illness by 80% and improved school attendance.",
    image: "https://images.unsplash.com/photo-1542601906990-b4P9852a3fbb?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ImpactListingPage() {
  const [stories, setStories] = useState(DEFAULT_STORIES);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const query = `*[_type == "impactStory"]{
          "slug": slug.current, 
          category, 
          location, 
          title, 
          name, 
          summary, 
          image
        }`;
        const data = await getSanityData(query);
        if (data && data.length > 0) {
          setStories(data);
        }
      } catch (err) {
        console.error("Sanity fetch failed, using defaults:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStories();
  }, []);

  const categories = ["All"];
  const filteredStories = filter === "All" ? stories : stories.filter(s => s.category === filter);

  if (isLoading) {
    return <div className="py-20 text-center text-ngo-text">Loading stories...</div>;
  }

  return (
    <div className="py-20 px-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Real stories</span>
        <h1 className="text-4xl font-semibold text-ngo-dark mb-4">Impact from the ground</h1>
        <p className="text-ngo-text max-w-xl mx-auto">Every number in our impact stats is a person. Here are some of their stories.</p>
      </div>

      <div className="flex justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
              filter === cat ? "bg-ngo-green text-white border-ngo-green" : "border-gray-200 text-ngo-text hover:border-ngo-green"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredStories.map((story, i) => (
          <Link 
            key={i} 
            href={`/impact-stories/${story.slug}`}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image 
                src={typeof story.image === 'string' ? story.image : urlFor(story.image).url()} 
                alt={story.title} 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-[10px] tracking-widest uppercase font-bold text-ngo-green px-2 py-1 bg-ngo-lightGreen rounded-full">
                {story.category}
              </span>
              <h3 className="text-lg font-semibold text-ngo-dark leading-tight group-hover:text-ngo-green transition-colors">
                {story.title}
              </h3>
              <p className="text-xs text-gray-400 font-medium">{story.name} - {story.location}</p>
              <p className="text-sm text-ngo-text line-clamp-2 leading-relaxed">
                {story.summary}
              </p>
              <div className="pt-4 text-xs font-bold text-ngo-green group-hover:translate-x-1 transition-transform">
                Read her story →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
