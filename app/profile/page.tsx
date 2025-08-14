"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { Send, Settings, Grid, Bookmark, Heart, Repeat } from "lucide-react";

type ProfilePost = {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
};

export default function Profile_page() {
  const [activeTab, setActiveTab] = useState('posts');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const profileData = {
    username: 'menaparikh',
    displayName: 'Mena Parikh',
    bio: 'hello mena',
    avatar: '/actualmena.png',
    posts: 9,
    followers: 1247,
    following: 892,
    isVerified: true,
    isFollowing: false
  };

  const posts: ProfilePost[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      imageUrl: '/horror.png',
      likes: 234,
      comments: 18,
      isLiked: true,
      isSaved: false
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      imageUrl: '/comedy.png',
      likes: 189,
      comments: 12,
      isLiked: false,
      isSaved: true
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      imageUrl: '/salad.png',
      likes: 456,
      comments: 34,
      isLiked: true,
      isSaved: true
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      imageUrl: '/cooking.png',
      likes: 321,
      comments: 25,
      isLiked: false,
      isSaved: false
    },
    {
      id: '5',
      title: 'Photography Tips',
      imageUrl: '/camera.png',
      likes: 567,
      comments: 42,
      isLiked: true,
      isSaved: false
    },
    {
      id: '6',
      title: 'Documentary Collection',
      imageUrl: '/documentary.png',
      likes: 198,
      comments: 15,
      isLiked: false,
      isSaved: true
    },
    {
      id: '7',
      title: 'Travel Destinations',
      imageUrl: '/destination.png',
      likes: 789,
      comments: 67,
      isLiked: true,
      isSaved: true
    },
    {
      id: '8',
      title: 'Healthy Breakfast Ideas',
      imageUrl: '/healthybreakfast.png',
      likes: 432,
      comments: 28,
      isLiked: false,
      isSaved: false
    },
    {
      id: '9',
      title: 'Productivity Tools',
      imageUrl: '/productivity.png',
      likes: 345,
      comments: 22,
      isLiked: true,
      isSaved: false
    }
  ];

  const reposts: ProfilePost[] = [
    {
      id: 'r1',
      title: 'Amazing Travel Photography',
      imageUrl: '/destination.png',
      likes: 156,
      comments: 8,
      isLiked: true,
      isSaved: true
    },
    {
      id: 'r2',
      title: 'Quick Healthy Meals',
      imageUrl: '/healthybreakfast.png',
      likes: 89,
      comments: 5,
      isLiked: false,
      isSaved: false
    },
    {
      id: 'r3',
      title: 'Best Productivity Apps',
      imageUrl: '/productivity.png',
      likes: 234,
      comments: 12,
      isLiked: true,
      isSaved: true
    }
  ];

  const likedPosts: ProfilePost[] = [
    {
      id: 'l1',
      title: 'Creative DIY Projects',
      imageUrl: '/diy.png',
      likes: 445,
      comments: 23,
      isLiked: true,
      isSaved: true
    },
    {
      id: 'l2',
      title: 'Garden Design Ideas',
      imageUrl: '/garden.png',
      likes: 178,
      comments: 9,
      isLiked: true,
      isSaved: false
    },
    {
      id: 'l3',
      title: 'Workout Motivation',
      imageUrl: '/workout.png',
      likes: 567,
      comments: 31,
      isLiked: true,
      isSaved: true
    },
    {
      id: 'l4',
      title: 'Film Photography Guide',
      imageUrl: '/camera.png',
      likes: 298,
      comments: 16,
      isLiked: true,
      isSaved: false
    }
  ];

  const toggleFavorite = (postId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId);
      } else {
        newFavorites.add(postId);
      }
      return newFavorites;
    });
  };

  const handleShare = (postId: string, postTitle: string) => {
    console.log(`Sharing: ${postTitle} (ID: ${postId})`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

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
            {/* Profile Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src={profileData.avatar} alt={profileData.username} className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{profileData.username}</h1>
                    {profileData.isVerified && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-6 mb-3">
                    <div className="text-center">
                      <span className="block font-semibold text-gray-900">{formatNumber(profileData.posts)}</span>
                      <span className="text-sm text-gray-500">posts</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-semibold text-gray-900">{formatNumber(profileData.followers)}</span>
                      <span className="text-sm text-gray-500">followers</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-semibold text-gray-900">{formatNumber(profileData.following)}</span>
                      <span className="text-sm text-gray-500">following</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 mb-4">{profileData.bio}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors">
                      Edit Profile
                    </button>
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                      <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-b-2 transition-colors ${
                    activeTab === 'posts' 
                      ? 'border-purple-500 text-purple-500' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  <span className="font-medium">Posts</span>
                </button>
                <button
                  onClick={() => setActiveTab('reposts')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-b-2 transition-colors ${
                    activeTab === 'reposts' 
                      ? 'border-purple-500 text-purple-500' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Repeat className="w-5 h-5" />
                  <span className="font-medium">Reposts</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-b-2 transition-colors ${
                    activeTab === 'saved' 
                      ? 'border-purple-500 text-purple-500' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="font-medium">Saved</span>
                </button>
                <button
                  onClick={() => setActiveTab('liked')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 border-b-2 transition-colors ${
                    activeTab === 'liked' 
                      ? 'border-purple-500 text-purple-500' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Liked</span>
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === 'posts' && posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(post.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={favorites.has(post.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.has(post.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id, post.title);
                    }}
                    className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={`Share ${post.title}`}
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => console.log(`Clicked post: ${post.id}`)} 
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${post.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={post.imageUrl}
                        alt={`${post.title} cover`}
                        fill
                        className="object-cover"
                        priority={post.id === '1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span>{formatNumber(post.comments)} comments</span>
                      </div>
                      {post.isSaved && (
                        <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {activeTab === 'reposts' && reposts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Repost Indicator */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium">
                    <Repeat className="w-3 h-3 inline mr-1" />
                    Repost
                  </div>
                  
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(post.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={favorites.has(post.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.has(post.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id, post.title);
                    }}
                    className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={`Share ${post.title}`}
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => console.log(`Clicked repost: ${post.id}`)} 
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${post.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={post.imageUrl}
                        alt={`${post.title} cover`}
                        fill
                        className="object-cover"
                        priority={post.id === 'r1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span>{formatNumber(post.comments)} comments</span>
                      </div>
                      {post.isSaved && (
                        <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {activeTab === 'saved' && posts.filter(post => post.isSaved).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(post.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={favorites.has(post.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.has(post.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id, post.title);
                    }}
                    className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={`Share ${post.title}`}
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => console.log(`Clicked saved post: ${post.id}`)} 
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${post.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={post.imageUrl}
                        alt={`${post.title} cover`}
                        fill
                        className="object-cover"
                        priority={post.id === '1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span>{formatNumber(post.comments)} comments</span>
                      </div>
                      {post.isSaved && (
                        <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {activeTab === 'liked' && likedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(post.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={favorites.has(post.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.has(post.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id, post.title);
                    }}
                    className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={`Share ${post.title}`}
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => console.log(`Clicked liked post: ${post.id}`)} 
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${post.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={post.imageUrl}
                        alt={`${post.title} cover`}
                        fill
                        className="object-cover"
                        priority={post.id === 'l1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span>{formatNumber(post.comments)} comments</span>
                      </div>
                      {post.isSaved && (
                        <Bookmark className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}