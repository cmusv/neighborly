import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/MaintenanceRequests/Header";
import ActiveSelector from "../components/MaintenanceRequests/ActiveSelector";

const MaintenanceResident = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("unfinished");

    return (
        <>
            <Header
                title="My Requests"
                back={ {onClick: () => navigate("/"), label: "Home"} }
                options={ [
                    {label: "Edit", onClick: () => alert("Edit Clicked")},
                    {label: "Add", onClick: () => navigate("/maintenance/new")}
                ] }
            />
            <ActiveSelector active={activeTab} setActive={setActiveTab} />
        </>
    );
};

export default MaintenanceResident;