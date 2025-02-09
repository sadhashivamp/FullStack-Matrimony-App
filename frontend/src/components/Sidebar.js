import React from "react";
import { Box, Typography, Switch, Button } from "@mui/material";

const Sidebar = ({ darkMode, setDarkMode, handleDeleteAccount }) => {
    return (
        <Box sx={{
            width: { xs: "100%", md: "250px" },
            minHeight: "100vh",
            background: darkMode ? "#1e1e1e" : "#fff",
            color: darkMode ? "#fff" : "#333",
            p: 3,
            boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
            position: "fixed",
            left: 0,
            top: 0,
            height: "10%",
        }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Menu
            </Typography>
            <Button fullWidth variant="contained" sx={{ mb: 2 }} onClick={handleDeleteAccount} color="error">
                Delete Account
            </Button>
            <Typography variant="body2" sx={{ mt: 3 }}>
                Dark Mode
            </Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>
    );
};

export default Sidebar;
