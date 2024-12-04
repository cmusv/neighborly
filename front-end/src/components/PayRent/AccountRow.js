import React from "react";
import "../../styles/PayRent.css";
import { DoubleRightOutlined } from "@ant-design/icons";

const AccountRow = ({ account, onClick }) => {
  return (
    <div
      className="account-row cursor-pointer flex justify-between items-center hover:bg-gray-100 py-3 px-4 rounded"
      onClick={() => onClick(account)}
      style={{borderBottom:"1px solid #ccc"}}
      
    >
      {/* 账号信息 */}
      <div className="narrow-row-font" style={{marginBottom:"2vh"}}>{account.name}</div>

      {/* 图标区域 */}
      <div>
        <DoubleRightOutlined style={{color:"#ccc", marginRight:"3vw", marginTop:"1vh"}}/>
      </div>
    </div>
  );
};

export default AccountRow;