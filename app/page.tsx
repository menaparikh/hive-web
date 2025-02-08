import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

type Movie = {
  id: string;
  title: string;
  director: string;
  imageUrl: string;
  year: number;
};

export default function Home() {
  // In a real app, this would likely come from an API or database
  const movies: Movie[] = [
    {
      id: '1',
      title: 'The Godfather',
      director: 'Francis Ford Coppola',
      imageUrl: '/api/placeholder/300/450',
      year: 1972
    },
    {
      id: '2',
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      imageUrl: '/api/placeholder/300/450',
      year: 1994
    },
    {
      id: '3',
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      imageUrl: '/api/placeholder/300/450',
      year: 2008
    }
  ];

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Featured Movies</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 w-full">
                <Image
                  src={movie.imageUrl}
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover"
                  priority={movie.id === '1'}
                />
              </div>
              
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
    </main>
  );
}