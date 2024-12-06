import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/MaintenanceRequests/Header";
import "../styles/MaintenanceRequest.css";



const MaintenanceRequest = () => {
    const { id } = useParams();
    const [requests, setRequests] = useState(JSON.parse(localStorage.getItem("requests")) || {});
    const [request, setRequest] = useState((JSON.parse(localStorage.getItem("requests")) || {})[id] || {});
    const navigate = useNavigate();

    // save requests to local storage
    useEffect(() => {
        localStorage.setItem("requests", JSON.stringify(requests));
    }, [requests]);

    const handleStart = () => {
        const updatedRequest = { ...request, status: "Request Processing", isNew: false, time: Date.now() };
        setRequests({ ...requests, [id]: updatedRequest });
        setRequest(updatedRequest);
    }

    const handleFinish = () => {
        const updatedRequest = { ...request, status: "Request Finished", time: Date.now(), isFinished: true };
        setRequests({ ...requests, [id]: updatedRequest });
        setRequest(updatedRequest);
    }

    const handleBack = () => {
        navigate("/maintenance-manager");
    }

    return (
        <>
            <Header
                title={request.title || "Request Not Found"}
                back={{ onClick: handleBack, label: "Back" }}
            />
            <div className="request-details">
                <div className="details-section">
                    <p>
                    <strong>Time:</strong> <span>{new Date(request.time).toLocaleString()}</span>
                    </p>
                    <p>
                    <strong>Building:</strong> <span>{request.building}</span>
                    </p>
                    <p>
                    <strong>Room:</strong> <span>{request.room}</span>
                    </p>
                    <p>
                    <strong>Location:</strong> <span>{request.location}</span>
                    </p>
                    <p>
                    <strong>Description:</strong> <span>{request.description}</span>
                    </p>
                    <p>
                    <strong>Contact:</strong> <span>{request.contact}</span>
                    </p>
                    <p>
                    <strong>Status:</strong> <span>{request.status}</span>
                    </p>
                </div>
            </div>
            <div className="actions">
                {request.status === "Request Finished" ? (
                <button
                    className="action-button back enabled"
                    onClick={handleBack}
                >
                    Back
                </button>
                ) : (
                <>
                    <button
                        className={`action-button start ${
                            request.status === "Request Submitted" ? "enabled" : "disabled"
                        }`}
                        onClick={handleStart}
                        disabled={request.status !== "Request Submitted"}
                    >
                        ▶ Start Processing
                    </button>
                    <button
                        className={`action-button finish ${
                            request.status === "Request Processing" ? "enabled" : "disabled"
                        }`}
                        onClick={handleFinish}
                        disabled={request.status !== "Request Processing"}
                    >
                        ✔ Finish Request
                    </button>
                </>
                )
            }
            </div>
        </>
    );
};

export default MaintenanceRequest;