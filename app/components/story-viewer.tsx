"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2 } from 'lucide-react';

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
  allCreators: string[];
  onMention: (username: string, avatar: string, storyId?: string) => void;
};

// Mock stories data - in a real app, this would come from an API
const getStoriesByCreator = (username: string): Story[] => {
  const mockStories: { [key: string]: Story[] } = {
    'lumen.ly': [
      {
        id: '1',
        username: 'lumen.ly',
        avatar: '/lumen.png',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        contents: [
          {
            id: '1',
            type: 'text',
            content: 'Check out my new list!',
            x: 50,
            y: 50,
            fontSize: 24,
            color: '#ffffff'
          }
        ],
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        isActive: true,
        type: 'custom'
      }
    ],
    'violet.noir': [
      {
        id: '2',
        username: 'violet.noir',
        avatar: '/violet.png',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        contents: [
          {
            id: '1',
            type: 'text',
            content: 'Amazing recipes!',
            x: 50,
            y: 50,
            fontSize: 24,
            color: '#ffffff'
          }
        ],
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        isActive: true,
        type: 'custom'
      }
    ],
    'beneastman': [
      {
        id: '3',
        username: 'beneastman',
        avatar: '/ben.jpg',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        contents: [
          {
            id: '1',
            type: 'text',
            content: 'Great books!',
            x: 50,
            y: 50,
            fontSize: 24,
            color: '#ffffff'
          }
        ],
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        isActive: true,
        type: 'custom'
      }
    ],
    'lifeofmads': [
      {
        id: '4',
        username: 'lifeofmads',
        avatar: '/mads.png',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        contents: [
          {
            id: '1',
            type: 'text',
            content: 'Love this!',
            x: 50,
            y: 50,
            fontSize: 24,
            color: '#ffffff'
          }
        ],
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        isActive: true,
        type: 'custom'
      }
    ]
  };

  return mockStories[username] || [];
};

export default function StoryViewer({
  isOpen,
  onClose,
  initialStoryIndex,
  creatorUsername,
  allCreators,
  onMention
}: StoryViewerProps) {
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(() => {
    return allCreators.findIndex(creator => creator === creatorUsername);
  });
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  const currentCreator = allCreators[currentCreatorIndex] || creatorUsername;
  const stories = getStoriesByCreator(currentCreator);
  const currentStory = stories[currentStoryIndex];

  // Auto-advance story
  useEffect(() => {
    if (!isOpen || !currentStory) return;

    const duration = 5000; // 5 seconds per story
    const interval = 100; // Update every 100ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentStory, currentStoryIndex, currentCreatorIndex]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex, currentCreatorIndex]);

  const handleNextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Move to next creator
      if (currentCreatorIndex < allCreators.length - 1) {
        setCurrentCreatorIndex(currentCreatorIndex + 1);
        setCurrentStoryIndex(0);
      } else {
        // Reached end, close viewer
        onClose();
      }
    }
  }, [currentStoryIndex, stories.length, currentCreatorIndex, allCreators.length, onClose]);

  const handlePreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // Move to previous creator
      if (currentCreatorIndex > 0) {
        setCurrentCreatorIndex(currentCreatorIndex - 1);
        const prevCreatorStories = getStoriesByCreator(allCreators[currentCreatorIndex - 1]);
        setCurrentStoryIndex(prevCreatorStories.length - 1);
      }
    }
  }, [currentStoryIndex, currentCreatorIndex, allCreators]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      handleNextStory();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      handlePreviousStory();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [isOpen, handleNextStory, handlePreviousStory, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, handleKeyPress]);

  if (!isOpen || !currentStory) return null;

  const currentCreatorStories = getStoriesByCreator(currentCreator);
  const avatarMap: { [key: string]: string } = {
    'menaparikh': '/actualmena.png',
    'lumen.ly': '/lumen.png',
    'violet.noir': '/violet.png',
    'beneastman': '/ben.jpg',
    'lifeofmads': '/mads.png',
    'coraoconell': '/cora.png',
    'chilithedog': '/chili.png',
    'glow.with.indie': '/indie.png',
    'lilyjade': '/lily.png',
    'derekshone': '/derek.png'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="Close story viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: currentStory.background }}
        />

        {/* Story Contents Overlay */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {currentStory.contents.map((content) => (
            <div
              key={content.id}
              className="absolute"
              style={{
                left: `${content.x}%`,
                top: `${content.y}%`,
                transform: `translate(-50%, -50%) rotate(${content.rotation || 0}deg) scale(${content.scale || 1})`,
                fontSize: `${content.fontSize || 24}px`,
                color: content.color || '#ffffff',
                fontFamily: content.fontFamily || 'inherit'
              }}
            >
              {content.type === 'text' && (
                <p className="text-white drop-shadow-lg">{content.content}</p>
              )}
              {content.type === 'list' && content.listData && (
                <div className="bg-white/90 rounded-lg p-4 max-w-xs">
                  <Image
                    src={content.listData.imageUrl}
                    alt={content.listData.title}
                    width={200}
                    height={150}
                    className="rounded-lg mb-2"
                  />
                  <h3 className="font-bold text-gray-900">{content.listData.title}</h3>
                  <p className="text-sm text-gray-600">{content.listData.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/30 z-20">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Creator Info */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={avatarMap[currentCreator] || '/actualmena.png'}
              alt={currentCreator}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold">{currentCreator}</p>
            <p className="text-white/80 text-sm">
              {currentStoryIndex + 1} / {currentCreatorStories.length}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePreviousStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          <button
            onClick={() => onMention(currentCreator, avatarMap[currentCreator] || '', currentStory.id)}
            className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Like"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Comment"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button
            className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}





