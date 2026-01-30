import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          REALTRUST
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-primary transition">Home</a>
          <a href="#projects" className="text-gray-700 hover:text-primary transition">Projects</a>
          <a href="#clients" className="text-gray-700 hover:text-primary transition">Clients</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
        </div>
        <Link 
          to="/admin" 
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Admin Panel
        </Link>
      </nav>
    </header>
  );
};

export default Header;