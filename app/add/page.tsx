"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Save, Users, Lock, Globe, MessageCircle, MessageSquare } from "lucide-react";
import Link from 'next/link';

export default function AddList() {
  const [listData, setListData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    collaboration: 'private' as 'public' | 'private-collab' | 'private',
    allowComments: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setListData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating list:', listData);
    alert('List created successfully!');
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
            <h1 className="text-2xl font-bold text-gray-900">Create New List</h1>
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
                      <input
                        type="text"
                        id="tags"
                        value={listData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter tags separated by commas (e.g., horror, young adult, thriller)"
                      />
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
