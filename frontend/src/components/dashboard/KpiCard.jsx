export default function KpiCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-full min-h-[120px] border border-slate-100">
            {/*
        1. Reduced text to text-xs with uppercase styling.
        'truncate' prevents the title from ever wrapping to a second line.
      */}
            <p className="text-slate-400 text-xs font-bold tracking-wider uppercase truncate text-left">
                {title}
            </p>

            {/*
        2. Swapped text-3xl to text-xl (or text-2xl on larger viewports).
        Removed break-words to protect numbers/percentages from wrapping.
      */}
            <div className="flex-1 flex items-center justify-start mt-2">
                <div className="text-xl lg:text-2xl font-extrabold text-slate-800 tracking-tight leading-snug text-left w-full">
                    {value}
                </div>
            </div>
        </div>
    );
}