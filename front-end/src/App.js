import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import CommunityHelp from "./pages/CommunityHelp";
import PetTinder from "./pages/PetTinder";
import ExchangeBoard from "./pages/ExchangeBoard";
import PayRent from "./pages/PayRent";
import ChatResident from "./pages/ChatResident";
import ChatManager from "./pages/ChatManager";
import MaintenanceResident from "./pages/MaintenanceResident";
import MaintenanceManager from "./pages/MaintenanceManager";
import PetTinderMatcher from "./pages/PetTinderMatcher";
import { ChatProvider } from './contexts/ChatContext';
import { UserProvider } from './contexts/UserContext';
import SelectAccount from "./pages/SelectAccount";
import PayAddAccount from "./pages/PayAddAccount";
import PayThankYou from "./pages/PayThankYou";

const ChatRouteWrapper = ({ children }) => (
    <ChatProvider>{children}</ChatProvider>
  );

// Define the orange theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#f1a44d", // Orange (Primary)
        },
        secondary: {
            main: "#c09534", // Golden Brown (Secondary)
        },
        background: {
            default: "#fdfaf1", // Light Beige Background
        },
        text: {
            primary: "#000000", // Black for text
            secondary: "#ffffff", // White for contrast
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif", // Default font
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/community-help" element={<CommunityHelp />} />
                        <Route path="/pet-tinder" element={<PetTinder />} />
                        <Route path="/pet-tinder-dates" element={<PetTinderMatcher />} />
                        <Route path="/exchange-board" element={<ExchangeBoard />} />
                        <Route path="/pay-rent" element={<PayRent />} />
                        <Route path='/select-account' element={<SelectAccount />} />
                        <Route path='/add-account' element={<PayAddAccount />} />
                        <Route path='/pay-thank-you' element={<PayThankYou />} />
                        <Route
                            path="/chat-resident"
                            element={
                            <ChatRouteWrapper>
                                <ChatResident />
                            </ChatRouteWrapper>
                            }
                        />
                        <Route
                            path="/chat-manager"
                            element={
                            <ChatRouteWrapper>
                                <ChatManager />
                            </ChatRouteWrapper>
                            }
                        />
                        <Route path="/maintenance-resident" element={<MaintenanceResident />} />
                        <Route path="/maintenance-manager" element={<MaintenanceManager />} />
                    </Routes>
                </Router>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;