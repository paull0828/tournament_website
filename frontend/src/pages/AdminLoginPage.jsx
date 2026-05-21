import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "spl2026";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = credentials;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("spl-admin", "true");
      navigate("/admin/users");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-xl">
        <GlassCard className="bg-slate-950/90 p-10 dark:bg-slate-950/90 light:bg-white/95 light:text-slate-950">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
              Admin access
            </p>
            <h1 className="text-4xl font-semibold text-white light:text-slate-950">
              Login to your dashboard
            </h1>
            <p className="text-slate-400 light:text-slate-700">
              Manage registrations, view details, and export participant lists.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <p className="rounded-[1.75rem] border border-rose-500/30 bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
                {error}
              </p>
            )}

            <label className="relative block">
              <input
                type="text"
                value={credentials.username}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    username: event.target.value,
                  })
                }
                placeholder=" "
                required
                className="peer h-16 w-full rounded-[1.75rem] border border-slate-700 bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 light:border-slate-300 light:bg-white/90 light:text-slate-950"
              />
              <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-300 light:text-slate-500">
                Username
              </span>
            </label>

            <label className="relative block">
              <input
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
                placeholder=" "
                required
                className="peer h-16 w-full rounded-[1.75rem] border border-slate-700 bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 light:border-slate-300 light:bg-white/90 light:text-slate-950"
              />
              <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-300 light:text-slate-500">
                Password
              </span>
            </label>

            <button className="inline-flex w-full justify-center rounded-[1.75rem] bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110">
              Login
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
