"use client";

import React, { useState, use } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Heart, Share2, MoreVertical, Bookmark, Star, Eye, MessageCircle, Calendar, User, Plus } from "lucide-react";
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
};

export default function ListDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Get list data based on ID
  const getListData = (id: string) => {
    const listDataMap: { [key: string]: any } = {
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
      }
    };
    
    return listDataMap[id] || listDataMap['1']; // Default to horror books if ID not found
  };

  const listData = getListData(resolvedParams.id);

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
      ]
    };
    
    return itemsMap[listId] || itemsMap['1']; // Default to horror books if ID not found
  };

  const listItems = getListItems(resolvedParams.id);

  // Mock comments data
  const comments = [
    {
      id: '1',
      username: 'lumen.ly',
      avatar: '/lumen.png',
      comment: 'This is such a great collection! I\'ve read most of these and they\'re perfect for teens who love horror.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: '2',
      username: 'violet.noir',
      avatar: '/violet.png',
      comment: 'I would add "The Graveyard Book" by Neil Gaiman to this list. It\'s a fantastic horror book for young adults.',
      timestamp: '5 hours ago',
      likes: 8
    },
    {
      id: '3',
      username: 'beneastman',
      avatar: '/ben.jpg',
      comment: 'Carrie is a classic! Great choice for introducing teens to Stephen King.',
      timestamp: '1 day ago',
      likes: 15
    },
    {
      id: '4',
      username: 'lifeofmads',
      avatar: '/mads.png',
      comment: 'The Haunting of Hill House is so atmospheric. Perfect for a spooky read.',
      timestamp: '2 days ago',
      likes: 6
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

  const handleAddToList = (bookTitle: string) => {
    if (listData.collaboration === 'public') {
      alert(`"${bookTitle}" has been added to this collaborative list!`);
    } else {
      alert('This list is not publicly collaborative. Only the creator can add items.');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
              ? 'fill-yellow-400/50 text-yellow-400' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

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
              onClick={handleShare}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              
              {showMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Report List
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Copy Link
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Follow Creator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
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
                        <User className="w-5 h-5 text-gray-500" />
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
                    <div className="flex flex-wrap gap-2 mt-4">
                      {listData.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
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
                      <div key={comment.id} className="flex space-x-3">
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
                            <button className="hover:text-purple-600 transition-colors">Reply</button>
                          </div>
                        </div>
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
                          placeholder="Add a comment..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {listData.category === 'Books' ? 'Books' : 
                 listData.category === 'Movies' ? 'Movies' :
                 listData.category === 'Food' ? 'Recipes' :
                 listData.category === 'Photography' ? 'Tips' :
                 listData.category === 'Travel' ? 'Destinations' :
                 listData.category === 'Technology' ? 'Tools' :
                 listData.category === 'Gardening' ? 'Plants' :
                 listData.category === 'Fitness' ? 'Routines' :
                 listData.category === 'DIY' ? 'Projects' :
                 'Items'} in this list
              </h3>
              
              {listItems.map((item) => (
                <Card key={item.id} className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#FFFCF9' }}>
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
                          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(item.rating)}
                              <span className="text-sm text-gray-500 ml-1">({item.rating})</span>
                            </div>

                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{item.author ? `By ${item.author}` : item.director ? `Directed by ${item.director}` : `By ${listData.createdBy}`}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{item.genre}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add to List Button for Publicly Collaborative Lists */}
              {listData.collaboration === 'public' && (
                <Card className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#FFFCF9' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleAddToList('new item')}
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
        </div>
      </main>
    </div>
  );
}
