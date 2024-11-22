import React from 'react';
import { Typography } from '@mui/material';
import { Button } from 'antd';
import { ArrowLeftOutlined, UserDeleteOutlined } from '@ant-design/icons';
import '../../styles/ChatHeader.css';

const ChatHeader = ({ 
  totalMembers, 
  onBack, 
  onLeave, 
  onMemberRemove, 
  isManager 
}) => {
  return (
    <div className="chat-header">
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={onBack}
        className="back-button"
      />
      
      <Typography variant="h6" className="chat-title">
        Our Community ({totalMembers})
      </Typography>
      
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
  );
};

export default ChatHeader;