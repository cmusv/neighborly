import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/PetTinder/PetTinderHeader";
import ChatBubble from "../components/PetTinder/PetTinderChatBubble";
import ChatInput from "../components/PetTinder/PetTinderChatInput";
import { getMessages, saveMessage } from "../utils/indexedDB";
import "../styles/Chat.css";

const PetTinderChat = () => {
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const { currentUser, matchedUser } = location.state || {};
    const conversationID = `${currentUser.userID}-${matchedUser.userID}`;
    const reverseConversationID = `${matchedUser.userID}-${currentUser.userID}`;

    useEffect(() => {
        const fetchMessages = async () => {
            const chatMessagesA = await getMessages(conversationID); // Fetch messages for primary conversation ID
            const chatMessagesB = await getMessages(reverseConversationID); // Fetch messages for reverse conversation ID

            // Combine and sort messages by timestamp
            const allMessages = [...chatMessagesA, ...chatMessagesB].sort(
                (a, b) => a.timestamp - b.timestamp
            );
            setMessages(allMessages);
        };
        fetchMessages();
    }, [conversationID, reverseConversationID]);

    const handleSendMessage = async (content) => {
        if (!content.trim()) return;

        const newMessage = {
            messageID: `${conversationID}-${Date.now()}`,
            conversationID,
            senderID: currentUser.userID,
            receiverID: matchedUser.userID,
            content,
            senderName: currentUser.userName,
            timestamp: Date.now(),
        };

        await saveMessage(newMessage);
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleBack = () => navigate("/pet-tinder-chat-selection", { state: { currentUser } });

    return (
        <div className="chat-container">
            <Header
                title={matchedUser.userName}
                onBack={handleBack}
                profilePage={false}
                currentUser={currentUser}
            />
            <div className="messages-container">
                {/* Always display greyed-out message at the top */}
                <div className="no-messages">
                    <p className="greyed-message">
                        Congrats! You have matched with {matchedUser.userName}. Start chatting now!
                    </p>
                </div>
                {messages.map((msg) => (
                    <ChatBubble key={msg.messageID} message={msg} currentUser={currentUser}/>
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage}/>
        </div>
    );
};

export default PetTinderChat;