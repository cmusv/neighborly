import React, { useEffect, useState } from "react";
import "../../styles/Agenda.css";

const Agenda = ({ agendaData, selectedDate, onCancel }) => {
    const [sortedAgenda, setSortedAgenda] = useState([]);

    useEffect(() => {
        // Sort agenda by start time
        const sorted = [...agendaData].sort((a, b) => a.startTime.localeCompare(b.startTime));
        setSortedAgenda(sorted);
    }, [agendaData]);

    // Helper to format time from 24-hour to 12-hour format
    const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    return (
        <div className="agenda-container">
            <h2 className="agenda-title">
                Agenda for{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                    timeZone: "America/Los_Angeles",
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                })}
            </h2>
            {sortedAgenda.length === 0 ? (
                <p className="no-events">No events scheduled for this day.</p>
            ) : (
                <div className="agenda-scrollable">
                    <ul className="agenda-list">
                        {sortedAgenda.map((item, sortedIndex) => (
                            <li
                                key={sortedIndex}
                                className={`agenda-item ${item.task === "Being Helped"
                                        ? "being-helped"
                                        : "helping-others"
                                    }`}
                            >
                                <div className="agenda-details">
                                    <p>
                                        <strong>Owner:</strong> {item.owner}
                                    </p>
                                    <p>
                                        <strong>Helper:</strong> {item.helper}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {formatTime(item.startTime)} -{" "}
                                        {formatTime(item.endTime)}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {item.category}
                                    </p>
                                </div>
                                <button
                                    className="cancel-button"
                                    onClick={() => onCancel(sortedIndex, sortedAgenda)}
                                >
                                    Cancel
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Agenda;
