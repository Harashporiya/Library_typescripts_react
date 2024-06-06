import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App'; 
import Login from './Login';
import Signup from './Signup';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
