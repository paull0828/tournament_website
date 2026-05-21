import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "spl2025";

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
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/50">
        <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-slate-400">
          Enter the admin credentials to manage registrations.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-3xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          )}

          <label className="block text-sm text-slate-200">
            <span className="mb-2 block font-medium text-slate-300">
              Username
            </span>
            <input
              type="text"
              value={credentials.username}
              onChange={(event) =>
                setCredentials({ ...credentials, username: event.target.value })
              }
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <label className="block text-sm text-slate-200">
            <span className="mb-2 block font-medium text-slate-300">
              Password
            </span>
            <input
              type="password"
              value={credentials.password}
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
              required
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <button className="inline-flex w-full justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
