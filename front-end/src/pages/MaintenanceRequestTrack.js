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

    // check contact format
    const matchContact = /^((\+?\d{1,2}\s?)?(\(\d{3}\)?|\d{3})[\s.-]?\d{3}[\s.-]?\d{4})|([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/;
    const isFormValid =
        formData.title &&
        formData.building &&
        formData.room &&
        formData.location &&
        formData.description &&
        matchContact.test(formData.contact);

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
                back={{ onClick: handleBack, label: "Back" }}
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
                        type="tel"
                        name="contact"
                        placeholder="(000) 000-0000"
                        className={`input-field ${formData.contact === "" || matchContact.test(formData.contact) ? "" : "invalid"}`}
                        value={formData.contact}
                        onChange={handleChange}
                    />
                    </label>
                    </form>
                ) : (
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
                )}
            </div>
            <div className="actions">
                {isNew ?
                    <button className={`action-button submit ${isFormValid ? "enabled" : "disabled"}`} onClick={handleSubmit} disabled={!isFormValid}>
                    Submit
                    </button> : <p className="success-message">{request.status}</p>
                }
                <button className="action-button back enabled" onClick={handleBack}>Back</button>
            </div>
        </>
    );
};

export default MaintenanceRequestTrack;