import { useState, useEffect } from "react";
import {
    Home,
    LayoutDashboard,
    TrendingUp,
    AlertOctagon,
    PieChart, // Icon for your workflow section
    GitBranch,
    History,
    Sparkles
} from "lucide-react";

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState("dashboard");

    // ─── Navigation Definitions ──────────────────────────────────────────
    const navigationItems = [
        { id: "home", label: "Home", icon: Home, type: "link", href: "/" },
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, type: "scroll", target: "dashboard-top" },
        { id: "trends", label: "Trends", icon: TrendingUp, type: "scroll", target: "trends-section" },
        { id: "bottlenecks", label: "Top Bottlenecks", icon: AlertOctagon, type: "scroll", target: "bottlenecks-section" },
        { id: "workflows", label: "Workflows", icon: PieChart, type: "scroll", target: "workflow-section" }, // NEW SECTION
        { id: "branch-activity", label: "Branch Activity", icon: GitBranch, type: "scroll", target: "branch-activity-section" },
        { id: "recent-runs", label: "Recent Runs", icon: History, type: "scroll", target: "recent-runs-section" },
    ];

    // ─── Dynamic Scroll-Spy ──────────────────────────────────────────────
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -55% 0px", // Focuses on the center area of the browser viewport
            threshold: 0,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;

                    // DYNAMIC MAPPER: Finds the item matching the active target ID automatically!
                    const activeItem = navigationItems.find(item => item.target === targetId);
                    if (activeItem) {
                        setActiveTab(activeItem.id);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Dynamic Target Resolver: Automatically tracks ALL scroll targets in navigationItems
        const targets = navigationItems
            .filter(item => item.type === "scroll")
            .map(item => document.getElementById(item.target))
            .filter(Boolean);

        targets.forEach(target => observer.observe(target));

        return () => observer.disconnect();
    }, []);

    // ─── Smooth Scroll Handler ──────────────────────────────────────────
    const handleNavClick = (item) => {
        if (item.type === "scroll") {
            const targetElement = document.getElementById(item.target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveTab(item.id);
            }
        }
    };

    return (
        <aside
            className="sticky top-0 h-screen shrink-0 transition-all duration-300 ease-in-out border-r flex flex-col justify-between
                 w-20 md:w-64
                 bg-slate-950 border-slate-800/60 z-30"
        >
            <div>
                {/* ── Brand Logo Header ── */}
                <div className="h-16 flex items-center px-4 md:px-6 border-b border-slate-800/40 gap-3">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] animate-pulse">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <span className="hidden md:block text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            FlowLens
          </span>
                </div>

                {/* ── Navigation List ── */}
                <nav className="p-3 md:p-4 mt-6">
                    <p className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">
                        Navigation
                    </p>

                    <ul className="space-y-1.5">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            // Home Page Link
                            if (item.type === "link") {
                                return (
                                    <li key={item.id}>
                                        <a
                                            href={item.href}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ease-out group text-left text-slate-400 hover:text-white hover:bg-slate-900/60 hover:translate-x-1"
                                        >
                                            <Icon size={20} className="text-slate-400 group-hover:text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                                            <span className="hidden md:inline text-sm tracking-wide">{item.label}</span>
                                        </a>
                                    </li>
                                );
                            }

                            // Smooth Scroll Buttons
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className={`
                      w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ease-out group text-left relative
                      ${isActive
                                            ? "text-purple-400 bg-purple-950/30 font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            : "text-slate-400 hover:text-white hover:bg-slate-900/60 hover:translate-x-1"
                                        }
                    `}
                                    >
                                        {/* Glowing vertical active indicator strip */}
                                        {isActive && (
                                            <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-purple-400 to-indigo-500 shadow-[0_0_10px_#a855f7]" />
                                        )}

                                        <Icon
                                            size={20}
                                            className={`
                        transition-transform duration-300 group-hover:scale-110 shrink-0
                        ${isActive ? "text-purple-400" : "text-slate-400 group-hover:text-purple-400"}
                      `}
                                        />

                                        <span className="hidden md:inline text-sm tracking-wide">
                      {item.label}
                    </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* ── Sidebar Footer ── */}
            <div className="p-4 border-t border-slate-900 flex items-center justify-center md:justify-between">
                <div className="hidden md:flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
            Live v1.0.0
          </span>
                </div>
                <span className="md:hidden text-[10px] font-extrabold text-slate-600 bg-slate-900 px-2 py-1 rounded">
          v1.0
        </span>
            </div>
        </aside>
    );
}