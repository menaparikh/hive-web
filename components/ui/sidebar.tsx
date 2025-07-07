import { Button } from "@/components/ui/button"
import { Home, Menu, Search, Users, Plus, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    return (
        <div className="fixed left-0 top-0 h-full bg-gray-50 flex flex-col items-center py-4 space-y-4 z-10 transition-all duration-300 ease-in-out">
            {/* Hamburger menu - always visible */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12"
                onClick={onToggle}
            >
                <Menu className="h-5 w-5" />
            </Button>
            
            {/* Sidebar content - only visible when open */}
            <div className={`flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                <Link href="/add">
                    <Button 
                        size="icon" 
                        className="w-12 h-12 bg-pink-200 hover:bg-pink-300 text-black rounded-2xl"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </Link>
                
                <Link href="/">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 hover:bg-gray-200 text-black rounded-2xl"
                    >
                        <Home className="h-5 w-5" />
                    </Button>
                </Link>
                
                <Link href="/search">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 hover:bg-gray-200 rounded-full"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </Link>
                
                <Link href="/lists">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 hover:bg-gray-200"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </Link>
                
                <Link href="/profile">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 hover:bg-gray-200 rounded-full"
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                            <Image 
                                src="/sidebar-profile.png" 
                                alt="Profile Picture" 
                                width={24} 
                                height={24}
                                className="object-cover"
                            />
                        </div>
                    </Button>
                </Link>
            </div>
        </div>
    )
}