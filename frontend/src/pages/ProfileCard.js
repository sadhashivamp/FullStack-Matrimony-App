import React, { useRef, useEffect, useState } from "react";
import { Container, Box, Typography, Avatar, Card, CardContent, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import axios from "axios";

const ProfileCard = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const cardRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        console.log('user...', storedUser)
        if (!storedUser && !storedUser?._id) {
            navigate("/login");
            return;
        }

        axios.get(`http://localhost:5000/api/matrimony-sadha-dev/profile/${storedUser?._id}`)
            .then(response => {

                console.log('res', response)
                if (!response.data) {
                    navigate("/profile-setup");
                } else if (!response.data.profileCompleted) {
                    navigate(`/profile-setup?step=${response.data.lastCompletedStep || 0}`);
                } else {
                    setProfile(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
                localStorage.removeItem("user");
                navigate("/login");
            });
    }, [navigate]);




    if (!profile) {
        return <Typography>Loading Profile...</Typography>;
    }

    const handleDownload = () => {
        html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Matrimony_Profile_Card.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, "image/png");
        });
    };

    const handleGoToDashboard = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        console.log('storedUser.', storedUser)

        if (!storedUser || !storedUser._id) {
            navigate("/login");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "url('https://source.unsplash.com/1600x900/?wedding,romantic')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>

            <Box ref={cardRef} sx={{
                position: "relative",
                width: "400px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                p: 3,
                border: "3px solid #ff6a00"
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: "bold",
                    color: "#ff6a00",
                    textTransform: "uppercase",
                    letterSpacing: 1
                }}>
                    Infy Matrimony - Profile Card
                </Typography>

                <Avatar
                    src={profile.profilePhoto || "/default-avatar.png"}
                    sx={{
                        width: 130,
                        height: 130,
                        mx: "auto",
                        mt: 2,
                        border: "5px solid #ff6a00",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                    }}
                />

                <CardContent sx={{ mt: 2 }}>
                    <Typography variant="h5" sx={{
                        fontWeight: "bold",
                        mt: 1,
                        color: "#333",
                        letterSpacing: 0.5
                    }}>
                        {profile.name}
                    </Typography>

                    <Paper elevation={3} sx={{
                        display: "inline-block",
                        px: 3,
                        py: 1,
                        mt: 2,
                        borderRadius: 2,
                        backgroundColor: "#ff6a00",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textTransform: "uppercase",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
                    }}>
                        Matrimony ID: INFY-{Math.floor(100000 + Math.random() * 900000)}
                    </Paper>

                    <Typography variant="body2" sx={{ mt: 2, fontWeight: "bold", color: "#444" }}>
                        Age: {profile.age} | Gender: {profile.gender}
                    </Typography>

                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
                        <Button variant="contained" sx={{
                            background: "#ff6a00",
                            color: "white",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                        }} onClick={handleDownload}>
                            Download Card
                        </Button>
                        <Button variant="outlined" sx={{
                            color: "#ff6a00",
                            borderColor: "#ff6a00",
                            fontWeight: "bold"
                        }} onClick={handleGoToDashboard}>
                            Go to Dashboard
                        </Button>
                    </Box>
                </CardContent>
            </Box>
        </Container>
    );
};

export default ProfileCard;
