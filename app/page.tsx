"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from './components/header';
import Creator from './components/creator';
import { Sidebar } from '@/components/ui/sidebar';

type Movie = {
  id: string;
  title: string;
  director: string;
  imageUrl: string;
  year: number;
};

export default function Home() {
  const movies: Movie[] = [
    {
      id: '1',
      title: 'The Godfather',
      director: 'Francis Ford Coppola',
      imageUrl: '/godfather.png',
      year: 1972
    },
    {
      id: '2',
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      imageUrl: '/pulpfiction.png',
      year: 1994
    },
    {
      id: '3',
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      imageUrl: '/thedarknight.png',
      year: 2008
    }
  ];

  const handleMovieClick = (movieId: string) => {
    console.log(`Movie clicked: ${movieId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar/>
      <div className="ml-16">
        <Header/>
        {/* Main content */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Creators */}
            <h1 className="text-3xl font-bold mb-8">Creators</h1>
            <div className="flex flex-row justify-between">
              <Creator name="mena" image="/profpic1.jpg"/>
              <Creator name="mena2" image="/profpic2.jpg"/>
              <Creator name="mena3" image="/profpic3.jpg"/>
            </div>
            <h1 className="text-3xl font-bold mb-8">Featured Movies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <button 
                    onClick={() => handleMovieClick(movie.id)} 
                    className="relative h-64 w-full block focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`View details for ${movie.title}`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={movie.imageUrl}
                        alt={`${movie.title} poster`}
                        fill
                        className="object-cover"
                        priority={movie.id === '1'}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity" />
                    </div>
                  </button>
                  
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <div className="flex items-center justify-between text-gray-600">
                      <p className="text-sm">Directed by: {movie.director}</p>
                      <span className="text-sm">{movie.year}</span>
                    </div>
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