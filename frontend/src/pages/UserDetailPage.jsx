import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";
const backendUrl = import.meta.env.VITE_API_URL;

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("spl-admin") !== "true") {
      navigate("/admin/login");
      return;
    }

    fetch(`${backendUrl}/api/registrations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setError("Failed to load user details."));
  }, [id, navigate]);

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-700/80 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white light:border-slate-200/80 light:bg-white/80 light:text-slate-950"
        >
          Back to Users
        </button>

        <GlassCard className="bg-slate-950/90 p-8 dark:bg-slate-950/90 light:bg-white/95 light:text-slate-950">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
                Registration details
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white light:text-slate-950">
                User profile
              </h1>
            </div>

            {error && (
              <p className="rounded-[1.75rem] border border-rose-500/30 bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
                {error}
              </p>
            )}
            {!user && !error && (
              <p className="text-slate-300 light:text-slate-700">
                Loading user details…
              </p>
            )}

            {user && (
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["First Name", user.firstName],
                  ["Last Name", user.lastName],
                  ["Nick Name", user.nickName],
                  ["Phone", user.phone],
                  ["Jersey Size", user.jerseySize || "N/A"],
                  ["Role", user.role],
                  ["Payment Method", user.paymentMethod],
                  ["Player Type", user.playerType],
                  ["Status", user.status || "Submitted"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.75rem] border border-slate-800/60 bg-slate-900/85 p-5 light:border-slate-200/40 light:bg-white/80 light:text-slate-700"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white light:text-slate-950">
                      {value}
                    </p>
                  </div>
                ))}

                <div className="rounded-[1.75rem] border border-slate-800/60 bg-slate-900/85 p-5 light:border-slate-200/40 light:bg-white/80 light:text-slate-700 sm:col-span-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                    Receipt
                  </p>
                  {user.receipt ? (
                    <a
                      href={
                        user.receipt.startsWith("http")
                          ? user.receipt
                          : `/${user.receipt.replace(/^\/+/, "")}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15 light:border-cyan-500/30 light:bg-cyan-200/10 light:text-cyan-900"
                    >
                      View Receipt
                    </a>
                  ) : (
                    <p className="mt-3 text-slate-300 light:text-slate-700">
                      No receipt uploaded.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
