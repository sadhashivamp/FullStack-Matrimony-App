import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Divider } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/matrimony-sadha-dev";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1e3a8a" }}>Create an Account</Typography>
                {error && <Typography color="error">{error}</Typography>}

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    sx={{ mb: 2, backgroundColor: "#DB4437", color: "white", "&:hover": { backgroundColor: "#C1351D" } }}
                    onClick={handleGoogleLogin}
                >
                    Sign up with Google
                </Button>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label="Full Name" variant="outlined" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField label="Confirm Password" type="password" variant="outlined" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}>
                        Register
                    </Button>
                </Box>
                <Typography sx={{ mt: 2 }}>
                    Already have an account? <Button onClick={() => navigate("/login")} color="primary">Login</Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
