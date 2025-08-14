"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { Plus, Upload, Eye, EyeOff, Save, X, Image as ImageIcon } from "lucide-react";

type ListFormData = {
  title: string;
  description: string;
  category: string;
  isPublic: boolean;
  imageUrl: string;
  tags: string[];
  collaborators: string[];
  hideLikes: boolean;
  disableComments: boolean;
  listType: 'individual' | 'collection';
};

type Friend = {
  id: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  isOnline: boolean;
};

export default function AddNew() {
  const [formData, setFormData] = useState<ListFormData>({
    title: '',
    description: '',
    category: '',
    isPublic: true,
    imageUrl: '',
    tags: [],
    collaborators: [],
    hideLikes: false,
    disableComments: false,
    listType: 'individual'
  });
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);

  // Mock friends data (people you follow and who follow you back)
  const friends: Friend[] = [
    {
      id: '1',
      username: 'lumen.ly',
      avatar: '/lumen.png',
      isVerified: true,
      isOnline: true
    },
    {
      id: '2',
      username: 'violet.noir',
      avatar: '/violet.png',
      isVerified: false,
      isOnline: false
    },
    {
      id: '3',
      username: 'beneastman',
      avatar: '/ben.jpg',
      isVerified: true,
      isOnline: true
    },
    {
      id: '4',
      username: 'lifeofmads',
      avatar: '/mads.png',
      isVerified: false,
      isOnline: false
    },
    {
      id: '5',
      username: 'coraoconell',
      avatar: '/cora.png',
      isVerified: false,
      isOnline: true
    },
    {
      id: '6',
      username: 'chilithedog',
      avatar: '/chili.png',
      isVerified: false,
      isOnline: false
    },
    {
      id: '7',
      username: 'glow.with.indie',
      avatar: '/indie.png',
      isVerified: false,
      isOnline: false
    },
    {
      id: '8',
      username: 'lilyjade',
      avatar: '/lily.png',
      isVerified: false,
      isOnline: false
    },
    {
      id: '9',
      username: 'derekshone',
      avatar: '/derek.png',
      isVerified: false,
      isOnline: false
    }
  ];

  const categories = [
    'Food & Cooking',
    'Movies & TV',
    'Books & Reading',
    'Travel & Adventure',
    'Health & Fitness',
    'Technology',
    'Art & Design',
    'Music',
    'Gaming',
    'Education',
    'Lifestyle',
    'Other'
  ];

  const handleInputChange = (field: keyof ListFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddCollaborator = (friendId: string) => {
    if (!formData.collaborators.includes(friendId)) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, friendId]
      }));
    }
  };

  const handleRemoveCollaborator = (friendId: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(id => id !== friendId)
    }));
  };

  const getFriendById = (id: string) => friends.find(friend => friend.id === id);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            imageUrl: e.target?.result as string
          }));
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new list:', formData);
    // Here you would typically send the data to your backend
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.category;

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={true} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-3 sm:pt-4 md:pt-6">
          <div className="max-w-4xl mx-auto">

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* List Type Selection */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Create</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Individual List Option */}
                      <div 
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.listType === 'individual'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('listType', 'individual')}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.listType === 'individual'
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.listType === 'individual' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900">Individual List</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Create a single list with items. Perfect for sharing a focused collection of recommendations.
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Single list with items</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Focused content</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Easy to share</span>
                        </div>
                      </div>

                      {/* Collection Option */}
                      <div 
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.listType === 'collection'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('listType', 'collection')}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.listType === 'collection'
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.listType === 'collection' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900">Collection</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Create a group of related lists. Great for organizing multiple lists under one theme.
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Multiple lists grouped together</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Thematic organization</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Comprehensive content</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 text-blue-500 mt-0.5">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">
                            {formData.listType === 'individual' ? 'Individual List' : 'Collection'}
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            {formData.listType === 'individual' 
                              ? 'You\'ll create a single list with items that you can add after creation.'
                              : 'You\'ll create a collection that can contain multiple related lists. You can add lists to this collection after creation.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        {formData.listType === 'individual' ? 'List Title *' : 'Collection Name *'}
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder={formData.listType === 'individual' ? "Enter a catchy title for your list..." : "Enter a name for your collection..."}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                        placeholder={formData.listType === 'individual' ? "Describe what your list is about..." : "Describe what your collection contains..."}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Cover Image</h2>
                  
                  <div className="space-y-4">
                    {formData.imageUrl ? (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="List cover"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleInputChange('imageUrl', '')}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">
                            {isUploading ? 'Uploading...' : 'Click to upload a cover image'}
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Add a tag..."
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Collaborators */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Collaborators</h2>
                    <button
                      type="button"
                      onClick={() => setShowCollaborators(!showCollaborators)}
                      className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      {showCollaborators ? 'Hide' : 'Add'} Friends
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Selected Collaborators */}
                    {formData.collaborators.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">Selected Collaborators:</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.collaborators.map((friendId) => {
                            const friend = getFriendById(friendId);
                            if (!friend) return null;
                            
                            return (
                              <div
                                key={friendId}
                                className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-sm"
                              >
                                <div className="relative">
                                  <img
                                    src={friend.avatar}
                                    alt={friend.username}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  {friend.isOnline && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                                  )}
                                </div>
                                <span className="flex items-center space-x-1">
                                  <span>{friend.username}</span>
                                  {friend.isVerified && (
                                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCollaborator(friendId)}
                                  className="text-purple-600 hover:text-purple-800"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Friends List */}
                    {showCollaborators && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">Your Friends:</h3>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {friends.map((friend) => {
                            const isSelected = formData.collaborators.includes(friend.id);
                            
                            return (
                              <div
                                key={friend.id}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-purple-50 border-purple-200'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                }`}
                                onClick={() => isSelected 
                                  ? handleRemoveCollaborator(friend.id)
                                  : handleAddCollaborator(friend.id)
                                }
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    <img
                                      src={friend.avatar}
                                      alt={friend.username}
                                      className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {friend.isOnline && (
                                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{friend.username}</span>
                                    {friend.isVerified && (
                                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                  isSelected
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-gray-300'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {formData.collaborators.length === 0 && !showCollaborators && (
                      <p className="text-sm text-gray-500">
                        No collaborators added yet. Click "Add Friends" to invite people to collaborate on this list.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="bg-white/70 backdrop-blur-sm border border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Public/Private Toggle */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Visibility:</h3>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('isPublic', true)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                            formData.isPublic
                              ? 'bg-purple-100 border-purple-500 text-purple-700'
                              : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Eye className="w-5 h-5" />
                          <span>Public</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleInputChange('isPublic', false)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                            !formData.isPublic
                              ? 'bg-purple-100 border-purple-500 text-purple-700'
                              : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <EyeOff className="w-5 h-5" />
                          <span>Private</span>
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {formData.isPublic 
                          ? 'Your list will be visible to everyone and can be discovered in search results.'
                          : 'Your list will only be visible to you and won\'t appear in search results.'
                        }
                      </p>
                    </div>

                    {/* Engagement Settings */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Engagement:</h3>
                      
                      {/* Hide Likes Toggle */}
                      <div 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInputChange('hideLikes', !formData.hideLikes)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${
                            formData.hideLikes ? 'bg-purple-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                              formData.hideLikes ? 'translate-x-5' : 'translate-x-1'
                            }`}></div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Hide Like Count</h4>
                            <p className="text-sm text-gray-600">Hide the number of likes on your list</p>
                          </div>
                        </div>
                        <div className="text-purple-600 text-sm font-medium">
                          {formData.hideLikes ? 'Hidden' : 'Visible'}
                        </div>
                      </div>

                      {/* Disable Comments Toggle */}
                      <div 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInputChange('disableComments', !formData.disableComments)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${
                            formData.disableComments ? 'bg-purple-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                              formData.disableComments ? 'translate-x-5' : 'translate-x-1'
                            }`}></div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Disable Comments</h4>
                            <p className="text-sm text-gray-600">Turn off commenting on your list</p>
                          </div>
                        </div>
                        <div className="text-purple-600 text-sm font-medium">
                          {formData.disableComments ? 'Disabled' : 'Enabled'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                    isFormValid
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Create List</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
