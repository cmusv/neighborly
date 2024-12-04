import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/MaintenanceRequests/Header";
import ActiveSelector from "../components/MaintenanceRequests/ActiveSelector";
import RequestEntry from "../components/MaintenanceRequests/RequestEntry";


const MaintenanceResident = () => {
    const navigate = useNavigate();
    // initialize from local storage
    const [requests, setRequests] = useState(JSON.parse(localStorage.getItem("requests")) || []);
    const [activeTab, setActiveTab] = useState("unfinished");

    // save to local storage
    useEffect(() => {
        localStorage.setItem("requests", JSON.stringify(requests));
    }, [requests]);

    return (
        <>
            <Header
                title="My Requests"
                back={ {onClick: () => navigate("/"), label: "Home"} }
                options={ [
                    // {label: "Edit", onClick: () => alert("Edit Clicked")},
                    {label: "Add", onClick: () => navigate("/maintenance-request-track/new")}
                ] }
            />
            <ActiveSelector active={activeTab} setActive={setActiveTab} />
            <div className="request-list">
                {/* sort by isNew then priority */}
                {Object.values(requests)
                    .filter((request) => activeTab === "unfinished" ? !request.isFinished : request.isFinished)
                    .sort((a, b) => b.isNew - a.isNew || a.priority - b.priority || a.id - b.id)
                    .map((request, index) => (
                        <RequestEntry
                            key={index}
                            title={request.title}
                            priority={request.priority}
                            isNew={request.isNew}
                            onClick={() => navigate(`/maintenance-request-track/${request.id}`)}
                        />
                    ))}
            </div>
        </>
    );
};

export default MaintenanceResident;