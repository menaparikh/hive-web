"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Bell, Shield, Eye, MessageCircle, Globe, Moon, Sun, Palette, Download, Trash2, LogOut } from "lucide-react";
import Link from 'next/link';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sound: true,
    mentions: true,
    likes: true,
    comments: true,
    follows: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: 'friends',
    showLastSeen: true,
    allowReposts: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactMode: false,
    showAnimations: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAppearanceChange = (key: string, value: string | boolean) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    alert('Data export started! You will receive an email when ready.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      alert('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      console.log('Logging out...');
      // Here you would typically clear auth tokens and redirect
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar hasUnreadMessages={true} />
      
      <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-3xl w-full">
                        {/* Notifications */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications on your device</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="push-notifications" 
                        className="sr-only" 
                        checked={notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      />
                      <label htmlFor="push-notifications" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.push ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="email-notifications" 
                        className="sr-only" 
                        checked={notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      />
                      <label htmlFor="email-notifications" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.email ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Sound Alerts</h3>
                      <p className="text-sm text-gray-600">Play sounds for notifications</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="sound-alerts" 
                        className="sr-only" 
                        checked={notifications.sound}
                        onChange={(e) => handleNotificationChange('sound', e.target.checked)}
                      />
                      <label htmlFor="sound-alerts" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${notifications.sound ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.sound ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Mentions</h3>
                      <p className="text-sm text-gray-600">When someone mentions you</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="mentions" 
                        className="sr-only" 
                        checked={notifications.mentions}
                        onChange={(e) => handleNotificationChange('mentions', e.target.checked)}
                      />
                      <label htmlFor="mentions" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${notifications.mentions ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications.mentions ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                      <p className="text-sm text-gray-600">Who can see your profile</p>
                    </div>
                    <select 
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Show Online Status</h3>
                      <p className="text-sm text-gray-600">Let others see when you're online</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="online-status" 
                        className="sr-only" 
                        checked={privacy.showOnlineStatus}
                        onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
                      />
                      <label htmlFor="online-status" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${privacy.showOnlineStatus ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${privacy.showOnlineStatus ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Allow Messages</h3>
                      <p className="text-sm text-gray-600">Who can send you messages</p>
                    </div>
                    <select 
                      value={privacy.allowMessages}
                      onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="none">No One</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Theme</h3>
                      <p className="text-sm text-gray-600">Choose your preferred theme</p>
                    </div>
                    <div className="flex items-center space-x-2">
                                           <button 
                       onClick={() => handleAppearanceChange('theme', 'light')}
                       className={`p-2 rounded-lg border transition-colors ${appearance.theme === 'light' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                     >
                       <Sun className="w-5 h-5 text-yellow-500" />
                     </button>
                     <button 
                       onClick={() => handleAppearanceChange('theme', 'dark')}
                       className={`p-2 rounded-lg border transition-colors ${appearance.theme === 'dark' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                     >
                       <Moon className="w-5 h-5 text-blue-500" />
                     </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Compact Mode</h3>
                      <p className="text-sm text-gray-600">Use less space for content</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="compact-mode" 
                        className="sr-only" 
                        checked={appearance.compactMode}
                        onChange={(e) => handleAppearanceChange('compactMode', e.target.checked)}
                      />
                      <label htmlFor="compact-mode" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className={`block w-12 h-6 rounded-full transition-colors ${appearance.compactMode ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${appearance.compactMode ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account</h2>
                
                <div className="space-y-4">
                  <button 
                    onClick={handleExportData}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Export Data</h3>
                        <p className="text-sm text-gray-600">Download your data</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <div className="text-left">
                        <h3 className="font-medium text-red-600">Delete Account</h3>
                        <p className="text-sm text-gray-600">Permanently delete your account</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Log Out</h3>
                        <p className="text-sm text-gray-600">Sign out of your account</p>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
