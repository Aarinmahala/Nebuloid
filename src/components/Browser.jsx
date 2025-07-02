import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TabBar from './TabBar';
import Navbar from './Navbar';
import WebView from './WebView';

const Browser = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Initialize with a default tab
  useEffect(() => {
    if (tabs.length === 0) {
      const newTabId = uuidv4();
      setTabs([{
        id: newTabId,
        title: 'New Tab',
        url: 'about:home',
        favicon: null
      }]);
      setActiveTabId(newTabId);
    }
  }, []);
  
  // Get active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId) || null;
  
  // Handle tab creation
  const handleNewTab = () => {
    const newTabId = uuidv4();
    setTabs([...tabs, {
      id: newTabId,
      title: 'New Tab',
      url: 'about:home',
      favicon: null
    }]);
    setActiveTabId(newTabId);
  };
  
  // Handle tab closing
  const handleTabClose = (tabId) => {
    // Don't close the last tab
    if (tabs.length === 1) return;
    
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If closing the active tab, activate another tab
    if (tabId === activeTabId) {
      const newActiveIndex = tabIndex === 0 ? 0 : tabIndex - 1;
      setActiveTabId(newTabs[newActiveIndex].id);
    }
    
    setTabs(newTabs);
  };
  
  // Handle URL navigation
  const handleNavigate = (url) => {
    if (!activeTabId) return;
    
    // Update the active tab with the new URL
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url } 
        : tab
    ));
  };
  
  // Handle URL changes from the WebView
  const handleUrlChange = (url) => {
    setCurrentUrl(url);
    
    // Update tab with new URL and title
    setTabs(tabs.map(tab => {
      if (tab.id === activeTabId) {
        let title = 'New Tab';
        
        if (url === 'about:home') {
          title = 'Home';
        } else {
          title = url.replace(/^https?:\/\//, '').split('/')[0];
        }
        
        return { ...tab, url, title };
      }
      return tab;
    }));
  };
  
  // Navigation controls
  const handleGoBack = () => {
    // In a real implementation, this would use WebView's history API
    console.log('Go back');
    handleNavigate('about:home');
  };
  
  const handleGoForward = () => {
    // In a real implementation, this would use WebView's history API
    console.log('Go forward');
  };
  
  const handleGoHome = () => {
    handleNavigate('about:home');
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabActivate={setActiveTabId}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />
      
      <Navbar
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onGoHome={handleGoHome}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        currentUrl={activeTab?.url === 'about:home' ? '' : activeTab?.url || ''}
        isLoading={isLoading}
      />
      
      {activeTab && (
        <WebView
          url={activeTab.url}
          onNavigate={handleNavigate}
          onUrlChange={handleUrlChange}
          onLoadingChange={setIsLoading}
          onCanGoBackChange={setCanGoBack}
          onCanGoForwardChange={setCanGoForward}
        />
      )}
    </div>
  );
};

export default Browser; 