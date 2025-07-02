import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Tab = ({ title, isActive, favicon, onActivate, onClose }) => {
  return (
    <div 
      className={`flex items-center px-3 py-2 max-w-xs border-b-2 cursor-pointer ${
        isActive 
          ? 'bg-gray-700 border-blue-500' 
          : 'bg-gray-800 border-transparent hover:bg-gray-700'
      }`}
      onClick={onActivate}
    >
      {favicon && (
        <img src={favicon} alt="favicon" className="w-4 h-4 mr-2" />
      )}
      <span className="truncate text-sm flex-1">{title || 'New Tab'}</span>
      <button 
        className="ml-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <FaTimes size={12} />
      </button>
    </div>
  );
};

export default Tab; 