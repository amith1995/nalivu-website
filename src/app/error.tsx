'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ngo-background flex items-center justify-center px-8">
      <div className="max-w-md w-full text-center space-y-8 p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-ngo-lightGreen rounded-full flex items-center justify-center text-3xl mx-auto">
          ⚠️
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-ngo-dark">Uh oh, something happened.</h1>
          <p className="text-ngo-text leading-relaxed">
            We encountered an unexpected error while trying to load this page. Our team has been notified.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="bg-ngo-green text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="text-ngo-green font-medium hover:underline text-sm"
          >
            Go back home
          </Link>
        </div>
        {error.digest && (
          <p className="text-[10px] text-gray-300 font-mono">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
