export const STORAGE_KEYS = {
    MEMBERS: 'chatroom_members',
    MESSAGES: 'chatroom_messages',
    CHATROOM_DATA: 'chatroom_data',
    CURRENT_USER: 'current_user'
  };
  
  export const initializeData = () => {
    // Only initialize if data doesn't exist
    if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
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
  
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(initialMembers));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialMessages));
      localStorage.setItem(STORAGE_KEYS.CHATROOM_DATA, JSON.stringify({
        name: 'Our Community',
        totalMembers: initialMembers.length
      }));
    }
  };