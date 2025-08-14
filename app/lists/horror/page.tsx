"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Heart, Share2, MoreVertical, Bookmark, Star, Eye, MessageCircle, Calendar, User } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

type ListItem = {
  id: string;
  title: string;
  description: string;
  rating: number;
  genre: string;
  year: number;
  author?: string;
  director?: string;
  imageUrl?: string;
};

export default function ListDetail({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Mock data for the horror books for teens list
  const listData = {
    id: '1',
    title: 'Horror Books for Teens',
    description: 'A carefully curated collection of spine-chilling horror novels perfect for young adult readers who love a good scare. These books offer thrilling stories with age-appropriate content that will keep you on the edge of your seat.',
    createdBy: 'John Smith',
    imageUrl: '/horror.png',
    lastEdited: '2024-01-15',
    totalItems: 12,
    likes: 234,
    views: 1567,
    comments: 45,
    category: 'Books',
    tags: ['Horror', 'Young Adult', 'Thriller', 'Supernatural']
  };

  const listItems: ListItem[] = [
    {
      id: '1',
      title: 'The Haunting of Hill House',
      description: 'A classic psychological horror novel about a group of people investigating a haunted mansion.',
      rating: 4.5,
      genre: 'Psychological Horror',
      year: 1959,
      author: 'Shirley Jackson',
      imageUrl: '/horror.png'
    },
    {
      id: '2',
      title: 'Carrie',
      description: 'Stephen King\'s debut novel about a teenage girl with telekinetic powers seeking revenge.',
      rating: 4.3,
      genre: 'Supernatural Horror',
      year: 1974,
      author: 'Stephen King',
      imageUrl: '/horror.png'
    },
    {
      id: '3',
      title: 'The Monstrumologist',
      description: 'A young apprentice learns about monsters and the dark secrets of the world.',
      rating: 4.2,
      genre: 'Monster Horror',
      year: 2009,
      author: 'Rick Yancey',
      imageUrl: '/horror.png'
    },
    {
      id: '4',
      title: 'Miss Peregrine\'s Home for Peculiar Children',
      description: 'A mysterious orphanage houses children with extraordinary abilities.',
      rating: 4.1,
      genre: 'Dark Fantasy',
      year: 2011,
      author: 'Ransom Riggs',
      imageUrl: '/horror.png'
    },
    {
      id: '5',
      title: 'The Call',
      description: 'An Irish horror novel about a world where teenagers are hunted by monsters.',
      rating: 4.0,
      genre: 'Survival Horror',
      year: 2013,
      author: 'Peadar Ó Guilín',
      imageUrl: '/horror.png'
    },
    {
      id: '6',
      title: 'Anna Dressed in Blood',
      description: 'A ghost hunter falls in love with the ghost he\'s supposed to kill.',
      rating: 4.4,
      genre: 'Paranormal Romance',
      year: 2011,
      author: 'Kendare Blake',
      imageUrl: '/horror.png'
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listData.title,
        text: listData.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
              ? 'fill-yellow-400/50 text-yellow-400' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar hasUnreadMessages={true} />
      
      <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{listData.title}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg border transition-colors ${
                isLiked 
                  ? 'border-red-300 bg-red-50 text-red-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'border-yellow-300 bg-yellow-50 text-yellow-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Report List
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Copy Link
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Follow Creator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            {/* List Header Card */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* List Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={listData.imageUrl}
                        alt={listData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* List Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{listData.title}</h2>
                        <p className="text-gray-600 mb-4">{listData.description}</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">{listData.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">{listData.views} views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">{listData.comments} comments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bookmark className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600">{listData.totalItems} items</span>
                      </div>
                    </div>
                    
                    {/* Creator and Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Created by {listData.createdBy}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Updated {listData.lastEdited}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {listData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* List Items */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Books in this list</h3>
              
              {listItems.map((item) => (
                <Card key={item.id} className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#FFFCF9' }}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-28 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={item.imageUrl || '/horror.png'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                          <div className="flex items-center space-x-1">
                            {renderStars(item.rating)}
                            <span className="text-sm text-gray-500 ml-1">({item.rating})</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {item.author}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{item.genre}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
