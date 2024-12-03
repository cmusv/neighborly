import React from 'react';
import { Avatar } from '@mui/material';
import { useChatroom } from '../Chat/contexts/ChatContext';
import '../../styles/ChatBubble.css';

const ChatBubble = ({ message }) => {
  const { content, type, senderName, senderAvatar, senderId, timestamp } = message;
  const { currentUser } = useChatroom();
  const isMyMessage = currentUser?.id === senderId;
  
  return (
    <div className="message-container">
      <div className="timestamp">{new Date(timestamp).toLocaleString('en-US', { 
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}</div>
      
      <div className="message-wrapper">
        <Avatar 
          src={senderAvatar} 
          alt={senderName} 
          className="sender-avatar"
        />
        <div className="message-content-wrapper">
          <div className="sender-name">
            {senderName}
            {isMyMessage && <span className="me-indicator">(Me)</span>}
          </div>
          <div className={`chat-bubble ${type}`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;