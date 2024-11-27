import React, { useState, useEffect } from "react";
import Calendar from "../components/CommunityHelp/Calendar";
import Agenda from "../components/CommunityHelp/Agenda";
import Modal from "../components/CommunityHelp/Modal";
import { initializeLocalStorage } from "../components/CommunityHelp/localStorageInit";
import CommunityHelpHeader from "../components/Header/CommunityHelpHeader";
import { useNavigate } from 'react-router-dom';

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


    return (
        <>
            <CommunityHelpHeader onBack={handleBack} />
            <div className="bg-accent min-h-screen p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Calendar */}
                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                    {/* Agenda */}
                    <Agenda agendaData={agendaData} selectedDate={selectedDate} />

                    {/* Buttons */}
                    <div className="flex flex-col space-y-4">
                        <button
                            className="bg-white text-accent border border-accent rounded px-4 py-2"
                            onClick={() => setOfferHelpModalOpen(true)}
                        >
                            Offer Help
                        </button>
                        <button
                            className="bg-accent text-white rounded px-4 py-2"
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
            </div>
        </>
    );
};

export default CommunityHelp;