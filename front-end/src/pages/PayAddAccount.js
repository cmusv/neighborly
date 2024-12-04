import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/PayRent.css";
import { successModalConfig } from "../components/PayRent/ModalConfig";
import { Modal } from "antd";
import PaymentHeader from "../components/Header/PaymentHeader";
import TextField from "@mui/material/TextField";

const PayAddAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 0, current_balance = 0 } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBackHome = () => {
    navigate("/pay-rent", {
      state: { updatedBalance: current_balance + amount },
    });
  };

  const handleConfirm = () => {
    if (!/^\d{16}$/.test(cardNumber)) {
      setErrorMessage("Card Number must be a 16-digit number.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setErrorMessage("CVV must be a 3-digit number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expirationDate)) {
      setErrorMessage("Expiration Date must be in MM/YYYY format.");
      return;
    }

    const lastFourDigits = cardNumber.slice(-4);

    setErrorMessage("");
    Modal.confirm({
      ...successModalConfig,
      title: "Account Successfully Added",
      content: "You have successfully added a payment account.",
      onOk: () => {
        navigate("/select-account", {
          state: {
            current_balance,
            amount,
            newAccount: {
              name: `${firstName} ${lastName} - ${lastFourDigits}`,
              cardNumber,
              expirationDate,
              cvv,
            },
          },
        });
      },
    });
  };

  const handleBack = () => {
    navigate("/", {
      state: { current_balance, amount },
    });
  };

  return (
    <>
      <PaymentHeader onBack={handleBack} />
      <div className="pay-rent-container">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-6 text-center">Add Account</h2>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <form className="space-y-4">
            <div className="info-container">
              <div className="narrow-row">
                <TextField
                  label="Card Number"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter 16-digit Card Number"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                      color: "#F2A600",
                    },
                  }}
                />
              </div>
              <div className="narrow-row">
                <TextField
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Your First Name"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                      color: "#F2A600",
                    },
                  }}
                />
              </div>
              <div className="narrow-row">
                <TextField
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Your Last Name"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                      color: "#F2A600",
                    },
                  }}
                />
              </div>
              <div className="narrow-row">
                <TextField
                  label="Expiration Date"
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="MM/YYYY"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                      color: "#F2A600",
                    },
                  }}
                />
              </div>
              <div className="narrow-row">
                <TextField
                  label="CVV"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter 3-digit CVV"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                      color: "#F2A600",
                    },
                  }}
                />
              </div>
              <button
                onClick={handleBackHome}
                className="back-button"
                style={{ marginTop: "8vh" }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="pay-button w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                style={{ width: "35%" }}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PayAddAccount;