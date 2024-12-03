import { useNavigate } from "react-router-dom";
import "../styles/PayRent.css";
import { successModalConfig } from "../components/Chat/ModalConfig";
import { Modal } from 'antd';
import PaymentHeader from "../components/Header/PaymentHeader";

const PayAddAccount = () => {
  const navigate = useNavigate();


  const handleConfirm = () => {
    Modal.confirm({
        ...successModalConfig,
        title: 'Account Successfully Added',
        content: 'You have successfully added a payment account.',
        onOk: () => {
            navigate('/select-account');
        }
    });
};

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <PaymentHeader onBack={handleBack} />
      <div className="pay-rent-container">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <h2 className="text-lg font-bold mb-6 text-center">Add Account</h2>

        {/* Form */}
        <form className="space-y-4">
          <div className="info-container">
            <div className="narrow-row">
                <div className="cell label" >Card Number</div>
                <div className="cell value">
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        className="amount-input"
                        style={{ width: "50vw" }}
                    />
                </div>
            </div>
            <div className="narrow-row">
                <div className="cell label" >First Name</div>
                <div className="cell value">
                    <input
                        type="text"
                        placeholder="Enter Your First Name"
                        className="amount-input"
                        style={{ width: "50vw" }}
                    />
                </div>
            </div>
            <div className="narrow-row">
                <div className="cell label" >Last Name</div>
                <div className="cell value">
                    <input
                        type="text"
                        placeholder="Enter Your Last Name"
                        className="amount-input"
                        style={{ width: "50vw" }}
                    />
                </div>
            </div>
            <div className="narrow-row">
                <div className="cell label" >Expiration Date</div>
                <div className="cell value">
                    <input
                        type="text"
                        placeholder="MM/YYYY"
                        className="amount-input"
                        style={{ width: "50vw" }}
                    />
                </div>
            </div>
            <div className="narrow-row">
                <div className="cell label" >CVV</div>
                <div className="cell value">
                    <input
                        type="number"
                        placeholder="Enter Number"
                        className="amount-input"
                        style={{ width: "50vw" }}
                    />
                </div>
            </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="pay-button"
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