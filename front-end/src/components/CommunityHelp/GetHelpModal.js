import React, { useState, useEffect } from "react";
import "../../styles/GetHelpModal.css";

const GetHelpModal = ({ selectedDate, onClose, refreshPageData }) => {
    const [helpers, setHelpers] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedHelper, setSelectedHelper] = useState(null);
    const [formValues, setFormValues] = useState({
        startTime: "",
        endTime: "",
    });

    // Load available helpers for the selected date
    useEffect(() => {
        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const filteredHelpers = storedAvailabilities.filter(
            (item) => item.date === selectedDate && item.helper !== "Me"
        );
        setHelpers(sortByStartTime(filteredHelpers));
    }, [selectedDate]);

    const sortByStartTime = (items) => {
        return items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12; // Convert to 12-hour format, handle 0 as 12
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    const hasAgendaConflict = (startTime, endTime) => {
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        const filteredAgenda = storedAgenda.filter((item) => item.date === selectedDate);
        return filteredAgenda.some(
            (task) => startTime < task.endTime && endTime > task.startTime
        );
    };

    const handleBook = (helper) => {
        setSelectedHelper(helper);
        setIsBooking(true);
        setFormValues({ startTime: "", endTime: "" });
    };

    // Handle booking confirmation
    const handleConfirmBooking = () => {
        const { startTime, endTime } = formValues;

        if (!startTime || !endTime) {
            alert("Please select both start and end times.");
            return;
        }
        if (startTime >= endTime) {
            alert("Start time must be earlier than end time.");
            return;
        }
        if (startTime < selectedHelper.startTime || endTime > selectedHelper.endTime) {
            alert("The selected time is outside the helper's availability.");
            return;
        }
        if (hasAgendaConflict(startTime, endTime)) {
            alert("The selected time conflicts with your existing agenda.");
            return;
        }

        // Update helper's availability
        const updatedHelperAvailability = {
            ...selectedHelper,
            startTime:
                startTime > selectedHelper.startTime ? selectedHelper.startTime : endTime,
            endTime:
                endTime < selectedHelper.endTime ? selectedHelper.endTime : startTime,
        };

        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const newAvailabilities = storedAvailabilities.filter(
            (item) =>
                !(
                    item.date === selectedDate &&
                    item.startTime === selectedHelper.startTime &&
                    item.endTime === selectedHelper.endTime &&
                    item.helper === selectedHelper.helper
                )
        );
        if (updatedHelperAvailability.startTime < updatedHelperAvailability.endTime) {
            newAvailabilities.push(updatedHelperAvailability);
        }
        localStorage.setItem("community-help-availabilities", JSON.stringify(newAvailabilities));

        // Update user's agenda
        const newTask = {
            date: selectedDate,
            task: "Being Helped",
            owner: "Me",
            helper: selectedHelper.helper,
            startTime,
            endTime,
            category: selectedHelper.categories,
        };
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        localStorage.setItem(
            "community-help-agenda",
            JSON.stringify([...storedAgenda, newTask])
        );

        setIsBooking(false);
        setSelectedHelper(null);
        setFormValues({ startTime: "", endTime: "" });
        alert("Booking confirmed!");
        refreshPageData();
        onClose();
    };

    return (
        <div className="get-help-modal">
            <div className="modal-content">
                <h2 className="modal-title">Available Help for {selectedDate}</h2>

                {/* Close Button */}
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                {/* Helper Cards */}
                {!isBooking &&
                    helpers.map((helper, index) => (
                        <div key={index} className="helper-card">
                            <div className="helper-details">
                                <p>
                                    <strong>Helper:</strong> {helper.helper}
                                </p>
                                <p>
                                    <strong>Available:</strong> {formatTime(helper.startTime)} - {formatTime(helper.endTime)}
                                </p>
                                <p>
                                    <strong>Categories:</strong> {helper.categories.join(", ")}
                                </p>
                            </div>
                            <div className="helper-actions">
                                <button
                                    className="book-button"
                                    onClick={() => handleBook(helper)}
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    ))}

                {/* Booking Form */}
                {isBooking && (
                    <div className="booking-form">
                        <h3>Get Help from {selectedHelper.helper}</h3>
                        <p>{formatTime(selectedHelper.startTime)} - {formatTime(selectedHelper.endTime)}</p>
                        <p>Categories: {selectedHelper.categories.join(", ")}</p>
                        <label>Start Time:</label>
                        <input
                            type="time"
                            value={formValues.startTime}
                            onChange={(e) =>
                                setFormValues({ ...formValues, startTime: e.target.value })
                            }
                        />
                        <label>End Time:</label>
                        <input
                            type="time"
                            value={formValues.endTime}
                            onChange={(e) =>
                                setFormValues({ ...formValues, endTime: e.target.value })
                            }
                        />
                        <div className="booking-actions">
                            <button className="back-button-help" onClick={() => setIsBooking(false)}>
                                Back
                            </button>
                            <button className="confirm-button-help" onClick={handleConfirmBooking}>
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetHelpModal;