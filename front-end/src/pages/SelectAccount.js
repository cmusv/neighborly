import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader";
import AccountRow from "../components/PayRent/AccountRow";
import { Modal } from "antd";
import { successModalConfig } from "../components/PayRent/ModalConfig";
import "../styles/PayRent.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, current_balance, newAccount } = location.state || {};

  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts
      ? JSON.parse(storedAccounts)
      : [{ id: 1, name: "Ruth Fiorono - 5678" }];
  });

  useEffect(() => {
    if (newAccount) {
      setAccounts((prevAccounts) => {
        const exists = prevAccounts.some(
          (account) => account.name === newAccount.name
        );

        if (!exists) {
          const updatedAccounts = [
            ...prevAccounts,
            { id: prevAccounts.length + 1, ...newAccount },
          ];
          localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

          return updatedAccounts;
        }

        return prevAccounts;
      });
    }
  }, [newAccount]);

  const handleAddNewAccount = () => {
    navigate("/add-account", {
      state: { amount, current_balance },
    });
  };

  const handlePayClick = (account) => {
    Modal.confirm({
      ...successModalConfig,
      title: "Do you want to pay with this account?",
      content: `You have selected ${account.name} to pay $${amount} for your rent.`,
      onOk: () => {
        navigate("/pay-thank-you", {
          state: { addedAmount: amount, current_balance },
        });
      },
    });
  };

  return (
    <>
      <PaymentHeader onBack={() => navigate("/")} />
      <body style={{backgroundColor:"#FFF8EC"}}>
      <div className="pay-rent-container">
        <h2 className="text-xl font-bold mb-6" style={{ marginTop:"8vh", marginBottom:"5vh"}}>Account</h2>

        {/* 动态渲染账户列表 - 可滚动区域 */}
        <div className="info-container scrollable-list">
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onClick={handlePayClick}
            />
          ))}
        </div>

        {/* Add New Account 按钮 */}
        <div className="mt-8 flex flex-col gap-4 w-full max-w-xs">
          <button
            className="pay-button w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={handleAddNewAccount}
          >
            Add New Account
          </button>
        </div>
      </div>
      </body>
    </>
  );
};

export default PaymentPage;