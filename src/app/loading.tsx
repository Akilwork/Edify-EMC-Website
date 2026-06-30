export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#0A0D14]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#3ABAB4] border-t-transparent" />
        <p className="text-white/50 text-[14px] font-medium tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
