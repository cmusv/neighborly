import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClearIndexedDBButton from "../components/utils/ClearIndexedDBButton";
import Header from "../components/PetTinder/PetTinderHeader";
import EditProfileModal from "../components/PetTinder/PetTinderEditProfileModal";
import { getProfiles, saveProfile, getPhoto, createProfile } from "../utils/indexedDB";
import { Box, Typography, Avatar, Fab, Button, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

function initializePendingLists(profiles) {
    return profiles.map((profile) =>
        createProfile(
            profile.userID,
            profile.accountName,
            profile.userName,
            profile.userPhotoID,
            profile.likedList,
            profiles
                .filter((p) => p.userID !== profile.userID)
                .map((p) => p.userID)
        )
    );
}

const PetTinder = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [profiles, setProfiles] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const placeholderImage = "https://via.placeholder.com/100?text=Upload+Photo";

    const rawProfiles = [
        createProfile(0, "bucky123", "Bucky", "", [], []),
        createProfile(1, "john456", "John", "", [], []),
        createProfile(2, "test1", "Test", "", [], []),
        createProfile(3, "test2", "Test2", "", [], []),
    ];

    const hardcodedProfiles = initializePendingLists(rawProfiles);

    useEffect(() => {
        const initializeDB = async () => {
            const existingProfiles = await getProfiles();
            if (existingProfiles.length === 0) {
                for (const profile of hardcodedProfiles) {
                    await saveProfile(profile);
                }
            }
            fetchProfiles();
        };
        initializeDB();
    }, []);

    const fetchProfiles = async () => {
        const profilesFromDB = await getProfiles();
        const profilesWithPhotos = await Promise.all(
            profilesFromDB.map(async (profile) => {
                const userPhoto = await getPhoto(profile.userID);
                return { ...profile, userPhoto: userPhoto || "" };
            })
        );
        setProfiles(profilesWithPhotos);
        const savedUserID = localStorage.getItem("currentUserID");
        const savedUser = profilesWithPhotos.find((profile) => profile.userID === Number(savedUserID));
        setCurrentUser(savedUser || profilesWithPhotos[0]);
    };

    const handleSwitchUser = () => {
        const switchableProfiles = profiles.filter((profile) => profile.userID === 0 || profile.userID === 1);
        const currentIndex = switchableProfiles.findIndex((profile) => profile.userID === currentUser.userID);
        const nextIndex = (currentIndex + 1) % switchableProfiles.length;
        const nextUser = switchableProfiles[nextIndex];
        setCurrentUser(nextUser);
        localStorage.setItem("currentUserID", nextUser.userID);
    };

    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);

    const updateCurrentUser = (updatedUser) => {
        setCurrentUser(updatedUser);
        const updatedProfiles = profiles.map((profile) =>
            profile.userID === updatedUser.userID ? updatedUser : profile
        );
        setProfiles(updatedProfiles);
    };

    const navigateToMatching = () => navigate("/pet-tinder-matcher", { state: { currentUser } });

    const handleBack = () => navigate("/");

    return (
        <Box>
            <Header
                title="Profile"
                onBack={handleBack}
                profilePage={true}
                currentUser={currentUser}
            />
            <Box sx={{ backgroundColor: "#f5f5f7", minHeight: "100vh", padding: "16px" }}>
                <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                            padding: "24px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Avatar
                            src={currentUser.userPhoto || placeholderImage}
                            alt={`${currentUser.userName}'s profile`}
                            sx={{
                                width: 120,
                                height: 120,
                                margin: "16px auto",
                                border: "2px solid #e0e0e0",
                            }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                            {currentUser.userName}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#888", marginBottom: "16px" }}>
                            @{currentUser.accountName}
                        </Typography>
                        <Divider sx={{ margin: "16px 0" }} />
                        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                            <strong>Liked Users:</strong> {currentUser.likedList?.join(", ") || "No likes yet."}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                            <strong>Pending Matches:</strong> {currentUser.pendingList?.join(", ") || "No pending users."}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ margin: "8px", borderRadius: "20px", padding: "8px 24px" }}
                            onClick={openEditModal}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                margin: "8px",
                                backgroundColor: "#007aff",
                                color: "white",
                                borderRadius: "20px",
                                padding: "8px 24px",
                            }}
                            onClick={handleSwitchUser}
                        >
                            Switch User
                        </Button>
                    </Box>
                </Box>
                <Fab
                    color="primary"
                    aria-label="chat"
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#007aff",
                        color: "white",
                        "&:hover": { backgroundColor: "#005bb5" },
                    }}
                    onClick={() => navigate("/pet-tinder-chat-selection", { state: { currentUser } })}
                >
                    <ChatIcon />
                </Fab>
                <EditProfileModal
                    open={isEditModalOpen}
                    onClose={closeEditModal}
                    currentUser={currentUser}
                    onUpdate={updateCurrentUser}
                />
                <ClearIndexedDBButton />
            </Box>
        </Box>
    );
};

export default PetTinder;