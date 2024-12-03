import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { getPhoto } from '../../utils/indexedDB'; // Fetch the photo from IndexedDB
import '../../styles/ChatBubble.css';

const ChatBubble = ({ message, isCurrentUser }) => {
    const { content, senderName, senderID, timestamp } = message;
    const [senderAvatar, setSenderAvatar] = useState('');

    useEffect(() => {
        const fetchSenderAvatar = async () => {
            if (!isCurrentUser) {
                const avatar = await getPhoto(senderID); // Fetch photo for the sender
                setSenderAvatar(avatar || 'https://via.placeholder.com/50');
            }
        };
        fetchSenderAvatar();
    }, [isCurrentUser, senderID]);

    return (
        <div className={`message-container ${isCurrentUser ? 'my-message' : 'their-message'}`}>
            <div className="timestamp">
                {new Date(timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
            <div className={`message-wrapper ${isCurrentUser ? 'align-right' : 'align-left'}`}>
                {!isCurrentUser && (
                    <Avatar
                        src={senderAvatar}
                        alt={senderName}
                        className="sender-avatar"
                    />
                )}
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