import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";

const statistics = [
  { label: "Entry Fee", value: "₹400 / person" },
  { label: "Owner Fee", value: "₹2,000 / team" },
  { label: "1st Prize", value: "₹5,555" },
  { label: "2nd Prize", value: "₹3,333" },
];

const rules = [
  "Only 6 teams will compete in SPL Season 7.",
  "Each match uses a 4-over format with fresh cricket balls.",
  "Teams must arrive 15 minutes before their match start time.",
  "Each team should field 10 players plus 1 substitute.",
  "The umpire's decision is final and binding.",
  "Matches are conducted under professional league rules.",
];

export default function HomePage() {
  return (
    <main className="container py-10 text-slate-100">
      <section className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <GlassCard className="overflow-hidden bg-slate-950/80 pb-6 pt-10 px-6 shadow-xl shadow-cyan-500/10 dark:bg-slate-950/80 light:bg-white/70 light:text-slate-950 light:shadow-slate-200/10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200 shadow-sm shadow-cyan-500/10 dark:text-cyan-200 light:border-cyan-500/40 light:bg-cyan-500/10 light:text-cyan-900">
              SPL Season 7
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl light:text-slate-950">
                Cricket tournament registration.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 dark:text-slate-300 light:text-slate-700">
                Secure your spot in SPL 2026
                {/* with a modern registration
                experience built for mobile-first teams, owners, and players. */}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:shadow-cyan-500/30"
              >
                Register Now
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/80 px-8 py-4 text-base font-semibold text-slate-100 transition hover:border-cyan-400/50 hover:bg-slate-900/95 light:border-slate-200/80 light:bg-white/80 light:text-slate-950"
              >
                Admin Portal
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statistics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-5 text-white shadow-sm shadow-slate-950/20 light:border-slate-200/40 light:bg-white/20 light:text-slate-950"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </GlassCard>

        <GlassCard className="space-y-6 bg-slate-950/80 p-8 dark:bg-slate-950/80 light:bg-white/80 light:text-slate-950">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-900/75 p-6 light:border-slate-200/40 light:bg-white/20">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                  Event
                </p>
                <p className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
                  1st June 2026
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800/60 bg-slate-900/75 p-6 light:border-slate-200/40 light:bg-white/20">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                  Venue
                </p>
                <p className="mt-3 text-3xl font-semibold text-white light:text-slate-950">
                  Green Land Palegaon
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] bg-gradient-to-br from-cyan-500/15 via-slate-900/60 to-slate-950/40 p-6 text-white shadow-xl shadow-cyan-500/10 light:bg-cyan-500/10 light:text-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">
                Seats are limited
              </p>
              <p className="mt-3 text-xl font-semibold">
                Only 6 premium teams accepted.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-700">
                Secure your spot early to enjoy a professional tournament
                atmosphere and premium event support.
              </p>
            </div>
          </motion.div>
        </GlassCard>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <GlassCard className="bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/80 light:text-slate-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-white light:text-slate-950">
              Rules & Regulations
            </h2>
            <div className="mt-6 grid gap-4">
              {rules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-3xl border border-slate-800/70 bg-slate-900/85 p-5 text-slate-200 dark:border-slate-700 light:border-slate-200/60 light:bg-white/20 light:text-slate-700"
                >
                  <p className="font-medium">{rule}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </GlassCard>

        <GlassCard className="bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/80 light:text-slate-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-3xl font-semibold text-white light:text-slate-950">
              Match Location
            </h2>
            <p className="mt-4 text-slate-300 light:text-slate-700">
              Green Land Palegaon, Ambernath (West) 421501 — a premium cricket
              ground built for modern league events.
            </p>
            {/* <div className="mt-8 rounded-[1.85rem] border border-cyan-400/10 bg-slate-900/85 p-6 text-slate-200 shadow-xl shadow-cyan-500/10 light:border-cyan-500/20 light:bg-cyan-500/10 light:text-slate-950">
              <p className="text-xl font-semibold">Game day essentials</p>
              <ul className="mt-4 space-y-3 text-slate-400 light:text-slate-700">
                <li>• Arrive 15 minutes before your scheduled match.</li>
                <li>• Teams must have 8 active players and 1 substitute.</li>
                <li>
                  • All matches follow standard professional league rules.
                </li>
              </ul>
            </div> */}
          </motion.div>
        </GlassCard>
      </section>
    </main>
  );
}
