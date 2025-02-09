import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/matrimony-sadha-dev";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password/${token}`, { password });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setError("Failed to reset password");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 8, p: 5, borderRadius: 3, textAlign: "center", background: "#f3f4f6" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1e3a8a" }}>Reset Your Password</Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>Enter your new password below.</Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                {message && <Typography color="success" sx={{ mb: 2 }}>{message}</Typography>}

                <Box component="form" onSubmit={handleResetPassword} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label="New Password" type="password" variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField label="Confirm Password" type="password" variant="outlined" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem", backgroundColor: "#1e3a8a", "&:hover": { backgroundColor: "#174ea6" } }}>
                        Reset Password
                    </Button>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" sx={{ color: "#666" }}>
                    Remembered your password? <Button onClick={() => navigate("/login")} color="primary">Login</Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
