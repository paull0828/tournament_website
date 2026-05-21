import { Route, Routes, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <NavLink to="/" className="text-xl font-semibold">
            SPL Tournament
          </NavLink>
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              Admin
            </NavLink>
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
