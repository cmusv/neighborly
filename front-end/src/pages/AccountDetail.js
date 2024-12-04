import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader";

const AccountDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, firstName, lastName, expirationDate, cvv } =
    location.state.account || {};

  const handleBack = () => {
    navigate("/select-account");
  };

  return (
    <>
      <PaymentHeader onBack={handleBack} />
      <div className="pay-rent-container">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-6 text-center">Account Information</h2>

          <div className="info-container space-y-4">
            <div className="narrow-row">
              <div className="cell label">Card Number:</div>
              <div className="cell value">{cardNumber}</div>
            </div>
            <div className="narrow-row">
              <div className="cell label">First Name:</div>
              <div className="cell value">{firstName}</div>
            </div>
            <div className="narrow-row">
              <div className="cell label">Last Name:</div>
              <div className="cell value">{lastName}</div>
            </div>
            <div className="narrow-row">
              <div className="cell label">Expiration Date:</div>
              <div className="cell value">{expirationDate}</div>
            </div>
            <div className="narrow-row">
              <div className="cell label">CVV:</div>
              <div className="cell value">{cvv}</div>
            </div>
          </div>

          <button
            className="pay-button bg-gray-300 text-gray-700 hover:bg-gray-400 w-full mt-6"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;