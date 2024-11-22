import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useChatroom } from '../contexts/ChatContext';
import { useScrollToBottom } from '../hooks/useScrollToButtom';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
import '../styles/Chat.css';

const ChatResident = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    messages, 
    chatroomData, 
    addMessage, 
    leaveChatroom,
    setUserRole,
    joinChatroom,
  } = useChatroom();

  const messagesEndRef = useScrollToBottom(messages);

  useEffect(() => {
    setUserRole('resident');
    
    if (location.state?.shouldJoin) {
      joinChatroom();
    }
  }, [setUserRole, joinChatroom, location.state?.shouldJoin]);

  const handleBack = () => {
    navigate('/');
  };

  const handleLeave = () => {
    Modal.confirm({
      title: 'Leave Chatroom',
      content: 'Are you sure you want to leave the chatroom?',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        leaveChatroom();
        navigate('/');
      }
    });
  };

  return (
    <div className="chat-container">
      <ChatHeader
        totalMembers={chatroomData.totalMembers}
        onBack={handleBack}
        onLeave={handleLeave}
        isManager={false}
      />
      
      <div className="messages-container">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput
        onSendMessage={(content) => addMessage(content, 'regular')}
        isManager={false}
      />
    </div>
  );
};

export default ChatResident;