import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Drawer, Box, Typography, Container, Grid, Modal, Paper, Divider, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import MatchesSection from "../components/MatchesSection";
import Testimonials from "../components/Testimonials";
import RecommendedMatches from "../components/RecommendedMatches";
import axios from "axios";

const API_BASE_URL = "https://fullstack-matrimony-app-backend.onrender.com";

const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [userId, setUserId] = useState('')

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileModalToggle = () => {
        setProfileModalOpen(!profileModalOpen);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        console.log('storedUser', storedUser?._id)
        setUserId(storedUser?._id)
        if (storedUser && storedUser._id) {
            axios.get(`{API_BASE_URL}/profile/${storedUser._id}`)
                .then(response => setUserProfile(response.data))
                .catch(error => console.error("Error fetching profile:", error));
        }
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Top AppBar */}
            <AppBar position="fixed" sx={{ backgroundColor: "#1e3a8a", px: 3, py: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.2)" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}>Matrimony Connect</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconButton sx={{ color: "white" }}>
                            <Badge badgeContent={notifications} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={handleDrawerToggle} sx={{ display: { md: "none" }, color: "white" }}>
                            <MenuIcon />
                        </IconButton>
                        <Avatar
                            src={userProfile?.profilePhoto || "/default-avatar.png"}
                            sx={{ width: 45, height: 45, cursor: "pointer", border: "3px solid white" }}
                            onClick={handleProfileModalToggle}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Profile Details Modal for Mobile */}
            <Modal open={profileModalOpen} onClose={handleProfileModalToggle}>
                <Paper sx={{ p: 3, width: "90%", maxWidth: "400px", mx: "auto", mt: 10, textAlign: "center", borderRadius: "12px" }}>
                    <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={handleProfileModalToggle}>
                        <CloseIcon />
                    </IconButton>
                    <ProfileSidebar userProfile={userProfile} />
                </Paper>
            </Modal>

            {/* Main Content with C-Shape Layout */}
            <Box sx={{ mt: 10, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                {/* Left Sidebar for Profile Info */}
                <Box sx={{
                    width: { xs: "100%", md: "25%" },
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    minHeight: "calc(100vh - 64px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <ProfileSidebar userProfile={userProfile} />
                </Box>

                {/* Right Scrollable Content */}
                <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
                    <Grid Box spacing={3}>
                        <Grid item xs={12}>
                            <MatchesSection title="Recommanded Matches" userId={userProfile?._id} type="recommended" />
                        </Grid>
                        <Grid item xs={12}>
                            <MatchesSection title="Caste-Wise Matches" userId={userProfile?._id} type="caste" />
                        </Grid>
                        <Grid item xs={12}>
                            <MatchesSection title="All Matches" userId={userProfile?._id} type="all" />
                        </Grid>
                        <Grid item xs={12}>
                            <Testimonials />
                        </Grid>
                        <Grid item xs={12}>
                            <MatchesSection title="Success Stories" />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Footer Section */}
            <Footer />
        </Box>
    );
};

export default Dashboard;
