import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center bg-[#0A0D14]">
      <div className="max-w-md">
        <h1 className="font-heading text-[6rem] font-bold text-[#3ABAB4] leading-none mb-2">
          404
        </h1>
        <p className="text-white/40 text-[13px] font-semibold tracking-[0.2em] uppercase mb-6">
          Page Not Found
        </p>
        <p className="text-white/60 text-[15px] leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[40px] bg-[#3ABAB4] text-white font-semibold hover:bg-[#3ABAB4]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
