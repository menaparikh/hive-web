"use client";

import React, { useState, use } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Heart, Share2, MoreVertical, Bookmark, Star, Eye, MessageCircle, Calendar, Plus, Filter, SortAsc, Download, Edit3, CheckCircle, Clock, TrendingUp, Users, FileText, ExternalLink, Square, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

type ListItem = {
  id: string;
  title: string;
  description: string;
  rating: number;
  genre: string;
  year: number;
  author?: string;
  director?: string;
  imageUrl?: string;
  userRating?: number;
  isCompleted?: boolean;
  isInProgress?: boolean;
  notes?: string;
  dateAdded?: string;
};

type RelatedList = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdBy: string;
  likes: number;
  category: string;
};

export default function ListDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  // Current user - in a real app, this would come from auth context
  const currentUser = 'Mena Parikh';
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<{ [key: string]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  
  // New state variables for enhanced features
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [showNotes, setShowNotes] = useState<{ [key: string]: boolean }>({});
  const [itemNotes, setItemNotes] = useState<{ [key: string]: string }>({});

  const [readingProgress, setReadingProgress] = useState<{ [key: string]: 'not-started' | 'in-progress' | 'completed' }>({});
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemLink, setNewItemLink] = useState('');
  
  // Navigation state for stories/items
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showItemViewer, setShowItemViewer] = useState(false);

  // Get list data based on ID
  const getListData = (id: string) => {
    const listDataMap: { [key: string]: {
      id: string;
      title: string;
      description: string;
      createdBy: string;
      imageUrl: string;
      lastEdited: string;
      totalItems: number;
      likes: number;
      views: number;
      comments: number;
      category: string;
      tags: string[];
      collaboration: string;
      contributors: string[];
      allowComments: boolean;
    } } = {
      '1': {
        id: '1',
        title: 'Horror Books for Teens',
        description: 'A carefully curated collection of spine-chilling horror novels perfect for young adult readers who love a good scare. These books offer thrilling stories with age-appropriate content that will keep you on the edge of your seat.',
        createdBy: 'John Smith',
        imageUrl: '/horror.png',
        lastEdited: '2024-01-15',
        totalItems: 12,
        likes: 234,
        views: 1567,
        comments: 45,
        category: 'Books',
        tags: ['Horror', 'Young Adult', 'Thriller', 'Supernatural'],
        collaboration: 'public',
        contributors: ['John Smith', 'Sarah Johnson', 'Mike Davis'],
        allowComments: true
      },
      '2': {
        id: '2',
        title: 'Must Watch Comedy Movies',
        description: 'A hilarious collection of comedy films that will have you laughing from start to finish. Perfect for movie nights, date nights, or when you just need a good laugh.',
        createdBy: 'Sarah Johnson',
        imageUrl: '/comedy.png',
        lastEdited: '2024-01-10',
        totalItems: 15,
        likes: 189,
        views: 1243,
        comments: 32,
        category: 'Movies',
        tags: ['Comedy', 'Movies', 'Entertainment', 'Funny'],
        collaboration: 'public',
        contributors: ['Sarah Johnson', 'Tom Wilson'],
        allowComments: true
      },
      '3': {
        id: '3',
        title: 'Go-To Salad Recipes',
        description: 'Fresh, healthy, and delicious salad recipes that are perfect for any meal. From light lunches to hearty dinners, these salads are packed with flavor and nutrition.',
        createdBy: 'Mike Davis',
        imageUrl: '/salad.png',
        lastEdited: '2024-01-08',
        totalItems: 8,
        likes: 156,
        views: 892,
        comments: 28,
        category: 'Food',
        tags: ['Salad', 'Healthy', 'Recipes', 'Vegetarian'],
        collaboration: 'private-collab',
        contributors: ['Mike Davis'],
        allowComments: false
      },
      '4': {
        id: '4',
        title: 'Cooking Techniques',
        description: 'Essential cooking techniques that every home chef should master. From basic knife skills to advanced methods, this guide will elevate your culinary game.',
        createdBy: 'Lisa Chen',
        imageUrl: '/cooking.png',
        lastEdited: '2024-01-05',
        totalItems: 20,
        likes: 312,
        views: 2101,
        comments: 67,
        category: 'Food',
        tags: ['Cooking', 'Techniques', 'Chef', 'Skills'],
        collaboration: 'public',
        contributors: ['Lisa Chen', 'Mike Davis', 'Emily Chen'],
        allowComments: true
      },
      '5': {
        id: '5',
        title: 'Photography Tips',
        description: 'Professional photography tips and tricks to help you capture stunning images. Whether you\'re using a smartphone or DSLR, these tips will improve your photography skills.',
        createdBy: 'Tom Wilson',
        imageUrl: '/camera.png',
        lastEdited: '2024-01-03',
        totalItems: 25,
        likes: 445,
        views: 2876,
        comments: 89,
        category: 'Photography',
        tags: ['Photography', 'Tips', 'Camera', 'Art'],
        collaboration: 'public',
        contributors: ['Tom Wilson', 'Rachel Green'],
        allowComments: true
      },
      '6': {
        id: '6',
        title: 'Documentary Collection',
        description: 'A thought-provoking collection of documentaries that educate, inspire, and challenge your perspective. From nature to history to social issues, these films will expand your worldview.',
        createdBy: 'Rachel Green',
        imageUrl: '/documentary.png',
        lastEdited: '2024-01-01',
        totalItems: 18,
        likes: 278,
        views: 1654,
        comments: 41,
        category: 'Movies',
        tags: ['Documentary', 'Educational', 'Inspirational', 'History'],
        collaboration: 'private-collab',
        contributors: ['Rachel Green', 'Maria Rodriguez'],
        allowComments: true
      },
      '7': {
        id: '7',
        title: 'Travel Destinations',
        description: 'Breathtaking travel destinations around the world that should be on everyone\'s bucket list. From hidden gems to popular hotspots, discover your next adventure.',
        createdBy: 'Maria Rodriguez',
        imageUrl: '/destination.png',
        lastEdited: '2023-12-28',
        totalItems: 22,
        likes: 523,
        views: 3421,
        comments: 112,
        category: 'Travel',
        tags: ['Travel', 'Destinations', 'Adventure', 'Bucket List'],
        collaboration: 'public',
        contributors: ['Maria Rodriguez', 'David Thompson', 'Alex Johnson'],
        allowComments: true
      },
      '8': {
        id: '8',
        title: 'Healthy Breakfast Ideas',
        description: 'Nutritious and delicious breakfast recipes to start your day right. Quick, easy, and healthy options that will fuel your morning and keep you energized.',
        createdBy: 'James Wilson',
        imageUrl: '/healthybreakfast.png',
        lastEdited: '2023-12-25',
        totalItems: 12,
        likes: 198,
        views: 1156,
        comments: 34,
        category: 'Food',
        tags: ['Breakfast', 'Healthy', 'Nutrition', 'Quick'],
        collaboration: 'private',
        contributors: ['James Wilson'],
        allowComments: false
      },
      '9': {
        id: '9',
        title: 'Productivity Tools',
        description: 'Essential productivity tools and apps that will help you work smarter, not harder. From time management to project organization, boost your efficiency with these recommendations.',
        createdBy: 'Emily Chen',
        imageUrl: '/productivity.png',
        lastEdited: '2023-12-22',
        totalItems: 16,
        likes: 367,
        views: 2234,
        comments: 78,
        category: 'Technology',
        tags: ['Productivity', 'Tools', 'Apps', 'Efficiency'],
        collaboration: 'public',
        contributors: ['Emily Chen', 'Lisa Park'],
        allowComments: true
      },
      '10': {
        id: '10',
        title: 'Garden Plants',
        description: 'Beautiful and easy-to-care-for plants for your garden. From flowers to vegetables to herbs, create a thriving garden with these plant recommendations.',
        createdBy: 'David Thompson',
        imageUrl: '/garden.png',
        lastEdited: '2023-12-19',
        totalItems: 14,
        likes: 145,
        views: 987,
        comments: 23,
        category: 'Gardening',
        tags: ['Garden', 'Plants', 'Flowers', 'Nature'],
        collaboration: 'public',
        contributors: ['David Thompson', 'Lilyjade'],
        allowComments: true
      },
      '11': {
        id: '11',
        title: 'Workout Routines',
        description: 'Effective workout routines for all fitness levels. From beginner to advanced, these routines will help you build strength, endurance, and achieve your fitness goals.',
        createdBy: 'Lisa Park',
        imageUrl: '/workout.png',
        lastEdited: '2023-12-16',
        totalItems: 10,
        likes: 289,
        views: 1876,
        comments: 56,
        category: 'Fitness',
        tags: ['Workout', 'Fitness', 'Exercise', 'Health'],
        collaboration: 'public',
        contributors: ['Lisa Park', 'ChiliTheDog'],
        allowComments: true
      },
      '12': {
        id: '12',
        title: 'DIY Projects',
        description: 'Creative and fun DIY projects for home improvement and crafts. From simple decorations to complex builds, unleash your creativity with these project ideas.',
        createdBy: 'Alex Johnson',
        imageUrl: '/diy.png',
        lastEdited: '2023-12-13',
        totalItems: 19,
        likes: 234,
        views: 1432,
        comments: 45,
        category: 'DIY',
        tags: ['DIY', 'Crafts', 'Home Improvement', 'Creative'],
        collaboration: 'public',
        contributors: ['Alex Johnson', 'CoraOConell'],
        allowComments: true
      },
      'm1': {
        id: 'm1',
        title: 'YA Romance Books',
        description: 'A collection of young adult romance novels that will make your heart flutter. From enemies-to-lovers to friends-to-lovers, these stories are perfect for anyone who loves a good love story.',
        createdBy: 'Mena Parikh',
        imageUrl: '/romancebooks.png',
        lastEdited: '2024-01-20',
        totalItems: 15,
        likes: 234,
        views: 1567,
        comments: 18,
        category: 'Books',
        tags: ['romance', 'young-adult', 'books', 'love'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm2': {
        id: 'm2',
        title: 'YA TV Shows',
        description: 'The best young adult TV shows that are perfect for binge-watching. From coming-of-age dramas to supernatural thrillers, these shows will keep you hooked.',
        createdBy: 'Mena Parikh',
        imageUrl: '/yashows.png',
        lastEdited: '2024-01-18',
        totalItems: 12,
        likes: 189,
        views: 1243,
        comments: 12,
        category: 'TV Shows',
        tags: ['tv-shows', 'young-adult', 'entertainment', 'drama'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm3': {
        id: 'm3',
        title: 'Smoothies to Try',
        description: 'Delicious and nutritious smoothie recipes that are perfect for breakfast or a healthy snack. Packed with fruits, vegetables, and superfoods.',
        createdBy: 'Mena Parikh',
        imageUrl: '/smoothies.png',
        lastEdited: '2024-01-15',
        totalItems: 10,
        likes: 456,
        views: 2101,
        comments: 34,
        category: 'Food',
        tags: ['smoothies', 'healthy', 'recipes', 'breakfast'],
        collaboration: 'private',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm4': {
        id: 'm4',
        title: 'Skincare for Dry Skin',
        description: 'The best skincare products and routines for dry skin. From moisturizers to serums, these products will help keep your skin hydrated and glowing.',
        createdBy: 'Mena Parikh',
        imageUrl: '/skincare.png',
        lastEdited: '2024-01-12',
        totalItems: 8,
        likes: 321,
        views: 1892,
        comments: 25,
        category: 'Beauty',
        tags: ['skincare', 'dry-skin', 'beauty', 'self-care'],
        collaboration: 'private',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm5': {
        id: 'm5',
        title: 'Dorm Room Essentials',
        description: 'Everything you need to make your dorm room feel like home. From storage solutions to decor ideas, these essentials will help you create the perfect college living space.',
        createdBy: 'Mena Parikh',
        imageUrl: '/dorm.png',
        lastEdited: '2024-01-10',
        totalItems: 20,
        likes: 567,
        views: 3421,
        comments: 42,
        category: 'College',
        tags: ['dorm', 'college', 'essentials', 'decor'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm6': {
        id: 'm6',
        title: 'Teen Gifts',
        description: 'The perfect gift ideas for teenagers. From tech gadgets to trendy accessories, these gifts are sure to impress any teen.',
        createdBy: 'Mena Parikh',
        imageUrl: '/teengifts.png',
        lastEdited: '2024-01-08',
        totalItems: 14,
        likes: 198,
        views: 1654,
        comments: 15,
        category: 'Gifts',
        tags: ['gifts', 'teen', 'ideas', 'shopping'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm7': {
        id: 'm7',
        title: 'Study Playlist Songs',
        description: 'The perfect songs to help you focus and study. From lo-fi beats to instrumental music, these tracks will help you stay productive.',
        createdBy: 'Mena Parikh',
        imageUrl: '/study.png',
        lastEdited: '2024-01-05',
        totalItems: 25,
        likes: 789,
        views: 2876,
        comments: 67,
        category: 'Music',
        tags: ['music', 'study', 'playlist', 'focus'],
        collaboration: 'private',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm8': {
        id: 'm8',
        title: 'College Application Tips',
        description: 'Helpful tips and advice for navigating the college application process. From essays to interviews, these tips will help you put your best foot forward.',
        createdBy: 'Mena Parikh',
        imageUrl: '/collegeapp.png',
        lastEdited: '2024-01-03',
        totalItems: 18,
        likes: 432,
        views: 2101,
        comments: 28,
        category: 'College',
        tags: ['college', 'applications', 'tips', 'advice'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      },
      'm9': {
        id: 'm9',
        title: 'Weekend Activity Ideas',
        description: 'Fun and exciting activities to make your weekends memorable. From outdoor adventures to cozy indoor activities, there\'s something for everyone.',
        createdBy: 'Mena Parikh',
        imageUrl: '/weekend.png',
        lastEdited: '2024-01-01',
        totalItems: 16,
        likes: 345,
        views: 1892,
        comments: 22,
        category: 'Activities',
        tags: ['weekend', 'activities', 'fun', 'ideas'],
        collaboration: 'public',
        contributors: ['Mena Parikh'],
        allowComments: true
      }
    };
    
    return listDataMap[id] || listDataMap['1']; // Default to horror books if ID not found
  };

  const listData = getListData(resolvedParams.id);
  
  // Check if current user can edit this list
  // Private lists: only creator can edit
  // Public/private-collab lists: anyone can edit (or contributors, depending on requirements)
  const canEditList = listData.collaboration === 'private' 
    ? listData.createdBy === currentUser 
    : true; // For public/private-collab, allow editing (or add contributor check later)

  // Get list items based on list type
  const getListItems = (listId: string): ListItem[] => {
    const itemsMap: { [key: string]: ListItem[] } = {
      '1': [ // Horror Books
        { id: '1', title: 'The Haunting of Hill House', description: 'A classic psychological horror novel about a group of people investigating a haunted mansion.', rating: 4.5, genre: 'Psychological Horror', year: 1959, author: 'Shirley Jackson', imageUrl: '/horror.png' },
        { id: '2', title: 'Carrie', description: 'Stephen King\'s debut novel about a teenage girl with telekinetic powers seeking revenge.', rating: 4.3, genre: 'Supernatural Horror', year: 1974, author: 'Stephen King', imageUrl: '/horror.png' },
        { id: '3', title: 'The Monstrumologist', description: 'A young apprentice learns about monsters and the dark secrets of the world.', rating: 4.2, genre: 'Monster Horror', year: 2009, author: 'Rick Yancey', imageUrl: '/horror.png' },
        { id: '4', title: 'Miss Peregrine\'s Home for Peculiar Children', description: 'A mysterious orphanage houses children with extraordinary abilities.', rating: 4.1, genre: 'Dark Fantasy', year: 2011, author: 'Ransom Riggs', imageUrl: '/horror.png' },
        { id: '5', title: 'The Call', description: 'An Irish horror novel about a world where teenagers are hunted by monsters.', rating: 4.0, genre: 'Survival Horror', year: 2013, author: 'Peadar Ó Guilín', imageUrl: '/horror.png' },
        { id: '6', title: 'Anna Dressed in Blood', description: 'A ghost hunter falls in love with the ghost he\'s supposed to kill.', rating: 4.4, genre: 'Paranormal Romance', year: 2011, author: 'Kendare Blake', imageUrl: '/horror.png' }
      ],
      '2': [ // Comedy Movies
        { id: '1', title: 'The Grand Budapest Hotel', description: 'A whimsical comedy about a legendary concierge and his young protégé.', rating: 4.6, genre: 'Comedy', year: 2014, director: 'Wes Anderson', imageUrl: '/comedy.png' },
        { id: '2', title: 'Superbad', description: 'Two high school friends try to score alcohol for a party to impress girls.', rating: 4.4, genre: 'Comedy', year: 2007, director: 'Greg Mottola', imageUrl: '/comedy.png' },
        { id: '3', title: 'Bridesmaids', description: 'A maid of honor tries to plan her best friend\'s wedding while dealing with her own life falling apart.', rating: 4.3, genre: 'Comedy', year: 2011, director: 'Paul Feig', imageUrl: '/comedy.png' },
        { id: '4', title: 'The Hangover', description: 'Three friends wake up from a bachelor party with no memory of the night before.', rating: 4.2, genre: 'Comedy', year: 2009, director: 'Todd Phillips', imageUrl: '/comedy.png' },
        { id: '5', title: 'Shaun of the Dead', description: 'A man tries to win back his girlfriend during a zombie apocalypse.', rating: 4.5, genre: 'Comedy Horror', year: 2004, director: 'Edgar Wright', imageUrl: '/comedy.png' }
      ],
      '3': [ // Salad Recipes
        { id: '1', title: 'Greek Quinoa Salad', description: 'Fresh quinoa with cucumber, tomatoes, olives, and feta cheese.', rating: 4.7, genre: 'Mediterranean', year: 2023, author: 'Mike Davis', imageUrl: '/salad.png' },
        { id: '2', title: 'Asian Sesame Salad', description: 'Mixed greens with sesame dressing, mandarin oranges, and almonds.', rating: 4.5, genre: 'Asian', year: 2023, author: 'Mike Davis', imageUrl: '/salad.png' },
        { id: '3', title: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze.', rating: 4.6, genre: 'Italian', year: 2023, author: 'Mike Davis', imageUrl: '/salad.png' },
        { id: '4', title: 'Southwest Black Bean Salad', description: 'Black beans, corn, avocado, and lime dressing.', rating: 4.4, genre: 'Mexican', year: 2023, author: 'Mike Davis', imageUrl: '/salad.png' }
      ],
      '4': [ // Cooking Techniques
        { id: '1', title: 'Knife Skills Mastery', description: 'Essential knife techniques for efficient and safe food preparation.', rating: 4.8, genre: 'Basic Skills', year: 2023, author: 'Lisa Chen', imageUrl: '/cooking.png' },
        { id: '2', title: 'Sauce Making Fundamentals', description: 'Learn to make classic sauces from béchamel to hollandaise.', rating: 4.6, genre: 'Sauces', year: 2023, author: 'Lisa Chen', imageUrl: '/cooking.png' },
        { id: '3', title: 'Bread Baking Basics', description: 'Master the art of bread making from simple loaves to artisan breads.', rating: 4.7, genre: 'Baking', year: 2023, author: 'Lisa Chen', imageUrl: '/cooking.png' },
        { id: '4', title: 'Meat Cooking Methods', description: 'Perfect your meat cooking with various techniques and temperatures.', rating: 4.5, genre: 'Meat', year: 2023, author: 'Lisa Chen', imageUrl: '/cooking.png' }
      ],
      '5': [ // Photography Tips
        { id: '1', title: 'Rule of Thirds', description: 'Master the fundamental composition rule for balanced photos.', rating: 4.9, genre: 'Composition', year: 2023, author: 'Tom Wilson', imageUrl: '/camera.png' },
        { id: '2', title: 'Lighting Fundamentals', description: 'Understand natural and artificial lighting for better photos.', rating: 4.7, genre: 'Lighting', year: 2023, author: 'Tom Wilson', imageUrl: '/camera.png' },
        { id: '3', title: 'Portrait Photography', description: 'Tips for capturing stunning portraits in any setting.', rating: 4.6, genre: 'Portraits', year: 2023, author: 'Tom Wilson', imageUrl: '/camera.png' },
        { id: '4', title: 'Street Photography', description: 'Capture candid moments and urban life with confidence.', rating: 4.5, genre: 'Street', year: 2023, author: 'Tom Wilson', imageUrl: '/camera.png' }
      ],
      '6': [ // Documentaries
        { id: '1', title: 'Planet Earth II', description: 'Stunning nature documentary showcasing Earth\'s diverse ecosystems.', rating: 4.9, genre: 'Nature', year: 2016, director: 'David Attenborough', imageUrl: '/documentary.png' },
        { id: '2', title: 'The Last Dance', description: 'Documentary about Michael Jordan and the Chicago Bulls dynasty.', rating: 4.8, genre: 'Sports', year: 2020, director: 'Jason Hehir', imageUrl: '/documentary.png' },
        { id: '3', title: 'My Octopus Teacher', description: 'A filmmaker forms an unusual friendship with an octopus.', rating: 4.7, genre: 'Nature', year: 2020, director: 'Pippa Ehrlich', imageUrl: '/documentary.png' },
        { id: '4', title: '13th', description: 'Exploration of race, justice, and mass incarceration in the United States.', rating: 4.6, genre: 'Social Issues', year: 2016, director: 'Ava DuVernay', imageUrl: '/documentary.png' }
      ],
      '7': [ // Travel Destinations
        { id: '1', title: 'Santorini, Greece', description: 'Stunning white buildings and blue domes overlooking the Aegean Sea.', rating: 4.9, genre: 'Islands', year: 2023, author: 'Maria Rodriguez', imageUrl: '/destination.png' },
        { id: '2', title: 'Kyoto, Japan', description: 'Ancient temples and traditional Japanese culture in a modern city.', rating: 4.8, genre: 'Cultural', year: 2023, author: 'Maria Rodriguez', imageUrl: '/destination.png' },
        { id: '3', title: 'Machu Picchu, Peru', description: 'Inca citadel set high in the Andes Mountains.', rating: 4.7, genre: 'Historical', year: 2023, author: 'Maria Rodriguez', imageUrl: '/destination.png' },
        { id: '4', title: 'Banff National Park, Canada', description: 'Breathtaking mountain landscapes and turquoise lakes.', rating: 4.6, genre: 'Nature', year: 2023, author: 'Maria Rodriguez', imageUrl: '/destination.png' }
      ],
      '8': [ // Breakfast Ideas
        { id: '1', title: 'Overnight Oats', description: 'Healthy and delicious oats prepared the night before.', rating: 4.7, genre: 'Quick', year: 2023, author: 'James Wilson', imageUrl: '/healthybreakfast.png' },
        { id: '2', title: 'Avocado Toast', description: 'Simple and nutritious toast with mashed avocado and toppings.', rating: 4.6, genre: 'Quick', year: 2023, author: 'James Wilson', imageUrl: '/healthybreakfast.png' },
        { id: '3', title: 'Smoothie Bowl', description: 'Colorful and nutritious smoothie topped with fresh fruits and granola.', rating: 4.5, genre: 'Quick', year: 2023, author: 'James Wilson', imageUrl: '/healthybreakfast.png' },
        { id: '4', title: 'Egg Muffins', description: 'Protein-packed muffins made with eggs and vegetables.', rating: 4.4, genre: 'Protein', year: 2023, author: 'James Wilson', imageUrl: '/healthybreakfast.png' }
      ],
      '9': [ // Productivity Tools
        { id: '1', title: 'Notion', description: 'All-in-one workspace for notes, docs, and project management.', rating: 4.8, genre: 'Organization', year: 2023, author: 'Emily Chen', imageUrl: '/productivity.png' },
        { id: '2', title: 'Forest App', description: 'Stay focused and plant real trees while working.', rating: 4.6, genre: 'Focus', year: 2023, author: 'Emily Chen', imageUrl: '/productivity.png' },
        { id: '3', title: 'Trello', description: 'Visual project management with boards, lists, and cards.', rating: 4.7, genre: 'Project Management', year: 2023, author: 'Emily Chen', imageUrl: '/productivity.png' },
        { id: '4', title: 'RescueTime', description: 'Track your time and improve productivity with detailed analytics.', rating: 4.5, genre: 'Time Tracking', year: 2023, author: 'Emily Chen', imageUrl: '/productivity.png' }
      ],
      '10': [ // Garden Plants
        { id: '1', title: 'Lavender', description: 'Fragrant purple flowers perfect for borders and aromatherapy.', rating: 4.8, genre: 'Herbs', year: 2023, author: 'David Thompson', imageUrl: '/garden.png' },
        { id: '2', title: 'Tomatoes', description: 'Easy-to-grow vegetables perfect for beginners and experienced gardeners.', rating: 4.7, genre: 'Vegetables', year: 2023, author: 'David Thompson', imageUrl: '/garden.png' },
        { id: '3', title: 'Sunflowers', description: 'Tall, cheerful flowers that attract pollinators and add height to gardens.', rating: 4.6, genre: 'Flowers', year: 2023, author: 'David Thompson', imageUrl: '/garden.png' },
        { id: '4', title: 'Basil', description: 'Aromatic herb perfect for cooking and easy to grow indoors or out.', rating: 4.5, genre: 'Herbs', year: 2023, author: 'David Thompson', imageUrl: '/garden.png' }
      ],
      '11': [ // Workout Routines
        { id: '1', title: 'HIIT Cardio', description: 'High-intensity interval training for maximum calorie burn.', rating: 4.8, genre: 'Cardio', year: 2023, author: 'Lisa Park', imageUrl: '/workout.png' },
        { id: '2', title: 'Strength Training', description: 'Build muscle and strength with compound movements.', rating: 4.7, genre: 'Strength', year: 2023, author: 'Lisa Park', imageUrl: '/workout.png' },
        { id: '3', title: 'Yoga Flow', description: 'Improve flexibility and mindfulness with flowing sequences.', rating: 4.6, genre: 'Flexibility', year: 2023, author: 'Lisa Park', imageUrl: '/workout.png' },
        { id: '4', title: 'Pilates Core', description: 'Strengthen your core and improve posture with Pilates exercises.', rating: 4.5, genre: 'Core', year: 2023, author: 'Lisa Park', imageUrl: '/workout.png' }
      ],
      '12': [ // DIY Projects
        { id: '1', title: 'Pallet Coffee Table', description: 'Rustic coffee table made from repurposed wooden pallets.', rating: 4.7, genre: 'Furniture', year: 2023, author: 'Alex Johnson', imageUrl: '/diy.png' },
        { id: '2', title: 'Macrame Wall Hanging', description: 'Beautiful textile art perfect for home decoration.', rating: 4.6, genre: 'Decor', year: 2023, author: 'Alex Johnson', imageUrl: '/diy.png' },
        { id: '3', title: 'Terrarium Garden', description: 'Miniature garden in a glass container for indoor greenery.', rating: 4.5, genre: 'Garden', year: 2023, author: 'Alex Johnson', imageUrl: '/diy.png' },
        { id: '4', title: 'Candle Making', description: 'Create your own scented candles with natural ingredients.', rating: 4.4, genre: 'Crafts', year: 2023, author: 'Alex Johnson', imageUrl: '/diy.png' }
      ],
      'm1': [ // YA Romance Books
        { id: '1', title: 'The Fault in Our Stars', description: 'A heart-wrenching love story between two teenagers who meet in a cancer support group.', rating: 4.8, genre: 'Romance', year: 2012, author: 'John Green', imageUrl: '/romancebooks.png' },
        { id: '2', title: 'To All the Boys I\'ve Loved Before', description: 'Lara Jean\'s secret love letters get mailed to all her crushes, causing chaos in her love life.', rating: 4.7, genre: 'Romance', year: 2014, author: 'Jenny Han', imageUrl: '/romancebooks.png' },
        { id: '3', title: 'Red, White & Royal Blue', description: 'The son of the President of the United States falls in love with the Prince of Wales.', rating: 4.9, genre: 'Romance', year: 2019, author: 'Casey McQuiston', imageUrl: '/romancebooks.png' },
        { id: '4', title: 'The Hating Game', description: 'Two coworkers who hate each other are forced to work together, but their animosity turns into something else.', rating: 4.6, genre: 'Romance', year: 2016, author: 'Sally Thorne', imageUrl: '/romancebooks.png' },
        { id: '5', title: 'Eleanor & Park', description: 'Two misfit teenagers find love through music and comics in 1980s Omaha.', rating: 4.5, genre: 'Romance', year: 2013, author: 'Rainbow Rowell', imageUrl: '/romancebooks.png' },
        { id: '6', title: 'The Seven Husbands of Evelyn Hugo', description: 'A reclusive Hollywood icon finally tells her story to an unknown journalist.', rating: 4.8, genre: 'Romance', year: 2017, author: 'Taylor Jenkins Reid', imageUrl: '/romancebooks.png' },
        { id: '7', title: 'It Ends with Us', description: 'A powerful story about love, strength, and difficult choices in relationships.', rating: 4.7, genre: 'Romance', year: 2016, author: 'Colleen Hoover', imageUrl: '/romancebooks.png' },
        { id: '8', title: 'The Selection', description: 'A competition to win the heart of the prince and become the next princess.', rating: 4.5, genre: 'Romance', year: 2012, author: 'Kiera Cass', imageUrl: '/romancebooks.png' },
        { id: '9', title: 'Simon vs. the Homo Sapiens Agenda', description: 'A funny and heartwarming story about coming out and falling in love.', rating: 4.9, genre: 'Romance', year: 2015, author: 'Becky Albertalli', imageUrl: '/romancebooks.png' }
      ],
      'm2': [ // YA TV Shows
        { id: '1', title: 'The Summer I Turned Pretty', description: 'A coming-of-age story about Belly\'s summers at Cousins Beach with her family friends.', rating: 4.7, genre: 'Drama', year: 2022, director: 'Jenny Han', imageUrl: '/yashows.png' },
        { id: '2', title: 'Heartstopper', description: 'Two British teenagers navigate friendship and love in this heartwarming LGBTQ+ series.', rating: 4.9, genre: 'Romance', year: 2022, director: 'Alice Oseman', imageUrl: '/yashows.png' },
        { id: '3', title: 'Never Have I Ever', description: 'An Indian-American teenager navigates high school, grief, and romance in California.', rating: 4.6, genre: 'Comedy', year: 2020, director: 'Mindy Kaling', imageUrl: '/yashows.png' },
        { id: '4', title: 'Outer Banks', description: 'A group of teenagers search for treasure while dealing with romance and danger.', rating: 4.5, genre: 'Adventure', year: 2020, director: 'Josh Pate', imageUrl: '/yashows.png' },
        { id: '5', title: 'Euphoria', description: 'A raw and honest look at high school students navigating love, identity, and trauma.', rating: 4.8, genre: 'Drama', year: 2019, director: 'Sam Levinson', imageUrl: '/yashows.png' },
        { id: '6', title: 'Ginny & Georgia', description: 'A mother and daughter navigate life in a small New England town with secrets and drama.', rating: 4.6, genre: 'Drama', year: 2021, director: 'Sarah Lampert', imageUrl: '/yashows.png' },
        { id: '7', title: 'The Vampire Diaries', description: 'A teenage girl falls in love with a vampire, but their relationship is complicated by his brother.', rating: 4.7, genre: 'Supernatural', year: 2009, director: 'Kevin Williamson', imageUrl: '/yashows.png' },
        { id: '8', title: 'Riverdale', description: 'A dark and mysterious take on the classic Archie Comics characters in a small town.', rating: 4.4, genre: 'Mystery', year: 2017, director: 'Roberto Aguirre-Sacasa', imageUrl: '/yashows.png' },
        { id: '9', title: 'The 100', description: 'A group of juvenile delinquents are sent to Earth to see if it\'s habitable after nuclear apocalypse.', rating: 4.5, genre: 'Sci-Fi', year: 2014, director: 'Jason Rothenberg', imageUrl: '/yashows.png' }
      ],
      'm3': [ // Smoothies to Try
        { id: '1', title: 'Strawberry Banana Smoothie', description: 'Classic blend of fresh strawberries and bananas with a hint of vanilla.', rating: 4.8, genre: 'Fruit', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '2', title: 'Green Power Smoothie', description: 'Spinach, kale, mango, and pineapple for a nutrient-packed breakfast.', rating: 4.7, genre: 'Healthy', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '3', title: 'Chocolate Peanut Butter', description: 'Rich and creamy smoothie with chocolate, peanut butter, and banana.', rating: 4.9, genre: 'Dessert', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '4', title: 'Tropical Paradise', description: 'A blend of mango, pineapple, coconut, and passionfruit for a tropical escape.', rating: 4.6, genre: 'Tropical', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '5', title: 'Blueberry Acai Bowl', description: 'Antioxidant-rich smoothie bowl topped with granola, fresh berries, and coconut flakes.', rating: 4.8, genre: 'Healthy', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '6', title: 'Peach Mango Sunrise', description: 'Sweet and refreshing blend of ripe peaches, mango, and orange juice to start your day.', rating: 4.7, genre: 'Fruit', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '7', title: 'Vanilla Berry Blast', description: 'Mixed berries, vanilla yogurt, and a touch of honey for a creamy, fruity treat.', rating: 4.6, genre: 'Fruit', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '8', title: 'Protein Power Punch', description: 'Banana, Greek yogurt, protein powder, and almond butter for a post-workout boost.', rating: 4.9, genre: 'Protein', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' },
        { id: '9', title: 'Pineapple Coconut Dream', description: 'Creamy coconut milk blended with fresh pineapple and a hint of lime for tropical vibes.', rating: 4.7, genre: 'Tropical', year: 2024, author: 'Mena Parikh', imageUrl: '/smoothies.png' }
      ],
      'm4': [ // Skincare for Dry Skin
        { id: '1', title: 'CeraVe Moisturizing Cream', description: 'Rich, non-comedogenic cream that hydrates and restores the skin barrier.', rating: 4.8, genre: 'Moisturizer', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '2', title: 'The Ordinary Hyaluronic Acid Serum', description: 'Intensive hydration serum that plumps and smooths the skin.', rating: 4.7, genre: 'Serum', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '3', title: 'La Roche-Posay Toleriane Double Repair', description: 'Gentle moisturizer with ceramides and niacinamide for sensitive dry skin.', rating: 4.9, genre: 'Moisturizer', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '4', title: 'Drunk Elephant Lala Retro Whipped Cream', description: 'Luxurious whipped cream with ceramides and six African oils.', rating: 4.6, genre: 'Moisturizer', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '5', title: 'Kiehl\'s Ultra Facial Cream', description: 'Lightweight yet deeply hydrating cream that provides 24-hour moisture.', rating: 4.7, genre: 'Moisturizer', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '6', title: 'The Ordinary Squalane Oil', description: 'Lightweight facial oil that locks in moisture without feeling greasy.', rating: 4.8, genre: 'Oil', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '7', title: 'First Aid Beauty Ultra Repair Cream', description: 'Intensive repair cream for dry, distressed skin with colloidal oatmeal.', rating: 4.9, genre: 'Moisturizer', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '8', title: 'Paula\'s Choice Omega+ Complex Serum', description: 'Rich serum with omega fatty acids to nourish and restore dry skin.', rating: 4.7, genre: 'Serum', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' },
        { id: '9', title: 'Glow Recipe Watermelon Glow Sleeping Mask', description: 'Overnight hydrating mask with hyaluronic acid and watermelon extract.', rating: 4.6, genre: 'Mask', year: 2024, author: 'Mena Parikh', imageUrl: '/skincare.png' }
      ],
      'm5': [ // Dorm Room Essentials
        { id: '1', title: 'Bed Risers', description: 'Extra storage space under your bed for bins and suitcases.', rating: 4.7, genre: 'Storage', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '2', title: 'Command Hooks', description: 'Damage-free hanging solutions for decorations, towels, and more.', rating: 4.8, genre: 'Organization', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '3', title: 'Desk Lamp with USB Ports', description: 'Bright lighting for late-night study sessions with convenient charging.', rating: 4.6, genre: 'Lighting', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '4', title: 'Shower Caddy', description: 'Portable organizer for all your shower essentials.', rating: 4.5, genre: 'Organization', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '5', title: 'Over-the-Door Mirror', description: 'Full-length mirror that hangs on your door to save space.', rating: 4.7, genre: 'Decor', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '6', title: 'Under-Bed Storage Bins', description: 'Clear plastic bins perfect for storing clothes, shoes, and extra items.', rating: 4.8, genre: 'Storage', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '7', title: 'Mini Fridge', description: 'Small refrigerator for snacks, drinks, and leftovers right in your room.', rating: 4.9, genre: 'Appliances', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '8', title: 'String Lights', description: 'Warm LED lights to create a cozy, personalized atmosphere in your space.', rating: 4.6, genre: 'Decor', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' },
        { id: '9', title: 'Desk Organizer Set', description: 'Pens, paper clips, and small items stay organized with this desk caddy.', rating: 4.5, genre: 'Organization', year: 2024, author: 'Mena Parikh', imageUrl: '/dorm.png' }
      ],
      'm6': [ // Teen Gifts
        { id: '1', title: 'AirPods Pro', description: 'Premium wireless earbuds with noise cancellation and spatial audio.', rating: 4.9, genre: 'Tech', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '2', title: 'LED Strip Lights', description: 'Colorful RGB lights to personalize any room with app control.', rating: 4.7, genre: 'Decor', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '3', title: 'Stanley Tumbler', description: 'Trendy insulated water bottle that keeps drinks cold for hours.', rating: 4.8, genre: 'Accessories', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '4', title: 'Makeup Mirror with Lights', description: 'Professional-grade mirror with adjustable LED lighting.', rating: 4.6, genre: 'Beauty', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '5', title: 'Instant Camera', description: 'Polaroid-style camera to capture and print memories instantly.', rating: 4.7, genre: 'Tech', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '6', title: 'Gift Card Set', description: 'Curated collection of gift cards for their favorite stores and restaurants.', rating: 4.5, genre: 'Gift Cards', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '7', title: 'Wireless Speaker', description: 'Portable Bluetooth speaker for music and parties with great sound quality.', rating: 4.8, genre: 'Tech', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '8', title: 'Sephora Favorites Set', description: 'Travel-sized beauty products from top brands to try and discover favorites.', rating: 4.6, genre: 'Beauty', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' },
        { id: '9', title: 'Phone Case with Card Holder', description: 'Stylish phone case with built-in wallet for ID and credit cards.', rating: 4.7, genre: 'Accessories', year: 2024, author: 'Mena Parikh', imageUrl: '/teengifts.png' }
      ],
      'm7': [ // Study Playlist Songs
        { id: '1', title: 'Anti-Hero - Taylor Swift', description: 'Perfect song for studying with its catchy melody and relatable lyrics.', rating: 4.9, genre: 'Pop', year: 2022, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '2', title: 'Cruel Summer - Taylor Swift', description: 'Upbeat and energetic song that keeps you motivated while studying.', rating: 4.8, genre: 'Pop', year: 2019, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '3', title: 'Good 4 U - Olivia Rodrigo', description: 'High-energy pop rock track perfect for powering through study sessions.', rating: 4.7, genre: 'Pop Rock', year: 2021, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '4', title: 'Vampire - Olivia Rodrigo', description: 'Emotional and powerful song that helps maintain focus during long study hours.', rating: 4.8, genre: 'Pop', year: 2023, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '5', title: 'Greedy - Tate McRae', description: 'Catchy pop song with a great beat for staying energized while studying.', rating: 4.7, genre: 'Pop', year: 2023, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '6', title: 'Exes - Tate McRae', description: 'Relatable lyrics and smooth melody perfect for background study music.', rating: 4.6, genre: 'Pop', year: 2024, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '7', title: 'Tennessee Orange - Megan Moroney', description: 'Country pop song with a sweet melody that\'s easy to listen to while studying.', rating: 4.7, genre: 'Country', year: 2023, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '8', title: 'Ghost - Justin Bieber', description: 'Chill pop song that provides a relaxed vibe perfect for focused studying.', rating: 4.8, genre: 'Pop', year: 2021, author: 'Mena Parikh', imageUrl: '/study.png' },
        { id: '9', title: 'Beautiful Things - Luke Combs', description: 'Uplifting country song that keeps you positive and motivated during study time.', rating: 4.6, genre: 'Country', year: 2023, author: 'Mena Parikh', imageUrl: '/study.png' }
      ],
      'm8': [ // College Application Tips
        { id: '1', title: 'Start Your Essay Early', description: 'Give yourself plenty of time to write, revise, and perfect your personal statement.', rating: 4.9, genre: 'Essays', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '2', title: 'Showcase Your Unique Story', description: 'Be authentic and share what makes you different from other applicants.', rating: 4.8, genre: 'Essays', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '3', title: 'Get Strong Recommendation Letters', description: 'Ask teachers who know you well and can speak to your character and abilities.', rating: 4.7, genre: 'Recommendations', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '4', title: 'Practice Interview Skills', description: 'Prepare thoughtful questions and practice talking about your experiences confidently.', rating: 4.6, genre: 'Interviews', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '5', title: 'Research Each School Thoroughly', description: 'Show genuine interest by mentioning specific programs, professors, or opportunities.', rating: 4.8, genre: 'Research', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '6', title: 'Keep Track of Deadlines', description: 'Create a calendar with all application deadlines, test dates, and required materials.', rating: 4.9, genre: 'Organization', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '7', title: 'Highlight Your Extracurriculars', description: 'Show depth and leadership in your activities rather than just listing many clubs.', rating: 4.7, genre: 'Activities', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '8', title: 'Proofread Everything', description: 'Have multiple people review your essays and applications for errors and clarity.', rating: 4.8, genre: 'Essays', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' },
        { id: '9', title: 'Demonstrate Growth and Learning', description: 'Share how you\'ve overcome challenges and what you\'ve learned from experiences.', rating: 4.7, genre: 'Essays', year: 2024, author: 'Mena Parikh', imageUrl: '/collegeapp.png' }
      ],
      'm9': [ // Weekend Activity Ideas
        { id: '1', title: 'Hiking Adventure', description: 'Explore local trails and enjoy nature while getting exercise.', rating: 4.8, genre: 'Outdoor', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '2', title: 'Coffee Shop Hopping', description: 'Visit different local cafes and try new drinks while working or reading.', rating: 4.7, genre: 'Food & Drink', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '3', title: 'Movie Marathon', description: 'Cozy up with friends for a themed movie night with snacks and blankets.', rating: 4.6, genre: 'Indoor', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '4', title: 'Farmer\'s Market Visit', description: 'Shop for fresh produce, try local treats, and support local vendors.', rating: 4.5, genre: 'Shopping', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '5', title: 'Art Museum or Gallery', description: 'Explore local art exhibitions and discover new artists and styles.', rating: 4.7, genre: 'Cultural', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '6', title: 'Beach Day', description: 'Pack a picnic, bring sunscreen, and spend the day relaxing by the water.', rating: 4.8, genre: 'Outdoor', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '7', title: 'Cooking Class', description: 'Learn to make a new cuisine or perfect your favorite dish with friends.', rating: 4.6, genre: 'Food & Drink', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '8', title: 'Thrift Shopping', description: 'Hunt for unique vintage finds and build a sustainable wardrobe.', rating: 4.7, genre: 'Shopping', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' },
        { id: '9', title: 'Game Night', description: 'Invite friends over for board games, card games, or video game tournaments.', rating: 4.8, genre: 'Indoor', year: 2024, author: 'Mena Parikh', imageUrl: '/weekend.png' }
      ]
    };
    
    return itemsMap[listId] || itemsMap['1']; // Default to horror books if ID not found
  };

  const listItems = getListItems(resolvedParams.id);

  // Mock comments data with replies
  const comments = [
    {
      id: '1',
      username: 'lumen.ly',
      avatar: '/lumen.png',
      comment: 'This is such a great collection! I\'ve read most of these and they\'re perfect for teens who love horror.',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: '1-1',
          username: 'john-smith',
          avatar: '/actualmena.png',
          comment: 'Thanks! I tried to pick books that are scary but still age-appropriate.',
          timestamp: '1 hour ago',
          likes: 5
        },
        {
          id: '1-2',
          username: 'violet.noir',
          avatar: '/violet.png',
          comment: 'I agree, the selection is perfect for teens!',
          timestamp: '30 minutes ago',
          likes: 3
        }
      ]
    },
    {
      id: '2',
      username: 'violet.noir',
      avatar: '/violet.png',
      comment: 'I would add "The Graveyard Book" by Neil Gaiman to this list. It\'s a fantastic horror book for young adults.',
      timestamp: '5 hours ago',
      likes: 8,
      replies: []
    },
    {
      id: '3',
      username: 'beneastman',
      avatar: '/ben.jpg',
      comment: 'Carrie is a classic! Great choice for introducing teens to Stephen King.',
      timestamp: '1 day ago',
      likes: 15,
      replies: [
        {
          id: '3-1',
          username: 'lumen.ly',
          avatar: '/lumen.png',
          comment: 'Absolutely! Carrie was my first Stephen King book too.',
          timestamp: '12 hours ago',
          likes: 7
        }
      ]
    },
    {
      id: '4',
      username: 'lifeofmads',
      avatar: '/mads.png',
      comment: 'The Haunting of Hill House is so atmospheric. Perfect for a spooky read.',
      timestamp: '2 days ago',
      likes: 6,
      replies: []
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listData.title,
        text: listData.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddToList = () => {
    if (!canEditList) {
      alert('Only the creator can add items to private lists.');
      return;
    }
    
    if (!newItemTitle.trim()) {
      alert('Please enter a title for the item.');
      return;
    }
    
    // Validate URL if provided
    if (newItemLink.trim() && !isValidUrl(newItemLink.trim())) {
      alert('Please enter a valid URL.');
      return;
    }
    
    // In a real app, this would save to the database
    alert(`"${newItemTitle}" has been added to this list!`);
    
    // Reset form
    setNewItemTitle('');
    setNewItemDescription('');
    setNewItemLink('');
    setShowAddItemModal(false);
  };
  
  const isValidUrl = (string: string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleToggleReplies = (commentId: string) => {
    setExpandedReplies((prev: { [key: string]: boolean }) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setNewReply('');
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      alert('Comment posted! (This is a mock - in a real app, this would save to the database)');
      setNewComment('');
    }
  };

  const handlePostReply = () => {
    if (newReply.trim()) {
      alert('Reply posted! (This is a mock - in a real app, this would save to the database)');
      setNewReply('');
      setReplyingTo(null);
    }
  };

  // Enhanced functionality
  const handleItemRating = (itemId: string, rating: number) => {
    setUserRatings((prev: { [key: string]: number }) => ({ ...prev, [itemId]: rating }));
    alert(`Rated ${rating} stars! (This would save to your profile)`);
  };

  const handleReadingProgress = (itemId: string, status: 'not-started' | 'in-progress' | 'completed') => {
    setReadingProgress((prev: { [key: string]: 'not-started' | 'in-progress' | 'completed' }) => ({ ...prev, [itemId]: status }));
    alert(`Marked as ${status.replace('-', ' ')}! (This would save to your profile)`);
  };

  const handleAddNote = (itemId: string, note: string) => {
    setItemNotes((prev: { [key: string]: string }) => ({ ...prev, [itemId]: note }));
    setShowNotes((prev: { [key: string]: boolean }) => ({ ...prev, [itemId]: false }));
    alert('Note saved! (This would save to your profile)');
  };

  const handleExportList = (format: 'csv' | 'json' | 'pdf') => {
    const listData = getListData(resolvedParams.id);
    const items = getFilteredAndSortedItems();
    
    if (format === 'csv') {
      // Generate CSV
      const headers = ['Title', 'Description', 'Genre', 'Year', 'Author/Director', 'Rating', 'Status'];
      const rows = items.map(item => [
        item.title,
        item.description,
        item.genre,
        item.year.toString(),
        item.author || item.director || '',
        item.rating.toString(),
        item.isCompleted ? 'Completed' : item.isInProgress ? 'In Progress' : 'Not Started'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${listData.title.replace(/[^a-z0-9]/gi, '_')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      // Generate JSON
      const jsonData = {
        title: listData.title,
        description: listData.description,
        createdBy: listData.createdBy,
        items: items.map(item => ({
          title: item.title,
          description: item.description,
          genre: item.genre,
          year: item.year,
          author: item.author,
          director: item.director,
          rating: item.rating
        }))
      };
      
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${listData.title.replace(/[^a-z0-9]/gi, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // For PDF, we'll use window.print with a print-friendly view
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const printContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>${listData.title}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; }
                .item { margin: 15px 0; padding: 10px; border-bottom: 1px solid #ddd; }
              </style>
            </head>
            <body>
              <h1>${listData.title}</h1>
              <p>${listData.description}</p>
              <p><strong>Created by:</strong> ${listData.createdBy}</p>
              <hr>
              <h2>Items</h2>
              ${items.map((item, index) => `
                <div class="item">
                  <h3>${index + 1}. ${item.title}</h3>
                  <p>${item.description}</p>
                  <p><strong>Genre:</strong> ${item.genre} | <strong>Year:</strong> ${item.year} | <strong>Rating:</strong> ${item.rating}/5</p>
                </div>
              `).join('')}
            </body>
          </html>
        `;
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    }
    
    setShowExportMenu(false);
  };

  const handleShareList = (platform?: 'twitter' | 'facebook' | 'copy') => {
    const listData = getListData(resolvedParams.id);
    const url = window.location.href;
    const text = `Check out "${listData.title}" on SaveFave!`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      // Use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: listData.title,
          text: text,
          url: url
        }).catch(() => {
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        });
      } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    }
    setShowShareModal(false);
  };

  const handleShareWithMessage = () => {
    if (shareMessage.trim()) {
      if (navigator.share) {
        navigator.share({
          title: listData.title,
          text: `${shareMessage}\n\n${listData.description}\n\nCheck out this list:`,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(`${shareMessage}\n\n${window.location.href}`);
        alert('Link and message copied to clipboard!');
      }
      setShowShareModal(false);
      setShareMessage('');
    }
  };

  // Navigation functions for stories/items
  const handlePreviousItem = () => {
    const filteredItems = getFilteredAndSortedItems();
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const handleNextItem = () => {
    const filteredItems = getFilteredAndSortedItems();
    if (currentItemIndex < filteredItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePreviousItem();
    } else if (e.key === 'ArrowRight') {
      handleNextItem();
    }
  };

  // Add keyboard event listener
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentItemIndex]);

  const openItemViewer = (index: number) => {
    setCurrentItemIndex(index);
    setShowItemViewer(true);
  };

  const getFilteredAndSortedItems = () => {
    let filtered = [...listItems];
    
    // Apply filters
    if (filterGenre) {
      filtered = filtered.filter(item => item.genre.toLowerCase().includes(filterGenre.toLowerCase()));
    }
    if (filterYear) {
      filtered = filtered.filter(item => item.year.toString().includes(filterYear));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'genre':
          return a.genre.localeCompare(b.genre);
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  const getProgressStats = () => {
    const total = listItems.length;
    const completed = Object.values(readingProgress).filter(status => status === 'completed').length;
    const inProgress = Object.values(readingProgress).filter(status => status === 'in-progress').length;
    const notStarted = total - completed - inProgress;
    
    return { total, completed, inProgress, notStarted };
  };

  const getRelatedLists = (): RelatedList[] => {
    const relatedLists: RelatedList[] = [
      {
        id: '13',
        title: 'More Horror Books',
        description: 'Additional spine-chilling reads for horror enthusiasts.',
        imageUrl: '/horror.png',
        createdBy: 'Emma Wilson',
        likes: 156,
        category: 'Books'
      },
      {
        id: '14',
        title: 'Teen Fiction Collection',
        description: 'Engaging young adult fiction for every reader.',
        imageUrl: '/comedy.png',
        createdBy: 'Sarah Johnson',
        likes: 203,
        category: 'Books'
      },
      {
        id: '15',
        title: 'Supernatural Stories',
        description: 'Mystical and supernatural tales for all ages.',
        imageUrl: '/documentary.png',
        createdBy: 'Mike Davis',
        likes: 178,
        category: 'Books'
      }
    ];
    
    return relatedLists;
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 cursor-pointer transition-colors ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
              ? 'fill-yellow-400/50 text-yellow-400' 
              : 'text-gray-300'
        } ${interactive ? 'hover:scale-110' : ''}`}
        onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
      />
    ));
  };

  const renderProgressIcon = (status: 'not-started' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Square className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Sidebar hasUnreadMessages={true} />
      
      <main className="ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8 flex justify-center">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
            <Link href="/" className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{listData.title}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg border transition-colors ${
                isLiked 
                  ? 'border-red-300 bg-red-50 text-red-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'border-yellow-300 bg-yellow-50 text-yellow-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button
                    onClick={() => handleExportList('csv')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button
                    onClick={() => handleExportList('json')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as JSON</span>
                  </button>
                  <button
                    onClick={() => handleExportList('pdf')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={() => {
                      const listData = getListData(resolvedParams.id);
                      const shareableLink = `${window.location.origin}/messages/lists/${resolvedParams.id}`;
                      navigator.clipboard.writeText(shareableLink);
                      alert('Shareable link copied to clipboard!');
                      setShowExportMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Copy Shareable Link</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Report List
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Copy Link
                  </button>
                  {canEditList && (
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Edit List
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

          {/* List Header Card */}
          <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* List Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={listData.imageUrl}
                        alt={listData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* List Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{listData.title}</h2>
                        <p className="text-gray-600 mb-4">{listData.description}</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">{listData.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">{listData.views} views</span>
                      </div>
                      {listData.allowComments ? (
                        <button
                          onClick={() => setShowComments(!showComments)}
                          className="flex items-center space-x-2 hover:text-green-600 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-600 hover:text-green-600">{listData.comments} comments</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-400">Comments disabled</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Creator and Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-gray-500" />
                        <Link href="/profile/john-smith" className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors">
                          {listData.createdBy}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Updated {listData.lastEdited}</span>
                      </div>
                    </div>
                    
                    {/* Collaboration Status */}
                    <div className="flex items-center space-x-3 mt-4 mb-4">
                      <span className="text-sm text-gray-600">Collaboration:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        listData.collaboration === 'public' 
                          ? 'bg-green-100 text-green-700' 
                          : listData.collaboration === 'private-collab'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {listData.collaboration === 'public' ? 'Publicly Collaborative' : 
                         listData.collaboration === 'private-collab' ? 'Private Collaborative' : 
                         'Private'}
                      </span>
                    </div>
                    

                    
                    {/* Tags */}
                    {listData.tags && listData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Tags:</span>
                        {listData.tags.map((tag: string, index: number) => (
                          <Link
                            key={index}
                            href={`/search?tag=${encodeURIComponent(tag)}`}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors cursor-pointer"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Lists Section */}
            <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Related Lists</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getRelatedLists().map((list) => (
                    <Link key={list.id} href={`/messages/lists/restoflists`} className="block">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={list.imageUrl}
                              alt={list.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{list.title}</h4>
                            <p className="text-xs text-gray-500">by {list.createdBy}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{list.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{list.category}</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{list.likes}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            {showComments && listData.allowComments && (
              <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
                  
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3">
                        {/* Main Comment */}
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={comment.avatar}
                                alt={comment.username}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Link href={`/profile/${comment.username}`} className="font-medium text-gray-900 hover:text-purple-600 transition-colors">
                                {comment.username}
                              </Link>
                              <span className="text-sm text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.comment}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" />
                                <span>{comment.likes}</span>
                              </button>
                              <button 
                                onClick={() => handleReplyClick(comment.id)}
                                className="hover:text-purple-600 transition-colors"
                              >
                                Reply
                              </button>
                              {comment.replies && comment.replies.length > 0 && (
                                <button 
                                  onClick={() => handleToggleReplies(comment.id)}
                                  className="hover:text-purple-600 transition-colors"
                                >
                                  {expandedReplies[comment.id] ? 'Hide' : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="ml-13 flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src="/actualmena.png"
                                  alt="Your avatar"
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <textarea
                                value={newReply}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReply(e.target.value)}
                                placeholder={`Reply to ${comment.username}...`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                                rows={2}
                              />
                              <div className="flex justify-end space-x-2 mt-2">
                                <button 
                                  onClick={() => setReplyingTo(null)}
                                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={() => handlePostReply()}
                                  className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && expandedReplies[comment.id] && (
                          <div className="ml-13 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                      src={reply.avatar}
                                      alt={reply.username}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Link href={`/profile/${reply.username}`} className="font-medium text-gray-900 hover:text-purple-600 transition-colors text-sm">
                                      {reply.username}
                                    </Link>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-gray-700 mb-2 text-sm">{reply.comment}</p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                                      <Heart className="w-3 h-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                    <button className="hover:text-purple-600 transition-colors">Reply</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment Form */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src="/actualmena.png"
                            alt="Your avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button 
                            onClick={handlePostComment}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* List Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {listData.category === 'Books' ? 'Books' : 
                   listData.category === 'Movies' ? 'Movies' :
                   listData.category === 'Food' ? 'Recipes' :
                   listData.category === 'Photography' ? 'Tips' :
                   listData.category === 'Travel' ? 'Destinations' :
                   listData.category === 'Technology' ? 'Tools' :
                   listData.category === 'Gardening' ? 'Plants' :
                   listData.category === 'Fitness' ? 'Routines' :
                   listData.category === 'DIY' ? 'Projects' :
                   'Items'} in this list ({getFilteredAndSortedItems().length})
                </h3>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg border transition-colors ${
                      showFilters ? 'border-purple-300 bg-purple-50 text-purple-600' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                      className="p-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="title">Sort by Title</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="year">Sort by Year</option>
                      <option value="genre">Sort by Genre</option>
                    </select>
                    <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Filter Controls */}
              {showFilters && (
                <Card className="mb-4 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Genre</label>
                        <input
                          type="text"
                          value={filterGenre}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterGenre(e.target.value)}
                          placeholder="e.g., Horror, Comedy..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year</label>
                        <input
                          type="text"
                          value={filterYear}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterYear(e.target.value)}
                          placeholder="e.g., 2020, 2019..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => {
                            setFilterGenre('');
                            setFilterYear('');
                          }}
                          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {getFilteredAndSortedItems().map((item, index) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer" 
                  style={{ backgroundColor: '#FFFCF9' }}
                  onClick={() => openItemViewer(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-28 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={item.imageUrl || '/horror.png'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                              {renderProgressIcon(readingProgress[item.id] || 'not-started')}
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(item.rating)}
                              <span className="text-sm text-gray-500 ml-1">({item.rating})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>{item.author ? `By ${item.author}` : item.director ? `Directed by ${item.director}` : `By ${listData.createdBy}`}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{item.genre}</span>
                        </div>
                        
                        {/* Interactive Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* User Rating */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Your Rating:</span>
                              <div className="flex items-center space-x-1">
                                {renderStars(userRatings[item.id] || 0, true, (rating) => handleItemRating(item.id, rating))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {/* Notes Button - only show if user can edit */}
                            {canEditList && (
                              <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                  e.stopPropagation();
                                  setShowNotes((prev: { [key: string]: boolean }) => ({ ...prev, [item.id]: !prev[item.id] }));
                                }}
                                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                                title="Add Notes"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            )}
                            
                            {/* External Link */}
                            <button
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                window.open(`https://www.google.com/search?q=${encodeURIComponent(item.title)}`, '_blank');
                              }}
                              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Search Online"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Notes Section */}
                        {showNotes[item.id] && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <textarea
                              value={itemNotes[item.id] || ''}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setItemNotes((prev: { [key: string]: string }) => ({ ...prev, [item.id]: e.target.value }))}
                              placeholder="Add your notes about this item..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                              rows={3}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                              <button
                                onClick={() => setShowNotes((prev: { [key: string]: boolean }) => ({ ...prev, [item.id]: false }))}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAddNote(item.id, itemNotes[item.id] || '')}
                                className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {/* Display Saved Notes */}
                        {itemNotes[item.id] && !showNotes[item.id] && (
                          <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-purple-800 italic">"{itemNotes[item.id]}"</p>
                              {canEditList && (
                                <button
                                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    setShowNotes((prev: { [key: string]: boolean }) => ({ ...prev, [item.id]: true }));
                                  }}
                                  className="ml-2 p-1 text-purple-600 hover:text-purple-800 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Related Lists Section */}
              <Card className="mb-6 overflow-hidden rounded-xl border border-gray-100" style={{ backgroundColor: '#FFFCF9' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Related Lists</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getRelatedLists().map((list) => (
                      <Link key={list.id} href={`/messages/lists/${list.id}`} className="block">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={list.imageUrl}
                                alt={list.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{list.title}</h4>
                              <p className="text-xs text-gray-500">by {list.createdBy}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{list.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{list.category}</span>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{list.likes}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add to List Button - only show if user can edit */}
              {canEditList && (
                <Card className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#FFFCF9' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setShowAddItemModal(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add to This List</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
        </div>
      </main>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share This List</h3>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setShareMessage('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Social Media Share Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => handleShareList('twitter')}
                className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Share2 className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</span>
              </button>
              <button
                onClick={() => handleShareList('facebook')}
                className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Share2 className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
              </button>
              <button
                onClick={() => handleShareList('copy')}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FileText className="w-6 h-6 text-gray-600 dark:text-gray-300 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Copy Link</span>
              </button>
            </div>
            
            <textarea
              value={shareMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setShareMessage(e.target.value)}
              placeholder="Add a personal message (optional)..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setShareMessage('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleShareList()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Item to List</h3>
              <button
                onClick={() => {
                  setShowAddItemModal(false);
                  setNewItemTitle('');
                  setNewItemDescription('');
                  setNewItemLink('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="item-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="item-title"
                  value={newItemTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemTitle(e.target.value)}
                  placeholder="Enter item title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="item-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="item-description"
                  value={newItemDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItemDescription(e.target.value)}
                  placeholder="Enter item description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label htmlFor="item-link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link (Optional)
                </label>
                <input
                  type="url"
                  id="item-link"
                  value={newItemLink}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemLink(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Enter a valid URL (e.g., https://example.com)</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowAddItemModal(false);
                  setNewItemTitle('');
                  setNewItemDescription('');
                  setNewItemLink('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToList}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Viewer Modal */}
      {showItemViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                      {/* Debug Info */}
            <div className="absolute top-20 left-4 z-60 bg-white p-2 rounded text-xs">
              Modal Open | Index: {currentItemIndex} | Total: {getFilteredAndSortedItems().length}
            </div>
            
            {/* Arrow Button Indicators */}
            <div className="absolute top-40 left-4 z-60 bg-yellow-400 p-2 rounded text-xs font-bold">
              ← BUTTON HERE (Index: {currentItemIndex})
            </div>
            <div className="absolute top-40 right-4 z-60 bg-yellow-400 p-2 rounded text-xs font-bold">
              BUTTON HERE → (Total: {getFilteredAndSortedItems().length})
            </div>
          <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowItemViewer(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Test Button */}
            <button
              onClick={() => alert('Modal is working! Current index: ' + currentItemIndex)}
              className="absolute top-4 left-4 z-50 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Test Button
            </button>
            
            {/* Navigation Test Buttons */}
            <button
              onClick={() => {
                handlePreviousItem();
              }}
              className="absolute top-16 left-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Test Previous
            </button>
            
            <button
              onClick={() => {
                handleNextItem();
              }}
              className="absolute top-28 left-4 z-50 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Test Next
            </button>

            {/* Navigation Arrows - PROPER BUTTONS */}
            <button
              onClick={handlePreviousItem}
              disabled={currentItemIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 ${
                currentItemIndex === 0
                  ? 'bg-gray-400/50 text-gray-300 border-gray-300/20 cursor-not-allowed'
                  : 'bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 hover:scale-105 cursor-pointer'
              }`}
              style={{ 
                pointerEvents: 'auto',
                zIndex: 1000
              }}
              type="button"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            
            <button
              onClick={handleNextItem}
              disabled={currentItemIndex === getFilteredAndSortedItems().length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 ${
                currentItemIndex === getFilteredAndSortedItems().length - 1
                  ? 'bg-gray-400/50 text-gray-300 border-gray-300/20 cursor-not-allowed'
                  : 'bg-black/70 hover:bg-black/90 text-white border-white/30 hover:border-white/50 hover:scale-105 cursor-pointer'
              }`}
              style={{ 
                pointerEvents: 'auto',
                zIndex: 1000
              }}
              type="button"
              aria-label="Next item"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Item Content */}
            <div className="w-full h-full flex items-center justify-center p-8">
              {(() => {
                const currentItem = getFilteredAndSortedItems()[currentItemIndex];
                if (!currentItem) return null;
                
                return (
                  <div className="w-full max-w-2xl">
                    {/* Item Image */}
                    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={currentItem.imageUrl || '/horror.png'}
                        alt={currentItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentItem.title}</h2>
                      <p className="text-lg text-gray-600 mb-6">{currentItem.description}</p>
                      
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                        <span>{currentItem.author ? `By ${currentItem.author}` : currentItem.director ? `Directed by ${currentItem.director}` : `By ${listData.createdBy}`}</span>
                        <span>•</span>
                        <span>{currentItem.year}</span>
                        <span>•</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{currentItem.genre}</span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        {renderStars(currentItem.rating)}
                        <span className="text-lg text-gray-500">({currentItem.rating})</span>
                      </div>
                      
                      {/* Progress Indicator */}
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <span className="text-sm text-gray-500">
                          {currentItemIndex + 1} of {getFilteredAndSortedItems().length}
                        </span>
                        <div className="flex space-x-1">
                          {getFilteredAndSortedItems().map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentItemIndex ? 'bg-purple-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Interactive Controls */}
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <button
                          onClick={() => handleItemRating(currentItem.id, (userRatings[currentItem.id] || 0) === 5 ? 0 : (userRatings[currentItem.id] || 0) + 1)}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Star className="w-4 h-4" />
                          <span>Rate</span>
                        </button>
                        
                        <button
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(currentItem.title)}`, '_blank')}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Search Online</span>
                        </button>
                      </div>
                      
                      {/* Additional Navigation Controls */}
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={handlePreviousItem}
                          disabled={currentItemIndex === 0}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            currentItemIndex === 0 
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>
                        
                        <button
                          onClick={handleNextItem}
                          disabled={currentItemIndex === getFilteredAndSortedItems().length - 1}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            currentItemIndex === getFilteredAndSortedItems().length - 1 
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
