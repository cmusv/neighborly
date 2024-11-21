import React from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import FeatureGrid from "../components/FeatureGrid/FeatureGrid";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <div className="bg-accent min-h-screen flex flex-col w-full">
            {/* Header */}
            <Header />
            {/* Content Wrapper */}
            <Box
                className="flex flex-col items-center py-8 px-4 w-full"
                style={{
                    maxWidth: "1200px", // Center the content on large screens
                    margin: "0 auto", // Center horizontally
                }}
            >
                {/* Banner and Feature Grid */}
                <Banner />
                <FeatureGrid />
            </Box>
        </div>
    );
};

export default Home;