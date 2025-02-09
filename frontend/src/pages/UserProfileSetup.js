import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stepper, Step, StepLabel, Typography, Container, Avatar, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://fullstack-matrimony-app-backend.onrender.com";

const steps = ["Basic Info", "Personal Details", "Education & Work", "Lifestyle", "Family", "Upload Photo"];

const ProfileSetup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        dob: "",
        bio: "",
        religion: "",
        caste: "",
        motherTongue: "",
        education: "",
        occupation: "",
        income: "",
        height: "",
        weight: "",
        diet: "",
        drinking: "",
        smoking: "",
        fatherName: "",
        motherName: "",
        siblings: "",
        native: "",
        preferredAge: [25, 30],
        preferredHeight: [5.0, 6.2],
        preferredLocation: "",
        profilePhoto: null,
        gallery: [],
    });

    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login");
            return;
        }

        const savedData = JSON.parse(localStorage.getItem("profileData"));
        if (savedData) {
            setFormData(savedData);
            setActiveStep(savedData.lastCompletedStep || 0);
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        localStorage.setItem("profileData", JSON.stringify({ ...formData, lastCompletedStep: activeStep }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
        localStorage.setItem("profileData", JSON.stringify({ ...formData, lastCompletedStep: activeStep + 1 }));
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePhoto: file });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser || !storedUser._id) {
                navigate("/login");
                return;
            }

            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "profilePhoto" && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                } else if (Array.isArray(formData[key])) {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            formDataToSend.append("userId", storedUser._id);

            const response = await axios.post("http://localhost:5000/api/matrimony-sadha-dev/profile", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                localStorage.removeItem("profileData");
                navigate("/profile-card"); // ✅ Navigate to Profile Card
            }
        } catch (error) {
            console.error("Error submitting profile:", error);
        }
        setLoading(false);
    };


    // const handleSubmit = async () => {
    //     setLoading(true);
    //     try {
    //         const storedUser = JSON.parse(localStorage.getItem("user"));
    //         const formDataToSend = new FormData();
    //         Object.keys(formData).forEach((key) => {
    //             if (key === "profilePhoto" && formData[key]) {
    //                 formDataToSend.append(key, formData[key]);
    //             } else if (Array.isArray(formData[key])) {
    //                 formDataToSend.append(key, JSON.stringify(formData[key]));
    //             } else {
    //                 formDataToSend.append(key, formData[key]);
    //             }
    //         });

    //         formDataToSend.append("userId", storedUser._id);

    //         const response = await axios.post(API_BASE_URL, formDataToSend, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         if (response.status === 201) {
    //             localStorage.removeItem("profileData");
    //             navigate("/profile-card");
    //         }
    //     } catch (error) {
    //         console.error("Error submitting profile:", error);
    //     }
    //     setLoading(false);
    // };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <TextField label="Full Name" name="name" fullWidth value={formData.name} onChange={handleChange} margin="normal" />
                        <TextField label="Age" name="age" fullWidth value={formData.age} onChange={handleChange} margin="normal" />
                        <TextField
                            select
                            label="Gender"
                            name="gender"
                            fullWidth
                            value={formData.gender}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField label="Date of Birth" type="date" name="dob" fullWidth value={formData.dob} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                    </Box>
                );
            case 1: // Personal Details
                return (
                    <Box sx={{
                        p: 3,
                        background: "linear-gradient(135deg, #ffffff, #f2f2f2)",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: "bold",
                            color: "#1e3a8a",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            mb: 2
                        }}>
                            Personal Details
                        </Typography>

                        <TextField
                            label="Bio"
                            name="bio"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.bio}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />

                        <TextField
                            label="Religion"
                            name="religion"
                            fullWidth
                            value={formData.religion}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />

                        <TextField
                            label="Caste"
                            name="caste"
                            fullWidth
                            value={formData.caste}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />

                        <TextField
                            label="Mother Tongue"
                            name="motherTongue"
                            fullWidth
                            value={formData.motherTongue}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />
                    </Box>
                );

            case 2: // Education & Work
                return (
                    <Box sx={{
                        p: 3,
                        background: "linear-gradient(135deg, #ffffff, #f2f2f2)",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: "bold",
                            color: "#1e3a8a",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            mb: 2
                        }}>
                            Education & Work
                        </Typography>

                        <TextField
                            label="Education"
                            name="education"
                            fullWidth
                            value={formData.education}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />

                        <TextField
                            label="Occupation"
                            name="occupation"
                            fullWidth
                            value={formData.occupation}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />

                        <TextField
                            label="Income"
                            name="income"
                            fullWidth
                            value={formData.income}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            sx={{ bgcolor: "white", borderRadius: "8px" }}
                        />
                    </Box>
                );
            case 3:
                return (
                    <Box>
                        {/* Diet Selection */}
                        <TextField
                            select
                            label="Diet"
                            name="diet"
                            fullWidth
                            value={formData.diet}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                            <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                            <MenuItem value="Eggetarian">Eggetarian</MenuItem>
                        </TextField>

                        {/* Drinking Selection */}
                        <TextField
                            select
                            label="Drinking"
                            name="drinking"
                            fullWidth
                            value={formData.drinking}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="No">No</MenuItem>
                            <MenuItem value="Occasionally">Occasionally</MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                        </TextField>

                        {/* Smoking Selection */}
                        <TextField
                            select
                            label="Smoking"
                            name="smoking"
                            fullWidth
                            value={formData.smoking}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="No">No</MenuItem>
                            <MenuItem value="Occasionally">Occasionally</MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                        </TextField>
                    </Box>
                );
            case 4:
                return (
                    <Box sx={{
                        p: 3,
                        background: "linear-gradient(135deg, #ffffff, #f2f2f2)",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <TextField label="Father's Name" name="fatherName" fullWidth value={formData.fatherName} onChange={handleChange} margin="normal" sx={{ bgcolor: "white", borderRadius: "8px" }} />
                        <TextField label="Mother's Name" name="motherName" fullWidth value={formData.motherName} onChange={handleChange} margin="normal" sx={{ bgcolor: "white", borderRadius: "8px" }} />
                        <TextField label="Siblings" name="siblings" fullWidth value={formData.siblings} onChange={handleChange} margin="normal" sx={{ bgcolor: "white", borderRadius: "8px" }} />
                        <TextField label="Native Place" name="native" fullWidth value={formData.native} onChange={handleChange} margin="normal" sx={{ bgcolor: "white", borderRadius: "8px" }} />
                    </Box>
                );
            case 5:
                return (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 2,
                        backgroundColor: "#f9f9f9",
                        p: 3,
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <Typography variant="h6" sx={{
                            fontWeight: "bold",
                            color: "#1e3a8a",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>
                            Upload Profile Photo
                        </Typography>

                        {/* Profile Image Preview */}
                        <Avatar
                            src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : "/default-avatar.png"}
                            sx={{
                                width: 120,
                                height: 120,
                                border: "4px solid #1e3a8a",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                transition: "0.3s",
                                "&:hover": { transform: "scale(1.05)" }
                            }}
                        />

                        {/* File Upload Input (Hidden) */}
                        <input
                            type="file"
                            id="upload-photo"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* Upload Button */}
                        <label htmlFor="upload-photo">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{
                                    background: "linear-gradient(135deg, #1e3a8a, #ff4081)",
                                    color: "white",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    borderRadius: "25px",
                                    px: 3,
                                    py: 1.5,
                                    boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                                    transition: "0.3s",
                                    "&:hover": { background: "linear-gradient(135deg, #1b3a8a, #ff006a)" }
                                }}
                            >
                                Choose File
                            </Button>
                        </label>
                    </Box>

                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
                {activeStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={handleNext}>Next</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default ProfileSetup;
