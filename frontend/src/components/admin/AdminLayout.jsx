import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaNewspaper, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin/projects', label: 'Projects', icon: FaProjectDiagram },
    { path: '/admin/clients', label: 'Clients', icon: FaUsers },
    { path: '/admin/contacts', label: 'Contacts', icon: FaEnvelope },
    { path: '/admin/newsletters', label: 'Newsletters', icon: FaNewspaper },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static w-64 bg-secondary text-white h-full transition-transform duration-300 ease-in-out z-30`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="mt-8">
            <Link
              to="/"
              className="block text-center bg-primary hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              View Landing Page
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mr-4"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;