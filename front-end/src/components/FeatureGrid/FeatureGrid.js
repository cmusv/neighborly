import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const FeatureGrid = () => {
  const navigate = useNavigate();

  // ============================== Chatroom ==============================
  const handleChatNavigation = (path) => {
    if (path === '/chat-resident') {
      // Check if user is already a member by checking localStorage
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
      if (!currentUser?.isChatroomMember) {
        Modal.confirm({
          title: 'Join Chatroom',
          content: 'Would you like to join our community chatroom?',
          okText: 'Yes',
          cancelText: 'Cancel',
          onOk: () => {
            navigate('/chat-resident', { state: { shouldJoin: true } });
          }
        });
      } else {
        navigate('/chat-resident');
      }
    } else if (path === '/chat-manager') {
      navigate('/chat-manager');
    } else {
      navigate(path);
    }
  };

  const features = [
    { name: "Community Help", path: "/community-help" },
    { name: "Pet Tinder", path: "/pet-tinder" },
    { name: "Exchange Board", path: "/exchange-board" },
    { name: "Pay Rent", path: "/pay-rent" },
    { name: "Chat as Resident", path: "/chat-resident" },
    { name: "Chat as Manager", path: "/chat-manager" },
    { name: "Maintenance List as Resident", path: "/maintenance-resident" },
    { name: "Maintenance List as Manager", path: "/maintenance-manager" },
  ];

  return (
    <Grid container spacing={3} className="py-6 w-full">
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Button
            variant="contained"
            fullWidth
            className="bg-primary text-black font-bold py-2 hover:bg-secondary"
            onClick={() => handleChatNavigation(feature.path)}
          >
            {feature.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;