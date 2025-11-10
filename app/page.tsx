"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import Header from './components/header';
import { Sidebar } from '@/components/ui/sidebar';
import { Bookmark, Plus } from 'lucide-react';
import StoryViewer from './components/story-viewer';
import StoryCreator from './components/story-creator';
import Notification from './components/notification';
import { useFavorites } from './contexts/FavoritesContext';
import { useNotifications } from './contexts/NotificationContext';

type Story = {
  id: string;
  username: string;
  avatar: string;
  createdAt: Date;
  expiresAt: Date;
  contents: any[];
  background: string;
  isActive: boolean;
  type: 'custom' | 'list-repost';
};

type List = {
  id: string;
  title: string;
  createdBy: string;
  imageUrl: string;
  lastEdited: string;
  tags?: string[];
};

type NotificationData = {
  id: string;
  type: 'repost' | 'like' | 'comment';
  username: string;
  avatar: string;
  content: string;
  timeAgo: string;
  storyId?: string;
};

export default function Home() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addNotification, clearAllNotifications } = useNotifications();
  const [storyViewer, setStoryViewer] = useState<{
    isOpen: boolean;
    creatorUsername: string;
    initialStoryIndex: number;
  }>({
    isOpen: false,
    creatorUsername: '',
    initialStoryIndex: 0
  });

  const allCreators = [
    'menaparikh',
    'lumen.ly',
    'violet.noir',
    'beneastman',
    'lifeofmads',
    'coraoconell',
    'chilithedog',
    'glow.with.indie',
    'lilyjade',
    'derekshone'
  ];
  const [storyCreator, setStoryCreator] = useState(false);
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    data: NotificationData | null;
  }>({
    isOpen: false,
    data: null
  });

  const lists: List[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      createdBy: 'John Smith',
      imageUrl: '/horror.png',
      lastEdited: '2024-01-15',
      tags: ['horror', 'young-adult', 'books', 'thriller']
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      createdBy: 'Sarah Johnson',
      imageUrl: '/comedy.png',
      lastEdited: '2024-01-10',
      tags: ['comedy', 'movies', 'entertainment']
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      createdBy: 'Mike Davis',
      imageUrl: '/salad.png',
      lastEdited: '2024-01-08',
      tags: ['food', 'recipes', 'healthy', 'salad']
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      createdBy: 'Lisa Chen',
      imageUrl: '/cooking.png',
      lastEdited: '2024-01-05',
      tags: ['cooking', 'food', 'techniques', 'tips']
    },
    {
      id: '5',
      title: 'Photography Tips',
      createdBy: 'Tom Wilson',
      imageUrl: '/camera.png',
      lastEdited: '2024-01-03',
      tags: ['photography', 'art', 'tips', 'creative']
    },
    {
      id: '6',
      title: 'Documentary Collection',
      createdBy: 'Rachel Green',
      imageUrl: '/documentary.png',
      lastEdited: '2024-01-01',
      tags: ['documentary', 'movies', 'educational']
    },
    {
      id: '7',
      title: 'Travel Destinations',
      createdBy: 'Maria Rodriguez',
      imageUrl: '/destination.png',
      lastEdited: '2023-12-28',
      tags: ['travel', 'destinations', 'adventure', 'places']
    },
    {
      id: '8',
      title: 'Healthy Breakfast Ideas',
      createdBy: 'James Wilson',
      imageUrl: '/healthybreakfast.png',
      lastEdited: '2023-12-25',
      tags: ['food', 'breakfast', 'healthy', 'recipes']
    },
    {
      id: '9',
      title: 'Productivity Tools',
      createdBy: 'Emily Chen',
      imageUrl: '/productivity.png',
      lastEdited: '2023-12-22',
      tags: ['productivity', 'tools', 'apps', 'work']
    },
    {
      id: '10',
      title: 'Garden Plants',
      createdBy: 'David Thompson',
      imageUrl: '/garden.png',
      lastEdited: '2023-12-19',
      tags: ['gardening', 'plants', 'nature', 'outdoor']
    },
    {
      id: '11',
      title: 'Workout Routines',
      createdBy: 'Lisa Park',
      imageUrl: '/workout.png',
      lastEdited: '2023-12-16',
      tags: ['fitness', 'workout', 'exercise', 'health']
    },
    {
      id: '12',
      title: 'DIY Projects',
      createdBy: 'Alex Johnson',
      imageUrl: '/diy.png',
      lastEdited: '2023-12-13',
      tags: ['diy', 'crafts', 'projects', 'creative']
    }
  ];

  const openStory = (creatorUsername: string) => {
    setStoryViewer({
      isOpen: true,
      creatorUsername,
      initialStoryIndex: 0
    });
  };

  const closeStory = useCallback(() => {
    setStoryViewer({
      isOpen: false,
      creatorUsername: '',
      initialStoryIndex: 0
    });
  }, []);

  const handleSaveStory = (story: Story) => {
    setUserStories(prev => [story, ...prev]);
  };

  const showNotification = (type: 'repost' | 'like' | 'comment', username: string, avatar: string, storyId?: string) => {
    const notificationData = {
      id: Date.now().toString(),
      type,
      username,
      avatar,
      content: '',
      timeAgo: 'Just now',
      storyId
    };
  
    setNotification({
      isOpen: true,
      data: notificationData
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, isOpen: false }));
    }, 5000);
  };

  const handleViewStory = (storyId: string) => {
    const story = userStories.find(s => s.id === storyId);
    if (story) {
      setStoryViewer({
        isOpen: true,
        creatorUsername: 'menaparikh',
        initialStoryIndex: 0
      });
    }
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollContainer = document.getElementById('creators-scroll');
      const leftArrow = document.getElementById('left-arrow');
      const rightArrow = document.getElementById('right-arrow');

      if (scrollContainer && leftArrow && rightArrow) {
        const showLeftArrow = () => {
          leftArrow.style.opacity = '1';
          leftArrow.style.pointerEvents = 'auto';
        };

        const hideLeftArrow = () => {
          leftArrow.style.opacity = '0';
          leftArrow.style.pointerEvents = 'none';
        };

        const showRightArrow = () => {
          rightArrow.style.opacity = '1';
          rightArrow.style.pointerEvents = 'auto';
        };

        const hideRightArrow = () => {
          rightArrow.style.opacity = '0';
          rightArrow.style.pointerEvents = 'none';
        };

        const updateArrowVisibility = () => {
          if (scrollContainer.scrollLeft > 0) {
            showLeftArrow();
          } else {
            hideLeftArrow();
          }

          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            hideRightArrow();
          } else {
            showRightArrow();
          }
        };

        scrollContainer.addEventListener('scroll', updateArrowVisibility);
        updateArrowVisibility();

        return () => scrollContainer.removeEventListener('scroll', updateArrowVisibility);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen font-sans bg-white dark:bg-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0 dark:opacity-10" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={true} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Header/>
          </div>
        </div>
      
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                <button
                  onClick={() => {
                    const scrollContainer = document.getElementById('creators-scroll');
                    const leftArrow = document.getElementById('left-arrow');
                    const rightArrow = document.getElementById('right-arrow');
                    if (scrollContainer) {
                      scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
                      setTimeout(() => {
                        if (scrollContainer.scrollLeft <= 0 && leftArrow) {
                          leftArrow.style.opacity = '0';
                          leftArrow.style.pointerEvents = 'none';
                        }
                        if (scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth && rightArrow) {
                          rightArrow.style.opacity = '1';
                          rightArrow.style.pointerEvents = 'auto';
                        }
                      }, 300);
                    }
                  }}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer opacity-0 pointer-events-none z-20"
                  style={{
                    backgroundColor: '#FFD166',
                    pointerEvents: 'auto'
                  }}
                  id="left-arrow"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#26547C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto overflow-y-hidden pb-2 flex-1 pl-0 scrollbar-hide" id="creators-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="relative">
                      <button
                        onClick={() => setStoryCreator(true)}
                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full transition-transform hover:scale-105 cursor-pointer ${
                          userStories.length > 0 ? 'p-1 shadow-lg' : 'p-0'
                        }`}
                        style={{
                          background: userStories.length > 0
                            ? 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)'
                            : 'none'
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white p-0.5">
                          <Image src="/actualmena.png" alt="menaparikh" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                        </div>
                      </button>
                    
                      <button
                        onClick={() => setStoryCreator(true)}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">Your story</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('lumen.ly')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/lumen.png" alt="lumen.ly" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">lumen.ly</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('violet.noir')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/violet.png" alt="violet.noir" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">violet.noir</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('beneastman')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/ben.jpg" alt="beneastman" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">beneastman</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('lifeofmads')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/mads.png" alt="lifeofmads" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">lifeofmads</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('coraoconell')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/cora.png" alt="coraoconell" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">coraoconell</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('chilithedog')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/chili.png" alt="chilithedog" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">chilithedog</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('glow.with.indie')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/indie.png" alt="glow.with.indie" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">glow.with.indie</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('lilyjade')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/lily.png" alt="lilyjade" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">lilyjade</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => openStory('derekshone')}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg transition-transform hover:scale-105"
                      style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}
                    >
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <Image src="/derek.png" alt="derekshone" width={80} height={80} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </button>
                    <span className="text-xs sm:text-sm text-black font-medium">derekshone</span>
                  </div>
                </div>
              
                <button
                  onClick={() => {
                    const scrollContainer = document.getElementById('creators-scroll');
                    const leftArrow = document.getElementById('left-arrow');
                    const rightArrow = document.getElementById('right-arrow');
                    if (scrollContainer) {
                      scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
                      setTimeout(() => {
                        if (leftArrow) {
                          leftArrow.style.opacity = '1';
                          leftArrow.style.pointerEvents = 'auto';
                        }
                        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth && rightArrow) {
                          rightArrow.style.opacity = '0';
                          rightArrow.style.pointerEvents = 'none';
                        }
                      }, 300);
                    }
                  }}
                  className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer opacity-0 pointer-events-none z-20"
                  style={{
                    backgroundColor: '#FFD166',
                    pointerEvents: 'auto'
                  }}
                  id="right-arrow"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#26547C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {lists.map((list) => (
                <Card key={list.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 dark:border-gray-700 relative bg-white dark:bg-gray-800" style={{ backgroundColor: '#FFFCF9' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(list.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={isFavorite(list.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark
                      className={`w-5 h-5 transition-all duration-200 ${
                        isFavorite(list.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400 dark:text-gray-500 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                
                  <Link
                    href={`/messages/lists/${list.id}`}
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties & { '--tw-ring-color': string }}
                    aria-label={`View details for ${list.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={list.imageUrl}
                        alt={`${list.title} cover`}
                        fill
                        className="object-cover"
                        priority={list.id === '1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </Link>
                
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">{list.title}</h2>
                    {list.tags && list.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mt-2">
                        {list.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {list.tags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            +{list.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StoryViewer
        isOpen={storyViewer.isOpen}
        onClose={closeStory}
        initialStoryIndex={storyViewer.initialStoryIndex}
        creatorUsername={storyViewer.creatorUsername}
        allCreators={allCreators}
        onMention={(username, avatar, storyId) =>
          showNotification('repost', username, avatar, storyId)
        }
      />

      <StoryCreator
        isOpen={storyCreator}
        onClose={() => setStoryCreator(false)}
        onSave={handleSaveStory}
        username="menaparikh"
        avatar="/actualmena.png"
      />

      <button
        onClick={() => showNotification('repost', 'violet.noir', '/violet.png', 'demo-story-1')}
        className="fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors z-40"
      >
        Demo: violet.noir mentioned you
      </button>

      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-40">
        <button
          onClick={() => addNotification({
            type: 'like',
            username: 'violet.noir',
            avatar: '/violet.png',
            content: 'liked your list',
            listId: '3',
            listTitle: 'Go-To Salad Recipes'
          })}
          className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
        >
          Add Like Notification
        </button>
        
        <button
          onClick={() => addNotification({
            type: 'follow',
            username: 'lumen.ly',
            avatar: '/lumen.png',
            content: 'started following you'
          })}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Add Follow Notification
        </button>
        
        <button
          onClick={() => addNotification({
            type: 'comment',
            username: 'beneastman',
            avatar: '/ben.jpg',
            content: 'commented on your list',
            listId: '1',
            listTitle: 'Horror Books for Teens'
          })}
          className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors text-sm"
        >
          Add Comment Notification
        </button>

        <button
          onClick={clearAllNotifications}
          className="bg-gray-500 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Clear All Notifications
        </button>
      </div>

      {notification.isOpen && notification.data && (
        <Notification
          isOpen={notification.isOpen}
          onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
          notification={notification.data}
          onViewStory={handleViewStory}
        />
      )}
    </main>
  );
}




