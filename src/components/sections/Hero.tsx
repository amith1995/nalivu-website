import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function Hero({ 
  imageUrl = "https://images.unsplash.com/photo-1488521787991-004687cba18a?auto=format&fit=crop&q=80&w=2000",
  title = "Building a sustainable future, one village at a time.",
  subtitle = "We provide the resources, education, and support needed to lift communities out of poverty and create lasting change."
}: HeroProps) {
  return (
    <section className="relative text-center py-24 px-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={imageUrl} 
          alt="Sustainable Village" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ngo-background/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10">
        <span className="text-xs tracking-widest uppercase text-ngo-green font-bold mb-4 block">
          Empowering Communities
        </span>
        <h1 className="text-5xl font-semibold leading-tight max-w-2xl mx-auto mb-6 text-ngo-dark">
          {title}
        </h1>
        <p className="text-lg text-ngo-text max-w-lg mx-auto mb-10">
          {subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/donate" className="bg-ngo-green text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
            Join the Cause
          </Link>
          <Link href="/about" className="border border-ngo-green text-ngo-green px-8 py-3 rounded-lg font-medium hover:bg-ngo-lightGreen transition">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
