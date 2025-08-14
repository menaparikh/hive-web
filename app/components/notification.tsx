"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type NotificationProps = {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    type: 'repost' | 'like' | 'comment';
    username: string;
    avatar: string;
    content: string;
    timeAgo: string;
    storyId?: string;
  };
  onViewStory?: (storyId: string) => void;
};

export default function Notification({ isOpen, onClose, notification, onViewStory }: NotificationProps) {
  if (!isOpen) return null;

  const getNotificationText = () => {
    switch (notification.type) {
      case 'repost':
        return `${notification.username} mentioned you`;
      case 'like':
        return `${notification.username} liked your story`;
      case 'comment':
        return `${notification.username} commented on your story`;
      default:
        return `${notification.username} interacted with your content`;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-slide-in">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={notification.avatar}
                alt={notification.username}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {getNotificationText()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {notification.timeAgo}
            </p>
            
            {notification.storyId && onViewStory && (
              <button
                onClick={() => onViewStory(notification.storyId!)}
                className="mt-2 text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                View Story →
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
