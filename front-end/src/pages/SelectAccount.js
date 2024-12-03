import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentHeader from "../components/Header/PaymentHeader";
import AccountRow from "../components/PayRent/AccountRow";
import { Modal } from "antd";
import { successModalConfig } from "../components/Chat/ModalConfig";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { amount, current_balance } = location.state || {};
  const [accounts] = useState([
    { id: 1, name: "Ruth Fiorono - 5678" },
    { id: 2, name: "John Doe - 1234" },
    { id: 3, name: "Jane Smith - 7890" },
  ]);

  const handleSelectAccountClick = () => {
    navigate("/select-account");
  };

  const handleAddNewAccount = () => {
    navigate("/add-account");
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleDetailClick = (account) => {
    console.log("Detail clicked for:", account.name);
  };

  const handlePayClick = (account) => {
    Modal.confirm({
      ...successModalConfig,
      title: 'Do you want to pay with this account?',
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
      <PaymentHeader onBack={handleBack} />
      <div className="pay-rent-container">
        <h2 className="text-xl font-bold mb-6">Account</h2>

        {/* 动态渲染账户列表 */}
        <div className="info-container">
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onDetailClick={handleDetailClick}
              onPayClick={handlePayClick}
            />
          ))}
        </div>

        {/* Add New Account 按钮 */}
        <div className="mt-8 flex flex-col gap-4 w-full max-w-xs">
          <button
            className="pay-button w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => navigate("/add-account")}
          >
            Add New Account
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;