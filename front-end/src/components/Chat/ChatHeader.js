import React from 'react';
import { Typography } from '@mui/material';
import { Button } from 'antd';
import { ArrowLeftOutlined, UserDeleteOutlined } from '@ant-design/icons';
import '../../styles/ChatHeader.css';

const ChatHeader = ({ totalMembers, onBack, onLeave, onMemberRemove, isManager }) => {
  return (
    <header className="chat-header">
      {/* Back Button */}
      <div className="chat-header-left" onClick={onBack}>
        <ArrowLeftOutlined className="chat-back-icon" />
        <span className="chat-home-text">Home</span>
      </div>

      {/* Centered Title */}
      <Typography variant="h6" className="chat-title">
        Our Community ({totalMembers})
      </Typography>

      {/* Right-Side Action Buttons */}
      <div className="chat-header-right">
        {isManager ? (
          <Button
            type="text"
            icon={<UserDeleteOutlined />}
            onClick={onMemberRemove}
            className="member-action-button"
          />
        ) : (
          <Button
            type="text"
            onClick={onLeave}
            className="leave-button"
          >
            Leave
          </Button>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
