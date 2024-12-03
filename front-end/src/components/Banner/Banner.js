import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
    return (
        <Box
            className="text-center py-8 px-4 bg-primary flex flex-col items-center"
            style={{
                backgroundColor: "#fff8e1",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                gap: "16px",
                padding: "16px",
                marginBottom: "16px",
            }}
        >
            <Typography
                variant="h5"
                className="text-secondary font-bold text-lg md:text-2xl lg:text-3xl"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "600",
                    color: "#714D00",
                }}
            >
                Be More Connected at
            </Typography>
            <Typography
                variant="h3"
                className="text-primary font-extrabold text-2xl md:text-4xl lg:text-5xl mt-2"
                style={{
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: "700", 
                    color: "#F1A44D", 
                    textTransform: "uppercase",
                }}
            >
                Neighborly
            </Typography>
            <img
                src="/assets/banner-image.png"
                alt="Community Illustration"
                style={{
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "300px", 
                    marginTop: "16px",
                    borderRadius: "8px",
                }}
            />
        </Box>
    );
};

export default Banner;
