import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar } from '@mui/material';
import { getPhoto } from '../../utils/indexedDB'; // Fetch the photo from IndexedDB
import '../../styles/ChatBubble.css';

const ChatBubble = ({ message, currentUser }) => {
    const navigate = useNavigate();

    // Destructure message fields
    const { content, senderName, senderID, timestamp } = message;
    const isCurrentUser = currentUser.userID === senderID; // Compare senderID with currentUser's userID
    const [senderAvatar, setSenderAvatar] = useState('');

    console.log('Current User in Bubble', currentUser);

    useEffect(() => {
        const fetchSenderAvatar = async () => {
            const avatar = await getPhoto(senderID); // Fetch photo for the sender
            setSenderAvatar(avatar || 'https://via.placeholder.com/50');
        };
        fetchSenderAvatar();
    }, [senderID]);

    return (
        <div className={`message-container ${isCurrentUser ? 'my-message' : 'their-message'}`}>
            <div className="timestamp">
                {new Date(timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
            <div className={`message-wrapper ${isCurrentUser ? 'align-right' : 'align-left'}`}>
                <Avatar
                    src={senderAvatar}
                    alt={senderName}
                    className="sender-avatar"
                    onClick={() =>
                        navigate("/pet-tinder-profile", { state: { senderID, currentUser } })
                    }
                    sx={{
                        cursor: "pointer",
                        "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
                    }}
                />
                <div className="message-content-wrapper">
                    <div className="sender-name">
                        {senderName} {isCurrentUser && <span className="me-indicator">(Me)</span>}
                    </div>
                    <div className={`chat-bubble ${isCurrentUser ? 'sender' : 'receiver'}`}>{content}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;