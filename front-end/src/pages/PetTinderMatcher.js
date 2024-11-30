import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PetTinderMatcher.css";

const PetTinderMatcher = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/pet-tinder");
    };

    return (
        <div className="pet-tinder-dates-container">
            <h1>Your Pet Dates</h1>
            <p>Here you can manage your pet's dates.</p>
            <button className="back-button" onClick={handleBack}>
                Back to Profile
            </button>
        </div>
    );
};

export default PetTinderMatcher;