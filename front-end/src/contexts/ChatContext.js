import React, { createContext, useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
import '../styles/Modal.css';
import { successModalConfig } from '../components/Chat/ModalConfig';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatroomData, setChatroomData] = useState({ name: '', totalMembers: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Initialize chat data once
  useEffect(() => {
    console.log('Initializing data...');
    if (!isInitialized) {
      initializeData();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Listen for storage changes (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const initializeData = () => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Generate fake members
    const initialFakeMembers = Array.from({ length: 242 }, (_, i) => ({
      id: `user${i}`,
      name: `User ${i}`,
      avatar: `/api/placeholder/32/32`,
      joinedAt: new Date().toISOString()
    }));

    // Add manager as first member
    initialFakeMembers.unshift({
      id: 'manager1',
      name: 'Building Manager',
      avatar: `/api/placeholder/32/32`,
      joinedAt: new Date().toISOString()
    });

    // Check if fake members already exist in localStorage
    const storedFakeMembers = localStorage.getItem('default_chatroom_members');
    if (!storedFakeMembers) {
      // Save fake members to localStorage if not already saved
      localStorage.setItem('default_chatroom_members', JSON.stringify(initialFakeMembers));
    }

    // Check if chatroom members and other data exist
    const storedMembers = localStorage.getItem('chatroom_members');
    const storedMessages = localStorage.getItem('chatroom_messages');
    const storedChatroomData = localStorage.getItem('chatroom_data');

    if (!storedMembers) {
      // First-time initialization of chatroom state
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
        totalMembers: initialFakeMembers.length
      };

      localStorage.setItem('chatroom_members', JSON.stringify(initialFakeMembers));
      localStorage.setItem('chatroom_messages', JSON.stringify(initialMessages));
      localStorage.setItem('chatroom_data', JSON.stringify(initialChatroomData));

      setMembers(initialFakeMembers);
      setMessages(initialMessages);
      setChatroomData(initialChatroomData);
    } else {
      // Load existing data
      setMembers(JSON.parse(storedMembers));
      setMessages(JSON.parse(storedMessages) || []);
      setChatroomData(JSON.parse(storedChatroomData) || { name: 'Our Community', totalMembers: 0 });
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
      // Retrieve fake members from localStorage
      const fakeMembers = JSON.parse(localStorage.getItem('default_chatroom_members')) || [];

      // Add the current resident to the members list
      const newMember = {
        id: updatedUser.id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        joinedAt: new Date().toISOString()
      };

      // Merge fake members and ensure no duplicates
      const memberIds = new Set(prev.map(m => m.id));
      const updated = [...prev, ...fakeMembers.filter(m => !memberIds.has(m.id)), newMember];
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
      // Exclude the current resident from the members list
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
      // Filter out the removed members
      const updatedMembers = prev.filter(member => !memberIds.includes(member.id));
  
      // Update chatroom_members in localStorage
      localStorage.setItem('chatroom_members', JSON.stringify(updatedMembers));
  
      // Also update default_chatroom_members in localStorage
      const defaultMembers = JSON.parse(localStorage.getItem('default_chatroom_members')) || [];
      const updatedDefaultMembers = defaultMembers.filter(member => !memberIds.includes(member.id));
      localStorage.setItem('default_chatroom_members', JSON.stringify(updatedDefaultMembers));
  
      // Update chatroom data
      updateChatroomData(updatedMembers);
  
      Modal.success({
        ...successModalConfig,
        content: 'Selected members are removed.',
      });
  
      return updatedMembers;
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

export default ChatContext;