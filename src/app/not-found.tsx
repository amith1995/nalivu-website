import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ngo-background flex items-center justify-center px-8">
      <div className="max-w-md w-full text-center space-y-8 p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-ngo-lightGreen rounded-full flex items-center justify-center text-3xl mx-auto">
          🔍
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-ngo-dark">Page not found.</h1>
          <p className="text-ngo-text leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link 
            href="/"
            className="bg-ngo-green text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
