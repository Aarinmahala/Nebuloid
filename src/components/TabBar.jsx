import React from 'react';
import Tab from './Tab';
import { FaPlus } from 'react-icons/fa';

const TabBar = ({ tabs, activeTabId, onTabActivate, onTabClose, onNewTab }) => {
  return (
    <div className="flex bg-gray-800 text-white overflow-x-auto">
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          title={tab.title}
          favicon={tab.favicon}
          isActive={tab.id === activeTabId}
          onActivate={() => onTabActivate(tab.id)}
          onClose={() => onTabClose(tab.id)}
        />
      ))}
      <button 
        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
        onClick={onNewTab}
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
};

export default TabBar; 