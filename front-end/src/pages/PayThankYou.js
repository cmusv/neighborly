import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader"; 
import "../styles/PayRent.css";

const PayThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { current_balance, addedAmount = 0 } = location.state || {};

    const handleBackHome = () => {
        navigate("/pay-rent", {
            state: { updatedBalance: current_balance + addedAmount },
        });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <>
            <PaymentHeader onBack={handleBack} />
            
            <div className="pay-rent-container" style={{ textAlign: 'center' }}>
            <h2 className="balance-text" style={{ marginBottom: "8vh" }}>Thank you, Ruth!</h2>
                
                <div className="info-container" style={{ marginBottom: "8vh" }}>
                    <div className="row">
                        <div className="cell label">Your Current Balance:</div>
                        <div className="cell value">${(current_balance + addedAmount).toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="cell label">Amount Due by 11/15/2024:</div>
                        <div className="cell value">$3000</div>
                    </div>
                </div>
                <div>
                    <p className="payment-info-small">We have received your payment.</p>
                    <p className="payment-info">Home Page will take up to 24 hours to update.</p>
                </div>
                
                <button
                    onClick={handleBackHome}
                    className="pay-button"
                    style={{ marginTop: "8vh" }}
                >
                    Back
                </button>
            </div>
        </>
    );
};

export default PayThankYou;