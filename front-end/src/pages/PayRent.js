import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader";
import "../styles/PayRent.css";

const PayRent = () => {
  const [amount, setAmount] = useState(""); // 支付金额
  const [current_balance, setCurrentBalance] = useState(() => {
    // 尝试从 localStorage 获取当前余额
    const storedBalance = localStorage.getItem("current_balance");
    return storedBalance ? parseFloat(storedBalance) : 1000; // 默认值为 1000
  });
  const [isPayEnabled, setIsPayEnabled] = useState(false); // 是否启用支付按钮
  const [statusMessage, setStatusMessage] = useState("Your upcoming November bill is due in 4 days."); // 状态消息
  const navigate = useNavigate();
  const location = useLocation();

  // 从 Thank You Page 返回时更新余额和状态消息
  useEffect(() => {
    if (location.state?.updatedBalance !== undefined) {
      const { updatedBalance } = location.state; // 从 Thank You Page 获取更新后的余额
      setCurrentBalance(updatedBalance);

      // 根据余额更新状态消息
      if (updatedBalance >= 3000) {
        setStatusMessage("Thank you for your payment! Your bill is all set.");
      } else {
        setStatusMessage("Your payment is processing.");
      }
    }
  }, [location.state]);

  // 处理支付金额变化
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    setIsPayEnabled(value > 0); // 当金额大于0时启用支付按钮
  };

  // 跳转到选择账户页面
  const handlePay = () => {
    if (amount > 0) {
      navigate("/select-account", {
        state: { amount, current_balance }, // 传递当前余额和支付金额
      });
    } else {
      alert("Please enter a valid amount to pay!");
    }
  };

  return (
    <>
      <PaymentHeader onBack={() => navigate("/")} />

      <div className="pay-rent-container" style={{ textAlign: "center" }}>
        <h2 className="balance-text">Welcome Back, Ruth!</h2>
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
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter Amount"
                className="amount-input"
                style={{ width: "100px" }}
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
    </>
  );
};

export default PayRent;