import React from "react";
import "../../styles/RequestEntry.css";

function RequestEntry({ title, priority, isNew, onClick }) {
  // Define priority color classes based on the priority
  const priorityClass = {
    0: "priority-red",
    1: "priority-orange",
    2: "priority-yellow",
  };

  return (
    <div className="request-entry" onClick={onClick}>
      <div className="request-left">
        <span
          className={`priority-dot ${
            priorityClass[priority] || "priority-yellow"
          }`}
        ></span>
        <span
          className={`request-title ${
            isNew ? "text-active" : "text-inactive"
          }`}
        >
          {title}
        </span>
      </div>
      <div className="request-right">
        <button className="detail-button">Detail</button>
        <span className="arrow-icon">›</span>
      </div>
    </div>
  );
}

export default RequestEntry;