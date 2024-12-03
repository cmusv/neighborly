import React, { useState, useEffect } from "react";
import "../../styles/OfferHelpModal.css";
import { Modal } from "antd";
import '../../styles/Modal.css';

const OfferHelpModal = ({ selectedDate, onClose }) => {
    const [availabilities, setAvailabilities] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [formValues, setFormValues] = useState({
        startTime: "",
        endTime: "",
        categories: [],
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const helpCategories = [
        "Child Sitting",
        "Cleaning",
        "Cooking",
        "Elderly Care",
        "Event Assistance",
        "Fitness & Wellness",
        "Gardening",
        "General Help",
        "Handyman Work",
        "Language Support",
        "Moving Help",
        "Pet Sitting",
        "Study Help",
        "Tech",
        "Transportation",
    ];

    // Load availabilities from localStorage for the selected date
    useEffect(() => {
        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const filteredAvailabilities = storedAvailabilities.filter(
            (item) => item.date === selectedDate && item.helper === "Me"
        );
        setAvailabilities(sortByStartTime(filteredAvailabilities));
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

    const hasOverlap = (startTime, endTime, excludeIndex = null) => {
        return availabilities.some((item, index) => {
            if (excludeIndex !== null && index === excludeIndex) return false; // Ignore the current item if editing
            return (
                (startTime < item.endTime && endTime > item.startTime) // Overlap condition
            );
        });
    };

    const hasAgendaConflict = (startTime, endTime) => {
        const storedAgenda = JSON.parse(localStorage.getItem("community-help-agenda")) || [];
        const filteredAgenda = storedAgenda.filter((item) => item.date === selectedDate);
        return filteredAgenda.some(
            (task) => startTime < task.endTime && endTime > task.startTime
        );
    };

    const handleConfirm = () => {
        const { startTime, endTime, categories } = formValues;

        if (!startTime || !endTime || categories.length === 0) {
            alert("Please fill in all fields (start time, end time, and categories).");
            return;
        }

        if (startTime >= endTime) {
            alert("Start time must be earlier than end time.");
            return;
        }

        if (hasOverlap(startTime, endTime, editingIndex)) {
            alert("The time slot overlaps with an existing availability.");
            return;
        }

        if (hasAgendaConflict(startTime, endTime)) {
            alert("The selected time conflicts with your existing agenda.");
            return;
        }

        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        if (durationMinutes < 15) {
            alert("The availability duration must be at least 15 minutes - so you can have enough time to help your neighbor :)");
            return;
        }

        const newAvailability = {
            date: selectedDate,
            startTime,
            endTime,
            categories,
            helper: "Me",
        };

        // If editing, replace the existing item
        let updatedAvailabilities;
        if (editingIndex !== null) {
            updatedAvailabilities = [...availabilities];
            updatedAvailabilities[editingIndex] = newAvailability;
        } else {
            updatedAvailabilities = [...availabilities, newAvailability];
        }

        setAvailabilities(sortByStartTime(updatedAvailabilities));

        // Update localStorage
        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const otherAvailabilities = storedAvailabilities.filter(
            (item) => !(item.date === selectedDate && item.helper === "Me")
        );
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify([...otherAvailabilities, ...updatedAvailabilities])
        );

        // Reset form and exit adding mode
        setIsAdding(false);
        setEditingIndex(null);
        setFormValues({ startTime: "", endTime: "", categories: [] });
    };

    const showCancelConfirmation = (availability, index) => {
        Modal.confirm({
            className: "wide-centered-modal",
            title: "Are you sure you would like to cancel this availability?",
            content: (
                <>
                    <p><strong>Time:</strong> {formatTime(availability.startTime)} - {formatTime(availability.endTime)}</p>
                    <p><strong>Categories:</strong> {availability.categories.join(", ")}</p>
                </>
            ),
            okText: "Yes",
            cancelText: "Cancel",
            onOk: () => executeCancel(index),
        });
    };

    const executeCancel = (index) => {
        const updatedAvailabilities = availabilities.filter((_, i) => i !== index);

        // Update local storage
        const storedAvailabilities =
            JSON.parse(localStorage.getItem("community-help-availabilities")) || [];
        const updatedStoredAvailabilities = storedAvailabilities.filter(
            (item) =>
                item.date !== selectedDate ||
                availabilities[index].startTime !== item.startTime ||
                availabilities[index].endTime !== item.endTime
        );
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify(sortByStartTime(updatedStoredAvailabilities))
        );

        setAvailabilities(updatedAvailabilities);
    }

    const handleCancel = (index) => {
        const availabilityToCancel = availabilities[index];
        showCancelConfirmation(availabilityToCancel, index);
    };

    return (
        <div className="offer-help-modal">
            <div className="modal-content">
                <h2 className="modal-title">Manage Availability for {selectedDate}</h2>

                {/* Close Button */}
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                {/* Existing Availabilities */}
                <div className="availability-list">
                    {availabilities.map((item, index) => (
                        <div key={index} className="availability-card">
                            <p>
                                {formatTime(item.startTime)} - {formatTime(item.endTime)} | {item.categories.join(", ")}
                            </p>
                            <div className="availability-actions">
                                <button
                                    className="modify-button"
                                    onClick={() => {
                                        setIsAdding(true);
                                        setEditingIndex(index); // Track which item is being edited
                                        setFormValues({
                                            startTime: item.startTime,
                                            endTime: item.endTime,
                                            categories: item.categories,
                                        });
                                    }}
                                >
                                    Modify
                                </button>
                                <button
                                    className="avail-cancel-button"
                                    onClick={() => handleCancel(index)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add or Modify Form */}
                {isAdding && (
                    <div className="add-form">
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

                        {/* Help Type Section */}
                        <label>Help Type:</label>
                        <div className="checkbox-group">
                            {helpCategories.map((category) => (
                                <label key={category} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={formValues.categories.includes(category)}
                                        onChange={(e) => {
                                            const newCategories = e.target.checked
                                                ? [...formValues.categories, category]
                                                : formValues.categories.filter((cat) => cat !== category);
                                            setFormValues({ ...formValues, categories: newCategories });
                                        }}
                                    />
                                    <span className="checkbox-custom"></span>
                                    {category}
                                </label>
                            ))}
                        </div>

                        <button className="confirm-button" onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                )}

                {/* Add New Availability Button */}
                {!isAdding && (
                    <button
                        className="add-button"
                        onClick={() => {
                            setIsAdding(true);
                            setEditingIndex(null); // Reset editingIndex
                        }}
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default OfferHelpModal;
