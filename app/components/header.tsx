import { Bell } from "lucide-react";
export default function Header() { 
    return (
        <div>
            {/* Horizontal title bar */}
            <header className="bg-white/70 backdrop-blur-sm shadow-sm py-2 sm:py-3 md:py-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center px-3 sm:px-4 md:px-6">
                    {/* Left: Site name */}
                    <div className="font-bold text-lg sm:text-xl md:text-2xl" style={{ fontFamily: 'var(--font-great-vibes)' }}>SaveFave</div>

                    {/* Right: Notifications */}
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Notifications">
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>
            </header>

        </div>
    );
}