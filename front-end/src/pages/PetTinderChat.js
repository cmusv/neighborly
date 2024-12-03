import React from "react";
import { useLocation } from "react-router-dom";

const PetTinderChat = () => {
    const location = useLocation();
    const { matchedUser, currentUser } = location.state || {};

    return (
        <div>
            <h1>Chat with {matchedUser?.userName}</h1>
            <p>Welcome, {currentUser?.userName}! Start chatting with {matchedUser?.userName}.</p>
            {/* Add chat functionality later */}
        </div>
    );
};

export default PetTinderChat;