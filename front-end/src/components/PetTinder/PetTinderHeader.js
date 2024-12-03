import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getPhoto } from "../../utils/indexedDB"; // Import getPhoto function
import "../../styles/ChatHeader.css";

const Header = ({ title, onBack, profilePage, currentUser }) => {
    const navigate = useNavigate();
    const [currentUserAvatar, setCurrentUserAvatar] = useState(currentUser.userPhoto);
    // useEffect(() => {
    //     const fetchCurrentUserAvatar = async () => {
    //         if (currentUser?.userID) {
    //             try {
    //                 const avatar = await getPhoto(currentUser.userID); // Fetch photo from IndexedDB
    //                 console.log(`Avatar fetched for userID ${currentUser.userID}:`, avatar);
    //                 setCurrentUserAvatar(avatar || "https://via.placeholder.com/50");
    //             } catch (error) {
    //                 console.error("Error fetching user avatar:", error);
    //                 setCurrentUserAvatar("https://via.placeholder.com/50"); // Fallback in case of error
    //             }
    //         } else {
    //             console.warn("currentUser is undefined or missing userID");
    //             setCurrentUserAvatar("https://via.placeholder.com/100?text=Upload+Photo"); // Default placeholder
    //         }
    //     };
    //     fetchCurrentUserAvatar();
    // }, [currentUser]);

    return (
        <header className="chat-header">
            {/* Back Button */}
            <div className="chat-header-left" onClick={onBack}>
                <ArrowLeftOutlined className="chat-back-icon" />
                <span className="chat-home-text">Back</span>
            </div>

            {/* Centered Title */}
            <Typography variant="h6" className="chat-title">
                {title}
            </Typography>

            {/* Right-Side Action Buttons */}
            <div className="chat-header-right">
                {!profilePage && currentUser && (
                    <Button
                        type="text"
                        onClick={() => navigate("/pet-tinder")}
                        className="profile-button"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "0",
                        }}
                    >
                        <Avatar
                            src={currentUserAvatar}
                            alt={currentUser.userName}
                            sx={{ width: 30, height: 30 }}
                        />
                        {currentUser.userName || "My Profile"}
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;