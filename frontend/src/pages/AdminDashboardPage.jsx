import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_API_URL;

function buildCsv(registrations) {
  const headers = [
    "First Name",
    "Last Name",
    "Nickname",
    "Phone",
    "Jersey Size",
    "Role",
    "Payment Method",
    "Player Type",
    "Status",
  ];
  const rows = registrations.map((item) => [
    item.firstName,
    item.lastName,
    item.nickName,
    item.phone,
    item.jerseySize || "N/A",
    item.role,
    item.paymentMethod,
    item.playerType,
    item.status,
  ]);
  return [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("spl-admin") !== "true") {
      navigate("/admin/login");
      return;
    }

    fetch(`${backendUrl}/api/registrations`)
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load registrations.");
        setLoading(false);
      });
  }, [navigate]);

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      const response = await fetch(`${backendUrl}/api/registrations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setRegistrations((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setError("Failed to delete registration.");
    }
  };

  const downloadCsv = () => {
    const csv = buildCsv(registrations);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "registered_players.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const signOut = () => {
    sessionStorage.removeItem("spl-admin");
    navigate("/admin/login");
  };

  return (
    <main className="container py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/50 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Review submitted registrations and export the list.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadCsv}
            className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Download CSV
          </button>
          <button
            onClick={signOut}
            className="rounded-3xl border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      {loading && <p className="text-slate-300">Loading registrations…</p>}
      {error && <p className="text-rose-300">{error}</p>}

      {!loading && !registrations.length && (
        <p className="text-slate-300">No registrations yet.</p>
      )}

      <div className="space-y-4">
        {registrations.map((user, index) => (
          <div
            key={user._id}
            className="group flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 transition hover:border-cyan-500/50"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-slate-400">{user.nickName}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/admin/users/${user._id}`}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white"
                >
                  View Details
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-slate-200">Role:</span>{" "}
                {user.role}
              </p>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-slate-200">Payment:</span>{" "}
                {user.paymentMethod}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
