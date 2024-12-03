import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMutualMatches, getPhoto } from "../utils/indexedDB";
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "../components/Header/Header";

const ChatSelectionPage = () => {
    const [matchedUsers, setMatchedUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state || {};

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            const mutualMatches = await getMutualMatches();

            const relevantMatches = mutualMatches.filter(
                (match) => match.userA.userID === currentUser.userID || match.userB.userID === currentUser.userID
            );

            const matchedProfiles = await Promise.all(
                relevantMatches.map(async (match) => {
                    const matchedUser =
                        match.userA.userID === currentUser.userID ? match.userB : match.userA;

                    const userPhoto = await getPhoto(matchedUser.userID);
                    return { ...matchedUser, userPhoto: userPhoto || "", lastMessageTime: "1h ago" }; // Mocking lastMessageTime
                })
            );

            setMatchedUsers(matchedProfiles);
        };

        fetchMatchedUsers();
    }, [currentUser]);

    const handleNavigateToChat = (matchedUser) => {
        navigate("/pet-tinder-chat", { state: { currentUser, matchedUser } });
    };

    return (
        <Box>
            <Header />
            <Box sx={{ textAlign: "center", margin: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Your Chats
                </Typography>
                {matchedUsers.length === 0 ? (
                    <Typography variant="body1">
                        You don't have any matches yet. Keep swiping!
                    </Typography>
                ) : (
                    <List>
                        {matchedUsers.map((user, index) => (
                            <React.Fragment key={user.userID}>
                                <ListItem button onClick={() => handleNavigateToChat(user)}>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={user.userPhoto || "https://via.placeholder.com/100?text=No+Photo"}
                                            alt={user.userName}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.userName}
                                        secondary={`Last Interaction: ${user.lastMessageTime}`} // Placeholder
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => handleNavigateToChat(user)}>
                                            <ChevronRightIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index < matchedUsers.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default ChatSelectionPage;