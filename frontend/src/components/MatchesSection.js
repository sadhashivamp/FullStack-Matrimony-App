import React, { useEffect, useState } from "react";
import { getRecommendedMatches, getCasteMatches, getAllMatches } from "../services/matchesService";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";

const MatchesSection = ({ userId, title, type }) => {
    const [matches, setMatches] = useState([]);

    console.log('userId11', userId)


    useEffect(() => {
        const fetchMatches = async () => {
            let data = [];
            if (type === "recommended") {
                data = await getRecommendedMatches(userId);
            } else if (type === "caste") {
                data = await getCasteMatches(userId);
            } else if (type === "all") {
                data = await getAllMatches();
            }
            setMatches(data);
        };

        fetchMatches();
    }, [userId, type]);

    return (
        <div>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>{title}</Typography>
            <Grid container spacing={2}>
                {matches.map((match) => (
                    <Grid item xs={12} sm={6} md={4} key={match._id}>
                        <Card sx={{ textAlign: "center", p: 2 }}>
                            <Avatar src={match.profilePhoto || "/default-avatar.png"} sx={{ width: 100, height: 100, mx: "auto" }} />
                            <CardContent>
                                <Typography variant="h6">{match.name}</Typography>
                                <Typography variant="body2">{match.age} | {match.gender}</Typography>
                                <Typography variant="body2">{match.caste}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MatchesSection;
