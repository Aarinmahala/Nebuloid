import React, { useState } from 'react';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaHome, 
  FaSearch, 
  FaShieldAlt, 
  FaCog, 
  FaBookmark 
} from 'react-icons/fa';

const Navbar = ({ 
  onNavigate, 
  onGoBack, 
  onGoForward, 
  onGoHome,
  canGoBack,
  canGoForward,
  currentUrl,
  isLoading
}) => {
  const [url, setUrl] = useState(currentUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onNavigate(url);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-2">
      <div className="flex items-center space-x-2">
        <button 
          onClick={onGoBack} 
          disabled={!canGoBack}
          className={`p-2 rounded-full hover:bg-gray-700 ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaArrowLeft />
        </button>
        <button 
          onClick={onGoForward} 
          disabled={!canGoForward}
          className={`p-2 rounded-full hover:bg-gray-700 ${!canGoForward ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaArrowRight />
        </button>
        <button 
          onClick={onGoHome}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <FaHome />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-1">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Search or enter website name"
              className="bg-transparent border-none w-full focus:outline-none text-white"
            />
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-400"></div>
            )}
            <FaShieldAlt className="ml-2 text-green-400" title="Connection is secure" />
          </div>
        </form>
        
        <button className="p-2 rounded-full hover:bg-gray-700">
          <FaBookmark />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700">
          <FaCog />
        </button>
      </div>
    </div>
  );
};

export default Navbar; 