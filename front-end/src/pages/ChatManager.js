import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatroom } from '../contexts/ChatContext';
import { useScrollToBottom } from '../hooks/useScrollToButtom';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
import MemberList from '../components/Chat/MemberList';
import '../styles/Chat.css';

const ChatManager = () => {
  const navigate = useNavigate();
  const { messages, chatroomData, addMessage, setUserRole } = useChatroom();
  const [showMemberList, setShowMemberList] = useState(false);

  // Pass messages array as dependency to trigger scroll on new messages
  const messagesEndRef = useScrollToBottom(messages);

  useEffect(() => {
    setUserRole('manager');
  }, [setUserRole]);

  const handleBack = () => {
    navigate('/');
  };

  const handleMemberRemove = () => {
    setShowMemberList(true);
  };

  return (
    <div className="chat-container">
      {!showMemberList ? (
        <>
          <ChatHeader
            totalMembers={chatroomData.totalMembers}
            onBack={handleBack}
            onMemberRemove={handleMemberRemove}
            isManager={true}
          />
          
          <div className="messages-container">
            {messages.map(message => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput
            onSendMessage={addMessage}
            isManager={true}
          />
        </>
      ) : (
        <MemberList
          onBack={() => setShowMemberList(false)}
        />
      )}
    </div>
  );
};

export default ChatManager;