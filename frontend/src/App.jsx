import { useEffect, useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("spl-theme");
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.classList.toggle(
      "light",
      initialTheme === "light",
    );
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("spl-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  const activeLink = ({ isActive }) =>
    `transition ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-500 dark:bg-slate-950 light:bg-slate-100 light:text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl transition duration-500 light:border-slate-200/40 light:bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <NavLink
            to="/"
            className="text-xl font-semibold tracking-tight text-white"
          >
            SPL Tournament
          </NavLink>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink to="/" className={activeLink}>
              Home
            </NavLink>
            <NavLink to="/register" className={activeLink}>
              Register
            </NavLink>
            <NavLink to="/admin/login" className={activeLink}>
              Admin
            </NavLink>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/users" element={<AdminDashboardPage />} />
        <Route path="/admin/users/:id" element={<UserDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
