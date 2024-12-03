import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#F9DB99',
        width: '100%',
        padding: '16px 0',
        flexShrink: 0,  // Prevents footer from shrinking
        marginTop: 'auto'  // Pushes footer to bottom
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#714D00',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: "'Roboto', sans-serif"
        }}
      >
        © 2024 Neighborly. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;