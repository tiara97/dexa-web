import React, { useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, CalendarCheck, Menu, X } from "lucide-react";
import { api } from "../lib/api";
import { Employee } from "../types";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useMemo<Employee | null>(() => {
    const userStr = localStorage.getItem("current_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
      localStorage.removeItem("access_token");
      localStorage.removeItem("current_user");
    }
    navigate("/login");
  };

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                Dexa WFH
              </h1>
              <nav className="hidden md:flex space-x-2 ml-8">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/dashboard" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Master Data</span>
                    </button>
                    <button
                      onClick={() => navigate("/admin/monitoring")}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/monitoring" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Monitoring</span>
                    </button>
                    <button
                      onClick={() => navigate("/admin/absensi")}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/absensi" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Absensi</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/employee/absensi")}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname.includes("/employee/absensi") ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Absensi</span>
                  </button>
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="text-sm text-right hidden md:block">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-slate-500 text-xs">{user.position}</p>
              </div>
              <button
                onClick={handleLogout}
                className="hidden md:flex p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-3 shadow-inner">
            <div className="mb-4 pb-4 border-b">
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-slate-500 text-sm">{user.position}</p>
            </div>
            {isAdmin ? (
              <>
                <button
                  onClick={() => {
                    navigate("/admin/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/dashboard" ? "bg-blue-50 text-blue-700" : "text-slate-600 active:bg-slate-50"}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Master Data</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/monitoring");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/monitoring" ? "bg-blue-50 text-blue-700" : "text-slate-600 active:bg-slate-50"}`}
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>Monitoring</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/absensi");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname === "/admin/absensi" ? "bg-blue-50 text-blue-700" : "text-slate-600 active:bg-slate-50"}`}
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>Absensi</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/employee/absensi");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium flex items-center space-x-2 ${location.pathname.includes("/employee/absensi") ? "bg-blue-50 text-blue-700" : "text-slate-600 active:bg-slate-50"}`}
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Absensi</span>
              </button>
            )}
            <div className="pt-2 border-t mt-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-3 rounded-md text-sm font-medium flex items-center space-x-2 text-red-600 active:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
