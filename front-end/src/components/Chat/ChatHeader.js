import React from 'react';
import { Typography } from '@mui/material';
import { Button } from 'antd';
import {
  ArrowLeftOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import '../../styles/ChatHeader.css';

const ChatHeader = ({
  totalMembers,
  onBack,
  onLeave,
  onMemberRemove,
  isManager,
}) => {
  return (
    <div className='chat-header'>
      <div onClick={onBack} className='primary-color'>
        <Button
          type='text'
          icon={<ArrowLeftOutlined />}
          className='back-button primary-color'
        />
        Home
      </div>

      <Typography variant='h6' className='chat-title'>
        Our Community ({totalMembers})
      </Typography>

      {isManager ? (
        <Button
          type='text'
          icon={<UserDeleteOutlined />}
          onClick={onMemberRemove}
          className='member-action-button primary-color'
        />
      ) : (
        <Button
          type='text'
          onClick={onLeave}
          className='leave-button primary-color'
        >
          Leave
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
