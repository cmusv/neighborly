import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Profile, getProfiles, getPhoto, saveProfile, saveMutualMatch, updateProfileField } from "../utils/indexedDB";
import { Box, Typography, Avatar, Button, Modal, Card } from "@mui/material";
import Header from "../components/PetTinder/PetTinderHeader";
import { ArrowBack, ArrowForward } from "@mui/icons-material"; // Import Material-UI Icons
import { IconButton } from "@mui/material";

const PetTinderMatcher = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
    const [noMoreUsers, setNoMoreUsers] = useState(false);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [matchedUser, setMatchedUser] = useState(null);
    const [noUserIDs, setNoUserIDs] = useState([]); // Track userIDs skipped in current session
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(location.state?.currentUser || {});

    const placeholderImage = "https://via.placeholder.com/100?text=Upload+Photo";

    useEffect(() => {
        const fetchPendingProfiles = async () => {
            if (!currentUser?.pendingList || currentUser.pendingList.length === 0) {
                setProfiles([]);
                setNoMoreUsers(true);
                return;
            }

            // Fetch profiles for all userIDs in the pendingList
            const profilesFromDB = await getProfiles();
            const filteredProfiles = profilesFromDB.filter(
                (profile) =>
                    currentUser.pendingList.includes(profile.userID) && // Only users in pendingList
                    !noUserIDs.includes(profile.userID) // Exclude profiles in noUserIDs for the session
            );

            // combining the photos with the profiles
            const profilesWithPhotos = await Promise.all(
                filteredProfiles.map(async (profile) => {
                    const userPhoto = await getPhoto(profile.userID);
                    return { ...profile, userPhoto: userPhoto || "" };
                })
            );

            setProfiles(profilesWithPhotos);

            const initialIndex = profilesWithPhotos.findIndex(
                (profile) => profile.userID !== currentUser?.userID
            );

            setCurrentMatchIndex(initialIndex >= 0 ? initialIndex : -1);
            setNoMoreUsers(initialIndex === -1);
        };

        fetchPendingProfiles();
    }, [currentUser, noUserIDs]);

    const handleYes = async () => {
        if (currentMatchIndex < 0 || currentMatchIndex >= profiles.length) {
            setNoMoreUsers(true);
            return;
        }

        const matchedUser = profiles[currentMatchIndex]; // this is actually likedUser

        // Update `likedList`
        const updatedLikedList = [...(currentUser?.likedList || []), matchedUser.userID];
        await updateProfileField(currentUser.userID, "likedList", updatedLikedList);

        // Update `pendingList`
        const updatedPendingList = currentUser.pendingList.filter((id) => id !== matchedUser.userID);
        await updateProfileField(currentUser.userID, "pendingList", updatedPendingList);

        // Update the state
        setCurrentUser({
            ...currentUser,
            likedList: updatedLikedList,
            pendingList: updatedPendingList,
        });

        // Check for mutual like
        if (matchedUser.likedList?.includes(currentUser.userID)) {
            const mutualMatch = {
                matchID: `${currentUser.userID}-${matchedUser.userID}`,
                userA: currentUser,
                userB: matchedUser,
            };
            await saveMutualMatch(mutualMatch); // Save the mutual match
            setMatchedUser(matchedUser); // Trigger modal for mutual match
            setShowMatchModal(true); // Show the match modal
        } else {
            // Move to the next profile if no mutual match
            moveToNextProfile(matchedUser.userID);
        }
    };

    const handleNo = (userID) => {
        setNoUserIDs((prev) => [...prev, userID]); // Add userID to session's noUserIDs
        moveToNextProfile(userID); // Move to the next profile
    };

    const moveToNextProfile = (userID) => {
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.userID !== userID));

        let nextIndex = currentMatchIndex + 1;
        while (
            nextIndex < profiles.length &&
            (profiles[nextIndex].userID === currentUser?.userID || noUserIDs.includes(profiles[nextIndex].userID))
            ) {
            nextIndex++;
        }

        if (nextIndex >= profiles.length) {
            setNoMoreUsers(true);
        } else {
            setCurrentMatchIndex(nextIndex);
        }
    };

    const handleReturnToProfile = () => {
        navigate("/pet-tinder");
    };

    const handleBack = () => navigate("/pet-tinder");

    if (noMoreUsers) {
        return (
            <Box>
                <Header
                    title={"Pet Tinder"}
                    onBack={handleBack}
                    profilePage={false}
                    currentUser={currentUser}
                />
                <Box sx={{ textAlign: "center", margin: "20px" }}>
                    <Typography variant="h6">No more users to match with!</Typography>
                    <Button variant="contained" onClick={handleReturnToProfile} sx={{ marginTop: "20px" }}>
                        Return to Your Profile
                    </Button>
                </Box>
            </Box>
        );
    }

    if (currentMatchIndex < 0 || !profiles[currentMatchIndex]) {
        return (
            <Box>
                <Header
                    title={"Pet Tinder"}
                    onBack={handleBack}
                    profilePage={false}
                    currentUser={currentUser}
                />
                <Box sx={{ textAlign: "center", margin: "20px" }}>
                    <Typography variant="h6">No profiles available for matching.</Typography>
                    <Button variant="contained" onClick={handleReturnToProfile} sx={{ marginTop: "20px" }}>
                        Return to Your Profile
                    </Button>
                </Box>
            </Box>
        );
    }

    const currentProfile = profiles[currentMatchIndex];


    const handlePrevious = () => {
        let prevIndex = currentMatchIndex - 1;

        // Skip over excluded profiles
        while (
            prevIndex >= 0 &&
            (profiles[prevIndex].userID === currentUser.userID || noUserIDs.includes(profiles[prevIndex].userID))
            ) {
            prevIndex--;
        }

        if (prevIndex >= 0) {
            setCurrentMatchIndex(prevIndex);
        }
    };

    const handleNext = () => {
        let nextIndex = currentMatchIndex + 1;

        // Skip over excluded profiles
        while (
            nextIndex < profiles.length &&
            (profiles[nextIndex].userID === currentUser.userID || noUserIDs.includes(profiles[nextIndex].userID))
            ) {
            nextIndex++;
        }

        if (nextIndex < profiles.length) {
            setCurrentMatchIndex(nextIndex);
        }
    };


    return (
        <Box>
            <Header
                title={"Pet Tinder"}
                onBack={handleBack}
                profilePage={false}
                currentUser={currentUser}
            />
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                {/* Profile Card */}
                <Card
                    sx={{
                        maxWidth: 400,
                        margin: "0 auto",
                        padding: "20px",
                        borderRadius: "16px",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Left Arrow */}
                        <IconButton
                            onClick={handlePrevious}
                            disabled={currentMatchIndex <= 0}
                            sx={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: "50%",
                                visibility: currentMatchIndex > 0 ? "visible" : "hidden",
                            }}
                        >
                            <ArrowBack />
                        </IconButton>

                        {/* Profile Details */}
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Avatar
                                src={currentProfile.userPhoto || placeholderImage}
                                alt={`${currentProfile.userName}'s profile`}
                                sx={{
                                    width: 250,
                                    height: 250,
                                    margin: "10px auto",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: "bold", margin: "10px 0" }}>
                                {currentProfile.userName}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#555", marginBottom: "10px" }}>
                                Account Name: {currentProfile.accountName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777", marginBottom: "5px" }}>
                                <strong>Sex:</strong> {currentProfile.sex || "Not specified"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777", marginBottom: "5px" }}>
                                <strong>Neutered:</strong> {currentProfile.neutered ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777", marginBottom: "5px" }}>
                                <strong>Apartment Number:</strong> {currentProfile.apartmentNumber || "Not specified"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#777", marginBottom: "5px" }}>
                                <strong>Other Pets:</strong> {currentProfile.haveOtherPets ? "Yes" : "No"}
                            </Typography>
                        </Box>

                        {/* Right Arrow */}
                        <IconButton
                            onClick={handleNext}
                            disabled={currentMatchIndex >= profiles.length - 1}
                            sx={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: "50%",
                                visibility: currentMatchIndex < profiles.length - 1 ? "visible" : "hidden",
                            }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>
                </Card>

                {/* Action Buttons */}
                <Box sx={{ marginTop: "30px" }}>
                    <Card
                        sx={{
                            maxWidth: 400,
                            margin: "0 auto",
                            padding: "20px",
                            borderRadius: "16px",
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                    <Button
                        variant="outlined"
                        onClick={() => handleNo(currentProfile.userID)}
                        sx={{
                            margin: "10px",
                            textTransform: "none",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            fontWeight: "bold",
                            borderColor: "#E58F00",
                            color: "#F2A600",
                            "&:hover": {
                                backgroundColor: "rgba(242, 166, 0, 0.1)",
                                borderColor: "#E58F00",
                            },
                        }}
                    >
                        Next Time
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleYes}
                        sx={{
                            margin: "10px",
                            backgroundColor: "#F2A600",
                            color: "#ffffff",
                            textTransform: "none",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#E58F00" },
                        }}
                    >
                        Let's Play
                    </Button>
                    </Card>
                </Box>

                {/* Match Modal */}
                <Modal open={showMatchModal} onClose={() => setShowMatchModal(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 350,
                            bgcolor: "background.paper",
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                            padding: "20px",
                            textAlign: "center",
                            borderRadius: "16px",
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
                            It's a Match!
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: "20px", color: "#555" }}>
                            You matched with <strong>{matchedUser?.userName}</strong>!
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="outlined"
                                onClick={() => setShowMatchModal(false)}
                                sx={{
                                    textTransform: "none",
                                    color: "#F2A600",
                                    borderColor: "#E58F00",
                                    padding: "8px 16px",
                                    borderRadius: "20px",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor: "rgba(242, 166, 0, 0.1)",
                                        borderColor: "#E58F00",
                                    },
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate("/pet-tinder-chat", { state: { currentUser, matchedUser } })
                                }
                                sx={{
                                    marginRight: "16px", // Increased spacing between buttons
                                    backgroundColor: "#F2A600",
                                    color: "#ffffff",
                                    textTransform: "none",
                                    padding: "8px 16px",
                                    borderRadius: "20px",
                                    fontWeight: "bold",
                                    "&:hover": { backgroundColor: "#E58F00" },
                                }}
                            >
                                Go to Chat
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default PetTinderMatcher;