"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, UserPlus, MessageCircle, X, Check } from 'lucide-react';
import { useNotifications, Notification } from '../contexts/NotificationContext';

export default function NotificationPanel() {
  const {
    notifications,
    notificationCounts,
    isNotificationPanelOpen,
    markAsRead,
    markAllAsRead,
    closeNotificationPanel
  } = useNotifications();

  if (!isNotificationPanelOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'bg-red-50 border-red-200';
      case 'follow':
        return 'bg-blue-50 border-blue-200';
      case 'comment':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    // You can add navigation logic here based on notification type
    if (notification.listId) {
      // Navigate to the list
      window.location.href = `/messages/lists/${notification.listId}`;
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
      <div className="fixed top-20 right-4 w-80 max-h-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
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

        {/* Notification Counts - shows total accumulated counts */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-around p-3 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-900">{notificationCounts.likes}</span>
              </div>
              <span className="text-xs text-gray-500">Likes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <UserPlus className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900">{notificationCounts.follows}</span>
              </div>
              <span className="text-xs text-gray-500">Follows</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900">{notificationCounts.comments}</span>
              </div>
              <span className="text-xs text-gray-500">Comments</span>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                  !notification.isRead ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={notification.avatar}
                        alt={notification.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-white flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {notification.username}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.content}
                      {notification.listTitle && (
                        <span className="font-medium text-gray-900"> "{notification.listTitle}"</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timeAgo}</p>
                  </div>

                  {/* Read Status */}
                  {!notification.isRead && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => window.location.href = '/notifications'}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
}
