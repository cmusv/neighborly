import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = () => {
    const storedUser = localStorage.getItem('current_user');
    if (!storedUser) {
      // Create a new resident user by default
      const newUser = {
        id: `user_${Date.now()}`,
        name: `Resident ${Date.now()}`,
        role: 'resident',
        avatar: `/api/placeholder/32/32`,
        isChatroomMember: false
      };
      localStorage.setItem('current_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
    } else {
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  const switchToManager = () => {
    const managerUser = {
      id: 'manager1',
      name: 'Building Manager',
      role: 'manager',
      avatar: `/api/placeholder/32/32`,
      isChatroomMember: true
    };
    localStorage.setItem('current_user', JSON.stringify(managerUser));
    setCurrentUser(managerUser);
  };

  const switchToResident = () => {
    const currentStoredUser = JSON.parse(localStorage.getItem('current_user'));
    if (currentStoredUser && currentStoredUser.role === 'resident') {
      // If already a resident, keep the same user
      setCurrentUser(currentStoredUser);
    } else {
      // Create new resident user
      const newUser = {
        id: `user_${Date.now()}`,
        name: `Resident ${Date.now()}`,
        role: 'resident',
        avatar: `/api/placeholder/32/32`,
        isChatroomMember: false
      };
      localStorage.setItem('current_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      switchToManager,
      switchToResident,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};