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
                    justifyContent: "center", // Center align
                    alignItems: "center",
                }}
            >
                <Box className="flex items-center">
                    <img
                        src="/assets/logo.png"
                        alt="Neighborly Logo"
                        style={{ height: "40px", width: "auto", marginRight: "8px" }}
                    />
                    <Typography
                        variant="h6"
                        style={{
                            color: "#714D00", // Dark brown text color
                            fontWeight: "bold",
                        }}
                    >
                        Neighborly
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
