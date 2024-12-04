import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../styles/CommunityHelpHeader.css";

const PaymentHeader = ({ onBack }) => {
    return (
        <header className="community-help-header">
            {/* Home + Arrow Clickable Container */}
            <div className="header-left" onClick={onBack}>
                <ArrowLeftOutlined className="back-icon" />
                <span className="home-text">Home</span>
            </div>
            {/* Centered Title */}
            <h1 className="header-title">Online Payment</h1>
        </header>
    );
};

export default PaymentHeader;