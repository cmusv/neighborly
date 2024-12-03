import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initialize user from localStorage if exists
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const switchToResident = () => {
    const storedUser = localStorage.getItem('current_user');
    console.log('stored user in UserContext:', storedUser);
    
    // If there's a stored resident user, use that
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'resident') {
        setCurrentUser(user);
        return;
      }
    }

    // Only create new resident if no stored resident exists
    const newUser = {
      id: `user_${Date.now()}`,
      name: `Resident ${Date.now()}`,
      role: 'resident',
      avatar: `/api/placeholder/32/32`,
      isChatroomMember: false
    };
    
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
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

  return (
    <UserContext.Provider value={{
      currentUser,
      switchToManager,
      switchToResident
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