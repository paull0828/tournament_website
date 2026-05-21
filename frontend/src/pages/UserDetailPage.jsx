import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/50">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white"
        >
          Back to Users
        </button>
        <h1 className="text-3xl font-semibold text-white">User Details</h1>
        {error && <p className="mt-4 text-rose-300">{error}</p>}
        {!user && !error && (
          <p className="mt-4 text-slate-300">Loading user details…</p>
        )}

        {user && (
          <div className="mt-6 space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            {[
              ["First Name", user.firstName],
              ["Last Name", user.lastName],
              ["Nick Name", user.nickName],
              ["Phone", user.phone],
              ["Jersey Size", user.jerseySize || "N/A"],
              ["Role", user.role],
              ["Payment Method", user.paymentMethod],
              ["Player Type", user.playerType],
              ["Status", user.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-lg font-medium text-white">{value}</p>
              </div>
            ))}
            <div className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Receipt</p>
              {user.receipt ? (
                <a
                  href={
                    user.receipt.startsWith("http")
                      ? user.receipt
                      : `/${user.receipt.replace(/^\/+/, "")}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex rounded-full border border-cyan-600 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/10"
                >
                  View Receipt
                </a>
              ) : (
                <p className="mt-2 text-slate-300">No receipt uploaded.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
