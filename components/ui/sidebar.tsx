"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Menu, Search, Users, Plus, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

<<<<<<< HEAD
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
=======
export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false)
    
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded)
    }
    
    return (
        <>
            {/* Overlay for mobile/tablet */}
            {isExpanded && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
            
            <div className={`fixed left-0 top-0 h-full bg-gray-50 flex flex-col py-4 space-y-4 z-30 transition-all duration-300 ease-in-out ${
                isExpanded ? 'w-64' : 'w-16'
            }`}>
                <div className="flex items-center px-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    {isExpanded && (
                        <span className="ml-4 text-lg font-semibold text-gray-800">
                            Menu
                        </span>
                    )}
                </div>
                
                <div className="flex flex-col items-start px-4 space-y-4">
                    <Link href="/add" className="w-full">
                        <Button 
                            size="icon" 
                            className={`bg-pink-200 hover:bg-pink-300 text-black rounded-2xl transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start' : 'w-12 h-12'
                            }`}
                        >
                            <Plus className="h-5 w-5" />
                            {isExpanded && <span className="ml-3">Add New</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 text-black rounded-2xl transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start' : 'w-12 h-12'
                            }`}
                        >
                            <Home className="h-5 w-5" />
                            {isExpanded && <span className="ml-3">Home</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/search" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 rounded-full transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start' : 'w-12 h-12'
                            }`}
                        >
                            <Search className="h-5 w-5" />
                            {isExpanded && <span className="ml-3">Search</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/lists" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start' : 'w-12 h-12'
                            }`}
                        >
                            <List className="h-4 w-4" />
                            {isExpanded && <span className="ml-3">Lists</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/profile" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 rounded-full transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start' : 'w-12 h-12'
                            }`}
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
                            {isExpanded && <span className="ml-3">Profile</span>}
                        </Button>
                    </Link>
                </div>
            </div>
        </>
>>>>>>> bb00a9b (updated sidebar)
    )
}