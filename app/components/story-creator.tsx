"use client";

import React, { useState, useRef } from 'react';
import { X, Plus, Type, Palette, Sticker, Camera } from 'lucide-react';
import Image from 'next/image';

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

type StoryCreatorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (story: Story) => void;
  username: string;
  avatar: string;
};

export default function StoryCreator({ isOpen, onClose, onSave, username, avatar }: StoryCreatorProps) {
  const [contents, setContents] = useState<StoryContent[]>([]);
  const [background, setBackground] = useState('linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)');
  const [selectedTool, setSelectedTool] = useState<'text' | 'image' | 'sticker' | 'background'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [selectedFontSize, setSelectedFontSize] = useState(24);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showListSelector, setShowListSelector] = useState(false);
  const [selectedList, setSelectedList] = useState<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    category: string;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Mock lists data for reposting
  const availableLists = [
    {
      id: '1',
      title: 'Horror Books for Teens',
      description: 'A carefully curated collection of spine-chilling horror novels perfect for young adult readers.',
      imageUrl: '/horror.png',
      createdBy: 'John Smith',
      category: 'Books'
    },
    {
      id: '2',
      title: 'Must Watch Comedy Movies',
      description: 'A hilarious collection of comedy films that will have you laughing from start to finish.',
      imageUrl: '/comedy.png',
      createdBy: 'Sarah Johnson',
      category: 'Movies'
    },
    {
      id: '3',
      title: 'Go-To Salad Recipes',
      description: 'Fresh, healthy, and delicious salad recipes that are perfect for any meal.',
      imageUrl: '/salad.png',
      createdBy: 'Mike Davis',
      category: 'Food'
    },
    {
      id: '4',
      title: 'Cooking Techniques',
      description: 'Essential cooking techniques that every home chef should master.',
      imageUrl: '/cooking.png',
      createdBy: 'Lisa Chen',
      category: 'Food'
    },
    {
      id: '5',
      title: 'Photography Tips',
      description: 'Professional photography tips and tricks to help you capture stunning images.',
      imageUrl: '/camera.png',
      createdBy: 'Tom Wilson',
      category: 'Photography'
    },
    {
      id: '6',
      title: 'Travel Destinations',
      description: 'Breathtaking travel destinations around the world that should be on everyone\'s bucket list.',
      imageUrl: '/destination.png',
      createdBy: 'Maria Rodriguez',
      category: 'Travel'
    }
  ];

  const colors = [
    '#FFFFFF', '#000000', '#FF6B9D', '#C44569', '#8B5CF6', '#F8B500',
    '#06D6A0', '#26547C', '#FFD166', '#EF476F', '#118AB2', '#073B4C'
  ];

  const fonts = [
    'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
    'Verdana', 'Courier New', 'Impact', 'Comic Sans MS'
  ];

  const backgrounds = [
    'linear-gradient(45deg, #FF6B9D, #C44569, #8B5CF6, #F8B500)',
    'linear-gradient(45deg, #06D6A0, #118AB2, #073B4C, #26547C)',
    'linear-gradient(45deg, #FFD166, #EF476F, #FF6B9D, #C44569)',
    'linear-gradient(45deg, #8B5CF6, #F8B500, #06D6A0, #118AB2)',
    'linear-gradient(45deg, #26547C, #073B4C, #FFD166, #EF476F)',
    'linear-gradient(45deg, #C44569, #8B5CF6, #F8B500, #06D6A0)',
    'radial-gradient(circle, #FF6B9D, #C44569)',
    'radial-gradient(circle, #06D6A0, #118AB2)',
    'radial-gradient(circle, #FFD166, #EF476F)',
    'solid #000000',
    'solid #FFFFFF',
    'solid #FF6B9D'
  ];

  const stickers = [
    '🎃', '👻', '🎭', '📚', '🍿', '🥗', '📸', '✈️', '💻', '🌱',
    '🐕', '🎨', '🎵', '⭐', '💖', '🔥', '💎', '🌈', '🎪', '🎯'
  ];

  const addText = () => {
    if (textInput.trim()) {
      const newContent: StoryContent = {
        id: Date.now().toString(),
        type: 'text',
        content: textInput,
        x: 50,
        y: 50,
        fontSize: selectedFontSize,
        color: selectedColor,
        fontFamily: selectedFont,
        rotation: 0,
        scale: 1
      };
      setContents(prev => [...prev, newContent]);
      setTextInput('');
    }
  };

  const addSticker = (sticker: string) => {
    const newContent: StoryContent = {
      id: Date.now().toString(),
      type: 'text',
      content: sticker,
      x: 50,
      y: 50,
      fontSize: 48,
      rotation: 0,
      scale: 1
    };
    setContents(prev => [...prev, newContent]);
  };

  const addListRepost = (list: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdBy: string;
    category: string;
  }) => {
    const newContent: StoryContent = {
      id: Date.now().toString(),
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
        id: list.id,
        title: list.title,
        description: list.description,
        imageUrl: list.imageUrl,
        originalCreator: list.createdBy,
        repostedBy: username,
        category: list.category
      }
    };
    setContents(prev => [...prev, newContent]);
    setSelectedList(list);
    setShowListSelector(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedTool === 'text' && textInput.trim()) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        const newContent: StoryContent = {
          id: Date.now().toString(),
          type: 'text',
          content: textInput,
          x,
          y,
          fontSize: selectedFontSize,
          color: selectedColor,
          fontFamily: selectedFont,
          rotation: 0,
          scale: 1
        };
        setContents(prev => [...prev, newContent]);
        setTextInput('');
      }
    }
  };

  const handleContentClick = (contentId: string) => {
    setSelectedContent(selectedContent === contentId ? null : contentId);
  };

  const deleteContent = (contentId: string) => {
    setContents(prev => prev.filter(content => content.id !== contentId));
    setSelectedContent(null);
  };

  const handleSave = () => {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const story: Story = {
      id: Date.now().toString(),
      username,
      avatar,
      createdAt: new Date(),
      expiresAt,
      contents,
      background,
      isActive: true,
      type: selectedList ? 'list-repost' : 'custom'
    };

    onSave(story);
    onClose();
  };

  const selectedContentData = contents.find(content => content.id === selectedContent);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <h2 className="font-semibold">Create Story</h2>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700"
          >
            Post
          </button>
        </div>

        {/* Story Canvas */}
        <div 
          ref={canvasRef}
          className="relative w-full h-96 cursor-crosshair"
          style={{ background }}
          onClick={handleCanvasClick}
        >
          {contents.map((content) => (
            <div
              key={content.id}
              className={`absolute cursor-move select-none ${
                selectedContent === content.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: `${content.x}%`,
                top: `${content.y}%`,
                transform: `translate(-50%, -50%) rotate(${content.rotation}deg) scale(${content.scale})`,
                fontSize: content.fontSize,
                color: content.color,
                fontFamily: content.fontFamily
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleContentClick(content.id);
              }}
            >
              {content.content}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedTool('text')}
              className={`p-2 rounded-lg ${selectedTool === 'text' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
            >
              <Type className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedTool('sticker')}
              className={`p-2 rounded-lg ${selectedTool === 'sticker' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
            >
              <Sticker className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedTool('background')}
              className={`p-2 rounded-lg ${selectedTool === 'background' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowListSelector(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowListSelector(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Repost List"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Text Input */}
          {selectedTool === 'text' && (
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Add text..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addText()}
                />
                <button
                  onClick={addText}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
                <select
                  value={selectedFontSize}
                  onChange={(e) => setSelectedFontSize(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                  <option value={24}>24</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                  <option value={64}>64</option>
                </select>
              </div>
            </div>
          )}

          {/* Sticker Selection */}
          {selectedTool === 'sticker' && (
            <div className="grid grid-cols-10 gap-2">
              {stickers.map((sticker) => (
                <button
                  key={sticker}
                  onClick={() => addSticker(sticker)}
                  className="w-8 h-8 text-2xl hover:bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  {sticker}
                </button>
              ))}
            </div>
          )}

          {/* Background Selection */}
          {selectedTool === 'background' && (
            <div className="grid grid-cols-3 gap-2">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setBackground(bg)}
                  className={`w-16 h-16 rounded-lg border-2 ${
                    background === bg ? 'border-purple-600' : 'border-gray-300'
                  }`}
                  style={{ background: bg.startsWith('solid') ? bg.replace('solid ', '') : bg }}
                />
              ))}
            </div>
          )}

          {/* Selected Content Controls */}
          {selectedContent && selectedContentData && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Edit Content</span>
                <button
                  onClick={() => deleteContent(selectedContent)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                  Rotate
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                  Scale
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                  Move
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* List Selector Modal */}
      {showListSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md max-h-96">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Repost a List</h3>
              <button 
                onClick={() => setShowListSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-80">
              <div className="space-y-3">
                {availableLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => addListRepost(list)}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={list.imageUrl}
                          alt={list.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{list.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{list.description}</p>
                        <p className="text-xs text-gray-400">by {list.createdBy} • {list.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


