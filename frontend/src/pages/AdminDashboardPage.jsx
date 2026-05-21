import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

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
    item.status || "Submitted",
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
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredRegistrations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return registrations;
    return registrations.filter((item) => {
      return [
        item.firstName,
        item.lastName,
        item.nickName,
        item.phone,
        item.role,
        item.paymentMethod,
        item.playerType,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [registrations, searchTerm]);

  const ownerCount = registrations.filter(
    (item) => item.role === "owner",
  ).length;
  const playerCount = registrations.filter(
    (item) => item.role === "player",
  ).length;
  const onlineCount = registrations.filter(
    (item) => item.paymentMethod === "online",
  ).length;

  return (
    <main className="container py-10">
      <GlassCard className="bg-slate-950/90 p-8 dark:bg-slate-950/90 light:bg-white/90 light:text-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
                Admin control
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white light:text-slate-950">
                Registration dashboard
              </h1>
              <p className="mt-2 text-slate-400 light:text-slate-700">
                Search, export, and manage player registrations with a modern
                responsive interface.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadCsv}
                className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Export CSV
              </button>
              <button
                onClick={signOut}
                className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white light:border-slate-200/80 light:text-slate-950"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.85rem] border border-slate-800/60 bg-slate-900/85 p-6 light:border-slate-200/40 light:bg-white/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                Total registrations
              </p>
              <p className="mt-4 text-3xl font-semibold text-white light:text-slate-950">
                {registrations.length}
              </p>
            </div>
            <div className="rounded-[1.85rem] border border-slate-800/60 bg-slate-900/85 p-6 light:border-slate-200/40 light:bg-white/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                Players
              </p>
              <p className="mt-4 text-3xl font-semibold text-white light:text-slate-950">
                {playerCount}
              </p>
            </div>
            <div className="rounded-[1.85rem] border border-slate-800/60 bg-slate-900/85 p-6 light:border-slate-200/40 light:bg-white/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 light:text-slate-500">
                Team owners
              </p>
              <p className="mt-4 text-3xl font-semibold text-white light:text-slate-950">
                {ownerCount}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 rounded-[1.75rem] border border-slate-800/60 bg-slate-900/85 p-4 light:border-slate-200/40 light:bg-white/80">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search players, phone, role, or payment"
                className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 light:border-slate-300 light:bg-white/90 light:text-slate-950"
              />
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/60 bg-slate-900/85 p-4 text-sm text-slate-300 light:border-slate-200/40 light:bg-white/80 light:text-slate-700">
              Online payment count:{" "}
              <span className="font-semibold text-white light:text-slate-950">
                {onlineCount}
              </span>
            </div>
          </div>
        </motion.div>
      </GlassCard>

      {loading && <p className="mt-6 text-slate-300">Loading registrations…</p>}
      {error && <p className="mt-6 text-rose-300">{error}</p>}

      {!loading && !filteredRegistrations.length && (
        <p className="mt-6 rounded-[1.75rem] border border-slate-700/60 bg-slate-950/75 px-6 py-8 text-center text-slate-300 light:border-slate-200/40 light:bg-white/80 light:text-slate-700">
          No registrations match this search. Try a different keyword or refresh
          the page.
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-800/60 bg-slate-950/85 shadow-xl shadow-slate-950/20 dark:border-slate-700 light:border-slate-200/40 light:bg-white/90">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-300">
            <thead className="bg-slate-950/95 text-slate-500 light:bg-white/95 light:text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-800/60 hover:bg-slate-900/80 transition dark:hover:bg-slate-900 light:hover:bg-slate-100"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-white light:text-slate-950">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="text-xs text-slate-500 light:text-slate-600">
                      {item.nickName}
                    </p>
                  </td>
                  <td className="px-6 py-5">{item.phone}</td>
                  <td className="px-6 py-5">{item.role}</td>
                  <td className="px-6 py-5">{item.paymentMethod}</td>
                  <td className="px-6 py-5">{item.playerType}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link
                        to={`/admin/users/${item._id}`}
                        className="rounded-full border border-slate-700/60 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-white light:border-slate-300/60 light:text-slate-950"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => deleteUser(item._id)}
                        className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
