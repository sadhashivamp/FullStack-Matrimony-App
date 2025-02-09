import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import SuccessStories from "../components/SuccessStories";

const LandingPage = () => {
    return (
        <Box sx={{ backgroundColor: "#eef2f7", minHeight: "100vh" }}>
            <Navbar />
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 8,
                    }}
                >
                    {/* Welcome Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Box sx={{textAlign: 'center'}}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#1e3a8a",
                                    mb: 2,
                                    textAlign: { xs: "center", md: "left" },
                                }}
                            >
                                Find Your Perfect Match
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: "#555", mb: 4, textAlign: { xs: "center", md: "left" } }}
                            >
                                Secure & Trusted Matrimony Platform with Verified Profiles
                            </Typography>

                            <Button variant="contained" color="secondary" size="large">
                                Get Started
                            </Button>
                        </Box>
                    </motion.div>

                    {/* Image Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src="https://t3.ftcdn.net/jpg/06/79/18/48/360_F_679184899_vkb4XBBaKi3yScsH82wQCeKaOMEL25CG.jpg"
                            alt="Wedding Couple"
                            style={{ maxWidth: "100%", height: "auto", borderRadius: 10, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                        />
                    </motion.div>
                </Box>

                {/* Features Section */}
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, color: "#1e3a8a" }}>
                        Why Choose Us?
                    </Typography>
                    <Grid container spacing={4}>
                        {["Verified & Secure Profiles", "AI Matchmaking", "User-Friendly Experience", "Privacy & Security", "24/7 Customer Support", "Horoscope Compatibility"].map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ textAlign: "center", p: 3, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e3a8a" }}>
                                            {feature}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Success Stories Section */}
                {/* <Box sx={{ mt: 8, textAlign: "center", backgroundColor: "#1e3a8a", color: "white", py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Success Stories
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Inspiring stories from couples who found love on our platform
          </Typography>
          <Button variant="outlined" color="inherit">
            Read More
          </Button>
        </Box> */}

                <SuccessStories />

                {/* Call to Action Section */}
                <Box sx={{ mt: 8, textAlign: "center", py: 4, backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#1e3a8a" }}>
                        Ready to Start Your Journey?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2, color: "#555" }}>
                        Join us today and find your life partner with ease!
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Register Now
                    </Button>
                </Box>
            </Container>

            {/* Footer Section */}
            <Footer />
        </Box>
    );
};

export default LandingPage;
