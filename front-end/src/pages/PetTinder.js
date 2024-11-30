import React, { useState, useEffect } from "react";
import { initDatabase, addPetProfile, getPetProfiles } from "../database/sqliteDB";

const PetTinder = () => {
    const [profiles, setProfiles] = useState([]);
    const [newProfile, setNewProfile] = useState({
        userName: "",
        userPhoto: "",
        nextAvailableTime: "",
        userLiked: [],
    });

    useEffect(() => {
        const initializeDb = async () => {
            await initDatabase();
            fetchProfiles();
        };
        initializeDb();
    }, []);

    const fetchProfiles = () => {
        const profilesData = getPetProfiles();
        setProfiles(profilesData);
    };

    const handleAddProfile = () => {
        const { userName, userPhoto, nextAvailableTime, userLiked } = newProfile;
        addPetProfile(userName, userPhoto, nextAvailableTime, userLiked);
        fetchProfiles();
        setNewProfile({ userName: "", userPhoto: "", nextAvailableTime: "", userLiked: [] });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProfile({ ...newProfile, [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewProfile({ ...newProfile, userPhoto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1>Pet Tinder Profiles</h1>
            <div>
                <h2>Add New Profile</h2>
                <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    value={newProfile.userName}
                    onChange={handleInputChange}
                />
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                <input
                    type="text"
                    name="nextAvailableTime"
                    placeholder="Next Available Time"
                    value={newProfile.nextAvailableTime}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddProfile}>Add Profile</button>
            </div>
            <div>
                <h2>Profiles</h2>
                <ul>
                    {profiles.map((profile, index) => (
                        <li key={index}>
                            <h3>{profile.userName}</h3>
                            {profile.userPhoto && (
                                <img
                                    src={profile.userPhoto}
                                    alt={`${profile.userName}'s profile`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            )}
                            <p>Next Available: {profile.nextAvailableTime}</p>
                            <p>Liked: {profile.userLiked.join(", ") || "No likes yet."}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PetTinder;