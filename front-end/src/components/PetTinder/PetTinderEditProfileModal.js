import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Avatar } from "@mui/material";
import { savePhoto, saveProfile } from "../../utils/indexedDB";

const EditProfileModal = ({ open, onClose, currentUser, onUpdate }) => {
    const [editedName, setEditedName] = useState(currentUser?.userName || "");
    const [previewPhoto, setPreviewPhoto] = useState(currentUser?.userPhoto || "");

    useEffect(() => {
        if (currentUser) {
            setEditedName(currentUser.userName || "");
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
        const updatedUser = { ...currentUser, userName: editedName };
        await saveProfile(updatedUser); // Save to IndexedDB
        onUpdate(updatedUser); // Update state in parent
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
                        backgroundColor: "#007aff",
                        color: "white",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#005bb5" },
                    }}
                >
                    Change Photo
                    <input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                </Button>
                <TextField
                    label="Display Name"
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
                    }}
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
                        backgroundColor: "#007aff",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#005bb5" },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;