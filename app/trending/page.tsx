"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { TrendingUp, Flame, ArrowUp, ArrowDown, Clock, Eye, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useFavorites } from '../contexts/FavoritesContext';

type TrendingList = {
  id: string;
  title: string;
  createdBy: string;
  imageUrl: string;
  lastEdited: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  trendScore: number;
  trendDirection: 'up' | 'down';
  change: number;
  isSaved: boolean;
};

export default function Trending() {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const { toggleFavorite, isFavorite } = useFavorites();

  const trendingLists: TrendingList[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      createdBy: 'John Smith',
      imageUrl: '/horror.png',
      lastEdited: '2024-01-15',
      category: 'Books',
      likes: 1234,
      comments: 89,
      shares: 156,
      views: 5678,
      trendScore: 98,
      trendDirection: 'up',
      change: 45,
      isSaved: false
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      createdBy: 'Sarah Johnson',
      imageUrl: '/comedy.png',
      lastEdited: '2024-01-14',
      category: 'Movies',
      likes: 987,
      comments: 67,
      shares: 134,
      views: 4321,
      trendScore: 95,
      trendDirection: 'up',
      change: 32,
      isSaved: true
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      createdBy: 'Mike Davis',
      imageUrl: '/salad.png',
      lastEdited: '2024-01-13',
      category: 'Food',
      likes: 2156,
      comments: 145,
      shares: 278,
      views: 8901,
      trendScore: 92,
      trendDirection: 'up',
      change: 28,
      isSaved: false
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      createdBy: 'Lisa Chen',
      imageUrl: '/cooking.png',
      lastEdited: '2024-01-12',
      category: 'Food',
      likes: 1543,
      comments: 112,
      shares: 189,
      views: 6789,
      trendScore: 88,
      trendDirection: 'down',
      change: -12,
      isSaved: true
    },
    {
      id: '5',
      title: 'Photography Tips',
      createdBy: 'Tom Wilson',
      imageUrl: '/camera.png',
      lastEdited: '2024-01-11',
      category: 'Art',
      likes: 2345,
      comments: 178,
      shares: 234,
      views: 12345,
      trendScore: 87,
      trendDirection: 'up',
      change: 15,
      isSaved: false
    },
    {
      id: '6',
      title: 'Documentary Collection',
      createdBy: 'Rachel Green',
      imageUrl: '/documentary.png',
      lastEdited: '2024-01-10',
      category: 'Movies',
      likes: 876,
      comments: 54,
      shares: 98,
      views: 3456,
      trendScore: 85,
      trendDirection: 'up',
      change: 8,
      isSaved: false
    },
    {
      id: '7',
      title: 'Travel Destinations',
      createdBy: 'Maria Rodriguez',
      imageUrl: '/destination.png',
      lastEdited: '2024-01-09',
      category: 'Travel',
      likes: 3456,
      comments: 234,
      shares: 456,
      views: 15678,
      trendScore: 84,
      trendDirection: 'up',
      change: 6,
      isSaved: true
    },
    {
      id: '8',
      title: 'Healthy Breakfast Ideas',
      createdBy: 'James Wilson',
      imageUrl: '/healthybreakfast.png',
      lastEdited: '2024-01-08',
      category: 'Food',
      likes: 1876,
      comments: 134,
      shares: 167,
      views: 7890,
      trendScore: 82,
      trendDirection: 'down',
      change: -5,
      isSaved: false
    },
    {
      id: '9',
      title: 'Productivity Tools',
      createdBy: 'Emily Chen',
      imageUrl: '/productivity.png',
      lastEdited: '2024-01-07',
      category: 'Productivity',
      likes: 2341,
      comments: 167,
      shares: 245,
      views: 9876,
      trendScore: 81,
      trendDirection: 'up',
      change: 12,
      isSaved: true
    },
    {
      id: '10',
      title: 'Workout Routines',
      createdBy: 'Lisa Park',
      imageUrl: '/workout.png',
      lastEdited: '2024-01-06',
      category: 'Fitness',
      likes: 2987,
      comments: 189,
      shares: 312,
      views: 12345,
      trendScore: 79,
      trendDirection: 'up',
      change: 4,
      isSaved: false
    }
  ];

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const categoryOptions = ['All', 'Food', 'Movies', 'Books', 'Art', 'Travel', 'Productivity', 'Nature', 'Fitness', 'Crafts'];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const filteredLists = trendingLists
    .filter(list => categoryFilter === 'All' || list.category === categoryFilter)
    .sort((a, b) => b.trendScore - a.trendScore);

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={true} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Lists</h1>
                  <p className="text-sm text-gray-600">Discover what's hot right now</p>
                </div>
              </div>
            </div>

            {/* Time Filter */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Time Period:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setTimeFilter(filter.value as typeof timeFilter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      timeFilter === filter.value
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                        : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-gray-600">Categories:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      categoryFilter === category
                        ? 'bg-purple-500 text-white shadow-sm'
                        : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-6xl mx-auto">
            {/* Trending Lists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLists.map((list, index) => (
                <Card 
                  key={list.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl border border-gray-100 relative"
                  style={{ backgroundColor: '#FFFCF9' }}
                >
                  {/* Trend Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    <TrendingUp className="w-3 h-3" />
                    <span>#{index + 1} Trending</span>
                  </div>

                  {/* Trend Score */}
                  <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <div className={`flex items-center space-x-1 ${list.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {list.trendDirection === 'up' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      <span className="text-xs font-bold">{Math.abs(list.change)}%</span>
                    </div>
                    <div className="w-px h-3 bg-gray-300 mx-1"></div>
                    <span className="text-xs font-semibold text-gray-700">{list.trendScore}</span>
                  </div>

                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(list.id);
                    }}
                    className="absolute bottom-20 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={isFavorite(list.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        isFavorite(list.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>

                  <Link 
                    href={`/messages/lists/${list.id}`}
                    className="relative h-48 w-full block"
                  >
                    <Image
                      src={list.imageUrl}
                      alt={`${list.title} cover`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </Link>

                  <CardContent className="p-5">
                    <div className="mb-3">
                      <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{list.title}</h2>
                      <p className="text-xs text-gray-500">by {list.createdBy}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">{formatNumber(list.views)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600 font-medium">{formatNumber(list.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600 font-medium">{formatNumber(list.comments)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 font-medium">{formatNumber(list.shares)}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {list.category}
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










