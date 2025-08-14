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

  const filteredMessages = messages.filter(message =>
    message.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Empty header space to match other pages */}
          </div>
        </div>
        
        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-4xl mx-auto">
            {/* Messages Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-8 h-8 text-purple-500" />
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
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
                            {message.isVerified && (
                              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {message.isPinned && (
                              <div className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                                Pinned
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{getTimeAgo(message.timestamp)}</span>
                            {message.unreadCount > 0 && (
                              <div className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {message.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">{message.lastMessage}</p>
                        
                        {/* Message status indicators */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            {message.unreadCount > 0 ? (
                              <CheckCheck className="w-4 h-4 text-purple-500" />
                            ) : (
                              <Check className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
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