# Navigation Synchronization Fix

## Issue Summary

After removing the alert notifications from the `operate-experience` application, navigation synchronization with the `connected-commerce` application stopped working. This prevented the two applications from staying in sync when navigating between screens.

## Root Cause Analysis

1. **Missing Navigation Handler**:
   - The `SSENavigationListener.js` component was modified to remove alert notifications
   - When this was done, the actual navigation functionality was also removed
   - The component was changed to only log events to the console, but not act on them

2. **Communication Flow**:
   ```
   connected-commerce                      operate-experience
   ┌─────────────────┐                    ┌─────────────────┐
   │ Route Change    │                    │                 │
   │ ┌────────────┐  │                    │                 │
   │ │useSyncRoute│──┼────API Call────────┼─▶ SSEContext    │
   │ └────────────┘  │                    │      │          │
   │                 │                    │      ▼          │
   │                 │                    │ SSENavigationListener
   │                 │                    │      │          │
   │                 │                    │      ✕ (broken) │
   │                 │                    │                 │
   └─────────────────┘                    └─────────────────┘
   ```

3. **Event Flow**:
   - `connected-commerce` sends navigation events through `NavigationService.js`
   - These events are received by `operate-experience`'s `SSEContext.js`
   - `SSEContext.js` dispatches a custom event `sse-navigation`
   - `SSENavigationListener.js` was supposed to handle these events and navigate

## Solution

The fix restores the navigation functionality while keeping the alerts removed:

1. **Added Navigation Logic**:
   - Imported `useNavigate` from `react-router-dom`
   - Added navigation handling in the event listener
   - Implemented duplicate navigation prevention

2. **Added Debouncing**:
   - Added a reference to track the last navigation
   - Prevents multiple navigations to the same route within 1 second

3. **Preserved Route Replacement**:
   - Maintained the `isAutoSync` flag handling
   - Uses `navigate(route, { replace: true })` for automatic syncs

## Code Changes

```javascript
// Before
const handleSSENavigation = (event) => {
  const { sourceAppId, route, timestamp } = event.detail;
  
  // Log navigation event for debugging
  console.log('SSE Navigation:', { sourceAppId, route, timestamp });
};

// After
const handleSSENavigation = (event) => {
  const { sourceAppId, route, timestamp, isAutoSync } = event.detail;
  
  // Log navigation event for debugging
  console.log('SSE Navigation:', { sourceAppId, route, timestamp, isAutoSync });
  
  // Prevent duplicate navigations within a short time period
  const now = Date.now();
  const lastNav = lastNavigationRef.current;
  
  // Only navigate if it's a different route or more than 1 second has passed
  if (route && (route !== lastNav.route || now - lastNav.timestamp > 1000)) {
    console.log(`Navigating to: ${route}`);
    
    // Update last navigation reference
    lastNavigationRef.current = {
      route,
      timestamp: now
    };
    
    // Navigate to the specified route
    // For automatic syncs, use replace to avoid cluttering history
    if (isAutoSync) {
      navigate(route, { replace: true });
    } else {
      navigate(route);
    }
  }
};
```

## Testing

To verify the fix:
1. Start both applications
2. Navigate to different screens in `connected-commerce`
3. Confirm that `operate-experience` automatically navigates to the corresponding screens
4. Check the browser console for navigation events

## Route Mapping

For reference, here's the route mapping between the two applications:

| connected-commerce      | operate-experience       |
|------------------------|--------------------------|
| /                      | /welcome                 |
| /explore               | /personal-welcome        |
| /document-centre       | /loan-service            |
| /financial-dashboard   | /financial-statement     |
| /anomaly-detection     | /dscr-trend              |
| /y14-report            | /y14-report/large        |
| /operational-doc-scan  | /covenant-monitoring     |
| /data-simulator        | /benefits-summary        |
