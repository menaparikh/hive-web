"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, Send, ChevronLeft, ChevronRight, Pause, Play, MoreHorizontal } from 'lucide-react';
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
  const [progressWidth, setProgressWidth] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const hasInitializedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const storyStartTimeRef = useRef<number>(Date.now());
  const mentionedStoryRef = useRef<string>('');

  // Mock stories data for each creator - using new format
  const getCreatorStories = (username: string): Story[] => {
    const storiesMap: { [key: string]: Story[] } = {
      'menaparikh': [],
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
        },
        {
          id: '2',
          username: 'lumen.ly',
          avatar: '/lumen.png',
          createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          expiresAt: new Date(Date.now() + 23.25 * 60 * 60 * 1000), // 23.25 hours left
          contents: [
            {
              id: '1',
              type: 'text',
              content: 'Just watched the funniest movie! 😂',
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
              content: 'Can\'t stop laughing! 🤣',
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
          type: 'custom'
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
    onCloseRef.current = onClose;
  }, [onClose]);

  // Auto-advance and progress tracking
  useEffect(() => {
    if (isOpen && !isPaused) {
      // Reset progress and start time when story changes
      setProgressWidth(0);
      storyStartTimeRef.current = Date.now();
      
      // Start progress animation
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - storyStartTimeRef.current;
        const progress = Math.min((elapsed / 5000) * 100, 100); // 5 seconds
        setProgressWidth(progress);
        
        if (progress >= 100) {
          // Auto-advance to next story using the same logic as handleNext
          if (allCreators && currentCreatorIndex < allCreators.length - 1) {
            // Move to next creator
            setCurrentCreatorIndex(prev => prev + 1);
            setCurrentStoryIndex(0); // Start at first story of next creator
          } else if (currentStoryIndex < stories.length - 1) {
            // Move to next story within same creator
          setCurrentStoryIndex(prev => prev + 1);
        } else {
            // Stop auto-advancing at the last story, don't close
            // User can manually navigate or close
        }
        }
      }, 50); // Update every 50ms for smooth animation

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      // Pause progress animation
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
    }
    }
  }, [isOpen, isPaused, currentStoryIndex, currentCreatorIndex]);

  useEffect(() => {
    if (isOpen && !hasInitializedRef.current) {
      setCurrentStoryIndex(initialStoryIndex);
      setIsPaused(false);
      setProgressWidth(0);
      
      // Set current creator index if allCreators is provided
      if (allCreators) {
        const creatorIndex = allCreators.indexOf(creatorUsername);
        if (creatorIndex !== -1) {
          setCurrentCreatorIndex(creatorIndex);
        }
      }
      
      hasInitializedRef.current = true;
    } else if (!isOpen) {
      hasInitializedRef.current = false;
      setProgressWidth(0);
    }
  }, [isOpen]);

  // Separate useEffect for mention checking
  useEffect(() => {
    if (isOpen && onMention && currentStory) {
      // Only trigger mention once per story
      if (mentionedStoryRef.current !== currentStory.id) {
        const repostContent = currentStory.contents.find(content => 
          content.type === 'repost' && 
          content.repostData?.originalCreator === 'menaparikh'
        );
        
        if (repostContent) {
          mentionedStoryRef.current = currentStory.id;
          onMention(
            currentStory.username,
            currentStory.avatar,
            currentStory.id
          );
        }
      }
    }
  }, [isOpen, onMention, currentStory]);

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
    console.log('handleNext called - currentCreatorIndex:', currentCreatorIndex, 'allCreators.length:', allCreators?.length);
    
    // Reset progress when manually navigating
    setProgressWidth(0);
    
    // Always try to move to next creator first
      if (allCreators && currentCreatorIndex < allCreators.length - 1) {
      console.log('Moving to next creator');
        setCurrentCreatorIndex(prev => prev + 1);
      setCurrentStoryIndex(0); // Start at first story of next creator
      } else {
      // If no more creators, try to move to next story within current creator
      if (currentStoryIndex < stories.length - 1) {
        console.log('Moving to next story within same creator');
        setCurrentStoryIndex(prev => prev + 1);
      } else {
        console.log('Closing story viewer - reached end');
        onClose();
      }
    }
  };

  const handlePrevious = () => {
    console.log('handlePrevious called - currentCreatorIndex:', currentCreatorIndex, 'allCreators.length:', allCreators?.length);
    
    // Reset progress when manually navigating
    setProgressWidth(0);
    
    // Always try to move to previous creator first
      if (allCreators && currentCreatorIndex > 0) {
      console.log('Moving to previous creator');
        setCurrentCreatorIndex(prev => prev - 1);
        const prevCreatorStories = getCreatorStories(allCreators[currentCreatorIndex - 1]);
      setCurrentStoryIndex(prevCreatorStories.length - 1); // Start at last story of previous creator
    } else {
      // If no more creators, try to move to previous story within current creator
      if (currentStoryIndex > 0) {
        console.log('Moving to previous story within same creator');
        setCurrentStoryIndex(prev => prev - 1);
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

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Instagram-style story viewer with adjacent previews */}
      <div className="relative w-full max-w-4xl h-full max-h-[600px] flex items-center justify-center">
        
        {/* Previous Story Preview (Left) */}
        {currentCreatorIndex > 0 && getCreatorStories(allCreators[currentCreatorIndex - 1]).length > 0 && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
            <div className="w-32 h-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-50 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={handlePrevious}>
              <div className="w-full h-8 bg-gradient-to-b from-black/30 to-transparent flex items-center px-2">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-white">
                  <Image
                    src={getCreatorStories(allCreators[currentCreatorIndex - 1])[0]?.avatar || '/actualmena.png'}
                    alt="Previous story"
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-xs ml-1 truncate font-medium">
                  {allCreators[currentCreatorIndex - 1]}
                </span>
              </div>
              <div 
                className="w-full h-40 relative"
                style={{ background: getCreatorStories(allCreators[currentCreatorIndex - 1])[0]?.background || 'linear-gradient(45deg, #FF6B9D, #C44569)' }}
              >
                {/* Story content preview */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {(() => {
                    const prevStory = getCreatorStories(allCreators[currentCreatorIndex - 1])[0];
                    const contents = prevStory?.contents || [];
                    
                    // Find the most meaningful content to display
                    const listContent = contents.find(c => c.type === 'list' && c.listData);
                    const repostContent = contents.find(c => c.type === 'repost' && c.repostData);
                    const textContent = contents.find(c => c.type === 'text' && c.content);
                    
                    if (listContent?.listData) {
                      return (
                        <div className="text-white text-xs text-center">
                          <div className="font-semibold mb-1 leading-tight">{listContent.listData.title}</div>
                          <div className="opacity-80 leading-tight">{listContent.listData.description.substring(0, 40)}...</div>
                        </div>
                      );
                    } else if (repostContent?.repostData) {
                      return (
                        <div className="text-white text-xs text-center">
                          <div className="font-semibold mb-1 leading-tight">📋 {repostContent.repostData.title}</div>
                          <div className="opacity-80 leading-tight">Reposted from @{repostContent.repostData.originalCreator}</div>
                        </div>
                      );
                    } else if (textContent?.content) {
                      return (
                        <div className="text-white text-xs text-center opacity-90 leading-tight">
                          {textContent.content.length > 60 
                            ? `${textContent.content.substring(0, 60)}...` 
                            : textContent.content}
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-xs opacity-70">Story</div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Story Preview (Right) */}
        {currentCreatorIndex < (allCreators?.length || 0) - 1 && getCreatorStories(allCreators[currentCreatorIndex + 1]).length > 0 && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
            <div className="w-32 h-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-50 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={handleNext}>
              <div className="w-full h-8 bg-gradient-to-b from-black/30 to-transparent flex items-center px-2">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-white">
                  <Image
                    src={getCreatorStories(allCreators[currentCreatorIndex + 1])[0]?.avatar || '/actualmena.png'}
                    alt="Next story"
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-xs ml-1 truncate font-medium">
                  {allCreators[currentCreatorIndex + 1]}
                </span>
              </div>
              <div 
                className="w-full h-40 relative"
                style={{ background: getCreatorStories(allCreators[currentCreatorIndex + 1])[0]?.background || 'linear-gradient(45deg, #FF6B9D, #C44569)' }}
              >
                {/* Story content preview */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {(() => {
                    const nextStory = getCreatorStories(allCreators[currentCreatorIndex + 1])[0];
                    const contents = nextStory?.contents || [];
                    
                    // Find the most meaningful content to display
                    const listContent = contents.find(c => c.type === 'list' && c.listData);
                    const repostContent = contents.find(c => c.type === 'repost' && c.repostData);
                    const textContent = contents.find(c => c.type === 'text' && c.content);
                    
                    if (listContent?.listData) {
                      return (
                        <div className="text-white text-xs text-center">
                          <div className="font-semibold mb-1 leading-tight">{listContent.listData.title}</div>
                          <div className="opacity-80 leading-tight">{listContent.listData.description.substring(0, 40)}...</div>
                        </div>
                      );
                    } else if (repostContent?.repostData) {
                      return (
                        <div className="text-white text-xs text-center">
                          <div className="font-semibold mb-1 leading-tight">📋 {repostContent.repostData.title}</div>
                          <div className="opacity-80 leading-tight">Reposted from @{repostContent.repostData.originalCreator}</div>
                        </div>
                      );
                    } else if (textContent?.content) {
                      return (
                        <div className="text-white text-xs text-center opacity-90 leading-tight">
                          {textContent.content.length > 60 
                            ? `${textContent.content.substring(0, 60)}...` 
                            : textContent.content}
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-xs opacity-70">Story</div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Story Container */}
      <div className="relative w-full max-w-sm h-full max-h-[600px] bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Clickable close area in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-20 h-20 z-40"
          aria-label="Close story"
        />
        {/* Multi-Story Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 z-50 flex gap-1 p-1">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 bg-gray-800/30 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-50 ease-linear ${
                  index < currentStoryIndex 
                    ? 'bg-white' // Completed stories
                    : index === currentStoryIndex 
                    ? 'bg-white' // Current story (will be controlled by progressWidth)
                    : 'bg-transparent' // Future stories
                }`}
                style={{ 
                  width: index === currentStoryIndex 
                    ? `${progressWidth}%` 
                    : index < currentStoryIndex 
                    ? '100%' 
                    : '0%'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Main Progress Bar */}
        <div className="absolute top-3 left-0 right-0 h-2 bg-gray-800/50 z-50">
          <div 
            ref={progressRef}
            className="h-full bg-white transition-all duration-50 ease-linear rounded-r-full"
            style={{ width: `${progressWidth}%` }}
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
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
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
                        {/* Removed "by @username" line - you can uncomment below if you want to show it */}
                        {/* <p className="text-xs text-gray-500">by @{content.repostData.originalCreator}</p> */}
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

        {/* Navigation Arrows - Only show when there's a previous/next story */}
        {(currentStoryIndex > 0 || (allCreators && currentCreatorIndex > 0 && getCreatorStories(allCreators[currentCreatorIndex - 1]).length > 0)) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Story Previous clicked!');
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 hover:scale-105 cursor-pointer"
            style={{ 
              pointerEvents: 'auto',
              zIndex: 1000
            }}
            type="button"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}
        
        {(currentStoryIndex < stories.length - 1 || (allCreators && currentCreatorIndex < allCreators.length - 1)) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Story Next clicked!');
              handleNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 hover:scale-105 cursor-pointer"
            style={{ 
              pointerEvents: 'auto',
              zIndex: 1000
            }}
            type="button"
            aria-label="Next story"
          >
            <ChevronRight className="w-7 h-7" />
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
          

        </div>

        </div>
      </div>
    </div>
  );
}
