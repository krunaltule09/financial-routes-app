import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

/**
 * DSCRTrendSummary component for displaying current DSCR trend information
 */
const DSCRTrendSummary = ({ 
  recentTrend = "75%", 
  currentChange = "+5%", 
  changeType = "month-over-month",
  interpretation = "A modest improvement in DSCR this period, though performance has fluctuated over the year."
}) => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        padding: '24px',
        color: 'white',
        maxWidth: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          marginBottom: '24px', 
          fontWeight: 400, 
          fontSize: '15px',
          lineHeight: 1.5,
          color: '#E5E5E5',
          letterSpacing: '-0.01em'
        }}
      >
        Borrower's DSCR trend for the current financial year.
      </Typography>

      <Box sx={{ display: 'flex', gap: '48px'}}>
        {/* Recent Trend Box */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography 
            variant="h4" 
            sx={{  
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1.5
            }}
          >
            Recent trend
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 400, 
              fontSize: '1rem',
              color: '#9CB3BA',
              lineHeight: 1.5,
              letterSpacing: '-0.02em'
            }}
          >
            {recentTrend}
          </Typography>
        </Box>

        {/* Current Change Box */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1.5
            }}
          >
            Current change
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 400, 
              fontSize: '1rem',
              color: '#9CB3BA',
              lineHeight: 1.5,
              letterSpacing: '-0.02em'
            }}
          >
            {currentChange} 
            <Typography 
              component="span" 
              variant="body2" 
              sx={{ 
                color: '#9CB3BA', 
                fontWeight: 400,
                fontSize: '1rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.5
              }}
            >
              ({changeType})
            </Typography>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', marginBottom: '20px' }} />

      <Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#9CB3BA', 
            marginBottom: '10px',
            fontSize: '13px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Interpretation:
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#E5E5E5',
            fontWeight: 400,
            letterSpacing: '-0.005em'
          }}
        >
          {interpretation}
        </Typography>
      </Box>
    </Box>
  );
};

export default DSCRTrendSummary;
