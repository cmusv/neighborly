import React, { useState } from 'react';
import { 
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material';
import { Button, Modal } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useChatroom } from '../../contexts/ChatContext';
import '../../styles/MemberList.css';

const MemberList = ({ onBack }) => {
  const { members, removeMembers } = useChatroom();
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleMemberClick = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleConfirmRemove = () => {
    if (selectedMembers.length === 0) return;

    Modal.confirm({
      title: 'Remove Members',
      content: 'Are you sure you want to remove the selected members?',
      okText: 'Yes',
      cancelText: 'Cancel',
      style: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      getContainer: () => document.documentElement,
      onOk: () => {
        removeMembers(selectedMembers);
        onBack();
      }
    });
  };

  return (
    <div className="member-list-container">
      <div className="member-list-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
        />
        <Typography variant="h6">Remove Members</Typography>
        <Button
          type="text"
          icon={<CheckCircleOutlined />}
          onClick={handleConfirmRemove}
          disabled={selectedMembers.length === 0}
        />
      </div>

      <List className="member-list">
        {members
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(member => (
            <ListItem
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              className={`member-item ${selectedMembers.includes(member.id) ? 'selected' : ''}`}
              button
            >
              <ListItemAvatar>
                <Avatar src={member.avatar} alt={member.name} />
              </ListItemAvatar>
              <ListItemText primary={member.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default MemberList;