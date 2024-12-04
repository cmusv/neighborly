import React from "react";
import Header from "../components/MaintenanceRequests/Header";
import { useNavigate } from "react-router-dom";

const MaintenanceResident = () => {
    const navigate = useNavigate();
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
        </>
    );
};

export default MaintenanceResident;