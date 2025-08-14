"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, User, Calendar, MapPin, Link as LinkIcon, UserPlus, UserCheck } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfile({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock user data
  const userData = {
    username: resolvedParams.username,
    displayName: resolvedParams.username === 'john-smith' ? 'John Smith' : resolvedParams.username.replace('-', ' '),
    avatar: '/actualmena.png',
    bio: 'Book lover and list curator. Passionate about sharing great reads with the community.',
    joinDate: '2023-01-15',
    location: 'New York, NY',
    website: 'https://johnsmith.com',
    lists: 8,
    followers: 1247,
    following: 892,
    isCurrentUser: resolvedParams.username === 'menaparikh' // Check if this is the current user's profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar hasUnreadMessages={true} />
      
      <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/" className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{userData.displayName}'s Profile</h1>
        </div>

        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            {/* Profile Header Card */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={userData.avatar}
                        alt={userData.displayName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-bold text-gray-900">{userData.displayName}</h2>
                      {!userData.isCurrentUser && (
                        <button
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isFollowing
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {isFollowing ? (
                            <>
                              <UserCheck className="w-4 h-4" />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4" />
                              <span>Follow</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{userData.bio}</p>
                    <div className="mb-4">
                      <a href={userData.website} className="text-sm text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1">
                        <LinkIcon className="w-3 h-3" />
                        <span>{userData.website}</span>
                      </a>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{userData.lists}</div>
                        <div className="text-sm text-gray-600">Lists</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{userData.followers}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{userData.following}</div>
                        <div className="text-sm text-gray-600">Following</div>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for user's lists */}
            <Card className="overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lists by {userData.displayName}</h3>
                <p className="text-gray-600">This user's lists will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
