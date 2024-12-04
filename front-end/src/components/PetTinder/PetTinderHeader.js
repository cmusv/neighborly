import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/ChatHeader.css";

const Header = ({ title, onBack, profilePage, currentUser, onSwitchUser }) => {
    const navigate = useNavigate();
    const [currentUserAvatar, setCurrentUserAvatar] = useState(currentUser?.userPhoto || null);

    useEffect(() => {
        // Update avatar if currentUser changes
        setCurrentUserAvatar(currentUser?.userPhoto || null);
    }, [currentUser]);

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
                {profilePage ? (
                    <Button
                        type="primary"
                        onClick={onSwitchUser}
                        className="switch-user-button"
                        style={{
                            borderRadius: "15px",
                            padding: "4px 16px",
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                    >
                        Switch User
                    </Button>
                ) : (
                    currentUserAvatar && (
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
                                alt={currentUser?.userName || "User"}
                                sx={{ width: 30, height: 30 }}
                            />
                            {currentUser?.userName || "My Profile"}
                        </Button>
                    )
                )}
            </div>
        </header>
    );
};

export default Header;