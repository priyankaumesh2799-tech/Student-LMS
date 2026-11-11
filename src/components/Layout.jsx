import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User,
  Settings,
  LogOut,
  Search,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/courses", label: "Course Catalogue", icon: BookOpen },
  { path: "/my-courses", label: "My Courses", icon: GraduationCap },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen((p) => !p)}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <span className="brand-text">Learn<span className="brand-accent">Purple</span></span>
          </div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <ChevronLeft size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{profile.name.charAt(0).toUpperCase()}</div>
            <div className="user-meta">
              <div className="user-name">{profile.name}</div>
              <div className="user-email">{profile.email}</div>
            </div>
          </div>
          <Link to="/profile" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button className="nav-item btn-logout" onClick={() => {}}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={`main ${sidebarOpen ? "shifted" : ""}`}>
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">
              {location.pathname === "/dashboard"
                ? "Dashboard"
                : location.pathname === "/courses"
                  ? "Course Catalogue"
                  : location.pathname === "/my-courses"
                    ? "My Courses"
                    : location.pathname.startsWith("/course/")
                      ? "Course Details"
                      : location.pathname.startsWith("/lesson/")
                        ? "Lesson"
                        : location.pathname === "/quiz"
                          ? "Quiz"
                          : location.pathname === "/profile"
                            ? "Profile"
                            : location.pathname === "/admin"
                              ? "Admin"
                              : "LMS"}
            </h1>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
            <Link to="/admin" className="btn btn-sm btn-ghost admin-link">
              Admin
            </Link>
          </div>
        </header>

        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
