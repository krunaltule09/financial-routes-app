import { useEffect } from 'react';

/**
 * Component that listens for SSE navigation events (notifications removed)
 */
const SSENavigationListener = () => {
  useEffect(() => {
    // Event listener for SSE navigation events
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp } = event.detail;
      
      // Log navigation event for debugging
      console.log('SSE Navigation:', { sourceAppId, route, timestamp });
    };
    
    // Add event listener
    window.addEventListener('sse-navigation', handleSSENavigation);
    
    // Cleanup
    return () => {
      window.removeEventListener('sse-navigation', handleSSENavigation);
    };
  }, []);
  
  return null;
};

export default SSENavigationListener;
