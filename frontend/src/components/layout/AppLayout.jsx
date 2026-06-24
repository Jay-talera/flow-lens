import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
    const location = useLocation();

    // Define paths where the sidebar should NOT be shown (e.g., Home page '/')
    const isHomePage = location.pathname === "/";

    return (
        <div className="flex items-start text-left w-full min-h-screen">

            {/* 1. Only render Sidebar if we are NOT on the home page */}
            {!isHomePage && <Sidebar />}

            {/* 2. Main content container wrapper */}
            <div className="flex-1 bg-slate-100 min-h-screen flex flex-col">

                {/* Only render Navbar if we are NOT on the home page */}
                {!isHomePage && <Navbar />}

                {/* Dynamic Page Views (covers full screen if no sidebar is present) */}
                <main className={`${isHomePage ? "p-0" : "p-6"} flex-1`}>
                    {children}
                </main>

            </div>
        </div>
    );
}