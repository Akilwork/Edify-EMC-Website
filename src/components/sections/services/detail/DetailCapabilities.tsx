import { motion } from "framer-motion";
import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";

const CAPABILITIES_SUBTITLES: Record<string, string> = {
  "human-resource-services": "Tailored HR strategies that attract top talent, enhance staff retention, and build high-performing educational teams.",
  "academic-services": "Strategic institutional consulting and holistic student mentoring that strengthen quality standards, governance, and wellbeing.",
  "it-solutions-digital-transformation": "End-to-end technology solutions that modernise campuses, streamline operations, and secure digital infrastructure.",
  "marketing": "Distinct visual identities, premium prints, and promotional assets that elevate your brand prestige.",
  "civil-engineering-infrastructure": "Feasibility, master planning, and engineering oversight that build safe, future-ready learning spaces.",
  "transportation-service": "Fully managed transportation fleets designed for maximum safety, efficiency, and parent peace of mind.",
  "uniform-services": "Custom school clothing and sports kits designed for comfort, durability, and institutional pride.",
  "financial-services": "Rigorous financial planning, auditing, and cost-optimization solutions built for long-term resilience.",
  "sports-training-talent-development": "Professional coaching and athletic development pathways to foster talent and character.",
  "canteen-management-services": "Turnkey canteen management, nutritious meal planning, and strict food hygiene standards for student wellbeing.",
  "project-management-development": "End-to-end project management and consulting for the development of schools, residential projects, offices, and facilities.",
  "administration-service": "Comprehensive administration and operational support services tailored to keep your institution running efficiently.",
};

/* ── Bento Grid Card Inner Illustrations ── */
const ConcentricTunnelGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/tunnel">
    {/* Concentric Tunnel Rectangles */}
    <div className="absolute inset-2 rounded-lg border border-purple-500/10" />
    <div className="absolute inset-4 rounded-lg border border-purple-500/15" />
    <div className="absolute inset-6 sm:inset-7 rounded-lg border border-purple-500/20" />
    <div className="absolute inset-9 sm:inset-10 rounded-lg border border-purple-500/25" />
    <div className="absolute inset-12 sm:inset-14 rounded-lg border border-purple-500/30" />
    
    {/* Glowing Light Streaks on Tunnel Edges */}
    <div className="absolute top-2 left-1/3 w-8 h-[2px] bg-[#9F7DFF] shadow-[0_0_8px_#9F7DFF] opacity-80 group-hover/tunnel:w-16 transition-all duration-500" />
    <div className="absolute left-3 top-1/2 w-[2px] h-8 bg-[#c084fc] shadow-[0_0_8px_#c084fc] opacity-80 group-hover/tunnel:h-12 transition-all duration-500" />
    <div className="absolute right-6 bottom-1/3 w-[2px] h-6 bg-[#9F7DFF] shadow-[0_0_8px_#9F7DFF] opacity-70" />
    <div className="absolute bottom-3 right-1/4 w-10 h-[2px] bg-[#e879f9] shadow-[0_0_8px_#e879f9] opacity-70" />

    {/* Center Glass Card with Fingerprint Emblem */}
    <div className="relative z-10 w-14 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 rounded-xl bg-gradient-to-b from-[#21183c] to-[#0f0a1d] border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center group-hover/tunnel:scale-105 transition-transform duration-300">
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#c084fc] drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M14 13.12c0 2.38-.2 4.41-.44 6.88" />
        <path d="M8.5 12.08A4.5 4.5 0 0 1 13 7.6c2.4 0 4.5 1.8 4.5 4.5 0 3.2-.28 6.4-.64 9.4" />
        <path d="M6 13c0-3.3 2.7-6 6-6 3.5 0 6.5 2.8 6.5 6.5 0 3.8-.36 7.5-.78 11" />
        <path d="M3.5 13.5A8.5 8.5 0 0 1 12 5c4.7 0 8.5 3.8 8.5 8.5" />
      </svg>
    </div>
  </div>
);

const RadarSweepGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/radar">
    <div className="absolute w-32 h-32 rounded-full border border-purple-500/15" />
    <div className="absolute w-20 h-20 rounded-full border border-purple-500/20" />
    <div className="absolute w-10 h-10 rounded-full border border-purple-500/30" />
    <div className="absolute w-full h-[1px] bg-purple-500/10" />
    <div className="absolute h-full w-[1px] bg-purple-500/10" />
    <div className="absolute w-32 h-32 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(168,85,247,0.35)_360deg)] animate-[spin_5s_linear_infinite]" />
    <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc] animate-ping" />
    <div className="absolute bottom-10 left-14 w-1.5 h-1.5 rounded-full bg-[#9F7DFF] shadow-[0_0_6px_#9F7DFF]" />
  </div>
);

const CodeBlockGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden p-3 font-mono text-[10px] sm:text-[11px] leading-relaxed text-white/60 mt-5 select-none group/code">
    <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/5">
      <div className="w-2 h-2 rounded-full bg-red-500/40" />
      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
      <div className="w-2 h-2 rounded-full bg-green-500/40" />
      <span className="ml-2 text-[9px] text-white/30 font-sans">app.config.ts</span>
    </div>
    <div className="space-y-1">
      <div><span className="text-[#e879f9]">const</span> <span className="text-[#9F7DFF]">system</span> = <span className="text-cyan-400">useEducation</span>();</div>
      <div><span className="text-white/40">&lt;</span><span className="text-pink-400">ServiceModule</span> <span className="text-purple-300">status</span>=<span className="text-emerald-400">&quot;active&quot;</span><span className="text-white/40">&gt;</span></div>
      <div className="pl-4 text-white/50"><span className="text-purple-400">optimization</span>: <span className="text-cyan-300">&quot;100%&quot;</span></div>
    </div>
  </div>
);

const BrowserWindowGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden p-3 mt-5 flex flex-col group/browser">
    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="flex-1 bg-white/5 rounded-md px-2.5 py-0.5 text-[8px] text-white/40 font-mono flex items-center justify-between">
        <span>edifyemc.com/services</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </div>
    </div>
    <div className="space-y-1.5 flex-1 flex flex-col justify-center">
      <div className="w-3/4 h-2 rounded bg-gradient-to-r from-purple-500/40 to-indigo-500/20" />
      <div className="w-1/2 h-1.5 rounded bg-white/10" />
      <div className="w-5/6 h-1.5 rounded bg-white/10" />
    </div>
  </div>
);

const UserProfileLayerGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/profile">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/2"></div>
    </div>
    
    <div className="relative z-10 flex items-center justify-center">
      <div className="absolute w-16 h-16 rounded-2xl bg-white/5 border border-white/10 transform rotate-12 scale-90 opacity-50 group-hover/profile:rotate-[24deg] transition-transform duration-700"></div>
      
      <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#1a1528] to-[#0a0710] rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center group-hover/profile:scale-105 transition-transform duration-500">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
          <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
      
      <div className="absolute -left-6 bottom-0 w-6 h-6 bg-[#1a1528] border border-white/10 rounded-md flex items-center justify-center shadow-lg group-hover/profile:-translate-x-2 transition-transform duration-500">
        <div className="w-2 h-2 rounded-sm bg-purple-500/40"></div>
      </div>
      
      <div className="absolute -right-6 top-0 w-6 h-6 bg-[#1a1528] border border-white/10 rounded-md flex items-center justify-center shadow-lg group-hover/profile:translate-x-2 transition-transform duration-500">
        <svg className="w-3 h-3 text-cyan-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
      </div>
    </div>
  </div>
);

const ChartDashboardGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden p-3 mt-5 flex flex-col justify-between group/chart">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-semibold text-purple-300 uppercase tracking-wider">Metrics</span>
      <span className="text-[9px] text-emerald-400 font-mono">+28.4%</span>
    </div>
    <div className="flex items-end gap-1.5 h-14 pt-2">
      <div className="flex-1 bg-purple-500/20 rounded-t h-2/5 group-hover/chart:h-1/2 transition-all duration-300" />
      <div className="flex-1 bg-purple-500/30 rounded-t h-3/5 group-hover/chart:h-3/4 transition-all duration-300" />
      <div className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t h-4/5 group-hover/chart:h-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
      <div className="flex-1 bg-purple-500/30 rounded-t h-1/2 group-hover/chart:h-3/5 transition-all duration-300" />
      <div className="flex-1 bg-purple-500/40 rounded-t h-2/3 group-hover/chart:h-4/5 transition-all duration-300" />
    </div>
  </div>
);

const CreditCardGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/cc">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/3"></div>
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent bottom-1/3"></div>
    </div>
    
    <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_5px_#c084fc]"></div>
    <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>

    <div className="relative z-10 w-24 h-14 bg-gradient-to-b from-[#1a1528] to-[#0c0914] rounded-lg border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between p-2.5 group-hover/cc:scale-105 transition-transform duration-500">
      <div className="flex justify-between items-start">
        <div className="w-3 h-2 rounded-sm bg-gradient-to-r from-amber-200/40 to-yellow-500/40 border border-yellow-500/20"></div>
        <svg className="w-3 h-3 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
      </div>
      <div className="flex gap-1.5 mt-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      </div>
    </div>
    
    <div className="absolute bottom-3 md:bottom-6 w-16 h-4 rounded-md border border-white/5 bg-[#0a0710] flex items-center justify-center gap-1">
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
      <div className="w-1 h-1 rounded-full bg-white/30 text-[8px]"></div>
    </div>
  </div>
);

const CurrencyHexagonsGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/hex">
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
      <div className="w-[1px] h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
    </div>
    
    <svg className="w-32 h-32 relative z-10 group-hover/hex:scale-105 transition-transform duration-700" viewBox="0 0 100 100">
      <g className="transform translate-x-[35px] translate-y-[15px]">
        <polygon points="15,0 30,8.5 30,25.5 15,34 0,25.5 0,8.5" fill="#1a1528" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="15" y="21" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="serif" textAnchor="middle">$</text>
      </g>
      <g className="transform translate-x-[18px] translate-y-[45px]">
        <polygon points="15,0 30,8.5 30,25.5 15,34 0,25.5 0,8.5" fill="#1a1528" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="15" y="21" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="serif" textAnchor="middle">£</text>
      </g>
      <g className="transform translate-x-[52px] translate-y-[45px]">
        <polygon points="15,0 30,8.5 30,25.5 15,34 0,25.5 0,8.5" fill="#1a1528" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="15" y="21" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="serif" textAnchor="middle">¥</text>
      </g>
    </svg>
  </div>
);

const DigitalGlobeGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/globe">
    <div className="absolute w-32 h-8 rounded-[100%] border border-white/10 transform rotate-12 group-hover/globe:rotate-[24deg] transition-transform duration-1000">
      <div className="absolute top-0 right-4 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_5px_#c084fc]"></div>
    </div>
    
    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#1a1528] to-[#0a0710] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)_inset] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[1px] h-full bg-white/40"></div>
        <div className="w-full h-[1px] bg-white/40"></div>
        <div className="absolute w-12 h-full rounded-[100%] border border-white/40"></div>
        <div className="absolute w-full h-12 rounded-[100%] border border-white/40"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.2),transparent_60%)]"></div>
    </div>
  </div>
);

const SecureFolderGraphic = () => (
  <div className="relative w-full h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden flex items-center justify-center mt-5 group/folder">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
    </div>

    <div className="relative z-10 w-20 h-16 group-hover/folder:-translate-y-1 transition-transform duration-500">
      <div className="absolute inset-0 bg-[#151121] rounded-md border border-white/10"></div>
      <div className="absolute top-0 left-0 w-8 h-4 bg-[#151121] border-t border-l border-r border-white/10 rounded-t-sm -mt-3"></div>
      
      <div className="absolute inset-2 bg-gradient-to-b from-[#1a1528] to-[#0c0914] rounded shadow-inner border border-white/5 overflow-hidden p-1.5 flex flex-col gap-1">
        <div className="w-3/4 h-1 bg-purple-500/30 rounded"></div>
        <div className="w-1/2 h-1 bg-cyan-500/20 rounded"></div>
        <div className="w-full h-1 bg-white/10 rounded"></div>
        <div className="text-[6px] font-mono text-white/40 mt-1">01100101</div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-br from-[#1a1528]/90 to-[#0a0710]/95 backdrop-blur-sm border-t border-white/10 rounded-b-md shadow-lg transform -skew-x-2"></div>
    </div>
  </div>
);

function renderCardGraphic(index: number) {
  const type = index % 10;
  switch (type) {
    case 0:
      return <ConcentricTunnelGraphic />;
    case 1:
      return <ChartDashboardGraphic />;
    case 2:
      return <RadarSweepGraphic />;
    case 3:
      return <BrowserWindowGraphic />;
    case 4:
      return <CodeBlockGraphic />;
    case 5:
      return <UserProfileLayerGraphic />;
    case 6:
      return <CreditCardGraphic />;
    case 7:
      return <CurrencyHexagonsGraphic />;
    case 8:
      return <DigitalGlobeGraphic />;
    case 9:
    default:
      return <SecureFolderGraphic />;
  }
}

const getColSpanClass = (index: number, totalCount: number) => {
  if (totalCount === 12) {
    if ([0, 1, 2, 5, 6, 7].includes(index)) return "col-span-12 md:col-span-4";
    return "col-span-12 md:col-span-6";
  }
  if (totalCount === 10) {
    if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
    if (index >= 2 && index <= 7) return "col-span-12 md:col-span-4";
    return "col-span-12 md:col-span-6";
  }
  if (totalCount === 8) {
    if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
    return "col-span-12 md:col-span-4";
  }
  if (totalCount === 7) {
    if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
    if (index >= 2 && index <= 4) return "col-span-12 md:col-span-4";
    return "col-span-12 md:col-span-6";
  }
  if (totalCount === 5) {
    if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
    return "col-span-12 md:col-span-4";
  }
  if (totalCount % 3 === 0) {
    return "col-span-12 md:col-span-4";
  }
  if (totalCount % 2 === 0) {
    return "col-span-12 md:col-span-6";
  }
  return "col-span-12 md:col-span-4";
};

export default function DetailCapabilities({ detail }: { detail: ServiceDetail }) {
  const items = detail.capabilities.items;
  const totalCount = items.length;
  const subtitle = CAPABILITIES_SUBTITLES[detail.slug] || "Tailored services and solutions designed to support your institution's specific goals.";

  return (
    <section className="relative w-full bg-[#000000] py-16 md:py-24 overflow-hidden">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealSection>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-tight mb-4 uppercase">
              OUR SERVICES
            </h2>
          </RevealSection>
          <RevealSection delay={0.05}>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </RevealSection>
        </div>

        {/* Grid of Animated Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.08 }}
          className="grid grid-cols-12 gap-6 w-full max-w-6xl mx-auto"
        >
          {items.map((item, index) => {
            const colSpan = getColSpanClass(index, totalCount);

            return (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`${colSpan} w-full flex`}
              >
                <div className="group relative backdrop-blur-xl rounded-[22px] border shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 p-7 md:p-9 flex flex-col justify-between w-full h-full min-h-[190px] md:min-h-[220px] overflow-hidden text-left bg-[#0b0813] border-[#2d1b4e] hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]">

                  <div>
                    {/* Title */}
                    <h4 className="text-white text-lg md:text-xl font-bold mb-2 font-sans tracking-tight transition-colors">
                      {item.title}
                    </h4>

                    {/* Subheading if present (Capabilities don't have subHeading, but keeping it safe) */}
                    {(item as any).subHeading && (
                      <p className="text-[#9F7DFF] text-xs font-semibold uppercase tracking-wider mb-3">
                        {(item as any).subHeading}
                      </p>
                    )}

                    {/* Description */}
                    {item.description && (
                      <div className="mt-2">
                        {item.description.includes('•') ? (
                          <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-xs text-white/70 font-sans leading-relaxed">
                            {item.description.split('•').map((sub, sIdx, arr) => (
                              <span key={sIdx} className="inline-flex items-center">
                                <span className="text-white/85 font-medium">{sub.trim()}</span>
                                {sIdx < arr.length - 1 && (
                                  <span className="ml-2 text-purple-400/60 font-bold">•</span>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-white/70 text-sm leading-relaxed font-sans font-normal">
                            {item.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Inner Card Graphic Illustration */}
                  <div className="absolute bottom-0 right-0 w-3/4 h-3/4 sm:w-2/3 sm:h-2/3 md:w-3/5 md:h-3/5 flex items-end justify-end group-hover:scale-105 transition-transform duration-500 origin-bottom-right">
                    <img 
                      src={`/Our Service/${(index % 12) + 1}.png`} 
                      alt={item.title} 
                      className="w-full h-full object-contain object-bottom right-0 bottom-0 mix-blend-lighten pointer-events-none select-none" 
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      onError={(e) => {
                         e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

