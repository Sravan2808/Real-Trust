import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to Our REALTRUST
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Discover amazing projects and hear from our satisfied clients
        </p>
        <a 
          href="#projects" 
          className="inline-block bg-white  text-black text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          View Projects
        </a>
      </div>
    </section>
  );
};

export default Hero;