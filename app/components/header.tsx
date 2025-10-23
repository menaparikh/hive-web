"use client";

import { Bell, Heart, UserPlus, MessageCircle } from "lucide-react";
import { useNotifications } from "../contexts/NotificationContext";
import NotificationPanel from "./notification-panel";

export default function Header() { 
    const { notificationCounts, toggleNotificationPanel } = useNotifications();

    return (
        <div>
            {/* Horizontal title bar */}
            <header className="bg-white/70 backdrop-blur-sm shadow-sm py-2 sm:py-3 md:py-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center px-3 sm:px-4 md:px-6">
                    {/* Left: Site name */}
                    <div className="font-bold text-lg sm:text-xl md:text-2xl" style={{ fontFamily: 'var(--font-great-vibes)' }}>SaveFave</div>

                    {/* Right: Notifications */}
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        {/* Notification Bell with Counts */}
                        <div className="relative">
                            <button 
                                onClick={toggleNotificationPanel}
                                className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors" 
                                aria-label="Notifications"
                            >
                                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                                
                                {/* Total notification count badge - shows accumulated total */}
                                {notificationCounts.total > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                        {notificationCounts.total > 99 ? '99+' : notificationCounts.total}
                                    </div>
                                )}
                            </button>

                            {/* Individual notification type counts - automatically shows when there are notifications */}
                            {notificationCounts.total > 0 && (
                                <div className="absolute -bottom-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex items-center space-x-6 min-w-48 z-50">
                                    {/* Likes - shows accumulated total */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center space-x-1">
                                            <Heart className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-medium text-gray-900">{notificationCounts.likes || 0}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Likes</span>
                                    </div>
                                    
                                    {/* Follows - shows accumulated total */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center space-x-1">
                                            <UserPlus className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium text-gray-900">{notificationCounts.follows || 0}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Follows</span>
                                    </div>
                                    
                                    {/* Comments - shows accumulated total */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium text-gray-900">{notificationCounts.comments || 0}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Comments</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Notification Panel */}
            <NotificationPanel />
        </div>
    );
}