import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const HomePage = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const query = searchQuery.includes('.') 
        ? searchQuery 
        : `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
      onNavigate(query);
    }
  };
  
  const quickLinks = [
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com' },
    { name: 'Wikipedia', url: 'https://wikipedia.org' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Reddit', url: 'https://reddit.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'News', url: 'https://news.ycombinator.com' },
  ];
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-center">Nebuloid Browser</h1>
        <p className="text-gray-300 text-center">Your privacy-focused web experience</p>
      </div>
      
      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the web privately..."
            className="w-full py-4 px-12 rounded-full bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none text-lg"
          />
          <FaSearch className="absolute left-4 top-5 text-gray-400 text-xl" />
          <button
            type="submit"
            className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-4xl">
        {quickLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => onNavigate(link.url)}
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span className="text-xl mb-2">{link.name[0]}</span>
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 text-gray-400 text-sm">
        <p>Nebuloid Browser - No tracking, no data collection, just browsing</p>
      </div>
    </div>
  );
};

export default HomePage; 