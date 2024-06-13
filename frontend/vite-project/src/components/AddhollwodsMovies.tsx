import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

interface Movie {
  title: string;
  director: string;
  release_date: string;
  rating: number;
  description: string;
  poster_image: string;
}

const AddHollywoodMovies: React.FC = () => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    director: '',
    release_date: '',
    rating: 0,
    description: '',
    poster_image: '',
  });
  const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/movie/add/ghost', movie);
      console.log(response.data);
      alert('Movie added successfully!');
      setMovie({
        title: '',
        director: '',
        release_date: '',
        rating: 0,
        description: '',
        poster_image: '',
      });
      navigator("/ghost")
    } catch (error) {
      console.error('There was an error adding the movie!', error);
      alert('Failed to add movie');
    }
  };

  return (
    <div className="min-h-screen bg-gray-700">
      <Navbar />
      <div className="max-w-md mx-auto mt-28 p-6 bg-sky-600 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-white">Add a New Hollywood Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100">Title:</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Director:</label>
            <input
              type="text"
              name="director"
              value={movie.director}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Release Date:</label>
            <input
              type="date"
              name="release_date"
              value={movie.release_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Rating:</label>
            <input
              type="number"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Description:</label>
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">Poster Image URL:</label>
            <input
              type="text"
              name="poster_image"
              value={movie.poster_image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHollywoodMovies;
