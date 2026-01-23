# SSE Alerts and Monitoring System

## Overview

This update adds comprehensive alerts and monitoring for the Server-Sent Events (SSE) system that handles navigation synchronization between the connected-commerce and operate-experience applications.

## Features Added

### 1. Enhanced Navigation Listener with Alerts

The `SSENavigationListener.js` component has been completely revamped to:

- Display visual alerts for every navigation event
- Show connection status alerts
- Provide detailed information about navigation events
- Handle and display errors that occur during navigation
- Prevent duplicate navigation with clear feedback

### 2. Persistent Status Indicator

Added a new `SSEStatusIndicator.js` component that:

- Displays as a floating button in the bottom-right corner
- Shows connection status with color coding (blue = connected, red = disconnected)
- Pulses when there are connection errors
- Shows a badge with the count of new navigation events
- Opens a detailed status dialog when clicked

### 3. SSE Debug Console

Added a new debug page at `/sse-debug` that provides:

- Comprehensive connection information
- Tools to test the SSE connection
- Ability to force reconnection
- Detailed view of all received navigation events
- Connection error details

## How to Use

### Monitoring Navigation Events

1. **Visual Alerts**: Every navigation event will now show an alert at the top of the screen with:
   - Source application
   - Target route
   - Timestamp
   - Success/failure status

2. **Status Indicator**: The floating button in the bottom-right shows:
   - Blue: Connected to SSE service
   - Red: Disconnected or error
   - Badge: Number of new navigation events
   - Click to see detailed status

### Debugging Connection Issues

1. **Navigate to Debug Console**: Go to `/sse-debug` in the operate-experience app
2. **Test Connection**: Use the "Test Connection" button to verify the SSE service is reachable
3. **Force Reconnect**: Use the "Force Reconnect" button to attempt a new connection
4. **View Events**: See a detailed list of all navigation events received

## Configuration

The SSE service URL is configured in the `.env` file:

```
REACT_APP_SSE_SERVICE_URL=https://sse-service-lnsk.onrender.com
```

Both applications must use the same SSE service URL to communicate properly.

## Troubleshooting

### If Navigation Sync Isn't Working:

1. **Check Status Indicator**: If it's red, there's a connection issue
2. **Open Debug Console**: Go to `/sse-debug` to see detailed status
3. **Verify SSE Service**: Make sure the SSE service is running and accessible
4. **Check URLs**: Ensure both apps are using the same SSE service URL
5. **Check Browser Console**: Look for any JavaScript errors

### Common Issues:

1. **Different SSE URLs**: The apps must use the same SSE service URL
2. **SSE Service Not Running**: The service must be running and accessible
3. **CORS Issues**: The SSE service must allow cross-origin requests
4. **Network Connectivity**: Check network connectivity to the SSE service

## Files Modified

1. `src/components/SSENavigationListener.js` - Added comprehensive alerts
2. `src/App.js` - Added SSEStatusIndicator
3. `src/routes/index.js` - Added SSE debug page route

## Files Added

1. `src/components/SSEStatusIndicator.js` - Floating status indicator
2. `src/pages/SSEDebugPage/SSEDebugPage.jsx` - Debug console
3. `SSE_ALERTS_ADDED.md` - This documentation
