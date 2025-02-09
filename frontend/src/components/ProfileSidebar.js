import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Paper, Avatar, Typography, Button, Box, CircularProgress, IconButton, Grid, Card, CardMedia, CardActions,
    Dialog, DialogContent
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ userProfile }) => {
    const [imageGallery, setImageGallery] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userProfile && userProfile._id) {
            fetchUserImages(userProfile._id);
        }
    }, [userProfile]);

    // Fetch User's Gallery Images
    const fetchUserImages = async (userId) => {

    };

    // Handle Image Upload
    const handleImageUpload = async (event) => {

    };

    // Handle Delete Image
    const handleDeleteImage = async (imageUrl) => {

    };

    return (
        <Box
            sx={{
                width: "100%",
                background: "#1e3a8a",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Profile Section */}
            <Avatar
                src={userProfile?.profilePhoto || "/default-avatar.png"}
                sx={{ width: 160, height: 160, borderRadius: "50%", border: "3px solid white" }}
            />
            <Typography variant="h5" fontWeight={700} sx={{ fontSize: "22px", mb: 1 }}>
                {userProfile?.name || "User Name"}
            </Typography>
            <Typography variant="body1">
                Age: {userProfile?.age} | {userProfile?.gender}
            </Typography>
            <Typography variant="body1">
                Location: {userProfile?.native || "Unknown"}
            </Typography>

            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3, width: "100%", borderRadius: "8px", fontSize: "16px", fontWeight: "bold" }}
                onClick={() => navigate("/profile-setup")}
            >
                Edit Profile
            </Button>

            {/* Gallery Section */}
            <Box sx={{ mt: 3, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>My Gallery</Typography>

                    {/* Upload Button */}
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} id="upload-image" />
                    <label htmlFor="upload-image">
                        <IconButton sx={{ background: "rgba(255, 255, 255, 0.3)", p: 1.5, borderRadius: "8px" }} component="span">
                            <AddPhotoAlternateIcon sx={{ fontSize: 28, color: "white" }} />
                        </IconButton>
                    </label>
                </Box>

                {/* Gallery Grid */}
                <Grid container spacing={1} justifyContent="center">
                    {loadingImages ? (
                        <CircularProgress size={24} />
                    ) : imageGallery.length > 0 ? (
                        imageGallery.map((image, index) => (
                            <Grid item key={index}>
                                <Card sx={{
                                    width: 100,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    position: "relative",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.05)" }
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={`http://localhost:5000/${image}`}
                                        sx={{ height: 100, cursor: "pointer", borderRadius: "12px" }}
                                        onClick={() => setSelectedImage(`http://localhost:5000/${image}`)}
                                    />
                                    <CardActions sx={{ position: "absolute", top: 5, right: 5, background: "rgba(0,0,0,0.6)", borderRadius: "50%" }}>
                                        <IconButton onClick={() => handleDeleteImage(image)}>
                                            <DeleteIcon sx={{ fontSize: 18, color: "white" }} />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ textAlign: "center", width: "100%" }}>
                            No images uploaded yet
                        </Typography>
                    )}
                </Grid>
            </Box>

            {/* Full-Screen Image Preview */}
            <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="xs">
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: 0,
                        background: "black",
                        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                        minWidth: "320px",
                        minHeight: "580px",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "20px"
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        sx={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.2)", color: "white" }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Image Display */}
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "20px"
                    }}>
                        <img src={selectedImage} alt="Full View" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ProfileSidebar;
