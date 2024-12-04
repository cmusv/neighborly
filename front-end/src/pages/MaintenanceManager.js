import React from "react";
import Header from "../components/MaintenanceRequests/Header";
import { useNavigate } from "react-router-dom";

const MaintenanceManager = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header
                title="Maintenance Requests"
                back={ {onClick: () => navigate("/"), label: "Home"} }
                options={ [
                    {label: "Edit", onClick: () => alert("Edit Clicked")}
                ] }
            />
        </>
    );
};

export default MaintenanceManager;