import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
    return (
        <Box
            className="text-center py-8 px-4 bg-white flex flex-col items-center"
            style={{ height: "calc(40vh)" }}
        >
            <Typography
                variant="h5"
                className="text-secondary font-bold text-lg md:text-2xl lg:text-3xl"
            >
                Be More Connected at
            </Typography>
            <Typography
                variant="h3"
                className="text-secondary font-extrabold text-2xl md:text-4xl lg:text-5xl mt-2"
            >
                NEIGHBORLY
            </Typography>
            <img
                src="/assets/banner-image.png"
                alt="Community Illustration"
                style={{
                    height: "20vh", // Height is 10% of the viewport height
                    maxHeight: "200px", // Maximum height constraint
                    width: "auto",
                }}
            />
        </Box>
    );
};

export default Banner;