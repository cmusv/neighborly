import React, { useState } from 'react';
import { Radio, Input } from 'antd';
import '../../styles/ChatInput.css';

const { TextArea } = Input;

const ChatInput = ({ onSendMessage, isManager }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('regular');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, messageType);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      {isManager && (
        <div className="message-type-selector">
          <Radio.Group 
            value={messageType} 
            onChange={e => setMessageType(e.target.value)}
            className="radio-group"
          >
            <Radio value="regular">Regular</Radio>
            <Radio value="announcement">Announcement</Radio>
          </Radio.Group>
        </div>
      )}
      
      <div className="input-wrapper">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          className="message-input"
        />
      </div>
    </div>
  );
};

export default ChatInput;