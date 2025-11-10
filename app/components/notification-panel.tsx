"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, UserPlus, MessageCircle, X, Share2, Bookmark, TrendingUp, Eye, Filter, Clock } from 'lucide-react';
import { useNotifications, Notification } from '../contexts/NotificationContext';

type UnifiedActivityItem = {
  id: string;
  type: 'like' | 'comment' | 'share' | 'follow' | 'list-created' | 'item-added';
  username: string;
  avatar: string;
  action: string;
  targetTitle?: string;
  targetId?: string;
  targetImage?: string;
  timeAgo: string;
  isRead: boolean;
};

export default function NotificationPanel() {
  const {
    notifications,
    notificationCounts,
    isNotificationPanelOpen,
    markAsRead,
    markAllAsRead,
    closeNotificationPanel
  } = useNotifications();

  const [filter, setFilter] = useState<string>('all');

  // Mock additional activity data (shares, item-added, list-created) - in real app, this would come from context/API
  const additionalActivity: UnifiedActivityItem[] = useMemo(() => [
    {
      id: 'share-1',
      type: 'share',
      username: 'tom_wilson',
      avatar: '/derek.png',
      action: 'shared your list',
      targetTitle: 'Go-To Salad Recipes',
      targetId: '3',
      targetImage: '/salad.png',
      timeAgo: '3 hours ago',
      isRead: true
    },
    {
      id: 'item-added-1',
      type: 'item-added',
      username: 'rachel_green',
      avatar: '/violet.png',
      action: 'added an item to',
      targetTitle: 'Cooking Techniques',
      targetId: '4',
      targetImage: '/cooking.png',
      timeAgo: '12 hours ago',
      isRead: true
    },
    {
      id: 'list-created-1',
      type: 'list-created',
      username: 'maria_rodriguez',
      avatar: '/mads.png',
      action: 'created a new list',
      targetTitle: 'Travel Destinations',
      targetId: '7',
      targetImage: '/destination.png',
      timeAgo: '16 hours ago',
      isRead: true
    }
  ], []);

  // Convert notifications to unified format and merge with additional activity
  const unifiedFeed: UnifiedActivityItem[] = useMemo(() => {
    const convertedNotifications: UnifiedActivityItem[] = notifications.map((notification: Notification) => ({
      id: notification.id,
      type: notification.type as 'like' | 'comment' | 'follow',
      username: notification.username,
      avatar: notification.avatar,
      action: notification.content,
      targetTitle: notification.listTitle,
      targetId: notification.listId,
      targetImage: notification.listId ? `/horror.png` : undefined, // In real app, get actual image
      timeAgo: notification.timeAgo,
      isRead: notification.isRead
    }));

    // Combine and sort by time (newest first)
    const combined = [...convertedNotifications, ...additionalActivity];
    return combined.sort((a, b) => {
      // Simple sort - in real app, would use actual timestamps
      if (!a.isRead && b.isRead) return -1;
      if (a.isRead && !b.isRead) return 1;
      return 0;
    });
  }, [notifications, additionalActivity]);

  if (!isNotificationPanelOpen) return null;

  const getActivityIcon = (type: UnifiedActivityItem['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'share':
        return <Share2 className="w-4 h-4 text-green-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'list-created':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'item-added':
        return <Bookmark className="w-4 h-4 text-yellow-500" />;
      default:
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'like', label: 'Likes' },
    { value: 'comment', label: 'Comments' },
    { value: 'share', label: 'Shares' },
    { value: 'follow', label: 'Follows' },
    { value: 'list-created', label: 'Lists' },
    { value: 'item-added', label: 'Items' }
  ];

  const filteredFeed = unifiedFeed.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const unreadCount = unifiedFeed.filter(a => !a.isRead).length;

  const handleItemClick = (item: UnifiedActivityItem) => {
    // Mark as read if it's from notifications
    if (item.id && !item.id.startsWith('share-') && !item.id.startsWith('item-added-') && !item.id.startsWith('list-created-')) {
      markAsRead(item.id);
    }
    // Navigate to list if available
    if (item.targetId) {
      closeNotificationPanel();
      window.location.href = `/messages/lists/${item.targetId}`;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={closeNotificationPanel}
      />
      
      {/* Notification Panel */}
      <div className="fixed top-20 right-4 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">Activity</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full font-medium">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unifiedFeed.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={closeNotificationPanel}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="p-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <Filter className="w-3 h-3 text-gray-500" />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  filter === option.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {filteredFeed.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm">No activity found</p>
            </div>
          ) : (
            filteredFeed.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                  !item.isRead ? 'bg-purple-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                      item.isRead ? 'border-gray-200' : 'border-purple-500'
                    }`}>
                      <Image
                        src={item.avatar}
                        alt={item.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-white flex items-center justify-center">
                      {getActivityIcon(item.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Link 
                        href={`/profile/${item.username}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeNotificationPanel();
                        }}
                        className="font-medium text-gray-900 text-sm hover:text-purple-600 transition-colors"
                      >
                        {item.username}
                      </Link>
                      {!item.isRead && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.action}
                      {item.targetTitle && (
                        <>
                          {' '}
                          <Link 
                            href={`/messages/lists/${item.targetId}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              closeNotificationPanel();
                            }}
                            className="font-medium text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            "{item.targetTitle}"
                          </Link>
                        </>
                      )}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-400">{item.timeAgo}</p>
                    </div>
                    {item.targetImage && item.targetId && (
                      <Link 
                        href={`/messages/lists/${item.targetId}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeNotificationPanel();
                        }}
                        className="mt-2 block"
                      >
                        <div className="relative w-full h-20 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={item.targetImage}
                            alt={item.targetTitle || 'List'}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filteredFeed.length > 0 && (
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => {
                closeNotificationPanel();
              }}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all activity
            </button>
          </div>
        )}
      </div>
    </>
  );
}
