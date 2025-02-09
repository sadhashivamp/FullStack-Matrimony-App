import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./SuccessStories.css";

const API_BASE_URL = "https://fullstack-matrimony-app-backend.onrender.com/api/matrimony-sadha-dev";

const SuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/landing/success-stories`)
            .then((response) => {
                setSuccessStories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching success stories:", error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        appendDots: (dots) => (
            <div style={{
                position: "absolute",
                bottom: "-25px",
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}>
                <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
            </div>
        ),
        dotsClass: "slick-dots slick-dots-white"
    };

    return (
        <Box sx={{ mt: 8, textAlign: "center", backgroundColor: "#1e3a8a", color: "white", py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Success Stories
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Inspiring stories from couples who found love on our platform
            </Typography>
            {successStories.length > 0 ? (
                <Box sx={{ px: 3, py: 3 }}>
                    <Slider {...settings}>
                        {successStories.map((story) => (
                            <Box key={story._id} sx={{ px: 2 }}>
                                <Card sx={{ backgroundColor: "white", color: "black", boxShadow: 3, mx: 1 }}>
                                    {story.image && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`data:image/jpeg;base64,${story.image}`}
                                            alt={story.name}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{story.name}</Typography>
                                        <Typography variant="body1">{story.story}</Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            ) : (
                <Typography variant="body1">No success stories available.</Typography>
            )}
        </Box>
    );
};

export default SuccessStories;
