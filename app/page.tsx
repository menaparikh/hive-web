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

// Import Story type from story-creator
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


 // List of all creators for story navigation
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





 const openStory = (creatorUsername: string) => {
   setStoryViewer({
     isOpen: true,
     creatorUsername,
     initialStoryIndex: 0
   });
 };


 const closeStory = useCallback(() => {
   console.log('closeStory function called');
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


   // Auto-hide after 5 seconds
   setTimeout(() => {
     setNotification(prev => ({ ...prev, isOpen: false }));
   }, 5000);
 };


 const handleViewStory = (storyId: string) => {
   // Find the story and open it
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
   // Add a small delay to ensure DOM elements are rendered
   const timer = setTimeout(() => {
     const scrollContainer = document.getElementById('creators-scroll');
     const leftArrow = document.getElementById('left-arrow');
     const rightArrow = document.getElementById('right-arrow');

     console.log('Scroll elements found:', { scrollContainer, leftArrow, rightArrow });

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
         console.log('Updating arrow visibility:', {
           scrollLeft: scrollContainer.scrollLeft,
           clientWidth: scrollContainer.clientWidth,
           scrollWidth: scrollContainer.scrollWidth
         });

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
   }, 100);

   return () => clearTimeout(timer);
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
             <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 relative overflow-hidden">
               {/* Left Arrow - Absolutely positioned, hidden initially */}
               <button
                 onClick={() => {
                   console.log('Left arrow clicked!');
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
                    
                     {/* Create Story Plus Button */}
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
              
               {/* Right Arrow */}
               <button
                 onClick={() => {
                   console.log('Right arrow clicked!');
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
               <Card key={list.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] rounded-lg border border-gray-100 relative" style={{ backgroundColor: '#FFFCF9' }}>
                 {/* Favorite Bookmark */}
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     toggleFavorite(list.id);
                   }}
                   className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                   aria-label={isFavorite(list.id) ? 'Remove from favorites' : 'Add to favorites'}
                 >
                   <Bookmark
                     className={`w-5 h-5 transition-all duration-200 ${
                       isFavorite(list.id)
                         ? 'fill-yellow-400 text-yellow-400'
                         : 'text-gray-400 hover:text-yellow-400'
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
                   <h2 className="text-lg font-semibold text-center text-gray-900">{list.title}</h2>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </div>
     </div>


     {/* Story Viewer */}
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


     {/* Story Creator */}
     <StoryCreator
       isOpen={storyCreator}
       onClose={() => setStoryCreator(false)}
       onSave={handleSaveStory}
       username="menaparikh"
       avatar="/actualmena.png"
     />


     {/* Demo Notification Trigger */}
     <button
       onClick={() => showNotification('repost', 'violet.noir', '/violet.png', 'demo-story-1')}
       className="fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors z-40"
     >
       Demo: violet.noir mentioned you
     </button>

     {/* Demo Notification System Buttons */}
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


     {/* Notification */}
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

