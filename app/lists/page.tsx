"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { MessageCircle, Search, MoreVertical, Check, CheckCheck } from "lucide-react";

type Message = {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isVerified: boolean;
  isPinned: boolean;
};

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');
  const [showMenu, setShowMenu] = useState(false);

  const messages: Message[] = [
    {
      id: '1',
      username: 'lumen.ly',
      avatar: '/lumen.png',
      lastMessage: 'Thanks for sharing that recipe! I tried it yesterday and it was amazing.',
      timestamp: '2m ago',
      unreadCount: 2,
      isOnline: true,
      isVerified: true,
      isPinned: true
    },
    {
      id: '2',
      username: 'violet.noir',
      avatar: '/violet.png',
      lastMessage: 'Can you recommend some good horror books?',
      timestamp: '15m ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: '3',
      username: 'beneastman',
      avatar: '/ben.jpg',
      lastMessage: 'The photography tips you shared were really helpful!',
      timestamp: '1h ago',
      unreadCount: 1,
      isOnline: true,
      isVerified: true,
      isPinned: false
    },
    {
      id: '4',
      username: 'lifeofmads',
      avatar: '/mads.png',
      lastMessage: 'Love your travel recommendations! Planning a trip soon.',
      timestamp: '2h ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: '5',
      username: 'coraoconell',
      avatar: '/cora.png',
      lastMessage: 'Your DIY projects are so creative!',
      timestamp: '3h ago',
      unreadCount: 3,
      isOnline: true,
      isVerified: false,
      isPinned: false
    },
    {
      id: '6',
      username: 'chilithedog',
      avatar: '/chili.png',
      lastMessage: 'The workout routine you suggested is perfect!',
      timestamp: '5h ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: '7',
      username: 'glow.with.indie',
      avatar: '/indie.png',
      lastMessage: 'Thanks for the productivity tips!',
      timestamp: '1d ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: '8',
      username: 'lilyjade',
      avatar: '/lily.png',
      lastMessage: 'Your garden ideas are inspiring!',
      timestamp: '2d ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: '9',
      username: 'derekshone',
      avatar: '/derek.png',
      lastMessage: 'The cooking techniques you shared are game-changing!',
      timestamp: '3d ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: false,
      isPinned: false
    }
  ];

  const handleMessageClick = (messageId: string) => {
    console.log(`Clicked message: ${messageId}`);
  };

  const getTimeAgo = (timestamp: string) => {
    return timestamp;
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showOnlyActive) {
      return matchesSearch && message.isOnline;
    }
    
    return matchesSearch;
  });

  // Check if there are any unread messages
  const hasUnreadMessages = messages.some(message => message.unreadCount > 0);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showMenu && !target.closest('.messages-menu-container')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={hasUnreadMessages} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Empty header space to match other pages */}
          </div>
        </div>
        
        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-4xl mx-auto relative">
            {/* Three Dots Menu - Top Right */}
            <div className="absolute top-0 right-0 z-50 messages-menu-container">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors bg-white/80 backdrop-blur-sm"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[999999]">
                  <button 
                    onClick={() => {
                      console.log('Mark all as read');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Mark all as read
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Archive all messages');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Archive all messages
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Delete all messages');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Delete all messages
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button 
                    onClick={() => {
                      console.log('Message settings');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Message settings
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Privacy settings');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Privacy settings
                  </button>
                </div>
              )}
            </div>

            {/* Messages Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-8 h-8 text-purple-500" />
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                </div>
              </div>
              
              {/* Status and Filter Controls */}
              <div className="flex items-center justify-between">
                {/* User Status */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Your status:</span>
                  <select
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value as 'online' | 'away' | 'busy' | 'offline')}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="online">🟢 Online</option>
                    <option value="away">🟡 Away</option>
                    <option value="busy">🔴 Busy</option>
                    <option value="offline">⚫ Offline</option>
                  </select>
                  <span className="text-xs text-gray-500">(visible to friends only)</span>
                </div>
                
                {/* Active Filter Toggle */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Show:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowOnlyActive(false)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        !showOnlyActive
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Everyone
                    </button>
                    <button
                      onClick={() => setShowOnlyActive(true)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        showOnlyActive
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Active Only
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-xl border border-gray-100 p-3 sm:p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-lg"
                />
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <Card key={message.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] rounded-xl border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>

                  <button 
                    onClick={() => handleMessageClick(message.id)} 
                    className="w-full p-4 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl"
                    aria-label={`Open conversation with ${message.username}`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-12 h-12 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                          <div className="w-full h-full rounded-full bg-white p-0.5">
                            <img src={message.avatar} alt={message.username} className="w-full h-full rounded-full object-cover" />
                          </div>
                        </div>
                        {/* Online indicator */}
                        {message.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 truncate">{message.username}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                            {message.unreadCount > 0 && (
                              <div className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {message.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{message.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  }