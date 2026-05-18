"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSanityData, urlFor } from "@/lib/sanity";

const DEFAULT_ABOUT_CONTENT = {
  ourStory: {
    ourStory: "Our Story",
    passageTitle: "Just a group of friends who couldn't look away",
    paragraphs: [
      "We're a bunch of college friends from Bangalore who spent years grinding through the early years of our careers - and came out the other side asking: how can we make the world slightly less harsh, and a little better for others?",
      "In 2019, we registered Nalivu with no funding and no office. Just a shared conviction that the communities around us deserved more than what they had.",
      "Six years later, we're still the same friends - just further along."
    ],
    ourStoryStats: [
      { label: "Founded", value: "2019" },
      { label: "Where it began", value: "Bangalore" }
    ],
    image: {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200",
      caption: "The day we got registered",
      subCaption: "Bangalore, 2019",
      tag: "the OG crew"
    }
  },
  values: {
    valuesLabel: "Mission and Values",
    passageTitle: "What we stand for",
    items: [
      {
        icon: "❤️",
        title: "Community-first",
        description: "Every decision is led by the communities we serve - not by us."
      },
      {
        icon: "🤝",
        title: "Transparent",
        description: "92% of every rupee goes directly to programs. We publish our financials openly."
      },
      {
        icon: "🌱",
        title: "Long-term thinking",
        description: "We don't do quick fixes. We invest in sustainable systems that outlast us."
      }
    ]
  },
  foundersHeader: {
    foundersLabel: "The team",
    passageTitle: "The people behind Nalivu"
  },
  mainFounder: {
    initials: "NK",
    name: "Naveen Kumar",
    role: "Founder & Executive Director",
    bio: "15 years in grassroots development across South India. Driven by the belief that local leaders hold the answers."
  },
  founders: [
    {
      initials: "AK",
      name: "Amith Kumar",
      role: "Programs Lead",
      title: "Co-founder",
      bio: "Grew up in the same neighbourhood we now work in."
    },
    {
      initials: "RS",
      name: "Rohit Sharma",
      role: "Finance & Ops",
      title: "Co-founder",
      bio: "Still uses the same spreadsheet from day one."
    },
    {
      initials: "PM",
      name: "Pooja Mehta",
      role: "Community Partnerships",
      title: "Co-founder",
      bio: "Drafted the NGO registration at 2am."
    }
  ],
  whyNalivu: {
    whyNalivuLabel: "Why Nalivu",
    passageTitle: "Different by design",
    description: "We didn't come from fancy development schools. We came from the same system our communities are navigating - which means we actually understand it.",
    checks: [
      { label: "Community-led", detail: "local leaders design and run every program" },
      { label: "Founder-run", detail: "no layers, no bureaucracy, fast decisions" },
      { label: "Radically transparent", detail: "annual reports and financials are public" },
      { label: "Low overhead", detail: "92% of funds go directly to programs" }
    ],
    glance: [
      { label: "Founded", value: "2019, Bangalore" },
      { label: "Registered", value: "80G | 12A | FCRA" },
      { label: "Founded by", value: "3 college friends" },
      { label: "Overhead", value: "Only 8%", highlight: true }
    ]
  }
};

export default function AboutPage() {
  const [content, setContent] = useState(DEFAULT_ABOUT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const query = `*[_type == "aboutPage"][0]{
          ourStory,
          values,
          foundersHeader,
          mainFounder,
          founders,
          whyNalivu
        }`;
        const data = await getSanityData(query);
        if (data) {
          setContent(data);
        }
      } catch (err) {
        console.error("Sanity fetch failed, using defaults:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContent();
  }, []);

  if (isLoading) {
    return <div className="py-20 text-center text-ngo-text">Loading our story...</div>;
  }

  return (
    <div className="py-20 px-12 max-w-4xl mx-auto space-y-24">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-ngo-background p-8 md:p-12 rounded-3xl">
        <div className="space-y-6">
          <div>
            <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">{content.ourStory.ourStory}</span>
            <h1 className="text-3xl font-semibold text-ngo-dark mb-4 leading-tight">{content.ourStory.passageTitle}</h1>
          </div>
          <div className="space-y-4">
            {content.ourStory?.paragraphs?.map((p, i) => (
              <p key={i} className="text-ngo-text leading-relaxed">{p}</p>
            )) || <p className="text-ngo-text italic text-sm">Our story is being updated...</p>}
          </div>
          <div className="flex gap-8 pt-4">
            {content.ourStory?.ourStoryStats?.map((stat, i) => (
              <div key={i}>
                <div className="text-xl font-semibold text-ngo-green">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="relative group">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden aspect-[4/3] relative shadow-sm group-hover:shadow-md transition-shadow">
              <Image 
                src={content.ourStory.image?.url || (content.ourStory.image ? urlFor(content.ourStory.image).url() : "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200")} 
                alt={content.ourStory.image?.caption || "Our Story"}
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-3 right-6 bg-ngo-green text-white text-[10px] px-3 py-1 rounded-full font-medium uppercase tracking-wider z-10">
                {content.ourStory.image?.tag || "Team"}
              </div>
            </div>
            <div className="mt-4 px-2">
              <div className="text-sm font-medium text-ngo-dark">{content.ourStory.image?.caption || "The day we got registered"}</div>
              <div className="text-xs text-gray-400">{content.ourStory.image?.subCaption}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">{content.values?.valuesLabel}</span>
          <h2 className="text-3xl font-semibold text-ngo-dark">{content.values?.passageTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.values?.items?.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-ngo-green transition-colors shadow-sm group">
              <div className="w-10 h-10 bg-ngo-lightGreen rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-ngo-dark mb-2">{item.title}</h3>
              <p className="text-sm text-ngo-text leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8 bg-ngo-background p-12 rounded-3xl">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">
            {content.foundersHeader?.foundersLabel}
          </span>
          <h2 className="text-3xl font-semibold text-ngo-dark">
            {content.foundersHeader?.passageTitle}
          </h2>
        </div>

        {/* Featured Founder */}
        {content.mainFounder && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm mb-8">
            <div className="w-20 h-20 rounded-full bg-ngo-lightGreen flex items-center justify-center text-xl font-bold text-ngo-green flex-shrink-0">
              {content.mainFounder.initials}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-ngo-dark mb-1">{content.mainFounder.name}</h3>
              <div className="text-sm font-medium text-ngo-green mb-3">{content.mainFounder.role}</div>
              <p className="text-sm text-ngo-text leading-relaxed">{content.mainFounder.bio}</p>
            </div>
          </div>
        )}

        {/* Co-founders grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.founders?.map((founder, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-ngo-lightGreen flex items-center justify-center text-sm font-bold text-ngo-green mx-auto mb-4">
                {founder.initials}
              </div>
              <h3 className="text-sm font-semibold text-ngo-dark mb-1">{founder.name}</h3>
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">{founder.title}</div>
              <div className="text-xs font-medium text-ngo-green mb-2">{founder.role}</div>
              <p className="text-xs text-ngo-text italic leading-relaxed">&quot;{founder.bio}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div>
            <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">{content.whyNalivu?.whyNalivuLabel}</span>
            <h2 className="text-3xl font-semibold text-ngo-dark mb-4">{content.whyNalivu?.passageTitle}</h2>
          </div>
          <p className="text-ngo-text leading-relaxed mb-6">
            {content.whyNalivu?.description}
          </p>
          <div className="space-y-3">
            {content.whyNalivu?.checks?.map((check, i) => (
              <div key={i} className="flex gap-3 items-start text-sm group">
                <span className="text-ngo-green font-bold group-hover:scale-125 transition-transform">✓</span>
                <span className="text-ngo-text">
                  <strong className="text-ngo-dark font-medium">{check.label}</strong> - {check.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-ngo-background border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-6">At a Glance</div>
          <div className="space-y-4">
            {content.whyNalivu?.glance?.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className={`text-xs font-semibold ${item.highlight ? "text-ngo-green" : "text-ngo-dark"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
