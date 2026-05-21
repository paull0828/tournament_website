import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const jerseySizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const playerTypes = ["Batsman", "Bowler", "All-Rounder"];

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    phone: "",
    jerseySize: "",
    role: "",
    paymentMethod: "",
    playerType: "",
  });
  const [receipt, setReceipt] = useState(null);
  const [status, setStatus] = useState({
    message: "",
    type: "",
    loading: false,
  });

  const feeMessage = useMemo(() => {
    if (form.role === "player") return "You have to pay ₹200.";
    if (form.role === "owner") return "You have to pay ₹2,000.";
    return "";
  }, [form.role]);

  const showPaymentDetails = form.paymentMethod === "online";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "", type: "", loading: true });

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (receipt) {
      formData.append("receipt", receipt);
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");
      setStatus({
        message: data.message || "Registration successful!",
        type: "success",
        loading: false,
      });
      setForm({
        firstName: "",
        lastName: "",
        nickName: "",
        phone: "",
        jerseySize: "",
        role: "",
        paymentMethod: "",
        playerType: "",
      });
      setReceipt(null);
    } catch (error) {
      setStatus({
        message: error.message || "An error occurred.",
        type: "error",
        loading: false,
      });
    }
  };

  return (
    <main className="container py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/50">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">
              Player Registration
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">
              Register for SPL 2026
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white"
          >
            Back to Poster
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {status.message && (
            <div
              className={`rounded-3xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-500 bg-emerald-500/10 text-emerald-200" : "border-rose-500 bg-rose-500/10 text-rose-200"}`}
            >
              {status.message}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Nick Name", name: "nickName", type: "text" },
              { label: "Phone Number", name: "phone", type: "tel" },
            ].map((field) => (
              <label key={field.name} className="block text-sm text-slate-200">
                <span className="mb-2 block font-medium text-slate-300">
                  {field.label}
                </span>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  pattern={field.name === "phone" ? "[0-9]{10}" : undefined}
                  placeholder={field.label}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="mb-2 block font-medium text-slate-300">
                Jersey Size
              </span>
              <select
                name="jerseySize"
                value={form.jerseySize}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="">-- Select Size --</option>
                {jerseySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-200">
              <span className="mb-2 block font-medium text-slate-300">
                Player Type
              </span>
              <select
                name="playerType"
                value={form.playerType}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="">-- Select Type --</option>
                {playerTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="mb-2 block font-medium text-slate-300">
                Registering As
              </span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="">-- Select Role --</option>
                <option value="player">Player</option>
                <option value="owner">Owner</option>
              </select>
            </label>
            <label className="block text-sm text-slate-200">
              <span className="mb-2 block font-medium text-slate-300">
                Payment Method
              </span>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="">-- Select Payment --</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </label>
          </div>

          {feeMessage && (
            <div className="rounded-3xl border border-cyan-500/40 bg-cyan-500/10 p-4 text-cyan-200">
              {feeMessage}
            </div>
          )}

          {showPaymentDetails && (
            <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-5">
              <p className="text-sm font-semibold text-cyan-200">
                Online Payment Selected
              </p>
              <p className="mt-2 text-slate-300">
                Upload a receipt after completing the payment.
              </p>
              <img
                src="/qr-code.jpg"
                alt="QR Code"
                className="mt-4 h-56 w-full rounded-3xl object-cover border border-slate-800"
              />
            </div>
          )}

          <label className="block text-sm text-slate-200">
            <span className="mb-2 block font-medium text-slate-300">
              Receipt Upload
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setReceipt(event.target.files?.[0] ?? null)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-slate-950"
            />
          </label>

          <button
            type="submit"
            disabled={status.loading}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}
