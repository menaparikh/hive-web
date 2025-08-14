"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, MessageCircle, Send, ChevronLeft, ChevronRight, Pause, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type StoryContent = {
  id: string;
  type: 'text' | 'image' | 'background' | 'list' | 'repost';
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  rotation?: number;
  scale?: number;
  listData?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    category: string;
  };
  repostData?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    originalCreator: string;
    repostedBy: string;
    category: string;
  };
};

type Story = {
  id: string;
  username: string;
  avatar: string;
  createdAt: Date;
  expiresAt: Date;
  contents: StoryContent[];
  background: string;
  isActive: boolean;
  type: 'custom' | 'list-repost';
};

type StoryViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  initialStoryIndex: number;
  creatorUsername: string;
  onMention?: (username: string, avatar: string, storyId: string) => void;
  allCreators?: string[];
};

export default function StoryViewer({ isOpen, onClose, initialStoryIndex, creatorUsername, onMention, allCreators }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const progressRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  // Mock stories data for each creator - using new format
  const getCreatorStories = (username: string): Story[] => {
    const storiesMap: { [key: string]: Story[] } = {
      'menaparikh': [
        {
          id: '1',
          username: 'menaparikh',
          avatar: '/actualmena.png',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours left
          contents: [
            {
              id: '1',
              type: 'list',
              content: '',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1,
              listData: {
                id: '1',
                title: 'Horror Books for Teens',
                description: 'Spooky reads perfect for young adults who love a good scare',
                imageUrl: '/horror.png',
                createdBy: 'menaparikh',
                category: 'Books'
              }
            },
            {
              id: '2',
              type: 'text',
              content: 'My latest horror list! 🎃',
              x: 50,
              y: 80,
              fontSize: 18,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)',
          isActive: true,
          type: 'list-repost'
        }
      ],
      'lumen.ly': [
        {
          id: '1',
          username: 'lumen.ly',
          avatar: '/lumen.png',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000), // 23 hours left
          contents: [
            {
              id: '1',
              type: 'list',
              content: '',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1,
              listData: {
                id: '2',
                title: 'Must Watch Comedy Movies',
                description: 'Hilarious films that will have you laughing all night long',
                imageUrl: '/comedy.png',
                createdBy: 'lumen.ly',
                category: 'Movies'
              }
            },
            {
              id: '2',
              type: 'text',
              content: 'Movie night essentials 🍿',
              x: 50,
              y: 80,
              fontSize: 18,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #06D6A0, #118AB2, #073B4C, #26547C)',
          isActive: true,
          type: 'list-repost'
        }
      ],
      'violet.noir': [
        {
          id: '1',
          username: 'violet.noir',
          avatar: '/violet.png',
          createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          expiresAt: new Date(Date.now() + 23.5 * 60 * 60 * 1000), // 23.5 hours left
          contents: [
            {
              id: '1',
              type: 'repost',
              content: '',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1,
              repostData: {
                id: '3',
                title: 'Go-To Salad Recipes',
                description: 'Fresh and healthy salad recipes for every occasion',
                imageUrl: '/salad.png',
                originalCreator: 'menaparikh',
                repostedBy: 'violet.noir',
                category: 'Food'
              }
            },
            {
              id: '2',
              type: 'text',
              content: 'Reposted from @menaparikh',
              x: 50,
              y: 80,
              fontSize: 14,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #FFD166, #EF476F, #FF6B9D, #C44569)',
          isActive: true,
          type: 'list-repost'
        }
      ],
      'beneastman': [
        {
          id: '1',
          username: 'beneastman',
          avatar: '/ben.jpg',
          createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          expiresAt: new Date(Date.now() + 23.25 * 60 * 60 * 1000), // 23.25 hours left
          contents: [
            {
              id: '1',
              type: 'repost',
              content: '',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1,
              repostData: {
                id: '4',
                title: 'Cooking Techniques',
                description: 'Essential cooking methods and techniques for beginners',
                imageUrl: '/cooking.png',
                originalCreator: 'lumen.ly',
                repostedBy: 'beneastman',
                category: 'Food'
              }
            },
            {
              id: '2',
              type: 'text',
              content: 'Reposted from @lumen.ly',
              x: 50,
              y: 80,
              fontSize: 14,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #EF476F, #FF6B9D, #C44569, #8B5CF6)',
          isActive: true,
          type: 'list-repost'
        }
      ],
      'lifeofmads': [
        {
          id: '1',
          username: 'lifeofmads',
          avatar: '/mads.png',
          createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          expiresAt: new Date(Date.now() + 23.75 * 60 * 60 * 1000), // 23.75 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Photography tips that changed my life 📸',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '✨',
              x: 25,
              y: 30,
              fontSize: 42,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: -10,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #06D6A0, #118AB2, #073B4C, #26547C)',
          isActive: true
        }
      ],
      'coraoconell': [
        {
          id: '1',
          username: 'coraoconell',
          avatar: '/cora.png',
          createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          expiresAt: new Date(Date.now() + 23.92 * 60 * 60 * 1000), // 23.92 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Documentary collection is 🔥',
              x: 50,
              y: 50,
              fontSize: 26,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '🎬',
              x: 75,
              y: 70,
              fontSize: 38,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 5,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #8B5CF6, #F8B500, #FF6B9D, #C44569)',
          isActive: true
        }
      ],
      'chilithedog': [
        {
          id: '1',
          username: 'chilithedog',
          avatar: '/chili.png',
          createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
          expiresAt: new Date(Date.now() + 23.67 * 60 * 60 * 1000), // 23.67 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Travel destinations bucket list ✈️',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '🌍',
              x: 30,
              y: 30,
              fontSize: 44,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #06D6A0, #118AB2, #073B4C, #26547C)',
          isActive: true
        }
      ],
      'glow.with.indie': [
        {
          id: '1',
          username: 'glow.with.indie',
          avatar: '/indie.png',
          createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
          expiresAt: new Date(Date.now() + 23.83 * 60 * 60 * 1000), // 23.83 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Healthy breakfast ideas that actually taste good! 🍳',
              x: 50,
              y: 50,
              fontSize: 22,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '🥑',
              x: 70,
              y: 70,
              fontSize: 40,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #FFD166, #EF476F, #FF6B9D, #C44569)',
          isActive: true
        }
      ],
      'lilyjade': [
        {
          id: '1',
          username: 'lilyjade',
          avatar: '/lily.png',
          createdAt: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
          expiresAt: new Date(Date.now() + 23.42 * 60 * 60 * 1000), // 23.42 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Productivity tools that actually work! 💻',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '⚡',
              x: 25,
              y: 25,
              fontSize: 46,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #8B5CF6, #F8B500, #FF6B9D, #C44569)',
          isActive: true
        }
      ],
      'derekshone': [
        {
          id: '1',
          username: 'derekshone',
          avatar: '/derek.png',
          createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
          expiresAt: new Date(Date.now() + 23.58 * 60 * 60 * 1000), // 23.58 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'DIY projects that are actually doable! 🔨',
              x: 50,
              y: 50,
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            },
            {
              id: '2',
              type: 'text',
              content: '🛠️',
              x: 75,
              y: 75,
              fontSize: 42,
              color: '#FFD166',
              fontFamily: 'Inter',
              rotation: 0,
              scale: 1
            }
          ],
          background: 'linear-gradient(45deg, #06D6A0, #118AB2, #073B4C, #26547C)',
          isActive: true
        }
      ]
    };

    return storiesMap[username] || [];
  };

  const currentCreator = allCreators ? allCreators[currentCreatorIndex] : creatorUsername;
  const stories = getCreatorStories(currentCreator);
  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    if (isOpen && !isPaused && stories.length > 1) {
      autoAdvanceRef.current = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
        } else {
          onClose();
        }
      }, 5000); // 5 seconds per story

      return () => {
        if (autoAdvanceRef.current) {
          clearTimeout(autoAdvanceRef.current);
        }
      };
    }
  }, [isOpen, isPaused, currentStoryIndex, stories.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStoryIndex(initialStoryIndex);
      setIsPaused(false);
      
      // Set current creator index if allCreators is provided
      if (allCreators) {
        const creatorIndex = allCreators.indexOf(creatorUsername);
        if (creatorIndex !== -1) {
          setCurrentCreatorIndex(creatorIndex);
        }
      }
      
      // Check for mentions when story opens
      if (onMention && currentStory) {
        const repostContent = currentStory.contents.find(content => 
          content.type === 'repost' && 
          content.repostData?.originalCreator === 'menaparikh'
        );
        
        if (repostContent) {
          onMention(
            currentStory.username,
            currentStory.avatar,
            currentStory.id
          );
        }
      }
    }
  }, [isOpen, initialStoryIndex, currentStory, onMention, allCreators, creatorUsername]);

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const handleReply = () => {
    if (replyText.trim()) {
      alert(`Reply sent: "${replyText}"`);
      setReplyText('');
    }
  };



  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      // Move to next creator if available
      if (allCreators && currentCreatorIndex < allCreators.length - 1) {
        setCurrentCreatorIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
      } else {
        onClose();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else {
      // Move to previous creator if available
      if (allCreators && currentCreatorIndex > 0) {
        setCurrentCreatorIndex(prev => prev - 1);
        const prevCreatorStories = getCreatorStories(allCreators[currentCreatorIndex - 1]);
        setCurrentStoryIndex(prevCreatorStories.length - 1);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, currentStoryIndex, stories.length]);

  if (!isOpen || !currentStory) return null;

  const progressPercentage = ((currentStoryIndex + 1) / stories.length) * 100;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Phone-sized container */}
      <div className="relative w-full max-w-sm h-full max-h-[600px] bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Clickable close area in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-20 h-20 z-40"
          aria-label="Close story"
        />
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
          <div 
            ref={progressRef}
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/20 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={currentStory.avatar}
                alt={currentStory.username}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{currentStory.username}</div>
              <div className="text-gray-300 text-xs">
                {Math.floor((currentStory.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))}h left
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Pause className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('X button clicked - closing story');
                onClose();
              }}
              className="p-3 text-white hover:bg-white/20 rounded-full transition-colors bg-black/30 backdrop-blur-sm border border-white/30 hover:border-white/50 hover:bg-black/50"
              style={{ cursor: 'pointer' }}
              aria-label="Close story"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background */}
          <div 
            className="absolute inset-0"
            style={{ background: currentStory.background }}
          />

          {/* Story Contents */}
          <div className="relative z-10 w-full h-full">
            {currentStory.contents.map((content) => (
              <div
                key={content.id}
                className="absolute"
                style={{
                  left: `${content.x}%`,
                  top: `${content.y}%`,
                  transform: `translate(-50%, -50%) rotate(${content.rotation}deg) scale(${content.scale})`,
                  fontSize: content.fontSize,
                  color: content.color,
                  fontFamily: content.fontFamily,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {content.type === 'list' && content.listData ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={content.listData.imageUrl}
                          alt={content.listData.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{content.listData.title}</h4>
                        <p className="text-xs text-gray-500">by {content.listData.createdBy}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{content.listData.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-purple-600 font-medium">{content.listData.category}</span>
                      <Link 
                        href={`/messages/lists/${content.listData.id}`}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View List →
                      </Link>
                    </div>
                  </div>
                ) : content.type === 'repost' && content.repostData ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-purple-600 font-medium">Repost</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={content.repostData.imageUrl}
                          alt={content.repostData.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{content.repostData.title}</h4>
                        <p className="text-xs text-gray-500">by @{content.repostData.originalCreator}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{content.repostData.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-purple-600 font-medium">{content.repostData.category}</span>
                      <Link 
                        href={`/messages/lists/${content.repostData.id}`}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View List →
                      </Link>
                    </div>
                  </div>
                ) : (
                  content.content
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {(currentStoryIndex > 0 || (allCreators && currentCreatorIndex > 0)) && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {(currentStoryIndex < stories.length - 1 || (allCreators && currentCreatorIndex < allCreators.length - 1)) && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Interaction Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentStory.username}...`}
              className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              onKeyPress={(e) => e.key === 'Enter' && handleReply()}
            />
            
            <button
              onClick={() => handleLike(currentStory.id)}
              className={`p-2 rounded-full transition-colors ${
                likedStories.has(currentStory.id) 
                  ? 'text-red-500 bg-red-500/20' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Heart className={`w-5 h-5 ${likedStories.has(currentStory.id) ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleReply}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-white/70 text-sm">
            <span>{currentStory.likes} likes</span>
            <span>{currentStory.replies} replies</span>
          </div>
        </div>

        {/* Story Counter */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          {currentStoryIndex + 1} / {stories.length}
        </div>
      </div>
    </div>
  );
}
