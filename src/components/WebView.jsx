import React, { useEffect, useRef, useState } from 'react';
import HomePage from './HomePage';

const WebView = ({ url, onNavigate, onUrlChange, onLoadingChange, onCanGoBackChange, onCanGoForwardChange }) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHomePage, setIsHomePage] = useState(!url || url === 'about:blank' || url === 'about:home');
  
  // Process URL to ensure it has proper protocol
  const processUrl = (inputUrl) => {
    if (!inputUrl) return '';
    
    // If it's a search query (no dots or slashes)
    if (!inputUrl.includes('.') && !inputUrl.includes('/')) {
      return `https://duckduckgo.com/?q=${encodeURIComponent(inputUrl)}`;
    }
    
    // Add https if no protocol specified
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    
    return inputUrl;
  };
  
  useEffect(() => {
    // Check if we should show the homepage
    if (!url || url === 'about:blank' || url === 'about:home') {
      setIsHomePage(true);
      onUrlChange('about:home');
      onLoadingChange(false);
      onCanGoBackChange(false);
      onCanGoForwardChange(false);
      return;
    }
    
    setIsHomePage(false);
    
    // For external URLs, we'll simulate loading
    // In a real implementation, we'd use Tauri's WebView API
    setIsLoading(true);
    onLoadingChange(true);
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingChange(false);
      
      // Update navigation state
      onCanGoBackChange(true);
      onCanGoForwardChange(false);
      
      // Update URL (in a real app, this would come from the WebView)
      const processedUrl = processUrl(url);
      onUrlChange(processedUrl);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [url]);
  
  if (isHomePage) {
    return <HomePage onNavigate={onNavigate} />;
  }
  
  return (
    <div className="flex-1 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">External Website</h2>
          <p className="mb-4">In a real implementation, this would load:</p>
          <div className="bg-gray-200 p-3 rounded-lg mb-4 break-all">
            <code>{processUrl(url)}</code>
          </div>
          <p className="text-sm text-gray-500">
            Note: For this demo, we're not loading external websites directly.
            In a real browser implementation, this would use Tauri's WebView API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebView; 