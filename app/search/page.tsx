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
  tags?: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Most Popular');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      createdBy: 'John Smith',
      imageUrl: '/horror.png',
      lastEdited: '2024-01-15',
      category: 'Books',
      tags: ['horror', 'young-adult', 'books', 'thriller'],
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
      tags: ['comedy', 'movies', 'entertainment'],
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
      tags: ['food', 'recipes', 'healthy', 'salad'],
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
      tags: ['cooking', 'food', 'techniques', 'tips'],
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
      tags: ['photography', 'art', 'tips', 'creative'],
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
      tags: ['documentary', 'movies', 'educational'],
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
      tags: ['travel', 'destinations', 'adventure', 'places'],
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
      tags: ['food', 'breakfast', 'healthy', 'recipes'],
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
      tags: ['productivity', 'tools', 'apps', 'work'],
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
      tags: ['gardening', 'plants', 'nature', 'outdoor'],
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
      tags: ['fitness', 'workout', 'exercise', 'health'],
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
      tags: ['diy', 'crafts', 'projects', 'creative'],
      likes: 187,
      comments: 11,
      isLiked: false,
      isSaved: false
    }
  ];

  // Get all unique tags from search results
  const allSearchTags = Array.from(new Set(searchResults.flatMap(result => result.tags || [])));

  // Filter search results
  const filteredResults = searchResults.filter(result => {
    const matchesCategory = selectedCategory === 'All' || result.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || (result.tags && selectedTags.some(tag => result.tags!.includes(tag)));
    const matchesSearch = searchQuery === '' || result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (result.tags && result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesTags && matchesSearch;
  });

  const filterOptions = ['Most Popular', 'Most Recent', 'Most Liked', 'Most Shared'];
  const categoryOptions = ['All', 'Food', 'Movies', 'Books', 'Art', 'Travel', 'Productivity', 'Nature', 'Fitness', 'Crafts'];



  const handleShare = (resultId: string, resultTitle: string) => {
    // Share functionality - can be implemented with Web Share API or custom modal
    if (navigator.share) {
      navigator.share({
        title: resultTitle,
        text: `Check out this list: ${resultTitle}`,
        url: `${window.location.origin}/messages/lists/${resultId}`
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${window.location.origin}/messages/lists/${resultId}`);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/messages/lists/${resultId}`);
    }
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
            <div className="relative mb-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
                <div className="flex items-center space-x-3">
                  <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by title or click to browse tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setSearchInputFocused(true);
                      setShowTagDropdown(true);
                    }}
                    onBlur={() => {
                      // Delay hiding dropdown to allow tag clicks
                      setTimeout(() => {
                        setSearchInputFocused(false);
                        setShowTagDropdown(false);
                      }, 200);
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg"
                  />
                </div>
              </div>
              
              {/* Tag Dropdown */}
              {showTagDropdown && allSearchTags.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Browse by Tags</h3>
                      {selectedTags.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTags([]);
                          }}
                          className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allSearchTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTags(prev => 
                              prev.includes(tag) 
                                ? prev.filter(t => t !== tag)
                                : [...prev, tag]
                            );
                            setSearchQuery('');
                            setSearchInputFocused(false);
                            setTimeout(() => setShowTagDropdown(false), 100);
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedTags.includes(tag)
                              ? 'bg-purple-500 text-white shadow-sm'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300'
                          }`}
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <span className="ml-1.5">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    {selectedTags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Selected tags ({selectedTags.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Filter Options */}
            <div className="mb-6 space-y-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFilter(option)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedFilter === option
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'bg-white/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Filters */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                        selectedCategory === category
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'bg-white/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 border border-gray-200 dark:border-gray-600'
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

              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev => prev.filter(t => t !== tag));
                        }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500 text-white shadow-sm hover:bg-purple-600 transition-colors flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <span className="text-xs">×</span>
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedTags([])}
                      className="px-3 py-1.5 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 dark:border-gray-700 relative bg-white dark:bg-gray-800" style={{ backgroundColor: '#FFFCF9' }}>
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