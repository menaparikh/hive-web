import { Search, Bell } from "lucide-react";
export default function Header() { 
    return (
        <div>
            {/* Horizontal title bar */}
            <header className="bg-white shadow-sm py-4 px-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* Left: Site name */}
                    <div className="font-bold text-xl">MovieFlix</div>

                    {/* Right: Search and notifications */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Search">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
                            <Bell className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

        </div>
    );
}