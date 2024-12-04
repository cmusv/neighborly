import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
    return (
        <AppBar
            position="static"
            style={{
                backgroundColor: "#F9DB99", // Updated Header Color
                boxShadow: "none",
            }}
        >
            <Toolbar
                style={{
                    display: "flex",
                    justifyContent: "space-between", // Space between for left and center alignment
                    alignItems: "center",
                }}
            >
                {/* Left-aligned logo */}
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="/assets/logo.png"
                        alt="Neighborly Logo"
                        style={{ height: "40px", width: "auto", marginRight: "8px" }}
                    />
                </Box>

                {/* Center-aligned title */}
                <Typography
                    variant="h6"
                    style={{
                        color: "#714D00", // Dark brown text color
                        fontWeight: "bold",
                        position: "absolute", // Absolute positioning for centering
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    Neighborly
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;