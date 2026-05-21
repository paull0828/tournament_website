export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition duration-500 dark:border-slate-700/60 dark:bg-slate-950/60 ${className}`}
    >
      {children}
    </div>
  );
}
