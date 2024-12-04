import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/PayRent.css";
import { successModalConfig } from "../components/PayRent/ModalConfig";
import { Modal } from "antd";
import PaymentHeader from "../components/Header/PaymentHeader";

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
    // 验证 Card Number 是否为16位数字
    if (!/^\d{16}$/.test(cardNumber)) {
      setErrorMessage("Card Number must be a 16-digit number.");
      return;
    }

    // 验证 CVV 是否为3位数字
    if (!/^\d{3}$/.test(cvv)) {
      setErrorMessage("CVV must be a 3-digit number.");
      return;
    }

    // 验证 Expiration Date 是否为 MM/YYYY 格式
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expirationDate)) {
      setErrorMessage("Expiration Date must be in MM/YYYY format.");
      return;
    }

    // 提取卡号的最后四位
    const lastFourDigits = cardNumber.slice(-4);

    // 如果验证通过
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
          {/* Header */}
          <h2 className="text-lg font-bold mb-6 text-center">Add Account</h2>

          {/* Error Message */}
          {errorMessage && (
            <p className="error-msg">{errorMessage}</p>
          )}

          {/* Form */}
          <form className="space-y-4">
            <div className="info-container">
              <div className="narrow-row">
                <div className="cell label">Card Number</div>
                <div className="cell value">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter 16-digit Card Number"
                    className="amount-input"
                    style={{ width: "50vw" }}
                  />
                </div>
              </div>
              <div className="narrow-row">
                <div className="cell label">First Name</div>
                <div className="cell value">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter Your First Name"
                    className="amount-input"
                    style={{ width: "50vw" }}
                  />
                </div>
              </div>
              <div className="narrow-row">
                <div className="cell label">Last Name</div>
                <div className="cell value">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Your Last Name"
                    className="amount-input"
                    style={{ width: "50vw" }}
                  />
                </div>
              </div>
              <div className="narrow-row">
                <div className="cell label">Expiration Date</div>
                <div className="cell value">
                  <input
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    placeholder="MM/YYYY"
                    className="amount-input"
                    style={{ width: "50vw" }}
                  />
                </div>
              </div>
              <div className="narrow-row">
                <div className="cell label">CVV</div>
                <div className="cell value">
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="Enter 3-digit CVV"
                    className="amount-input"
                    style={{ width: "50vw" }}
                  />
                </div>
              </div>
              <button
                    onClick={handleBackHome}
                    className="back-button"
                    style={{ marginTop: "8vh"}}
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