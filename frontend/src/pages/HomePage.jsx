import { Link } from "react-router-dom";

const statistics = [
  { label: "Entry Fee", value: "₹400 / person" },
  { label: "Owner Fee", value: "₹2,000 / team" },
  { label: "1st Prize", value: "₹5,555" },
  { label: "2nd Prize", value: "₹3,333" },
];

const rules = [
  "Total participate 4 Teams",
  "Every match will be league match",
  "Team need to report before 15 min of match",
  "Each team should have 8 players + 1 extra",
  "Umpire decision will be final & compulsory chasing",
  "Every match will be 4 over 4 fresh ball",
];

export default function HomePage() {
  return (
    <main className="container py-10 text-slate-100">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
              SPL Season 2026
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Cricket Registration Tournament
              </h1>
              <p className="max-w-2xl text-slate-300">
                Join the SPL tournament and register your team or player for the
                2026 season. Limited slots available—register now and secure
                your place.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Register Now
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Admin Login
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-6 shadow-xl shadow-cyan-500/10 ring-1 ring-slate-700 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Event Date
                </p>
                <p className="text-3xl font-semibold text-white">
                  1st June 2026
                </p>
              </div>
              <div className="text-5xl">🏏</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {statistics.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5"
                >
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Rules & Regulations
            </h2>
            <ul className="mt-6 space-y-3 text-slate-300">
              {rules.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-3 rounded-2xl bg-slate-950/80 px-4 py-3"
                >
                  <span className="mt-1 text-cyan-300">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Location</h2>
            <p className="mt-4 text-slate-300">
              Shiv Nagar, Near 12 No. Building, Ambernath (West)
            </p>
            <div className="mt-8 rounded-3xl bg-slate-950/90 p-6 text-center text-slate-200">
              <p className="text-xl font-semibold text-white">
                Limited teams only
              </p>
              <p className="mt-3 text-sm text-slate-400">
                Register early to avoid missing the tournament.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
