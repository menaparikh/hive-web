"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from './components/header';
import { Sidebar } from '@/components/ui/sidebar';
import { Bookmark } from 'lucide-react';

type List = {
  id: string;
  title: string;
  createdBy: string;
  imageUrl: string;
  lastEdited: string;
};

export default function Home() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (listId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(listId)) {
        newFavorites.delete(listId);
      } else {
        newFavorites.add(listId);
      }
      return newFavorites;
    });
  };

  const lists: List[] = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      createdBy: 'John Smith',
      imageUrl: '/horror.png',
      lastEdited: '2024-01-15'
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      createdBy: 'Sarah Johnson',
      imageUrl: '/comedy.png',
      lastEdited: '2024-01-10'
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      createdBy: 'Mike Davis',
      imageUrl: '/salad.png',
      lastEdited: '2024-01-08'
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      createdBy: 'Lisa Chen',
      imageUrl: '/cooking.png',
      lastEdited: '2024-01-05'
    },
    {
      id: '5',
      title: 'Photography Tips',
      createdBy: 'Tom Wilson',
      imageUrl: '/camera.png',
      lastEdited: '2024-01-03'
    },
    {
      id: '6',
      title: 'Documentary Collection',
      createdBy: 'Rachel Green',
      imageUrl: '/documentary.png',
      lastEdited: '2024-01-01'
    },
    {
      id: '7',
      title: 'Travel Destinations',
      createdBy: 'Maria Rodriguez',
      imageUrl: '/destination.png',
      lastEdited: '2023-12-28'
    },
    {
      id: '8',
      title: 'Healthy Breakfast Ideas',
      createdBy: 'James Wilson',
      imageUrl: '/healthybreakfast.png',
      lastEdited: '2023-12-25'
    },
    {
      id: '9',
      title: 'Productivity Tools',
      createdBy: 'Emily Chen',
      imageUrl: '/productivity.png',
      lastEdited: '2023-12-22'
    },
    {
      id: '10',
      title: 'Garden Plants',
      createdBy: 'David Thompson',
      imageUrl: '/garden.png',
      lastEdited: '2023-12-19'
    },
    {
      id: '11',
      title: 'Workout Routines',
      createdBy: 'Lisa Park',
      imageUrl: '/workout.png',
      lastEdited: '2023-12-16'
    },
    {
      id: '12',
      title: 'DIY Projects',
      createdBy: 'Alex Johnson',
      imageUrl: '/diy.png',
      lastEdited: '2023-12-13'
    }
    
  ];

  const handleListClick = (listId: string) => {
    console.log(`List clicked: ${listId}`);
  };

  useEffect(() => {
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
        // Show/hide left arrow based on scroll position
        if (scrollContainer.scrollLeft > 0) {
          showLeftArrow();
        } else {
          hideLeftArrow();
        }

        // Show/hide right arrow based on if we've reached the end
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          hideRightArrow();
        } else {
          showRightArrow();
        }
      };

      scrollContainer.addEventListener('scroll', updateArrowVisibility);
      updateArrowVisibility(); // Initial check

      return () => scrollContainer.removeEventListener('scroll', updateArrowVisibility);
    }
  }, []);

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar hasUnreadMessages={true} />
      <div className={`transition-all duration-300 ease-in-out ml-20 mr-2 sm:mr-4 md:mr-6 relative z-10`}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Header/>
          </div>
        </div>
        
        {/* Main content */}
        <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <div className="max-w-6xl mx-auto">
            {/* Creators Stories */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 relative">
                {/* Left Arrow - Absolutely positioned, hidden initially */}
                <button 
                  onClick={() => {
                    const scrollContainer = document.getElementById('creators-scroll');
                    const leftArrow = document.getElementById('left-arrow');
                    const rightArrow = document.getElementById('right-arrow');
                    if (scrollContainer) {
                      scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
                      // Check if we're back at the beginning after scrolling
                      setTimeout(() => {
                        if (scrollContainer.scrollLeft <= 0 && leftArrow) {
                          leftArrow.style.opacity = '0';
                          leftArrow.style.pointerEvents = 'none';
                        }
                        // Show right arrow if we're not at the end anymore
                        if (scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth && rightArrow) {
                          rightArrow.style.opacity = '1';
                          rightArrow.style.pointerEvents = 'auto';
                        }
                      }, 300);
                    }
                  }}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm opacity-0 pointer-events-none z-10" 
                  style={{ backgroundColor: '#FFD166' }}
                  id="left-arrow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#26547C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4 overflow-hidden pb-2 flex-1 pl-0" id="creators-scroll">
                  <button 
                    onClick={() => console.log('Clicked: menaparikh')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/actualmena.png" alt="menaparikh" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">menaparikh</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: lumen.ly')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/lumen.png" alt="lumen.ly" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">lumen.ly</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: violet.noir')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/violet.png" alt="violet.noir" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">violet.noir</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: beneastman')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/ben.jpg" alt="beneastman" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">beneastman</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: lifeofmads')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/mads.png" alt="lifeofmads" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">lifeofmads</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: coraoconell')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/cora.png" alt="coraoconell" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">coraoconell</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: chilithedog')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/chili.png" alt="chilithedog" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">chilithedog</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: glow.with.indie')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/indie.png" alt="glow.with.indie" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">glow.with.indie</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: lilyjade')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/lily.png" alt="lilyjade" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">lilyjade</span>
                  </button>
                  <button 
                    onClick={() => console.log('Clicked: derekshone')}
                    className="flex flex-col items-center space-y-1 sm:space-y-2 min-w-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-1 flex-shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <img src="/derek.png" alt="derekshone" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-black font-medium">derekshone</span>
                  </button>
                </div>
                
                {/* Right Arrow */}
                <button 
                  onClick={() => {
                    const scrollContainer = document.getElementById('creators-scroll');
                    const leftArrow = document.getElementById('left-arrow');
                    const rightArrow = document.getElementById('right-arrow');
                    if (scrollContainer) {
                      scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
                      // Show left arrow after scrolling
                      setTimeout(() => {
                        if (leftArrow) {
                          leftArrow.style.opacity = '1';
                          leftArrow.style.pointerEvents = 'auto';
                        }
                        // Check if we've reached the end
                        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth && rightArrow) {
                          rightArrow.style.opacity = '0';
                          rightArrow.style.pointerEvents = 'none';
                        }
                      }, 300);
                    }
                  }}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm" 
                  style={{ backgroundColor: '#FFD166' }}
                  id="right-arrow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#26547C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {lists.map((list) => (
                <Card key={list.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                  {/* Favorite Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(list.id);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                    aria-label={favorites.has(list.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.has(list.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-400 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                  
                  <button 
                    onClick={() => handleListClick(list.id)} 
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
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-center text-gray-900">{list.title}</h2>
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