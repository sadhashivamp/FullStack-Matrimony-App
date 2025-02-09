import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Divider } from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../components/SnackbarComponent ";

const API_BASE_URL = "https://fullstack-matrimony-app-backend.onrender.com";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setError("");

    //     try {
    //         const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    //         localStorage.setItem("token", response.data.token);
    //         localStorage.setItem("user", JSON.stringify(response.data.user));

    //         console.log('response.data.profile', response.data.profile)

    //         if (response.data.profile) {
    //             if (!response.data.profile.profileCompleted) {
    //                 navigate(`/profile-setup?step=${response.data.profile.lastCompletedStep || 0}`);
    //             } else {
    //                 navigate("/dashboard");
    //             }
    //         } else {
    //             navigate("/profile-setup");
    //         }

    //         setSnackbarMessage("Login Successful!");
    //         setOpenSnackbar(true);
    //     } catch (error) {
    //         setError("Invalid email or password");
    //         setSnackbarMessage("Login Failed! Please check your credentials.");
    //         setOpenSnackbar(true);
    //     }
    // };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });



            if (response.status === 200) {
                console.log('response.data.token.', response.data.token);
                console.log('response.data.user', response.data.user);
                console.log('response,', response);

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // ✅ If profile exists, check completion status
                if (response.data.profile) {
                    console.log('response.data.profile', response.data.profile)
                    if (response.data.profile.profileCompleted) {
                        alert('saDHA')
                        navigate("/dashboard"); // ✅ Navigate to Dashboard for existing users
                    } else {
                        navigate(`/profile-setup?step=${response.data.profile.lastCompletedStep || 0}`);
                    }
                } else {
                    navigate("/profile-setup"); // ✅ No profile found, navigate to setup
                }

                setSnackbarMessage("Login Successful!");
                setOpenSnackbar(true);
            } else {
                setError("Invalid email or password");
                setSnackbarMessage("Login Failed! Please check your credentials.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password");
            setSnackbarMessage("Login Failed! Please check your credentials.");
            setOpenSnackbar(true);
        }
    };



    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${API_BASE_URL}/auth/facebook`;
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3, textAlign: "center", background: "#f9f9f9" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1e3a8a" }}>Welcome Back!</Typography>
                {error && <Typography color="error">{error}</Typography>}

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    sx={{ mb: 2, backgroundColor: "#DB4437", color: "white", "&:hover": { backgroundColor: "#C1351D" } }}
                    onClick={handleGoogleLogin}
                >
                    Sign in with Google
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    sx={{ mb: 2, backgroundColor: "#4267B2", color: "white", "&:hover": { backgroundColor: "#365899" } }}
                    onClick={handleFacebookLogin}
                >
                    Sign in with Facebook
                </Button>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}>
                        Login
                    </Button>
                </Box>
                <Typography sx={{ mt: 2 }}>
                    Don't have an account? <Button onClick={() => navigate("/register")} color="primary">Register</Button>
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Forgot Password? <Button onClick={() => navigate("/forgot-password")} color="primary">Reset Password</Button>
                </Typography>
            </Paper>

            <SnackbarComponent open={openSnackbar} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
        </Container>
    );
};

export default Login;
