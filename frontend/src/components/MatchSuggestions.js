import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

const MatchSuggestions = ({ darkMode }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: darkMode ? "#fff" : "#333" }}>
                AI-Powered Match Suggestions
            </Typography>
            <Paper elevation={4} sx={{
                p: 3, borderRadius: 3, background: darkMode ? "#1e1e1e" : "#fff",
                textAlign: "center"
            }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff6a00" }}>
                    Most Compatible Match
                </Typography>
                <Typography variant="body2">Match Score: 92%</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    View Profile
                </Button>
            </Paper>
        </Box>
    );
};

export default MatchSuggestions;
