import React, { createContext, useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatroomData, setChatroomData] = useState({ name: '', totalMembers: 0 });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Check if data exists in localStorage
    const storedMembers = localStorage.getItem('chatroom_members');
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

      // Store initial data
      localStorage.setItem('chatroom_members', JSON.stringify(initialMembers));
      localStorage.setItem('chatroom_messages', JSON.stringify(initialMessages));
      localStorage.setItem('chatroom_data', JSON.stringify({
        name: 'Our Community',
        totalMembers: initialMembers.length
      }));

      setMembers(initialMembers);
      setMessages(initialMessages);
      setChatroomData({
        name: 'Our Community',
        totalMembers: initialMembers.length
      });
    } else {
      // Load existing data
      setMembers(JSON.parse(storedMembers));
      setMessages(JSON.parse(localStorage.getItem('chatroom_messages') || '[]'));
      setChatroomData(JSON.parse(localStorage.getItem('chatroom_data') || '{}'));
      setCurrentUser(JSON.parse(localStorage.getItem('current_user')));
    }
  };

  const addMessage = (content, type = 'regular') => {
    if (!currentUser) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
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
      
      const newTotalMembers = updated.length;
      const updatedChatroomData = { ...chatroomData, totalMembers: newTotalMembers };
      localStorage.setItem('chatroom_data', JSON.stringify(updatedChatroomData));
      setChatroomData(updatedChatroomData);
      
      Modal.success({
        content: 'Selected members are removed.',
        duration: 0.5,
      });

      return updated;
    });
  };

  const joinChatroom = () => {
    if (!currentUser?.isChatroomMember) {
      const updatedUser = { ...currentUser, isChatroomMember: true };
      setCurrentUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));

      setMembers(prev => {
        const updated = [...prev, {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          joinedAt: new Date().toISOString()
        }];
        localStorage.setItem('chatroom_members', JSON.stringify(updated));
        
        const newTotalMembers = updated.length;
        const updatedChatroomData = { ...chatroomData, totalMembers: newTotalMembers };
        localStorage.setItem('chatroom_data', JSON.stringify(updatedChatroomData));
        setChatroomData(updatedChatroomData);
        
        return updated;
      });
    }
  };

  const leaveChatroom = () => {
    if (currentUser?.isChatroomMember) {
      const updatedUser = { ...currentUser, isChatroomMember: false };
      setCurrentUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));

      setMembers(prev => {
        const updated = prev.filter(member => member.id !== currentUser.id);
        localStorage.setItem('chatroom_members', JSON.stringify(updated));
        
        const newTotalMembers = updated.length;
        const updatedChatroomData = { ...chatroomData, totalMembers: newTotalMembers };
        localStorage.setItem('chatroom_data', JSON.stringify(updatedChatroomData));
        setChatroomData(updatedChatroomData);
        
        return updated;
      });
    }
  };

  const setUserRole = (role) => {
    const newUser = {
      id: role === 'manager' ? 'manager1' : `user_${Date.now()}`,
      name: role === 'manager' ? 'Building Manager' : `Resident ${Date.now()}`,
      role,
      avatar: `/api/placeholder/32/32`,
      isChatroomMember: role === 'manager'
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('current_user', JSON.stringify(newUser));
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