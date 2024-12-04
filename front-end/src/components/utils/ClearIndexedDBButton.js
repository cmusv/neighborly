import React from "react";
import { clearDatabase } from "../../utils/indexedDB";

const ClearIndexedDBButton = () => {
    const handleClearDB = async () => {
        if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
            await clearDatabase();
            alert("All data cleared from IndexedDB.");
            window.location.reload(); // Reload to reset the app state
        }
    };

    return (
        <button onClick={handleClearDB} style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", display: "none" }}>
            Clear All Data
        </button>
    );
};

export default ClearIndexedDBButton;