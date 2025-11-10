"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, MessageCircle, Bookmark, User, TrendingUp, Plus, Bell } from 'lucide-react';

interface SidebarProps {
  hasUnreadMessages?: boolean;
}

export function Sidebar({ hasUnreadMessages = false }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/', active: true },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: MessageCircle, label: 'Messages', href: '/messages', badge: hasUnreadMessages },
    { icon: Bookmark, label: 'Saved', href: '/saved' },
    { icon: Plus, label: 'Create', href: '/add' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16 lg:w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            {isExpanded && (
              <span className="font-bold text-xl text-gray-900 dark:text-white">Hive</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  item.active
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900" />
                  )}
                </div>
                {isExpanded && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/profile"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/actualmena.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Mena Parikh
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  @menaparikh
                </p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
