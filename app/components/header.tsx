import { Bell } from "lucide-react";
export default function Header() { 
    return (
        <div>
            {/* Horizontal title bar */}
            <header className="bg-white/70 backdrop-blur-sm shadow-sm py-4 px-6 rounded-xl border border-gray-100">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* Left: Site name */}
                    <div className="font-bold text-xl">SaveFave</div>

                    {/* Right: Notifications */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
                            <Bell className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

        </div>
    );
}