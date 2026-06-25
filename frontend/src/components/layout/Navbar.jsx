import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient.js";
import {
    Cpu,
    CheckCircle2,
    XCircle,
    Loader2,
    ChevronDown,
    User
} from "lucide-react";

// ─── Inline Brand SVGs (Vercel Build-Safe) ──────────────────────────

// Inline SVG matching Lucide's 2px stroke grid styling for GitHub
function CustomGithubIcon({ size = 16, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

// Inline SVG matching Lucide's 2px stroke grid styling for LinkedIn
function CustomLinkedinIcon({ size = 16, className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

export default function Navbar() {
    const [currentTime, setCurrentTime] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 1. Live system clock effect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // 2. Real-time scroll calculation effect
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const progress = (window.scrollY / totalScroll) * 100;
                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 3. Click outside detector to close the profile dropdown automatically
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 4. Dynamic Health Query: Pings Spring Boot Actuator
    const { data: healthData, isLoading, isError } = useQuery({
        queryKey: ["system-health"],
        queryFn: async () => {
            const res = await apiClient.get("https://flow-lens.onrender.com/actuator/health");
            if (!res.ok) throw new Error("Server unhealthy");
            return res.json();
        },
        refetchInterval: 15000,
        retry: 2,
    });

    const isHealthy = !isLoading && !isError && healthData?.status === "UP";

    return (
        <header
            className="h-16 sticky top-0 backdrop-blur-md border-b flex items-center justify-between px-4 md:px-6 transition-all duration-300 z-40"
            style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)", // SaaS glassmorphism
                borderColor: "var(--border)"
            }}
        >
            {/* ── Left Side: FlowLens Brand Header ── */}
            <div className="flex items-center gap-4">

                {/* Rebranded FlowLens Header with Micro-Subtitle */}
                <div className="flex flex-col text-left cursor-default select-none group">
                    <h2 className="font-extrabold text-lg md:text-xl tracking-tight leading-none">
            <span className="text-white group-hover:text-purple-300 transition-colors duration-300">
              Flow
            </span>
                        <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent shadow-purple-500/20">
              Lens
            </span>
                    </h2>
                    <span className="text-[8px] md:text-[9px] text-slate-500 font-extrabold uppercase tracking-widest leading-none mt-1">
            Pipeline Intelligence
          </span>
                </div>

                {/* Dynamic Telemetry Status Badge */}
                <div className="hidden lg:flex">
                    {isLoading ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-400 font-bold tracking-wide">
                            <Loader2 size={12} className="animate-spin text-slate-400" />
                            <span>CHECKING TELEMETRY...</span>
                        </div>
                    ) : isHealthy ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-bold tracking-wide animate-pulse">
                            <CheckCircle2 size={12} className="text-emerald-400 animate-spin [animation-duration:8s]" />
                            <span>SYSTEMS OPERATIONAL</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-[11px] text-red-400 font-extrabold tracking-wide animate-bounce shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <XCircle size={12} className="text-red-400" />
                            <span>SYSTEMS OFFLINE</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Right Side: Live Metrics & Profile Dropdown ── */}
            <div className="flex items-center gap-3 md:gap-6">

                {/* Live System Time Telemetry */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/40 border border-slate-700/30 text-xs font-mono text-slate-400">
                    <Cpu size={14} className="text-purple-400 animate-pulse" />
                    <span>L-TIME:</span>
                    <span className="text-purple-300 font-bold w-16 text-right">{currentTime}</span>
                </div>

                {/* ── PROFILE ANCHOR (Toggles Dropdown on Click) ── */}
                <div
                    ref={dropdownRef}
                    className="relative"
                >
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 group cursor-pointer focus:outline-none select-none"
                    >
                        {/* Avatar frame */}
                        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
                            <CustomGithubIcon size={16} />
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
                        </div>

                        <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200 group-hover:text-purple-400 transition-colors duration-200">
                Jay Jain
              </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                Enterprise Owner
              </span>
                        </div>

                        <ChevronDown
                            size={14}
                            className={`text-slate-500 group-hover:text-slate-300 transition-transform duration-300 hidden md:block ${
                                isDropdownOpen ? "rotate-180 text-purple-400" : ""
                            }`}
                        />
                    </button>

                    {/* ── GLOWING PROFILE DROPDOWN MENU ── */}
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-3"
                        >
                            {/* Dropdown Header */}
                            <div className="px-3 py-2 border-b border-slate-900 mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Creator</p>
                                <h4 className="text-sm font-extrabold text-white mt-1 flex items-center gap-1.5">
                                    <User size={14} className="text-purple-400" />
                                    <span>Jay Jain</span>
                                </h4>
                            </div>

                            {/* Action Links with Inline Brand Icons */}
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/jayjain6865/" /* Replace with your actual LinkedIn link */
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 group"
                                    >
                                        <CustomLinkedinIcon size={15} className="text-slate-500 group-hover:text-sky-400 transition-colors" />
                                        <span>LinkedIn Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/jay-talera" /* Replace with your actual GitHub link */
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 group"
                                    >
                                        <CustomGithubIcon size={15} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                                        <span>GitHub Account</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Glowing scroll progress bar */}
            <div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-75 ease-out shadow-[0_1px_8px_rgba(168,85,247,0.6)]"
                style={{ width: `${scrollProgress}%` }}
            />
        </header>
    );
}