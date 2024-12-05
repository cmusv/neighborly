import React, { useState, useEffect } from "react";
import Calendar from "../components/CommunityHelp/Calendar";
import Agenda from "../components/CommunityHelp/Agenda";
import { initializeLocalStorage } from "../components/CommunityHelp/localStorageInit";
import CommunityHelpHeader from "../components/Header/CommunityHelpHeader";
import OfferHelpModal from "../components/CommunityHelp/OfferHelpModal";
import GetHelpModal from "../components/CommunityHelp/GetHelpModal";
import { useNavigate } from 'react-router-dom';
import "../styles/CommunityHelpPage.css";
import { Modal } from "antd";
import '../styles/Modal.css';

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

    const showCancelConfirmation = (itemToCancel, sortedIndex, sortedAgenda) => {
        Modal.confirm({
            className: 'wide-centered-modal',
            title: 'Are you sure you would like to cancel the following event?',
            content: (
                <>
                    <p><strong>Owner:</strong> {itemToCancel.owner}</p>
                    <p><strong>Helper:</strong> {itemToCancel.helper}</p>
                    <p><strong>Time:</strong> {itemToCancel.startTime} - {itemToCancel.endTime}</p>
                    <p><strong>Category:</strong> {itemToCancel.category.join(", ")}</p>
                </>
            ),
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => executeCancel(sortedIndex, sortedAgenda),
        });
    };

    const executeCancel = (sortedIndex, sortedAgenda) => {
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
            helper: itemToCancel.helper,
        };

        const updatedAvailabilities = [...storedAvailabilities, newAvailability];
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify(updatedAvailabilities)
        );

        setAgendaData(updatedAgenda);
    }

    const handleCancel = (sortedIndex, sortedAgenda) => {
        const itemToCancel = sortedAgenda[sortedIndex];
        showCancelConfirmation(itemToCancel, sortedIndex, sortedAgenda);
    };

    const refreshPageData = () => {
        // Refresh agenda and other components after adding/modifying availabilities
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        const filteredAgenda = storedAgenda.filter((item) => item.date === selectedDate);
        setAgendaData(filteredAgenda);

        const storedAvailabilities = JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const hasEvents = storedAgenda.length > 0 || storedAvailabilities.some((item) => item.date === selectedDate);

        setSelectedDate((prev) => {
            if (hasEvents) {
                return prev;
            }
            return prev;
        });
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
                <OfferHelpModal
                    selectedDate={selectedDate}
                    onClose={() => {
                        setOfferHelpModalOpen(false);
                        refreshPageData();
                    }}
                />
            )}
            {/* Placeholder for Get Help Modal */}
            {isGetHelpModalOpen && (
                <GetHelpModal
                    selectedDate={selectedDate}
                    onClose={() => {
                        setGetHelpModalOpen(false);
                        refreshPageData();
                    }}
                    refreshPageData={refreshPageData}
                />
            )}
        </>
    );
};

export default CommunityHelp;