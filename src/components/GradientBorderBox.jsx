import { Box } from '@mui/material';
 
export default function GradientBorderBox({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        // Removed background color
        border: '0.05rem solid',
        borderImage: 'linear-gradient(270deg, #EEF96E 0%, rgba(244, 167, 157, 0) 100%);',
        borderImageSlice: 1,
        padding: 0, // Remove any padding
        '& > *': { // Target direct children
          display: 'block', // Ensure block display
          height: '100%', // Full height
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}