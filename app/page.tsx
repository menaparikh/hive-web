"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from './components/header';
import { Sidebar } from '@/components/ui/sidebar';

type List = {
  id: string;
  title: string;
  createdBy: string;
  imageUrl: string;
  lastEdited: string;
};

export default function Home() {

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



  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#FFFCF9', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="fixed inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.02) 0%, rgba(6, 214, 160, 0.02) 50%, rgba(38, 84, 124, 0.02) 100%)' }}></div>
      <Sidebar />
              <div className={`transition-all duration-300 ease-in-out ml-16 mr-6 relative z-10`}>
          <Header/>
          {/* Main content */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
            {/* Creators Stories */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide flex-1">
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/actualmena.png" alt="menaparikh" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">menaparikh</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/lumen.png" alt="lumen.ly" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">lumen.ly</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic3.jpg" alt="violet.noir" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">violet.noir</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic1.jpg" alt="beneastman" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">beneastman</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic2.jpg" alt="lifeofmads" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">lifeofmads</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic3.jpg" alt="coraoconell" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">coraoconell</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic1.jpg" alt="chilithedog" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">chilithedog</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic2.jpg" alt="glow.with.lia" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">glow.with.lia</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic3.jpg" alt="lilyjade" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">lilyjade</span>
                </div>
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <div className="w-18 h-18 rounded-full p-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)' }}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img src="/profpic1.jpg" alt="derekshone" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs text-black font-medium">derekshone</span>
                </div>
                </div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm" style={{ backgroundColor: '#FFD166' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#26547C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {lists.map((list) => (
                <Card key={list.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                  <button 
                    onClick={() => handleListClick(list.id)} 
                    className="relative h-44 w-full block focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#06D6A0' } as React.CSSProperties}
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