import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMutualMatches, getProfiles, getPhoto } from "../utils/indexedDB";
import { Box, Typography, Avatar, Button, Grid, Card, CardContent } from "@mui/material";
import Header from "../components/Header/Header";

const ChatSelectionPage = () => {
    const [matchedUsers, setMatchedUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state || {};

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            // Get all mutual matches
            const mutualMatches = await getMutualMatches();

            // Filter matches involving the currentUser
            const relevantMatches = mutualMatches.filter(
                (match) => match.userA.userID === currentUser.userID || match.userB.userID === currentUser.userID
            );

            // Fetch matched user profiles and photos
            const matchedProfiles = await Promise.all(
                relevantMatches.map(async (match) => {
                    const matchedUser =
                        match.userA.userID === currentUser.userID ? match.userB : match.userA;

                    // Fetch the matched user's photo
                    const userPhoto = await getPhoto(matchedUser.userID);
                    return { ...matchedUser, userPhoto: userPhoto || "" };
                })
            );

            setMatchedUsers(matchedProfiles);
        };

        fetchMatchedUsers();
    }, [currentUser]);

    const handleNavigateToChat = (matchedUser) => {
        navigate("/chat", { state: { currentUser, matchedUser } }); // Navigate to chat page
    };

    return (
        <Box>
            <Header />
            <Box sx={{ textAlign: "center", margin: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Your Matches
                </Typography>
                {matchedUsers.length === 0 ? (
                    <Typography variant="body1">
                        You don't have any matches yet. Keep swiping!
                    </Typography>
                ) : (
                    <Grid container spacing={2} justifyContent="center">
                        {matchedUsers.map((user) => (
                            <Grid item key={user.userID} xs={12} sm={6} md={4}>
                                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                                    <Avatar
                                        src={user.userPhoto || "https://via.placeholder.com/100?text=No+Photo"}
                                        alt={user.userName}
                                        sx={{ width: 80, height: 80, margin: "10px" }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{user.userName}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.accountName}
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleNavigateToChat(user)}
                                        sx={{ backgroundColor: "#3f51b5", marginTop: "10px" }}
                                    >
                                        Start Chat
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default ChatSelectionPage;