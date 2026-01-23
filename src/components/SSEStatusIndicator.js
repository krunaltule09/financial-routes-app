import React, { useState, useEffect } from 'react';
import { Box, Fab, Badge, Tooltip, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import { useSSE } from '../context/SSEContext';
import SSEStatus from './SSEStatus';

/**
 * Floating indicator showing SSE connection status with detailed dialog
 */
const SSEStatusIndicator = () => {
  const { connected, events, error } = useSSE();
  const [open, setOpen] = useState(false);
  const [newEvents, setNewEvents] = useState(0);
  
  // Track new events
  useEffect(() => {
    if (events.length > 0 && !open) {
      setNewEvents(prev => prev + 1);
    }
  }, [events, open]);
  
  // Reset new events counter when dialog is opened
  const handleOpen = () => {
    setOpen(true);
    setNewEvents(0);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      {/* Floating indicator */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <Tooltip title={connected ? 'SSE Connected - Click for details' : 'SSE Disconnected - Click for details'}>
          <Badge badgeContent={newEvents} color="error" max={99}>
            <Fab 
              size="medium" 
              color={connected ? 'primary' : 'error'}
              onClick={handleOpen}
              sx={{ 
                boxShadow: 3,
                animation: error ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.7)' },
                  '70%': { boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)' }
                }
              }}
            >
              {connected ? <SyncIcon /> : <SyncProblemIcon />}
            </Fab>
          </Badge>
        </Tooltip>
      </Box>
      
      {/* Detailed status dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          SSE Connection Status
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Connection to: {process.env.REACT_APP_SSE_SERVICE_URL || 'Default URL (http://localhost:3001)'}
          </Typography>
          
          <SSEStatus showEvents={true} />
          
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
            Last updated: {new Date().toLocaleTimeString()}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SSEStatusIndicator;
