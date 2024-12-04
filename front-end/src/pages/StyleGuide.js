import React, { useState } from "react";
import { Box, Typography, Button, Avatar, Paper } from "@mui/material";
import { Modal } from "antd";
import Header from "../components/PetTinder/PetTinderHeader";
import EditProfileModal from "../components/PetTinder/PetTinderEditProfileModal";

const successModalConfig = {
    centered: true,
    width: '75vw',
    maskStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)'
    },
    wrapClassName: 'wide-centered-modal',
    bodyStyle: {
        padding: '20px',
    },
    style: {
        maxWidth: '1200px'
    }
};

const StyleGuidePage = () => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const openConfirmationModal = () => {
        const account = { name: "Savings Account" }; // Example account
        const amount = 500; // Example amount
        const current_balance = 1500; // Example current balance

        Modal.confirm({
            ...successModalConfig,
            title: "Do you want to pay with this account?",
            content: `You have selected ${account.name} to pay $${amount} for your rent.`,
            onOk: () => {
                console.log("Navigating to payment confirmation");
                // Example navigation
            },
        });
    };

    const handleBack = () => {
        console.log("Back button clicked!");
    };

    const currentUser = {
        userName: "Charlie",
        accountName: "charlie123",
        userPhoto: "https://via.placeholder.com/100",
    };

    const handleSwitchUser = () => {
        console.log("Switch user button clicked!");
    };

    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);

    const updateCurrentUser = (updatedUser) => {
        console.log("Updated user:", updatedUser);
    };

    return (
        <Box sx={{ backgroundColor: "#FFF8EC", minHeight: "100vh" }}>
            <Box
                sx={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", color: "#F2A600", marginBottom: "20px" }}
                >
                    Neighborly Style Guide
                </Typography>

                {/* Header Section */}
                <Section title="Header">
                    <Typography>
                        Every page in the application should include a consistent header at the top. This header contains
                        the page title, a back button, and optional user actions like switching profiles.
                    </Typography>
                    <Typography sx={{ marginTop: "10px" }}>
                        <strong>Example:</strong>
                    </Typography>
                    <Paper
                        elevation={2}
                        sx={{
                            padding: "10px",
                            backgroundColor: "#FFF8EC",
                            color: "#fff",
                            borderRadius: "8px",
                            marginTop: "10px",
                            pointerEvents: "none",
                        }}
                    >
                        <Header
                            title="Pet Tinder Profile"
                            onBack={handleBack}
                            profilePage={false}
                            currentUser={currentUser}
                            onSwitchUser={handleSwitchUser}
                        />
                    </Paper>
                </Section>

                {/* Cards Section */}
                <Section title="Cards">
                    <Typography>
                        Cards are used to group related content with a clean, modern design. They feature rounded corners
                        and a subtle shadow to maintain a polished look.
                    </Typography>
                    <Paper
                        elevation={3}
                        sx={{
                            textAlign: "center",
                            padding: "20px",
                            borderRadius: "16px",
                            marginTop: "20px",
                            maxWidth: "300px",
                            margin: "20px auto",
                        }}
                    >
                        <Avatar
                            src="https://via.placeholder.com/100"
                            alt="Pet Profile"
                            sx={{
                                width: 80,
                                height: 80,
                                marginBottom: "10px",
                                border: "3px solid #F2A600",
                            }}
                        />
                        <Typography variant="h5" sx={{ color: "#F2A600", fontWeight: "bold" }}>
                            Pet Name
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                            Playful and energetic!
                        </Typography>
                    </Paper>
                </Section>

                {/* Color Palette Section */}
                <Section title="Color Palette">
                    <Typography>
                        Our main color theme revolves around vibrant orange (#F2A600) complemented by soft grays for
                        backgrounds and neutral tones for text.
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <ColorSwatch color="#F2A600" label="Primary Color" />
                        <ColorSwatch color="#E58F00" label="Hover Orange" />
                        <ColorSwatch color="#FFF8EC" label="Background" labelColor="#000" />
                        <ColorSwatch color="#555555" label="Text" />
                    </Box>
                </Section>

                {/* Typography Section */}
                <Section title="Typography">
                    <Typography>
                        We use a consistent hierarchy for headings and text to maintain clarity:
                    </Typography>
                    <Typography variant="h3" sx={{ marginTop: "16px" }}>
                        Page Title (h3)
                    </Typography>
                    <Typography variant="h4">Section Title (h4)</Typography>
                    <Typography variant="body1">This is an example of body text (p).</Typography>
                </Section>

                {/* Buttons Section */}
                <Section title="Buttons">
                    <Typography>
                        Our primary action buttons use the vibrant orange color, with rounded edges and hover states.
                        Primary Button should always be on the right to meet human intuition.
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px" // Adjusted for a rounder appearance
                            }}
                        >
                            Secondary Button
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#F2A600",
                                color: "#ffffff",
                                textTransform: "none",
                                borderRadius: "12px", // Adjusted for a rounder appearance
                                "&:hover": { backgroundColor: "#E58F00" },
                            }}
                        >
                            Primary Button
                        </Button>
                    </Box>
                </Section>
                {/* Modal Section */}
                <Section title="Modals">
                    <Typography>
                        Our application uses modals for tasks like editing profiles or confirming actions. Below is an
                        example of an editable profile modal:
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#F2A600",
                            color: "#ffffff",
                            textTransform: "none",
                            borderRadius: "12px",
                            "&:hover": { backgroundColor: "#E58F00" },
                            marginTop: "16px",
                        }}
                        onClick={openEditModal}
                    >
                        Open Edit Profile Modal
                    </Button>
                    <Typography sx={{ marginTop: "24px" }}>
                        Confirmation modals are used for critical user actions, such as confirming a payment.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#F2A600",
                            color: "#ffffff",
                            textTransform: "none",
                            borderRadius: "12px",
                            "&:hover": { backgroundColor: "#E58F00" },
                            marginTop: "16px",
                        }}
                        onClick={openConfirmationModal}
                    >
                        Open Confirmation Modal
                    </Button>
                </Section>
                {/* Confirmation Modal Section */}
                {/* Edit Profile Modal */}
                <EditProfileModal
                    open={isEditModalOpen}
                    onClose={closeEditModal}
                    currentUser={currentUser}
                    onUpdate={updateCurrentUser}
                />
            </Box>
        </Box>
    );
};

const Section = ({ title, children }) => (
    <Box sx={{ marginBottom: "40px" }}>
        <Typography variant="h4" sx={{ color: "#F2A600", fontWeight: "bold", marginBottom: "16px" }}>
            {title}
        </Typography>
        {children}
    </Box>
);

const ColorSwatch = ({ color, label, labelColor = "#fff" }) => (
    <Box
        sx={{
            width: 60,
            height: 60,
            backgroundColor: color,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "12px",
            color: labelColor,
        }}
    >
        {label}
    </Box>
);

export default StyleGuidePage;