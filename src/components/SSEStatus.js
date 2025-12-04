import React from 'react';
import { Box, Typography, Chip, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useSSE } from '../context/SSEContext';

/**
 * Component to display SSE connection status and recent events
 */
const SSEStatus = ({ showEvents = false }) => {
  const { connected, clientId, events, error } = useSSE();

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Typography variant="body2">SSE Status:</Typography>
        {connected ? (
          <Chip 
            label="Connected" 
            color="success" 
            size="small" 
            sx={{ height: 24 }} 
          />
        ) : (
          <Chip 
            label={error ? 'Error' : 'Disconnected'} 
            color="error" 
            size="small" 
            sx={{ height: 24 }} 
          />
        )}
        {clientId && (
          <Typography variant="caption" color="text.secondary">
            Client ID: {clientId.substring(0, 8)}...
          </Typography>
        )}
      </Box>
      
      {error && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
          {error}
        </Typography>
      )}
      
      {showEvents && events.length > 0 && (
        <Paper variant="outlined" sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
          <List dense>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="subtitle2">Recent Navigation Events</Typography>} 
              />
            </ListItem>
            {events.map((event, index) => (
              <ListItem key={index} divider={index < events.length - 1}>
                <ListItemText
                  primary={`${event.action} to ${event.route}`}
                  secondary={`From: ${event.data?.sourceAppId || 'unknown'} at ${new Date(event.timestamp).toLocaleTimeString()}`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SSEStatus;
