import React, { createContext, useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatroomData, setChatroomData] = useState({ name: '', totalMembers: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      initializeData();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const initializeData = () => {
    // Load current user first
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Check if data exists in localStorage
    const storedMembers = localStorage.getItem('chatroom_members');
    const storedMessages = localStorage.getItem('chatroom_messages');
    const storedChatroomData = localStorage.getItem('chatroom_data');

    if (!storedMembers) {
      // Generate fake initial data
      const initialMembers = Array.from({ length: 242 }, (_, i) => ({
        id: `user${i}`,
        name: `User ${i}`,
        avatar: `/api/placeholder/32/32`,
        joinedAt: new Date().toISOString()
      }));

      // Add manager as first member
      initialMembers.unshift({
        id: 'manager1',
        name: 'Building Manager',
        avatar: `/api/placeholder/32/32`,
        joinedAt: new Date().toISOString()
      });

      const initialMessages = [
        {
          id: 'msg1',
          senderId: 'manager1',
          senderName: 'Building Manager',
          senderAvatar: `/api/placeholder/32/32`,
          content: 'Welcome to our community chat!',
          timestamp: new Date().toISOString(),
          type: 'announcement'
        }
      ];

      const initialChatroomData = {
        name: 'Our Community',
        totalMembers: initialMembers.length
      };

      // Store initial data
      localStorage.setItem('chatroom_members', JSON.stringify(initialMembers));
      localStorage.setItem('chatroom_messages', JSON.stringify(initialMessages));
      localStorage.setItem('chatroom_data', JSON.stringify(initialChatroomData));

      // Set state once
      setMembers(initialMembers);
      setMessages(initialMessages);
      setChatroomData(initialChatroomData);
    } else {
      // Load existing data
      setMembers(JSON.parse(storedMembers));
      setMessages(storedMessages ? JSON.parse(storedMessages) : []);
      setChatroomData(storedChatroomData ? JSON.parse(storedChatroomData) : {
        name: 'Our Community',
        totalMembers: 0
      });
    }
  };

  const updateChatroomData = (newMembers) => {
    const updatedChatroomData = {
      ...chatroomData,
      totalMembers: newMembers.length
    };
    localStorage.setItem('chatroom_data', JSON.stringify(updatedChatroomData));
    setChatroomData(updatedChatroomData);
  };

  const joinChatroom = () => {
    const storedUser = JSON.parse(localStorage.getItem('current_user'));
    if (!storedUser) return;

    const updatedUser = { ...storedUser, isChatroomMember: true };
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    setMembers(prev => {
      const newMember = {
        id: updatedUser.id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        joinedAt: new Date().toISOString()
      };

      const updated = [...prev, newMember];
      localStorage.setItem('chatroom_members', JSON.stringify(updated));
      updateChatroomData(updated);
      return updated;
    });
  };

  const leaveChatroom = () => {
    const storedUser = JSON.parse(localStorage.getItem('current_user'));
    if (!storedUser) return;

    const updatedUser = { ...storedUser, isChatroomMember: false };
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    setMembers(prev => {
      const updated = prev.filter(member => member.id !== updatedUser.id);
      localStorage.setItem('chatroom_members', JSON.stringify(updated));
      updateChatroomData(updated);
      return updated;
    });
  };

  const addMessage = (content, type = 'regular') => {
    const storedUser = JSON.parse(localStorage.getItem('current_user'));
    if (!storedUser) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: storedUser.id,
      senderName: storedUser.name,
      senderAvatar: storedUser.avatar,
      content,
      timestamp: new Date().toISOString(),
      type
    };

    setMessages(prev => {
      const updated = [...prev, newMessage];
      localStorage.setItem('chatroom_messages', JSON.stringify(updated));
      return updated;
    });
  };

  const removeMembers = (memberIds) => {
    setMembers(prev => {
      const updated = prev.filter(member => !memberIds.includes(member.id));
      localStorage.setItem('chatroom_members', JSON.stringify(updated));
      updateChatroomData(updated);
      
      Modal.success({
        content: 'Selected members are removed.',
        duration: 0.5,
      });

      return updated;
    });
  };

  const setUserRole = (role) => {
    const newUser = {
      id: role === 'manager' ? 'manager1' : `user_${Date.now()}`,
      name: role === 'manager' ? 'Building Manager' : `Resident ${Date.now()}`,
      role,
      avatar: `/api/placeholder/32/32`,
      isChatroomMember: role === 'manager'
    };
    
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  return (
    <ChatContext.Provider value={{
      members,
      messages,
      chatroomData,
      currentUser,
      addMessage,
      removeMembers,
      joinChatroom,
      leaveChatroom,
      setUserRole
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatroom = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatroom must be used within a ChatProvider');
  }
  return context;
};