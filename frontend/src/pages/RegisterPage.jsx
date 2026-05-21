import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

const backendUrl = import.meta.env.VITE_API_URL;
const jerseySizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const playerTypes = ["Batsman", "Bowler", "All-Rounder"];

const fieldList = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Nick Name", name: "nickName", type: "text" },
  { label: "Phone Number", name: "phone", type: "tel" },
];

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
  const [touched, setTouched] = useState({});

  const feeMessage = useMemo(() => {
    if (form.role === "player") return "You have to pay ₹400.";
    if (form.role === "owner") return "You have to pay ₹2,000.";
    return "";
  }, [form.role]);

  const errors = useMemo(() => {
    return {
      firstName: form.firstName.trim() ? "" : "First name is required.",
      lastName: form.lastName.trim() ? "" : "Last name is required.",
      phone: /^[0-9]{10}$/.test(form.phone)
        ? ""
        : "Phone number must be 10 digits.",
      jerseySize: form.jerseySize ? "" : "Please select a jersey size.",
      playerType: form.playerType ? "" : "Please select a player type.",
      role: form.role ? "" : "Please select your role.",
      paymentMethod: form.paymentMethod
        ? ""
        : "Please select a payment method.",
    };
  }, [form]);

  const isValid = useMemo(() => !Object.values(errors).some(Boolean), [errors]);
  const showPaymentDetails = form.paymentMethod === "online";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      jerseySize: true,
      playerType: true,
      role: true,
      paymentMethod: true,
    });

    if (!isValid) {
      setStatus({
        message: "Please correct the highlighted fields before submitting.",
        type: "error",
        loading: false,
      });
      return;
    }

    setStatus({ message: "", type: "", loading: true });
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (receipt) formData.append("receipt", receipt);

    try {
      const response = await fetch(`${backendUrl}/api/register`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");

      setStatus({
        message:
          "Registration Successful 🎉 Thank you for joining SPL Season 7.",
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
      setTouched({});
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
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="bg-slate-950/85 p-8 dark:bg-slate-950/85 light:bg-white/90 light:text-slate-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Player Registration
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white light:text-slate-950 sm:text-5xl">
              Register yourself for SPL Season 7 and showcase your game.
            </h1>
            {/* <p className="mt-4 max-w-2xl text-slate-300 leading-8 light:text-slate-700">
              Complete one polished form, protect against duplicate submissions,
              and receive premium confirmation instantly.
            </p> */}
            {/* <div className="mt-8 space-y-4 rounded-[2rem] border border-slate-800/60 bg-slate-900/85 p-6 shadow-xl shadow-cyan-500/10 light:border-slate-200/40 light:bg-slate-100/80">
              <div className="flex items-center gap-3 text-sm text-slate-300 light:text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                  ✓
                </span>
                Secure registration with smart validation and a premium
                mobile-first experience.
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300 light:text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-700/15 text-cyan-200 ring-1 ring-slate-700/20">
                  ⚡
                </span>
                Smooth onboarding with animated interactions and fast feedback.
              </div>
            </div> */}
          </motion.div>
        </GlassCard>

        <GlassCard className="bg-slate-950/90 p-8 dark:bg-slate-950/90 light:bg-white/90 light:text-slate-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white light:text-slate-950">
                  Register for SPL 2026
                </h2>
                {/* <p className="mt-2 text-slate-400 light:text-slate-700">
                  A polished registration flow for players and owners.
                </p> */}
              </div>
              <Link
                to="/"
                className="inline-flex rounded-full border border-slate-700/80 bg-slate-950/80 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-white light:border-slate-200/80 light:bg-white/80 light:text-slate-950"
              >
                Back to Home
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6">
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className={`rounded-[1.75rem] border px-4 py-4 text-sm ${
                      status.type === "success"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-200"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid gap-5 sm:grid-cols-2">
                {fieldList.map((field) => {
                  const hasError =
                    touched[field.name] && Boolean(errors[field.name]);
                  return (
                    <label key={field.name} className="relative block">
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={`peer h-16 w-full rounded-[1.5rem] border px-4 pt-6 pb-2 text-slate-100 outline-none transition duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950/90 light:border-slate-300 light:bg-white/90 light:text-slate-950 ${hasError ? "border-rose-400 focus:border-rose-400" : "border-slate-700"}`}
                      />
                      <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-300 dark:peer-focus:text-cyan-300 light:text-slate-500">
                        {field.label}
                      </span>
                      {hasError && (
                        <p className="mt-2 text-sm text-rose-300">
                          {errors[field.name]}
                        </p>
                      )}
                    </label>
                  );
                })}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="relative block">
                  <select
                    name="jerseySize"
                    value={form.jerseySize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer h-16 w-full rounded-[1.5rem] border bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950/90 light:border-slate-300 light:bg-white/90 light:text-slate-950 ${touched.jerseySize && errors.jerseySize ? "border-rose-400" : "border-slate-700"}`}
                  >
                    <option value="">Select jersey size</option>
                    {jerseySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs">
                    Jersey Size
                  </span>
                  {touched.jerseySize && errors.jerseySize && (
                    <p className="mt-2 text-sm text-rose-300">
                      {errors.jerseySize}
                    </p>
                  )}
                </label>

                <label className="relative block">
                  <select
                    name="playerType"
                    value={form.playerType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer h-16 w-full rounded-[1.5rem] border bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950/90 light:border-slate-300 light:bg-white/90 light:text-slate-950 ${touched.playerType && errors.playerType ? "border-rose-400" : "border-slate-700"}`}
                  >
                    <option value="">Select player type</option>
                    {playerTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs">
                    Player Type
                  </span>
                  {touched.playerType && errors.playerType && (
                    <p className="mt-2 text-sm text-rose-300">
                      {errors.playerType}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="relative block">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer h-16 w-full rounded-[1.5rem] border bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950/90 light:border-slate-300 light:bg-white/90 light:text-slate-950 ${touched.role && errors.role ? "border-rose-400" : "border-slate-700"}`}
                  >
                    <option value="">Select your role</option>
                    <option value="player">Player</option>
                    <option value="owner">Owner</option>
                  </select>
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs">
                    Registering As
                  </span>
                  {touched.role && errors.role && (
                    <p className="mt-2 text-sm text-rose-300">{errors.role}</p>
                  )}
                </label>

                <label className="relative block">
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer h-16 w-full rounded-[1.5rem] border bg-slate-950/90 px-4 pt-6 pb-2 text-slate-100 outline-none transition duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950/90 light:border-slate-300 light:bg-white/90 light:text-slate-950 ${touched.paymentMethod && errors.paymentMethod ? "border-rose-400" : "border-slate-700"}`}
                  >
                    <option value="">Select payment method</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs">
                    Payment Method
                  </span>
                  {touched.paymentMethod && errors.paymentMethod && (
                    <p className="mt-2 text-sm text-rose-300">
                      {errors.paymentMethod}
                    </p>
                  )}
                </label>
              </div>

              {feeMessage && (
                <div className="rounded-[1.75rem] border border-cyan-500/30 bg-cyan-500/10 p-4 text-cyan-200">
                  {feeMessage}
                </div>
              )}

              {showPaymentDetails && (
                <div className="rounded-[1.75rem] border border-slate-700/60 bg-slate-900/85 p-6 text-slate-200 dark:border-slate-700 light:border-slate-300 light:bg-white/90 light:text-slate-950">
                  <p className="text-sm font-semibold text-cyan-200">
                    Online Payment Instructions
                  </p>
                  <p className="mt-2 text-slate-300 light:text-slate-700">
                    Upload a receipt after completing the payment to complete
                    registration.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/90 p-4">
                    <img
                      src="/qr-code.jpg"
                      alt="QR Payment"
                      className="h-52 w-full rounded-3xl object-cover"
                    />
                  </div>
                </div>
              )}

              {form.paymentMethod === "online" && (
                <label className="relative block">
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-slate-400 transition-all duration-300">
                    Receipt Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setReceipt(event.target.files?.[0] ?? null)
                    }
                    className="mt-8 w-full cursor-pointer rounded-[1.5rem] border border-slate-700 bg-slate-950/90 px-4 py-4 text-slate-100 outline-none transition duration-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-slate-950"
                  />
                </label>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center justify-center gap-3 rounded-[1.75rem] bg-gradient-to-r from-cyan-400 to-sky-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.loading ? (
                  <>
                    <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"></span>
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </form>
          </motion.div>
        </GlassCard>
      </div>

      <AnimatePresence>
        {status.type === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-sm"
          >
            <div className="max-w-md rounded-[2rem] border border-cyan-500/20 bg-slate-950/95 p-8 text-center shadow-2xl shadow-cyan-500/20 light:border-slate-200/30 light:bg-white/95 light:text-slate-950">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20">
                <svg viewBox="0 0 24 24" className="h-10 w-10 fill-cyan-400">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white light:text-slate-950">
                Registration Successful 🎉
              </h2>
              <p className="mt-3 text-slate-300 light:text-slate-700">
                Thank you for joining SPL Season 7. Your registration has been
                received and your team is on the roster.
              </p>
              <button
                type="button"
                onClick={() =>
                  setStatus({ message: "", type: "", loading: false })
                }
                className="mt-8 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
