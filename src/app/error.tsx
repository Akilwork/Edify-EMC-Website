"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-heading text-[3rem] font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-white/60 text-[15px] leading-relaxed mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[40px] bg-[#3ABAB4] text-white font-semibold hover:bg-[#3ABAB4]/90 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
