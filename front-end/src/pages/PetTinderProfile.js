import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfiles, getPhoto } from "../utils/indexedDB";
import Header from "../components/PetTinder/PetTinderHeader";

const PetTinderProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const placeholderImage = "https://via.placeholder.com/150?text=Profile";
    const [user, setUser] = useState(null);

    const { senderID, currentUser } = location.state || {};

    console.log(currentUser);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const profiles = await getProfiles();
            const userProfile = profiles.find((profile) => profile.userID === senderID);
            if (userProfile) {
                const userPhoto = await getPhoto(userProfile.userID);
                setUser({ ...userProfile, userPhoto: userPhoto || "" });
            } else {
                console.error("User profile not found for senderID:", senderID);
            }
        };
        fetchUserProfile();
    }, [location.state]);
    if (!user) {
        return (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Typography variant="h5">User not found</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{ marginTop: "20px", textTransform: "none" }}
                >
                    Back to Home
                </Button>
            </Box>
        );
    }
    const handleBack = () => navigate("/pet-tinder-chat-selection", { state: { currentUser } });
    return (
        <Box>
            <Header
                title="Pet Tinder Profile"
                onBack={handleBack}
                profilePage={false}
                currentUser={currentUser}
            />
            <Box
                sx={{
                    backgroundColor: "#f7f7f7",
                    minHeight: "100vh",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "500px",
                        width: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        textAlign: "center",
                    }}
                >
                    <Avatar
                        src={user.userPhoto || placeholderImage}
                        alt={`${user.userName}'s photo`}
                        sx={{
                            width: 150,
                            height: 150,
                            margin: "0 auto 20px",
                            border: "3px solid #e0e0e0",
                        }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                        {user.userName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666", marginBottom: "20px" }}>
                        @{user.accountName}
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Typography variant="body2" sx={{ color: "#888", marginBottom: "10px" }}>
                        <strong>Sex:</strong> {user.sex || "Not specified"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", marginBottom: "10px" }}>
                        <strong>Neutered:</strong> {user.neutered ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", marginBottom: "10px" }}>
                        <strong>Apartment Number:</strong> {user.apartmentNumber || "Not specified"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", marginBottom: "10px" }}>
                        <strong>Other Pets:</strong> {user.haveOtherPets ? "Yes" : "No"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PetTinderProfile;