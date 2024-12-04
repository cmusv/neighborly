import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatroom } from '../components/Chat/contexts/ChatContext';
import { useScrollToBottom } from '../components/Chat/useScrollToBottom';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
import MemberList from '../components/Chat/MemberList';
import '../styles/Chat.css';

const ChatManager = () => {
  const navigate = useNavigate();
  const { messages, chatroomData, addMessage, currentUser } =
    useChatroom();
  const [showMemberList, setShowMemberList] = useState(false);
  const messagesEndRef = useScrollToBottom(messages);

  useEffect(() => {
    if (!showMemberList) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showMemberList, messagesEndRef]);

  // Check if we're already in manager role
  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem('current_user')
    );
    console.log('stored user in ChatManager:', storedUser);
    if (!storedUser || storedUser.role !== 'manager') {
      navigate('/');
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handleMemberRemove = () => {
    setShowMemberList(true);
  };

  const handleMemberListClose = () => {
    setShowMemberList(false);
    // small delay to ensure DOM is updated before scrolling
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // If no user or not a manager, don't render anything
  if (!currentUser || currentUser.role !== 'manager') {
    return null;
  }

  return (
    <div className='chat-container'>
      {!showMemberList ? (
        <>
          <ChatHeader
            totalMembers={chatroomData.totalMembers}
            onBack={handleBack}
            onMemberRemove={handleMemberRemove}
            isManager={true}
          />

          <div className='messages-container'>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={addMessage} isManager={true} />
        </>
      ) : (
        <MemberList onBack={handleMemberListClose} />
      )}
    </div>
  );
};

export default ChatManager;
