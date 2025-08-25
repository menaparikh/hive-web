"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { Search as SearchIcon, Check, Bookmark, Send, Heart } from "lucide-react";
import { useFavorites } from '../contexts/FavoritesContext';

type SearchResult = {
  id: string;
  title: string;
  createdBy: string;
  imageUrl: string;
  lastEdited: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Most Popular');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toggleFavorite, isFavorite } = useFavorites();

  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      createdBy: 'John Smith',
      imageUrl: '/horror.png',
      lastEdited: '2024-01-15',
      category: 'Books',
      likes: 234,
      comments: 18,
      isLiked: true,
      isSaved: false
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      createdBy: 'Sarah Johnson',
      imageUrl: '/comedy.png',
      lastEdited: '2024-01-10',
      category: 'Movies',
      likes: 189,
      comments: 12,
      isLiked: false,
      isSaved: true
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      createdBy: 'Mike Davis',
      imageUrl: '/salad.png',
      lastEdited: '2024-01-08',
      category: 'Food',
      likes: 456,
      comments: 34,
      isLiked: true,
      isSaved: true
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      createdBy: 'Lisa Chen',
      imageUrl: '/cooking.png',
      lastEdited: '2024-01-05',
      category: 'Food',
      likes: 321,
      comments: 25,
      isLiked: false,
      isSaved: false
    },
    {
      id: '5',
      title: 'Photography Tips',
      createdBy: 'Tom Wilson',
      imageUrl: '/camera.png',
      lastEdited: '2024-01-03',
      category: 'Art',
      likes: 567,
      comments: 42,
      isLiked: true,
      isSaved: false
    },
    {
      id: '6',
      title: 'Documentary Collection',
      createdBy: 'Rachel Green',
      imageUrl: '/documentary.png',
      lastEdited: '2024-01-01',
      category: 'Movies',
      likes: 198,
      comments: 15,
      isLiked: false,
      isSaved: true
    },
    {
      id: '7',
      title: 'Travel Destinations',
      createdBy: 'Maria Rodriguez',
      imageUrl: '/destination.png',
      lastEdited: '2023-12-28',
      category: 'Travel',
      likes: 789,
      comments: 67,
      isLiked: true,
      isSaved: true
    },
    {
      id: '8',
      title: 'Healthy Breakfast Ideas',
      createdBy: 'James Wilson',
      imageUrl: '/healthybreakfast.png',
      lastEdited: '2023-12-25',
      category: 'Food',
      likes: 432,
      comments: 28,
      isLiked: false,
      isSaved: false
    },
    {
      id: '9',
      title: 'Productivity Tools',
      createdBy: 'Emily Chen',
      imageUrl: '/productivity.png',
      lastEdited: '2023-12-22',
      category: 'Productivity',
      likes: 345,
      comments: 22,
      isLiked: true,
      isSaved: false
    },
    {
      id: '10',
      title: 'Garden Plants',
      createdBy: 'David Thompson',
      imageUrl: '/garden.png',
      lastEdited: '2023-12-19',
      category: 'Nature',
      likes: 298,
      comments: 19,
      isLiked: false,
      isSaved: true
    },
    {
      id: '11',
      title: 'Workout Routines',
      createdBy: 'Lisa Park',
      imageUrl: '/workout.png',
      lastEdited: '2023-12-16',
      category: 'Fitness',
      likes: 654,
      comments: 45,
      isLiked: true,
      isSaved: false
    },
    {
      id: '12',
      title: 'DIY Projects',
      createdBy: 'Alex Johnson',
      imageUrl: '/diy.png',
      lastEdited: '2023-12-13',
      category: 'Crafts',
      likes: 187,
      comments: 11,
      isLiked: false,
      isSaved: false
    }
  ];

  const filterOptions = ['Most Popular', 'Most Recent', 'Most Liked', 'Most Shared'];
  const categoryOptions = ['All', 'Food', 'Movies', 'Books', 'Art', 'Travel', 'Productivity', 'Nature', 'Fitness', 'Crafts'];



  const handleShare = (resultId: string, resultTitle: string) => {
    console.log(`Sharing: ${resultTitle} (ID: ${resultId})`);
    // Here you can implement actual sharing functionality
    // For now, just log the action
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={true} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Empty header space to match home page */}
          </div>
        </div>
        
        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="bg-white/70 backdrop-blur-sm shadow-sm rounded-xl border border-gray-100 p-3 sm:p-4 mb-6">
              <div className="flex items-center space-x-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-lg"
                />
              </div>
            </div>
            
            {/* Filter Options */}
            <div className="mb-6">
              {/* Sort Options */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-gray-600">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFilter(option)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedFilter === option
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Filters */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                        selectedCategory === category
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                      }`}
                    >
                      {selectedCategory === category && (
                        <Check className="w-3 h-3" />
                      )}
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {searchResults.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(result.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={isFavorite(result.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        isFavorite(result.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(result.id, result.title);
                    }}
                    className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={`Share ${result.title}`}
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <Link 
                    href={`/messages/lists/${result.id}`}
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${result.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={result.imageUrl}
                        alt={`${result.title} cover`}
                        fill
                        className="object-cover"
                        priority={result.id === '1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </Link>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{result.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${result.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{formatNumber(result.likes)}</span>
                        </span>
                        <span>{formatNumber(result.comments)} comments</span>
                      </div>
                      {result.isSaved && (
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