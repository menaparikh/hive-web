"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { MessageCircle, Search, MoreVertical, Check, CheckCheck, Send, Paperclip, Smile, ArrowLeft, Plus, X } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

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

type ChatMessage = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
};

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showStoryNotification, setShowStoryNotification] = useState(false);

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

  // Mock chat messages data
  const chatMessages: { [key: string]: ChatMessage[] } = {
    '1': [
      {
        id: '1',
        sender: 'lumen.ly',
        content: 'Hi! I saw your horror books list and it looks amazing!',
        timestamp: '10:30 AM',
        isRead: true,
        avatar: '/lumen.png'
      },
      {
        id: '2',
        sender: 'me',
        content: 'Thanks! I tried to pick books that are scary but still age-appropriate for teens.',
        timestamp: '10:32 AM',
        isRead: true,
        avatar: '/actualmena.png'
      },
      {
        id: '3',
        sender: 'lumen.ly',
        content: 'Have you read "The Graveyard Book" by Neil Gaiman?',
        timestamp: '10:35 AM',
        isRead: true,
        avatar: '/lumen.png'
      },
      {
        id: '4',
        sender: 'me',
        content: 'Yes! It\'s a fantastic book. I should add it to the list.',
        timestamp: '10:37 AM',
        isRead: true,
        avatar: '/actualmena.png'
      },
      {
        id: '5',
        sender: 'lumen.ly',
        content: 'Thanks for sharing that recipe! I tried it yesterday and it was amazing.',
        timestamp: '2m ago',
        isRead: false,
        avatar: '/lumen.png'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'violet.noir',
        content: 'Can you recommend some good horror books?',
        timestamp: '15m ago',
        isRead: true,
        avatar: '/violet.png'
      },
      {
        id: '2',
        sender: 'violet.noir',
        content: 'story-mention',
        timestamp: '2m ago',
        isRead: false,
        avatar: '/violet.png'
      }
    ],
    '3': [
      {
        id: '1',
        sender: 'beneastman',
        content: 'The photography tips you shared were really helpful!',
        timestamp: '1h ago',
        isRead: false,
        avatar: '/ben.jpg'
      }
    ]
  };

  const handleMessageClick = (messageId: string) => {
    setSelectedChat(messageId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleBackToMessages = () => {
    setSelectedChat(null);
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
        
        {selectedChat ? (
          // Chat View
          <div className="h-screen flex flex-col">
            {/* Chat Header */}
            <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToMessages}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={messages.find(m => m.id === selectedChat)?.avatar || ''}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    {messages.find(m => m.id === selectedChat)?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {messages.find(m => m.id === selectedChat)?.username}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {messages.find(m => m.id === selectedChat)?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages[selectedChat]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.sender !== 'me' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={message.avatar}
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {message.content === 'story-mention' ? (
                      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm max-w-xs">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-600">Mentioned you in their story</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: 'transparent', background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                              <div className="w-full h-full rounded-full p-0.5 bg-white">
                                <Image
                                  src="/violet.png"
                                  alt="violet.noir"
                                  width={32}
                                  height={32}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-gray-900 text-sm">violet.noir</span>
                              <span className="text-gray-500 text-xs">•</span>
                              <span className="text-gray-500 text-xs">now</span>
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                          Add This to your Story
                        </button>
                        
                        {/* Story Preview */}
                        <div className="mt-2 relative">
                          <div className="w-full h-20 rounded-lg overflow-hidden relative">
                            <Image
                              src="/salad.png"
                              alt="Story preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-2 left-2 text-white">
                              <p className="text-xs font-medium">These salad recipes are life-changing! 🥗</p>
                              <p className="text-xs opacity-90">@menaparikh</p>
                            </div>
                          </div>
                          
                          {/* Profile Picture Connection */}
                          <div className="absolute -bottom-1 -left-1">
                            <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                              <Image
                                src="/actualmena.png"
                                alt="Your profile"
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute -top-4 left-2.5 w-0.5 h-4 bg-gray-300"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'me'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white/70 backdrop-blur-sm border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Messages List View
          <>
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

            {/* Story Notification */}
            {showStoryNotification && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Mentioned you in their story</span>
                  <button
                    onClick={() => setShowStoryNotification(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: 'transparent', background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full p-0.5 bg-white">
                        <Image
                          src="/violet.png"
                          alt="violet.noir"
                          width={48}
                          height={48}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">violet.noir</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500 text-sm">now</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Reposted your salad recipes list</p>
                  </div>
                  
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Add This to your Story
                  </button>
                </div>
                
                {/* Story Preview */}
                <div className="mt-3 relative">
                  <div className="w-full h-32 rounded-lg overflow-hidden relative">
                    <Image
                      src="/salad.png"
                      alt="Story preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm font-medium">These salad recipes are life-changing! 🥗</p>
                      <p className="text-xs opacity-90">@menaparikh</p>
                    </div>
                  </div>
                  
                  {/* Profile Picture Connection */}
                  <div className="absolute -bottom-2 -left-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src="/actualmena.png"
                        alt="Your profile"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -top-6 left-3 w-0.5 h-6 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            )}

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
        </>
        )}
      </div>
    </main>
  );
  }