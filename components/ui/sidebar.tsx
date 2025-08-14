"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Menu, Search, Plus, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SidebarProps {
    hasUnreadMessages?: boolean;
}

export function Sidebar({ hasUnreadMessages = false }: SidebarProps) {
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
                isExpanded ? 'w-64' : 'w-20'
            }`}>
                <div className="flex items-center px-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-12 h-12 rounded-2xl"
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
                                isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12'
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
                                isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12'
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
                            className={`hover:bg-gray-200 text-black rounded-2xl transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12'
                            }`}
                        >
                            <Search className="h-5 w-5" />
                            {isExpanded && <span className="ml-3">Search</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/messages" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 text-black rounded-2xl transition-all duration-300 relative ${
                                isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12'
                            }`}
                        >
                            <MessageCircle className="h-5 w-5" />
                            {hasUnreadMessages && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></div>
                            )}
                            {isExpanded && <span className="ml-3">Messages</span>}
                        </Button>
                    </Link>
                    
                    <Link href="/profile" className="w-full">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`hover:bg-gray-200 text-black rounded-2xl transition-all duration-300 ${
                                isExpanded ? 'w-full h-12 justify-start px-4' : 'w-12 h-12'
                            }`}
                        >
                            <Image 
                                src="/actualmena.png" 
                                alt="Profile Picture" 
                                width={20} 
                                height={20}
                                className="object-cover rounded-full"
                            />
                            {isExpanded && <span className="ml-3">Profile</span>}
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}