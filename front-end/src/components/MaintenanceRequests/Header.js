import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
// import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import "../../styles/ChatHeader.css";

const Header = ({title, back, options}) => {
    return (
        <header className="chat-header">
            <div className="chat-header-left" onClick={back.onClick}>
                <ArrowLeftOutlined className="chat-back-icon" />
                <span className="chat-home-text">{back.label}</span>
            </div>

            <Typography variant="h6" className="chat-title">
                {title}
            </Typography>

            <div className="chat-header-right">
                {options?.map((option, index) => (
                    <button key={index} className="chat-home-text" onClick={option.onClick}>
                        {option.label}
                    </button>
                ))}
            </div>
        </header>
    );
};

export default Header;