import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar, Stack } from '@mui/material';
import { useSSE } from '../context/SSEContext';

/**
 * Component that listens for SSE navigation events with comprehensive alerts
 */
const SSENavigationListener = () => {
  const navigate = useNavigate();
  const { connected, clientId } = useSSE();
  const lastNavigationRef = useRef({ route: null, timestamp: 0 });
  
  // Alert states
  const [alerts, setAlerts] = useState([]);
  
  // Add a new alert
  const addAlert = (message, severity = 'info', autoHideDuration = 6000) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, severity, autoHideDuration }]);
    return id;
  };
  
  // Remove an alert
  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  // Show connection status alerts
  useEffect(() => {
    if (connected) {
      addAlert(`SSE Connected! Client ID: ${clientId}`, 'success');
    } else {
      addAlert('SSE Disconnected. Waiting for connection...', 'warning', 10000);
    }
  }, [connected, clientId]);
  
  useEffect(() => {
    // Event listener for SSE navigation events
    const handleSSENavigation = (event) => {
      const { sourceAppId, route, timestamp, isAutoSync, data } = event.detail;
      const time = new Date(timestamp).toLocaleTimeString();
      
      // Log navigation event for debugging
      console.log('SSE Navigation:', { sourceAppId, route, timestamp, isAutoSync, data });
      
      // Alert for received event
      addAlert(`Received navigation event: ${route} from ${sourceAppId || 'unknown'} at ${time}`, 'info');
      
      // Prevent duplicate navigations within a short time period
      const now = Date.now();
      const lastNav = lastNavigationRef.current;
      
      // Only navigate if it's a different route or more than 1 second has passed
      if (route && (route !== lastNav.route || now - lastNav.timestamp > 1000)) {
        const navigationAlertId = addAlert(`Navigating to: ${route}`, 'success');
        
        // Update last navigation reference
        lastNavigationRef.current = {
          route,
          timestamp: now
        };
        
        // Navigate to the specified route
        // For automatic syncs, use replace to avoid cluttering history
        try {
          if (isAutoSync) {
            navigate(route, { replace: true });
          } else {
            navigate(route);
          }
          // Alert for successful navigation after a short delay
          setTimeout(() => {
            addAlert(`Successfully navigated to ${route}`, 'success');
          }, 1000);
        } catch (error) {
          console.error('Navigation failed:', error);
          addAlert(`Navigation failed: ${error.message}`, 'error', 10000);
          // Remove the "navigating to" alert
          removeAlert(navigationAlertId);
        }
      } else {
        // Alert for skipped navigation
        addAlert(`Skipped duplicate navigation to ${route}`, 'info');
      }
    };
    
    // Add event listener
    window.addEventListener('sse-navigation', handleSSENavigation);
    addAlert('Navigation listener initialized', 'info');
    
    // Cleanup
    return () => {
      window.removeEventListener('sse-navigation', handleSSENavigation);
      addAlert('Navigation listener removed', 'info');
    };
  }, [navigate]);
  
  return (
    <Stack spacing={1} sx={{ width: '100%', position: 'fixed', top: 20, zIndex: 9999 }}>
      {alerts.map((alert) => (
        <Snackbar 
          key={alert.id}
          open={true}
          autoHideDuration={alert.autoHideDuration}
          onClose={() => removeAlert(alert.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => removeAlert(alert.id)} 
            severity={alert.severity} 
            sx={{ width: '100%', boxShadow: 3 }}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default SSENavigationListener;
