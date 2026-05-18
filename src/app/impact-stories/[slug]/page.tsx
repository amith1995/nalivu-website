import { getSanityData, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

export default async function ImpactStoryPage({ params }: { params: { slug: string } }) {
  let story = null;
  try {
    const query = `*[_type == "impactStory" && slug.current == "${params.slug}"][0]`;
    story = await getSanityData(query);
  } catch (error) {
    console.error("Sanity fetch failed in [slug] page:", error);
  }

  // Demo fallback data mapping
  const demoStories: Record<string, any> = {
    "meena-education": {
      title: "I was the first in my family to finish school",
      name: "Meena, 17",
      category: "Education",
      location: "Krishnagiri, Tamil Nadu",
      content: `
        <p class="mb-4">Meena grew up in a small household in Krishnagiri where education was always a stretch — financially and logistically. When her father lost his daily wage job in 2021, she was pulled out of school midway through Class 9.</p>
        <p class="mb-4">A neighbour told her family about Nalivu's education program. Within two weeks, Meena was enrolled in bridge classes, given a small scholarship to cover her school fees, and paired with a mentor from the community.</p>
        <p class="mb-4">In 2023, she appeared for her Class 12 board exams — the first person in her family to ever do so. She scored 78%.</p>
        <p>"I didn't think this was possible for someone like me," she says. "But here I am."</p>
      `,
      testimonials: [
        { quote: "Nalivu didn't just pay fees. They made my daughter feel like she belonged in school.", attr: "Meena's mother, Selvi" },
        { quote: "She came to our program scared and quiet. She left it confident and determined.", attr: "Priya, Nalivu education volunteer" }
      ],
      image: "https://images.unsplash.com/photo-1503676263881-5727677464e5?auto=format&fit=crop&q=80&w=800"
    },
    "rajan-livelihoods": {
      title: "My farm finally feeds my family and earns us income",
      name: "Rajan, 42",
      category: "Livelihoods",
      location: "Tumkur, Karnataka",
      content: `
        <p class="mb-4">Rajan has farmed the same two acres in Tumkur for over twenty years. Despite the hard work, his yields barely covered the family's needs — let alone the debt from seeds and fertiliser.</p>
        <p class="mb-4">When Nalivu's agriculture team visited his village in 2022, Rajan was sceptical. He'd heard promises before. But the program was different — it was run by other farmers from nearby districts who had already seen results.</p>
        <p class="mb-4">He switched to a mixed-crop model, received quality seeds at subsidised cost, and learned water-efficient irrigation techniques. In the first season, his yield doubled.</p>
        <p>"I've been farming my whole life," he says. "I just needed someone to show me a different way."</p>
      `,
      testimonials: [
        { quote: "For the first time, I had money left over after paying back my loan.", attr: "Rajan" },
        { quote: "Rajan is now one of the farmers who mentors newcomers in the program.", attr: "Nalivu field coordinator" }
      ],
      image: "https://images.unsplash.com/photo-1500382008063-7b1f79a7e28b?auto=format&fit=crop&q=80&w=800"
    }
  };

  const displayStory = story || demoStories[params.slug] || demoStories["meena-education"];

  return (
    <div className="py-20 px-12 max-w-3xl mx-auto">
      <Link href="/impact-stories" className="text-sm font-medium text-ngo-green hover:underline mb-8 block">
        ← Back to all stories
      </Link>
      
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-sm border border-gray-100">
        <Image 
          src={typeof displayStory.image === 'string' ? displayStory.image : (displayStory.image ? urlFor(displayStory.image).url() : '/placeholder.jpg')} 
          alt={displayStory.title || "Impact Story"} 
          fill
          className="object-cover" 
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase font-bold text-ngo-green px-2 py-1 bg-ngo-lightGreen rounded-full">
            {displayStory.category || "General"}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-400 font-medium">{displayStory.location}</span>
        </div>
        
        <h1 className="text-4xl font-semibold text-ngo-dark leading-tight">
          {displayStory.title}
        </h1>
        <p className="text-sm text-gray-400 font-medium">{displayStory.name}</p>
        
        <div className="pt-8 border-t border-gray-100">
          <div className="prose prose-ngo max-w-none text-ngo-text leading-relaxed text-lg">
            {Array.isArray(displayStory.content) ? (
              <PortableText value={displayStory.content} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: displayStory.content || displayStory.summary || "Content coming soon..." }} />
            )}
          </div>
        </div>

        {displayStory.testimonials && displayStory.testimonials.length > 0 && (
          <div className="pt-12 mt-12 border-t border-gray-100">
            <span className="text-[10px] tracking-widest uppercase text-ngo-green font-bold block mb-6">In their own words</span>
            <div className="grid gap-4">
              {displayStory.testimonials?.map((t: any, i: number) => (
                <div key={i} className="bg-ngo-background border-l-2 border-ngo-green p-6 rounded-r-2xl">
                  <p className="text-ngo-text italic mb-3">&quot;{t.quote}&quot;</p>
                  <div className="text-xs font-bold text-ngo-green">— {t.attr}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-ngo-background border border-gray-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-ngo-dark mb-2">Stories like this need your support</h3>
          <p className="text-sm text-ngo-text mb-8">Every contribution helps us reach more people like {displayStory.name?.split(',')[0] || "them"}.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/donate" className="bg-ngo-green text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
              Donate Now
            </Link>
            <Link href="/impact-stories" className="border border-gray-200 text-ngo-text px-8 py-3 rounded-lg font-medium hover:bg-white transition">
              Read more stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
