import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Divider, InputAdornment } from "@mui/material";
import { Email as EmailIcon, Lock as LockIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/matrimony-sadha-dev";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Enter OTP, Step 3: Reset Password
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
            setMessage(response.data.message);
            setStep(2);
        } catch (error) {
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
            setMessage(response.data.message);
            setStep(3);
        } catch (error) {
            setError("Invalid or expired OTP.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email, otp, newPassword });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setError("Failed to reset password. Try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 8, p: 5, borderRadius: 3, textAlign: "center", background: "#f3f4f6" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1e3a8a" }}>
                    {step === 1 ? "Forgot Password?" : step === 2 ? "Enter OTP" : "Reset Password"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
                    {step === 1 ? "Enter your email to receive an OTP." : step === 2 ? "Enter the OTP sent to your email." : "Create a new password."}
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                {message && <Typography color="success" sx={{ mb: 2 }}>{message}</Typography>}

                {step === 1 && (
                    <Box component="form" onSubmit={handleRequestOTP} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="Email Address" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }} />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}>Send OTP</Button>
                    </Box>
                )}

                {step === 2 && (
                    <Box component="form" onSubmit={handleVerifyOTP} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="Enter OTP" variant="outlined" fullWidth required value={otp} onChange={(e) => setOtp(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><CheckCircleIcon /></InputAdornment>) }} />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}>Verify OTP</Button>
                    </Box>
                )}

                {step === 3 && (
                    <Box component="form" onSubmit={handleResetPassword} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="New Password" type="password" variant="outlined" fullWidth required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }} />
                        <TextField label="Confirm Password" type="password" variant="outlined" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }} />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}>Reset Password</Button>
                    </Box>
                )}

                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" sx={{ color: "#666" }}>
                    Remembered your password? <Button onClick={() => navigate("/login")} color="primary">Login</Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;
