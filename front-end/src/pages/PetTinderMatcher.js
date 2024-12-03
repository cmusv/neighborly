import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Profile, getProfiles, getPhoto, saveProfile, saveMutualMatch, updateProfileField } from "../utils/indexedDB";
import { Box, Typography, Avatar, Button, Modal } from "@mui/material";
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
            <Box sx={{ textAlign: "center", margin: "20px" }}>
                <Typography variant="h4">Matching Mode</Typography>
                <Box
                    sx={{
                        margin: "20px auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "300px", // Adjust as needed for layout
                    }}
                >
                    {/* Left Arrow */}
                    <IconButton
                        onClick={handlePrevious}
                        disabled={currentMatchIndex <= 0} // Disable if at the first profile
                        sx={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "50%",
                            margin: "10px",
                            visibility: currentMatchIndex > 0 ? "visible" : "hidden", // Hide when disabled
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    {/* Profile Details */}
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                        <Avatar
                            src={currentProfile.userPhoto || placeholderImage}
                            alt={`${currentProfile.userName}'s profile`}
                            sx={{ width: 100, height: 100, margin: "10px auto" }}
                        />
                        <Typography variant="h5">{currentProfile.userName}</Typography>
                        <Typography variant="body1">Account Name: {currentProfile.accountName}</Typography>
                    </Box>

                    {/* Right Arrow */}
                    <IconButton
                        onClick={handleNext}
                        disabled={currentMatchIndex >= profiles.length - 1} // Disable if at the last profile
                        sx={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "50%",
                            margin: "10px",
                            visibility: currentMatchIndex < profiles.length - 1 ? "visible" : "hidden", // Hide when disabled
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        onClick={handleYes}
                        sx={{ margin: "10px", backgroundColor: "#4caf50" }}
                    >
                        Let's Play
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleNo(currentProfile.userID)}
                        sx={{ margin: "10px", backgroundColor: "#f44336" }}
                    >
                        Next Time
                    </Button>
                </Box>
            </Box>
            {/* Match Modal */}
            <Modal open={showMatchModal} onClose={() => setShowMatchModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        textAlign: "center",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                        It's a Match!
                    </Typography>
                    <Typography variant="body1">
                        You matched with <strong>{matchedUser?.userName}</strong>!
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate("/pet-tinder-chat", { state: { currentUser, matchedUser } })
                            }
                            sx={{ marginRight: "10px", backgroundColor: "#4caf50" }}
                        >
                            Go to Chat
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setShowMatchModal(false)}
                            sx={{ marginLeft: "10px", color: "#f44336", borderColor: "#f44336" }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PetTinderMatcher;