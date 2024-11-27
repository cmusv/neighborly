import React, { useState } from "react";
import "../../styles/Calendar.css";

const Calendar = ({ selectedDate, setSelectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const agendaData = JSON.parse(localStorage.getItem("community-help-agenda")) || [];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getWeekdayOffset = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return (firstDayOfMonth.getDay() + 6) % 7; // Adjust to start on Monday
    };

    const getDatesForMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = getDaysInMonth(date);
        const offset = getWeekdayOffset(date);

        const today = new Date().toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" });

        return Array.from({ length: offset + daysInMonth }, (_, i) => {
            if (i < offset) return null; // Empty slots for offset
            const day = i - offset + 1;
            const fullDate = new Date(year, month, day).toLocaleDateString("en-US", {
                timeZone: "America/Los_Angeles",
            });
            const hasAgenda = agendaData.some((item) => item.date === fullDate);
            const isPast = new Date(fullDate) < new Date(today);
            return { date: fullDate, hasAgenda, isPast };
        });
    };

    const dates = getDatesForMonth(currentMonth);

    const handleDateClick = (date) => {
        if (!date.isPast) {
            setSelectedDate(date);
        }
    };

    const handleMonthChange = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    return (
        <div className="calendar-container">
            {/* Header with Month Navigation */}
            <div className="calendar-header">
                <button onClick={() => handleMonthChange(-1)}>&lt;</button>
                <h2>
                    {currentMonth.toLocaleDateString("en-US", {
                        timeZone: "America/Los_Angeles",
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button onClick={() => handleMonthChange(1)}>&gt;</button>
            </div>

            {/* Weekday Headers */}
            <div className="calendar-weekdays">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {dates.map((dateInfo, index) =>
                    dateInfo ? (
                        <button
                            key={index}
                            className={`date-button ${
                                selectedDate === dateInfo.date ? "selected" : ""
                            } ${dateInfo.isPast ? "past" : ""}`}
                            onClick={() => handleDateClick(dateInfo.date)}
                            disabled={dateInfo.isPast}
                        >
                            {new Date(dateInfo.date).getDate()}
                            {dateInfo.hasAgenda && <span className="agenda-dot"></span>}
                        </button>
                    ) : (
                        <div key={index} className="empty-slot"></div>
                    )
                )}
            </div>
        </div>
    );
};

export default Calendar;
