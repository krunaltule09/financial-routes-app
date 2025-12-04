import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Component that listens for SSE navigation events and displays notifications
 */
const SSENavigationListener = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    source: '',
    timestamp: null
  });

  useEffect(() => {
    // Event listener for SSE navigation events
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp } = event.detail;
      
      // Format the timestamp
      const time = new Date(timestamp).toLocaleTimeString();
      
      // Show notification
      setNotification({
        open: true,
        message: `Navigated to ${route}`,
        source: sourceAppId || 'unknown',
        timestamp: time
      });
    };
    
    // Add event listener
    window.addEventListener('sse-navigation', handleSSENavigation);
    
    // Cleanup
    return () => {
      window.removeEventListener('sse-navigation', handleSSENavigation);
    };
  }, []);
  
  // Handle closing the notification
  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };
  
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity="info" 
        sx={{ width: '100%' }}
      >
        {notification.message} from {notification.source} at {notification.timestamp}
      </Alert>
    </Snackbar>
  );
};

export default SSENavigationListener;
