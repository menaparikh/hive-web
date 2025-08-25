"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type NotificationType = 'like' | 'follow' | 'comment';

export interface Notification {
  id: string;
  type: NotificationType;
  username: string;
  avatar: string;
  content: string;
  timeAgo: string;
  isRead: boolean;
  listId?: string;
  listTitle?: string;
}

interface NotificationCounts {
  likes: number;
  follows: number;
  comments: number;
  total: number;
}

interface NotificationContextType {
  notifications: Notification[];
  notificationCounts: NotificationCounts;
  isNotificationPanelOpen: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'timeAgo' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  toggleNotificationPanel: () => void;
  closeNotificationPanel: () => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  // Calculate notification counts - these accumulate and persist (including read ones)
  const notificationCounts = notifications.reduce(
    (counts, notification) => {
      // Count ALL notifications, not just unread ones
      counts[notification.type]++;
      counts.total++;
      return counts;
    },
    { likes: 0, follows: 0, comments: 0, total: 0 }
  );

  // Debug logging
  console.log('NotificationContext - notifications:', notifications);
  console.log('NotificationContext - notificationCounts:', notificationCounts);

  const addNotification = (notification: Omit<Notification, 'id' | 'timeAgo' | 'isRead'>) => {
    console.log('Adding notification:', notification);
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timeAgo: 'Just now',
      isRead: false
    };
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      console.log('Updated notifications:', updated);
      return updated;
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(prev => !prev);
  };

  const closeNotificationPanel = () => {
    setIsNotificationPanelOpen(false);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationCounts,
        isNotificationPanelOpen,
        addNotification,
        markAsRead,
        markAllAsRead,
        toggleNotificationPanel,
        closeNotificationPanel,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
