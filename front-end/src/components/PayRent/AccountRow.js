import React from "react";
import "../../styles/PayRent.css";

const AccountRow = ({ account, onDetailClick, onPayClick }) => {
  return (
    <div
      className="account-row"
    >
      {/* 账号信息 */}
      <div className="narrow-row-font">{account.name}</div>

      {/* 按钮区域 */}
      <div className="flex item-center">
        {/* Detail 按钮 */}
        <button
          className="short-pay-button"
          onClick={() => onDetailClick(account)}
          style={{ marginRight: "3vw", backgroundColor: "#ccc" }}
        >
          Detail
        </button>

        {/* Pay 按钮 */}
        <button
          className="short-pay-button"
          onClick={() => onPayClick(account)}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default AccountRow;