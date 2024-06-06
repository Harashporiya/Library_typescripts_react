import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">Library App</div>
        <div className="flex space-x-4">
          <Link to="/BookShow" className="text-gray-300 text-2xl hover:text-white">Home</Link>
          <Link to="/BookAdd" className="text-gray-300 text-2xl hover:text-white">Add Book</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
