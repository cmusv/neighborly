import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader"; 
import "../styles/PayRent.css";

const PayThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { current_balance, addedAmount = 0 } = location.state || {}; // 获取余额和支付金额

    const handleBack = () => {
        navigate("/pay-rent", {
            state: { updatedBalance: current_balance + addedAmount }, // 返回新余额到 PayRent
        });
    };

    return (
        <>
            <PaymentHeader onBack={handleBack} />
            
            <div className="pay-rent-container" style={{ textAlign: 'center' }}>
                <h2 className="balance-text">Thank you, Ruth!</h2>
                <p>We have received your payment. Home Page will take up to 24 hours to update.</p>
                
                <div className="info-container">
                    <div className="row">
                        <div className="cell label">Your Current Balance:</div>
                        <div className="cell value">${(current_balance + addedAmount).toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="cell label">Amount Due by 11/15/2024:</div>
                        <div className="cell value">$3000</div>
                    </div>
                </div>
                
                <button
                    onClick={handleBack}
                    className="pay-button"
                >
                    Back to Home
                </button>
            </div>
        </>
    );
};

export default PayThankYou;