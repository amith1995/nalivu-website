export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 px-12 flex justify-between items-center bg-white">
      <div className="text-ngo-green font-semibold text-lg">Nalivu</div>
      <div className="flex gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-ngo-green transition">Privacy Policy</a>
        <a href="#" className="hover:text-ngo-green transition">Terms of Service</a>
      </div>
      <div className="text-xs text-gray-300">© 2026 Nalivu NGO. All rights reserved.</div>
    </footer>
  );
}
