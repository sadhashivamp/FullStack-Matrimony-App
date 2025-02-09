import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

const PremiumCTA = ({ darkMode }) => {
    return (
        <Paper elevation={4} sx={{
            p: 3, borderRadius: 3, background: darkMode ? "#1e1e1e" : "#fff",
            textAlign: "center"
        }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff6a00" }}>
                Unlock Premium Features!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                Get more matches, see who viewed your profile, and chat instantly.
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Upgrade Now
            </Button>
        </Paper>
    );
};

export default PremiumCTA;
