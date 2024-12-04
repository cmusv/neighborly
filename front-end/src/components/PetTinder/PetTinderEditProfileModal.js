import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Box,
    Avatar,
    MenuItem,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { savePhoto, saveProfile, updateProfileFields} from "../../utils/indexedDB";

const EditProfileModal = ({ open, onClose, currentUser, onUpdate }) => {
    const [editedName, setEditedName] = useState(currentUser?.userName || "");
    const [editedSex, setEditedSex] = useState(currentUser?.sex || "Not specified");
    const [editedNeutered, setEditedNeutered] = useState(currentUser?.neutered || false);
    const [editedApartmentNumber, setEditedApartmentNumber] = useState(currentUser?.apartmentNumber || "");
    const [editedHaveOtherPets, setEditedHaveOtherPets] = useState(currentUser?.haveOtherPets || false);
    const [previewPhoto, setPreviewPhoto] = useState(currentUser?.userPhoto || "");

    useEffect(() => {
        if (currentUser) {
            setEditedName(currentUser.userName || "");
            setEditedSex(currentUser.sex || "Not specified");
            setEditedNeutered(currentUser.neutered || false);
            setEditedApartmentNumber(currentUser.apartmentNumber || "");
            setEditedHaveOtherPets(currentUser.haveOtherPets || false);
            setPreviewPhoto(currentUser.userPhoto || "");
        }
    }, [currentUser]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const photoBase64 = reader.result;
                setPreviewPhoto(photoBase64); // Show preview immediately
                await savePhoto(currentUser.userID, photoBase64); // Save photo to IndexedDB
                onUpdate({ ...currentUser, userPhoto: photoBase64 }); // Update state in parent
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfileChanges = async () => {
        const updatedFields = {
            userName: editedName,
            sex: editedSex,
            neutered: editedNeutered,
            apartmentNumber: editedApartmentNumber,
            haveOtherPets: editedHaveOtherPets,
        };

        await updateProfileFields(currentUser.userID, updatedFields); // Update fields in IndexedDB
        onUpdate({ ...currentUser, ...updatedFields }); // Update state in parent
        onClose(); // Close modal
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                    padding: "16px",
                    maxWidth: "400px",
                    width: "100%",
                    backgroundColor: "#f7f7f7",
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginBottom: "8px",
                }}
            >
                Edit Profile
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px",
                }}
            >
                <Avatar
                    src={previewPhoto || "https://via.placeholder.com/100?text=Profile"}
                    alt={currentUser?.userName || "Profile Photo"}
                    sx={{
                        width: 120,
                        height: 120,
                        marginBottom: "16px",
                        border: "2px solid #e0e0e0",
                    }}
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        marginBottom: "16px",
                        backgroundColor: "#f2A600",
                        color: "white",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#f2A600" },
                    }}
                >
                    Change Photo
                    <input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                </Button>
                <TextField
                    label="Pet Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    sx={{
                        marginBottom: "16px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#F2A600", // Change label color here
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#F2A600", // Change label color when focused
                        },
                    }}
                />
                <TextField
                    select
                    label="Sex"
                    value={editedSex}
                    onChange={(e) => setEditedSex(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    sx={{
                        marginBottom: "16px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#F2A600", // Change label color here
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#F2A600", // Change label color when focused
                        },
                    }}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Not specified">Not specified</MenuItem>
                </TextField>
                <FormControlLabel
                    control={
                        <Switch
                            checked={editedNeutered}
                            onChange={(e) => setEditedNeutered(e.target.checked)}
                        />
                    }
                    label="Neutered"
                    sx={{ marginBottom: "16px" }}
                />
                <TextField
                    label="Apartment Number"
                    value={editedApartmentNumber}
                    onChange={(e) => setEditedApartmentNumber(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    sx={{
                        marginBottom: "16px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#F2A600", // Change label color here
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#F2A600", // Change label color when focused
                        },
                    }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={editedHaveOtherPets}
                            onChange={(e) => setEditedHaveOtherPets(e.target.checked)}
                        />
                    }
                    label="Have Other Pets"
                    sx={{ marginBottom: "16px" }}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "space-between",
                    padding: "0 16px 16px",
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        textTransform: "none",
                        color: "#555",
                        fontWeight: "bold",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={saveProfileChanges}
                    variant="contained"
                    sx={{
                        backgroundColor: "#f2A600",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#f2A600" },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;