import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/MaintenanceRequests/Header";
import "../styles/MaintenanceRequest.css";



const MaintenanceRequestTrack = () => {
    const { id } = useParams();
    const [requests, setRequests] = useState(JSON.parse(localStorage.getItem("requests")) || {});
    const [request, setRequest] = useState(requests[id] || {});
    const navigate = useNavigate();

    // save requests to local storage
    useEffect(() => {
        localStorage.setItem("requests", JSON.stringify(requests));
    }, [requests]);

    const isNew = Object.keys(request).length === 0;
    const [formData, setFormData] = useState({
        title: "",
        building: "",
        room: "",
        location: "",
        description: "",
        contact: "",
    });

    const isFormValid =
        formData.title &&
        formData.building &&
        formData.room &&
        formData.location &&
        formData.description &&
        formData.contact;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Math.max(...Object.keys(requests).map(Number), 0) + 1;
        const newRequest = {
            ...formData,
            id: id,
            time: Date.now(),
            isNew: true,
            isFinished: false,
            priority: Math.floor(Math.random() * 3),
            status: "Request Submitted",
        }
        setRequests({
            ...requests,
            [id]: newRequest
        });
        setRequest(newRequest);
    }

    const handleBack = () => {
        navigate("/maintenance-resident");
    }

    return (
        <>
            <Header
                title={isNew ? "New Request" : request.title}
                back={{ onClick: handleBack, label: "My Requests" }}
            />
            <div className="request-details">
                {isNew ? (
                    <form className="details-section">
                    <label>
                    <strong>Title:</strong>
                    <input
                        type="text"
                        name="title"
                        placeholder="issue name"
                        className="input-field"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    <strong>Building:</strong>
                    <input
                        type="text"
                        name="building"
                        placeholder="00"
                        className="input-field"
                        value={formData.building}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    <strong>Room:</strong>
                    <input
                        type="text"
                        name="room"
                        placeholder="0000"
                        className="input-field"
                        value={formData.room}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    <strong>Location:</strong>
                    <input
                        type="text"
                        name="location"
                        placeholder="location for maintenance"
                        className="input-field"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    </label>
                    <label>
                    <strong>Description:</strong>
                    <textarea
                        name="description"
                        placeholder="issue description"
                        className="textarea-field"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    </label>
                    <label>
                    <strong>Contact:</strong>
                    <input
                        type="text"
                        name="contact"
                        placeholder="(000) 000-0000"
                        className="input-field"
                        value={formData.contact}
                        onChange={handleChange}
                    />
                    </label>
                    </form>
                ) : (
                    <div className="details-section">
                        <p>
                            <strong>Time:</strong> {new Date(request.time).toLocaleString()}
                        </p>
                        <p>
                            <strong>Building:</strong> {request.building}
                        </p>
                        <p>
                            <strong>Room:</strong> {request.room}
                        </p>
                        <p>
                            <strong>Location:</strong> {request.location}
                        </p>
                        <p>
                            <strong>Description:</strong> {request.description}
                        </p>
                        <p>
                            <strong>Contact:</strong> {request.contact}
                        </p>
                        <p>
                            <strong>Status:</strong> {request.status}
                        </p>
                    </div>
                )}
            </div>
            <div className="actions">
                {isNew ?
                    <button className={`action-button submit ${isFormValid ? "enabled" : "disabled"}`} onClick={handleSubmit} disabled={!isFormValid}>
                    Submit
                    </button> : <p className="success-message">Request Submitted</p>
                }
                <button className="action-button back enabled" onClick={handleBack}>Back</button>
            </div>
        </>
    );
};

export default MaintenanceRequestTrack;