import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from './Login';
import Signup from './Signup';
import BookAdd from './BookAdd';
import BookShow from './BookShow';
import Navbar from './Navbar';
import MoviesIndia from './MoviesIndia';
import MoviesGhost from './MoviesGhost';
import Movies from './Movies';
import AddIndiaMovie from './AddIndiaMovie';
import AddhollwodsMovies from './AddhollwodsMovies';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/BookAdd' element={<BookAdd />} />
        <Route path='/BookShow' element={<BookShow />} />
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='movies' element={<Movies />} />
        <Route path='/indiamovies' element={<MoviesIndia />} />
        <Route path='/ghost' element={<MoviesGhost />} />
        <Route path='/addIndia' element={<AddIndiaMovie/>}/>
        <Route path='/addghost' element={<AddhollwodsMovies/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
