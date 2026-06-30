"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0D14]">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h1 className="font-heading text-[3rem] font-bold text-white mb-4">
              Critical Error
            </h1>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[40px] bg-[#3ABAB4] text-white font-semibold hover:bg-[#3ABAB4]/90 transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
