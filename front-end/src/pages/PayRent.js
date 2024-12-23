import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import PaymentHeader from "../components/Header/PaymentHeader";
import "../styles/PayRent.css";

const PayRent = () => {
  const [amount, setAmount] = useState("");
  const [current_balance, setCurrentBalance] = useState(() => {
    const storedBalance = localStorage.getItem("current_balance");
    return storedBalance ? parseFloat(storedBalance) : 0;
  });
  const [isPayEnabled, setIsPayEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Your upcoming November bill is due in 4 days.");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updatedBalance !== undefined) {
      const { updatedBalance } = location.state;
      setCurrentBalance(updatedBalance);

      if (updatedBalance >= 3000) {
        setStatusMessage("Thank you for your payment! Your bill is all set.");
      } else {
        setStatusMessage("Your payment is processing.");
      }
    }
  }, [location.state]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    setIsPayEnabled(value > 0);
  };

  const handlePay = () => {
    if (amount > 0) {
      navigate("/select-account", {
        state: { amount, current_balance },
      });
    } else {
      alert("Please enter a valid amount to pay!");
    }
  };

  return (
    <>
      <PaymentHeader onBack={() => navigate("/")} />
      <body style={{overflow:"hidden"}}>
      <div className="pay-rent-container" style={{ textAlign: "center", backgroundColor:"#FFF8EC"}}>
        <h2 className="balance-text" style={{ marginTop:"8vh", marginBottom:"5vh"}}>Welcome Back, Ruth!</h2>
        <p>{statusMessage}</p> {/* 动态显示描述文本 */}

        <div className="info-container">
          <div className="row">
            <div className="cell label">Your Current Balance:</div>
            <div className="cell value">${current_balance.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="cell label">Amount Due by 11/15/2024:</div>
            <div className="cell value">$3000</div>
          </div>
          <div className="row">
            <div className="cell label">Enter Amount:</div>
            <div className="cell value">
            <TextField
                label="Enter Amount in $"
                value={amount}
                onChange={handleAmountChange}
                variant="outlined"
                type="number"
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        height: "4vh",
                    },
                    "& .MuiInputLabel-root": {
                        transform: "translate(14px, 8px) scale(1)",
                        fontSize: "14px",
                        color: "#F2A600",
                    },
                    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
                        transform: "translate(14px, -10px) scale(0.9)",
                        color: "#F2A600",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#F2A600",
                    },
                }}
            />
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={!isPayEnabled}
          className={`pay-button ${isPayEnabled ? "enabled" : "disabled"}`}
        >
          Pay
        </button>
      </div>
      </body>
    </>
  );
};

export default PayRent;