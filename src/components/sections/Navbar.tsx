import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-5 border-b border-gray-200 bg-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-ngo-green hover:opacity-80 transition">
        <div className="w-8 h-8 bg-ngo-green rounded-lg flex items-center justify-center text-white text-xs">
          N
        </div>
        Nalivu
      </Link>
      <div className="flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-ngo-green transition">Home</Link>
        <Link href="/about" className="hover:text-ngo-green transition">About</Link>
        <Link href="/volunteer" className="hover:text-ngo-green transition">Volunteer</Link>
        <Link href="/contact" className="hover:text-ngo-green transition">Contact</Link>
      </div >
      <Link 
        href="/donate" 
        className="bg-ngo-green text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
      >
        Donate Now
      </Link>
    </nav>
  );
}
