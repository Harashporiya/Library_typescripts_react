import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

interface Movie {
  Title: string;
  Director: string;
  Release_Date: string;
  Rating: number;
  Description: string;
  Poster_Image: string;
}

const AddIndiaMovie: React.FC = () => {
  const [movie, setMovie] = useState<Movie>({
    Title: '',
    Director: '',
    Release_Date: '',
    Rating: 0,
    Description: '',
    Poster_Image: '',
  });
  const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/movies/add/india', movie);
      console.log(response.data);
      alert('Movie added successfully!');
      setMovie({
        Title: '',
        Director: '',
        Release_Date: '',
        Rating: 0,
        Description: '',
        Poster_Image: '',
      });
         navigator("/indiamovies")
    } catch (error) {
      console.error('There was an error adding the movie!', error);
      alert('Failed to add movie');
    }
  };

  return (
    <div className='min-h-screen bg-gray-700'>
    <Navbar/>
    
    <div className="max-w-md mx-auto mt-28 p-6 bg-sky-600  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add a New Indian Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="Title"
            value={movie.Title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Director:</label>
          <input
            type="text"
            name="Director"
            value={movie.Director}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Release Date:</label>
          <input
            type="date"
            name="Release_Date"
            value={movie.Release_Date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating:</label>
          <input
            type="number"
            name="Rating"
            value={movie.Rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="Description"
            value={movie.Description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Poster Image URL:</label>
          <input
            type="text"
            name="Poster_Image"
            value={movie.Poster_Image}
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

export default AddIndiaMovie;
