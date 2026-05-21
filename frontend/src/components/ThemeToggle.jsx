import { motion } from "framer-motion";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-950/75 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-slate-950/20 transition hover:border-cyan-400/50 hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
    >
      <span className="relative flex h-7 w-12 items-center rounded-full bg-slate-700/80 p-1 transition">
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="h-5 w-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/20"
          style={{ x: isDark ? 24 : 0 }}
        />
      </span>
      <span className="hidden sm:inline font-medium text-slate-200">
        {isDark ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
}
