import React from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";
import Footer from "../components/Header/Footer";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#FFF8EC'
      }}
    >
      <Header />
      
      {/* Main content area */}
      <Box 
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px'
        }}
      >
        <Banner />
        <Box sx={{ width: '100%', mt: '2rem' }}>
          <FeatureGrid />
        </Box>
      </Box>

      {/* Footer will always stick to bottom */}
      <Footer />
    </Box>
  );
};

export default Home;