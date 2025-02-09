import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";
import axios from "axios";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>What Our Users Say</Typography>
            <Grid container spacing={2}>
                {testimonials.map((testimonial) => (
                    <Grid item xs={12} sm={6} md={4} key={testimonial._id}>
                        <Card sx={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
                            <CardContent>
                                <Avatar src={testimonial.userPhoto} sx={{ width: 60, height: 60, mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{testimonial.name}</Typography>
                                <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>"{testimonial.message}"</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Testimonials;
