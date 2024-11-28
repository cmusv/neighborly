import React, { useState, useEffect } from "react";
import Calendar from "../components/CommunityHelp/Calendar";
import Agenda from "../components/CommunityHelp/Agenda";
import Modal from "../components/CommunityHelp/Modal";
import { initializeLocalStorage } from "../components/CommunityHelp/localStorageInit";
import CommunityHelpHeader from "../components/Header/CommunityHelpHeader";
import { useNavigate } from 'react-router-dom';
import "../styles/CommunityHelpPage.css";

const CommunityHelp = () => {
    // Default to today's date in PST
    const today = new Date().toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" });
    const [selectedDate, setSelectedDate] = useState(today);
    const [agendaData, setAgendaData] = useState([]);
    const [isOfferHelpModalOpen, setOfferHelpModalOpen] = useState(false);
    const [isGetHelpModalOpen, setGetHelpModalOpen] = useState(false);

    useEffect(() => {
        initializeLocalStorage();
    }, []);

    useEffect(() => {
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        const filteredAgenda = storedAgenda.filter(
            (item) => item.date === selectedDate
        );
        setAgendaData(filteredAgenda);
    }, [selectedDate]);

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };

    const handleCancel = (sortedIndex, sortedAgenda) => {
        const itemToCancel = sortedAgenda[sortedIndex];
    
        // Update agendaData and localStorage for "community-help-agenda"
        const updatedAgenda = agendaData.filter(
            (item) =>
                item.startTime !== itemToCancel.startTime ||
                item.helper !== itemToCancel.helper
        );
    
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        const newStoredAgenda = storedAgenda.filter(
            (item) =>
                item.startTime !== itemToCancel.startTime ||
                item.helper !== itemToCancel.helper
        );
        localStorage.setItem("community-help-agenda", JSON.stringify(newStoredAgenda));
    
        // Add canceled event back to "community-help-availabilities"
        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const newAvailability = {
            date: itemToCancel.date,
            startTime: itemToCancel.startTime,
            endTime: itemToCancel.endTime,
            categories: itemToCancel.category,
            helper: itemToCancel.task === "Being Helped" ? "Me" : itemToCancel.helper,
        };
    
        const updatedAvailabilities = [...storedAvailabilities, newAvailability];
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify(updatedAvailabilities)
        );
    
        setAgendaData(updatedAgenda);
    };    

    return (
        <>
            <CommunityHelpHeader onBack={handleBack} />
                <div className="community-help-page">
                    {/* Calendar */}
                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                    {/* Agenda */}
                    <Agenda agendaData={agendaData} selectedDate={selectedDate} onCancel={handleCancel} />

                    {/* Buttons */}
                    <div className="help-buttons-container">
                        <button
                            className="offer-help-button"
                            onClick={() => setOfferHelpModalOpen(true)}
                        >
                            Offer Help
                        </button>
                        <button
                            className="get-help-button"
                            onClick={() => setGetHelpModalOpen(true)}
                        >
                            Get Help
                        </button>
                    </div>
                </div>

                {/* Modals */}
                {isOfferHelpModalOpen && (
                    <Modal onClose={() => setOfferHelpModalOpen(false)} title="Offer Help">
                        <p>Placeholder for Offer Help functionality</p>
                    </Modal>
                )}
                {isGetHelpModalOpen && (
                    <Modal onClose={() => setGetHelpModalOpen(false)} title="Get Help">
                        <p>Placeholder for Get Help functionality</p>
                    </Modal>
                )}
        </>
    );
};

export default CommunityHelp;