"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Save, Users, Lock, Globe, MessageCircle, MessageSquare, BookOpen, Film, Utensils, Heart, MapPin, Sparkles, X, CheckCircle, Square } from "lucide-react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

type Template = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  category: string;
  defaultItems?: string[];
};

export default function AddList() {
  const searchParams = useSearchParams();
  const isTemplateMode = searchParams.get('template') === 'true';
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const [listData, setListData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    collaboration: 'private' as 'public' | 'private-collab' | 'private',
    allowComments: true,
    showCheckboxes: true
  });
  const [tagInput, setTagInput] = useState('');

  const templates: Template[] = [
    {
      id: 'books',
      name: 'Books to Read',
      description: 'Track books you want to read',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      category: 'Books',
      defaultItems: ['Book Title 1', 'Book Title 2']
    },
    {
      id: 'movies',
      name: 'Movies to Watch',
      description: 'Keep a list of movies to watch',
      icon: Film,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      category: 'Movies',
      defaultItems: ['Movie Title 1', 'Movie Title 2']
    },
    {
      id: 'recipes',
      name: 'Recipe Collection',
      description: 'Save your favorite recipes',
      icon: Utensils,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      category: 'Food',
      defaultItems: ['Recipe 1', 'Recipe 2']
    },
    {
      id: 'travel',
      name: 'Travel Destinations',
      description: 'Plan your next adventures',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      category: 'Travel',
      defaultItems: ['Destination 1', 'Destination 2']
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
      description: 'Items you want to get',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      category: 'Shopping',
      defaultItems: ['Item 1', 'Item 2']
    },
    {
      id: 'goals',
      name: 'Goals & Aspirations',
      description: 'Track your personal goals',
      icon: Sparkles,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      category: 'Productivity',
      defaultItems: ['Goal 1', 'Goal 2']
    }
  ];

  useEffect(() => {
    if (selectedTemplate) {
      setListData(prev => ({
        ...prev,
        title: selectedTemplate.name,
        description: selectedTemplate.description,
        category: selectedTemplate.category
      }));
    }
  }, [selectedTemplate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setListData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create list functionality
    alert('List created successfully!');
    // Reset form or redirect
    window.location.href = '/';
  };

  const collaborationOptions = [
    {
      value: 'public',
      label: 'Publicly Collaborative',
      description: 'Anyone can view and add items to this list',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      value: 'private-collab',
      label: 'Private Collaborative',
      description: 'Only invited users can view and add items',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      value: 'private',
      label: 'Private',
      description: 'Only you can view and edit this list',
      icon: Lock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  // If template mode and no template selected, show template selection
  if (isTemplateMode && !selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <Sidebar hasUnreadMessages={true} />
        
        <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/" className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
          </div>

          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 mb-6">Select a template to get started quickly, or <Link href="/add" className="text-purple-600 hover:text-purple-800 font-medium">create from scratch</Link></p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg hover:scale-105 ${
                      selectedTemplate?.id === template.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${template.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${template.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar hasUnreadMessages={true} />
      
      <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href={isTemplateMode ? "/add?template=true" : "/"} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedTemplate ? `Create List from ${selectedTemplate.name}` : 'Create New List'}
            </h1>
            {selectedTemplate && (
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Change template
              </button>
            )}
                      </div>

          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Create List</span>
          </button>
                    </div>

        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        List Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={listData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter a title for your list"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={listData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Describe what this list is about..."
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        value={listData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a category</option>
                        <option value="books">Books</option>
                        <option value="movies">Movies</option>
                        <option value="music">Music</option>
                        <option value="food">Food & Recipes</option>
                        <option value="travel">Travel</option>
                        <option value="fitness">Fitness</option>
                        <option value="technology">Technology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {listData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 border border-purple-200"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                setListData(prev => ({
                                  ...prev,
                                  tags: prev.tags.filter((_, i) => i !== index)
                                }));
                              }}
                              className="ml-2 hover:text-purple-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="tags"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && tagInput.trim()) {
                              e.preventDefault();
                              if (!listData.tags.includes(tagInput.trim())) {
                                setListData(prev => ({
                                  ...prev,
                                  tags: [...prev.tags, tagInput.trim()]
                                }));
                              }
                              setTagInput('');
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                          placeholder="Type a tag and press Enter"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (tagInput.trim() && !listData.tags.includes(tagInput.trim())) {
                              setListData(prev => ({
                                ...prev,
                                tags: [...prev.tags, tagInput.trim()]
                              }));
                              setTagInput('');
                            }
                          }}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Add multiple tags to help others discover your list</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

                             {/* Collaboration Settings */}
               <Card className="overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                <CardContent className="p-6">
                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Collaboration Settings</h2>
                   <p className="text-gray-600 mb-4">Choose who can view and contribute to your list</p>
                   
                      <div className="space-y-3">
                     {collaborationOptions.map((option) => {
                       const IconComponent = option.icon;
                            return (
                         <label
                           key={option.value}
                           className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                             listData.collaboration === option.value
                               ? `${option.borderColor} ${option.bgColor}`
                               : 'border-gray-200 hover:bg-gray-50'
                           }`}
                         >
                           <input
                             type="radio"
                             name="collaboration"
                             value={option.value}
                             checked={listData.collaboration === option.value}
                             onChange={(e) => handleInputChange('collaboration', e.target.value)}
                             className="mt-1"
                           />
                           <div className="flex items-start space-x-3">
                             <IconComponent className={`w-5 h-5 ${option.color} mt-0.5`} />
                             <div>
                               <div className="font-medium text-gray-900">{option.label}</div>
                               <div className="text-sm text-gray-600">{option.description}</div>
                                  </div>
                                </div>
                         </label>
                            );
                          })}
                  </div>
                </CardContent>
              </Card>

               {/* Engagement Settings */}
               <Card className="overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                <CardContent className="p-6">
                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Engagement Settings</h2>
                   <p className="text-gray-600 mb-4">Control how users can interact with your list</p>
                  
                    <div className="space-y-4">
                     {/* Comments Toggle */}
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                         <div className={`w-12 h-6 rounded-full transition-colors flex items-center ${
                           listData.allowComments ? 'bg-purple-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                             listData.allowComments ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </div>
                        <div className="flex items-center space-x-3">
                           {listData.allowComments ? (
                             <MessageCircle className="w-5 h-5 text-green-500" />
                           ) : (
                             <MessageSquare className="w-5 h-5 text-gray-500" />
                           )}
                          <div>
                             <div className="font-medium text-gray-900">Allow Comments</div>
                             <div className="text-sm text-gray-600">
                               {listData.allowComments 
                                 ? 'Users can comment on your list' 
                                 : 'Comments are disabled for this list'
                               }
                        </div>
                      </div>
                    </div>
                  </div>
                <button
                  type="button"
                         onClick={() => handleInputChange('allowComments', !listData.allowComments)}
                         className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                       >
                         {listData.allowComments ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              
              {/* Checkboxes Toggle */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-6 rounded-full transition-colors flex items-center ${
                    listData.showCheckboxes ? 'bg-purple-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                      listData.showCheckboxes ? 'translate-x-7' : 'translate-x-1'
                    }`}></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {listData.showCheckboxes ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">Show Checkboxes</div>
                      <div className="text-sm text-gray-600">
                        {listData.showCheckboxes 
                          ? 'Users can check off items as completed' 
                          : 'Checkboxes are disabled for this list'
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleInputChange('showCheckboxes', !listData.showCheckboxes)}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {listData.showCheckboxes ? 'Enabled' : 'Disabled'}
                </button>
              </div>
                   </div>
                 </CardContent>
               </Card>
            </form>
          </div>
        </div>
      </main>
      </div>
  );
}
