import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        FlowLens
      </h1>

      <nav>
        <ul className="space-y-2">
          <li className="p-2 rounded hover:bg-slate-800 cursor-pointer flex gap-2">
            <LayoutDashboard size={18} />
            Dashboard
          </li>
        </ul>
      </nav>
    </aside>
  );
}