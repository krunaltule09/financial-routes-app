import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  AlertTitle
} from '@mui/material';
import { useSSE } from '../../context/SSEContext';
import SSEStatus from '../../components/SSEStatus';

/**
 * Debug page for SSE connection and navigation testing
 */
const SSEDebugPage = () => {
  const { connected, clientId, events, error, reconnect } = useSSE();
  const [testResult, setTestResult] = useState(null);
  
  // Test SSE connection
  const testConnection = async () => {
    try {
      const sseUrl = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
      const response = await fetch(`${sseUrl}/api/sse/health`);
      const data = await response.json();
      
      setTestResult({
        success: true,
        message: 'Connection successful',
        data
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: `Connection failed: ${err.message}`
      });
    }
  };
  
  // Force reconnect
  const handleReconnect = () => {
    reconnect();
    setTestResult({
      success: true,
      message: 'Reconnection initiated'
    });
  };
  
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>SSE Debug Console</Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>SSE Service URL</AlertTitle>
        {process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001'} (from .env file)
      </Alert>
      
      <Grid container spacing={3}>
        {/* Connection Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Connection Status</Typography>
            <SSEStatus showEvents={true} />
            
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={testConnection}
              >
                Test Connection
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleReconnect}
              >
                Force Reconnect
              </Button>
            </Box>
            
            {testResult && (
              <Alert 
                severity={testResult.success ? 'success' : 'error'} 
                sx={{ mt: 2 }}
              >
                <AlertTitle>{testResult.message}</AlertTitle>
                {testResult.data && (
                  <pre style={{ fontSize: '0.8rem', overflow: 'auto' }}>
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                )}
              </Alert>
            )}
          </Paper>
        </Grid>
        
        {/* Recent Events */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Recent Navigation Events</Typography>
            
            {events.length === 0 ? (
              <Alert severity="info">No navigation events received yet</Alert>
            ) : (
              <List>
                {events.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${event.action} to ${event.route}`}
                        secondary={
                          <>
                            <Typography variant="caption" component="span" display="block">
                              From: {event.data?.sourceAppId || 'unknown'}
                            </Typography>
                            <Typography variant="caption" component="span" display="block">
                              Time: {new Date(event.timestamp).toLocaleString()}
                            </Typography>
                            <Typography variant="caption" component="span" display="block">
                              Data: {JSON.stringify(event.data)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < events.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Connection Details */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Connection Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Connection Status"
                    value={connected ? 'Connected' : 'Disconnected'}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    size="small"
                    color={connected ? 'success' : 'error'}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Client ID"
                    value={clientId || 'Not assigned'}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Event Count"
                    value={events.length}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      <AlertTitle>Connection Error</AlertTitle>
                      {error}
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSEDebugPage;
