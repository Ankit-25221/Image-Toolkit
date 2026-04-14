import Link from "next/link";
import { UploadCloud, Layers, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-4xl w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8">
          <Zap className="h-4 w-4" />
          <span>Next.js 15 + ImageKit Demo</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          The Ultimate <br className="hidden md:block" />
          <span className="gradient-text">Media Toolkit</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl px-4">
          Seamlessly upload, process, and deliver optimized images and videos at lightning speed securely.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <Link
            href="/login"
            className="glass-btn flex-1 sm:flex-none sm:w-48 !py-4"
          >
            Get Started
            <Layers className="h-5 w-5 ml-1" />
          </Link>
          <Link
            href="/upload"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 text-white font-medium transition-all duration-300"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Media
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left px-4">
          {[
            { title: "Lightning Fast", desc: "Edge-optimized delivery with Next.js App Router." },
            { title: "Secure Storage", desc: "Encrypted token-based uploads via ImageKit API." },
            { title: "Smart Media", desc: "Automatic format conversions & responsive compression." },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 border-white/5 hover:border-cyan-500/20 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}