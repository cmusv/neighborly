import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static" color="primary" className="w-full">
            <Toolbar className="flex justify-between items-center px-4 md:px-8">
                <Box className="flex items-center">
                    <img
                        src="/assets/logo.png"
                        alt="Neighborly Logo"
                        style={{ height: "40px", width: "auto" }}
                    />
                    <Typography
                        variant="h6"
                        className="text-white font-bold ml-2 text-base md:text-lg lg:text-xl"
                    >
                        Neighborly
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;