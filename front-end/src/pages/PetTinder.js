import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClearIndexedDBButton from "../components/utils/ClearIndexedDBButton";
import Header from "../components/Header/Header"; // Importing the Header component
import { Profile, saveProfile, getProfiles, savePhoto, getPhoto, createProfile } from "../utils/indexedDB";
import { Button, Box, Typography, Avatar, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
function initializePendingLists(profiles) {
    return profiles.map((profile) => {
        // Create a new Profile instance with updated pendingList
        return new Profile(
            profile.userID,
            profile.accountName,
            profile.userName,
            profile.userPhotoID,
            profile.likedList,
            profiles
                .filter((p) => p.userID !== profile.userID) // Exclude the current user's ID
                .map((p) => p.userID) // Get the IDs of all other users
        );
    });
}

const PetTinder = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [profiles, setProfiles] = useState([]);
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
                // Save hardcoded profiles to IndexedDB
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
                const userPhoto = await getPhoto(profile.userID); // Fetch photo from IndexedDB
                return { ...profile, userPhoto: userPhoto || "" };
            })
        );
        setProfiles(profilesWithPhotos);

        // Retrieve current user from localStorage or set default to the first profile
        const savedUserID = localStorage.getItem("currentUserID");
        const savedUser = profilesWithPhotos.find((profile) => profile.userID === Number(savedUserID));
        setCurrentUser(savedUser || profilesWithPhotos[0]);
    };

    const handleSwitchUser = () => {
        // Filter profiles to include only userID 0 (Bucky) and userID 1 (John)
        const switchableProfiles = profiles.filter(
            (profile) => profile.userID === 0 || profile.userID === 1
        );

        // Find the current index among the switchable profiles
        const currentIndex = switchableProfiles.findIndex(
            (profile) => profile.userID === currentUser.userID
        );

        // Determine the next index, looping between 0 and 1
        const nextIndex = (currentIndex + 1) % switchableProfiles.length;

        // Get the next user
        const nextUser = switchableProfiles[nextIndex];

        setCurrentUser(nextUser);

        // Save the new currentUserID to localStorage
        localStorage.setItem("currentUserID", nextUser.userID);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const photoBase64 = reader.result;
                await savePhoto(currentUser.userID, photoBase64); // Save photo in IndexedDB

                const updatedProfiles = profiles.map((profile) =>
                    profile.userID === currentUser.userID
                        ? { ...profile, userPhotoID: currentUser.userID, userPhoto: photoBase64 }
                        : profile
                );
                setProfiles(updatedProfiles);
                setCurrentUser({
                    ...currentUser,
                    userPhotoID: currentUser.userID,
                    userPhoto: photoBase64,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const navigateToMatching = () => {
        console.log("navigateToMatching", currentUser);
        navigate("/pet-tinder-matcher", { state: { currentUser } }); // Pass currentUser via state
    };

    return (
        <Box>
            <Header />
            <Box sx={{ textAlign: "center", margin: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Pet Tinder Profiles
                </Typography>
                <Box sx={{ margin: "20px auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h5">Your Profile</Typography>
                    <Avatar
                        src={currentUser.userPhoto || placeholderImage}
                        alt={`${currentUser.userName}'s profile`}
                        sx={{ width: 100, height: 100, margin: "10px" }}
                    />
                    <Typography variant="h6">{currentUser.userName}</Typography>
                    <Typography variant="body1">Account Name: {currentUser.accountName}</Typography>
                    <Typography variant="body2">
                        Liked Users: {currentUser.likedList?.join(", ") || "No likes yet."}
                    </Typography>
                    <Typography variant="body2">
                        Pending Matches: {currentUser.pendingList?.join(", ") || "No pending users."}
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ margin: "10px", backgroundColor: "#3f51b5" }}
                    >
                        Upload Photo
                        <input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSwitchUser}
                        sx={{ margin: "10px", backgroundColor: "#4caf50" }}
                    >
                        Switch User
                    </Button>
                    <Button
                        variant="contained"
                        onClick={navigateToMatching}
                        sx={{ margin: "10px", backgroundColor: "#f44336" }}
                    >
                        Enter Matching Mode
                    </Button>
                </Box>
            </Box>
            <ClearIndexedDBButton />
            <Fab
                color="primary"
                aria-label="chat"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#3f51b5",
                    color: "white",
                    "&:hover": { backgroundColor: "#303f9f" },
                }}
                onClick={() => navigate("/pet-tinder-chat-selection", { state: { currentUser } })}
            >
                <ChatIcon />
            </Fab>
        </Box>
    );
};

export default PetTinder;