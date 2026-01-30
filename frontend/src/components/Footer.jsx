import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-300 hover:text-gray-800 cursor-pointer transition">
              Creating amazing digital experiences for our clients worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-gray-800 transition">Home</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-gray-800 transition">Projects</a></li>
              <li><a href="#clients" className="text-gray-300 hover:text-gray-800 transition">Clients</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-gray-800 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
        </div>
      </div>
    </footer>
  );
};

export default Footer;