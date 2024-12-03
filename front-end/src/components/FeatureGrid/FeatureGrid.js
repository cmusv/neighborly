import React from "react";
import { Card, CardContent, CardActionArea, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useUser } from '../../contexts/UserContext';
import '../../styles/Modal.css';
import { confirmModalConfig } from '../Chat/ModalConfig';

const FeatureGrid = () => {
  const navigate = useNavigate();
  const { switchToManager, switchToResident } = useUser();

  const handleChatNavigation = (path) => {
    if (path === '/chat-resident') {
      const storedUser = JSON.parse(localStorage.getItem('current_user'));

      if (!storedUser || storedUser.role === 'manager') {
        // Switch to resident if needed
        switchToResident();
        // Show join modal for new resident
        Modal.confirm({
          ...confirmModalConfig,
          title: 'Join Chatroom',
          content: 'Would you like to join our community chatroom?',
          onOk: () => {
            navigate('/chat-resident', { state: { shouldJoin: true } });
          }
        });
      } else if (!storedUser.isChatroomMember) {
        // Existing resident but not a member
        Modal.confirm({
          ...confirmModalConfig,
          title: 'Join Chatroom',
          content: 'Would you like to join our community chatroom?',
          onOk: () => {
            navigate('/chat-resident', { state: { shouldJoin: true } });
          }
        });
      } else {
        // Existing resident and already a member
        navigate('/chat-resident');
      }
    } else if (path === '/chat-manager') {
      switchToManager();
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
    <Grid container spacing={3} justifyContent="center"> {/* Reduced spacing */}
      {features.map((feature, index) => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="stretch" // Ensure buttons have equal height
            style={{
              width: "100%",
            }}
          >
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
                width: "90%",
                maxWidth: "300px",
                height: "100%",
              }}
            >
              <CardActionArea
                onClick={() => handleChatNavigation(feature.path)}
                style={{
                  backgroundColor: "#F9DB99", 
                  color: "#714D00",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {feature.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;
