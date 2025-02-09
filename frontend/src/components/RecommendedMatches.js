import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button } from "@mui/material";
import axios from "axios";

const RecommendedMatches = ({title, userId}) => {
    const [matches, setMatches] = useState([]);



    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Recommended Matches</Typography>
            <Grid container spacing={2}>
                {matches.map((match) => (
                    <Grid item xs={12} sm={6} md={4} key={match._id}>
                        <Card sx={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
                            <CardMedia component="img" height="200" image={match.profilePhoto} alt={match.name} />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{match.name}, {match.age}</Typography>
                                <Typography variant="body2">Caste: {match.caste}</Typography>
                                <Typography variant="body2">Location: {match.preferredLocation}</Typography>
                                <Button variant="contained" sx={{ mt: 1, backgroundColor: "#ff6a00", color: "white" }}>
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RecommendedMatches;
