import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const RecentVisitors = ({ darkMode }) => {
    const visitors = [
        { name: "John Doe", visits: 3 },
        { name: "Sarah Smith", visits: 1 },
        { name: "Michael Johnson", visits: 2 },
    ];

    return (
        <Paper elevation={4} sx={{
            p: 3, borderRadius: 3, background: darkMode ? "#1e1e1e" : "#fff",
            textAlign: "center"
        }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff6a00" }}>
                Recent Profile Visitors
            </Typography>
            <List>
                {visitors.map((visitor, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={visitor.name} secondary={`Visits: ${visitor.visits}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentVisitors;
