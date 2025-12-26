import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Q3Highlight component for displaying DSCR Q3 highlights
 */
const Q3Highlight = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1a1a2e',
        borderRadius: '8px',
        padding: '24px',
        color: 'white',
        maxWidth: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Box
          sx={{
            marginRight: '14px',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="52" height="52" rx="12" fill="#FFE600"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M38.5 12.25H13.5C12.1193 12.25 11 13.3693 11 14.75V23.9344C11 37.9359 22.8469 42.5812 25.2188 43.3703C25.7253 43.5426 26.2747 43.5426 26.7812 43.3703C29.1562 42.5812 41 37.9359 41 23.9344V14.75C41 13.3693 39.8807 12.25 38.5 12.25ZM38.5 23.9359C38.5 36.1891 28.1328 40.2828 26 40.9953C23.8859 40.2906 13.5 36.2 13.5 23.9359V14.75H38.5V23.9359ZM18.8656 28.1344C18.3772 27.6459 18.3772 26.8541 18.8656 26.3656C19.3541 25.8772 20.1459 25.8772 20.6344 26.3656L23.5 29.2313L31.3656 21.3656C31.8541 20.8772 32.6459 20.8772 33.1344 21.3656C33.6228 21.8541 33.6228 22.6459 33.1344 23.1344L24.3844 31.8844C24.1499 32.1191 23.8318 32.251 23.5 32.251C23.1682 32.251 22.8501 32.1191 22.6156 31.8844L18.8656 28.1344Z" fill="#121417"/>
          </svg>
        </Box>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600,
            fontSize: '20px',
            letterSpacing: '-0.02em',
            lineHeight: 1.3
          }}
        >
          Q3 Highlight
        </Typography>
      </Box>

      <Typography 
        variant="body1" 
        sx={{ 
          marginBottom: '14px', 
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#E5E5E5',
          fontWeight: 400,
          letterSpacing: '-0.005em'
        }}
      >
        DSCR improved due to stronger cash collections and reduced shipment delays.
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          marginBottom: '14px', 
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#E5E5E5',
          fontWeight: 400,
          letterSpacing: '-0.005em'
        }}
      >
        Operational efficiencies in Q3 contributed to better repayment capacity.
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
        Risk position stabilizing after earlier volatility.
      </Typography>
    </Box>
  );
};

export default Q3Highlight;
