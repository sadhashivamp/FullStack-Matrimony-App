import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: "#1e3a8a",
            color: "white",
            py: 4,
            mt: 4,
            textAlign: "center",
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {/* About Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>About Us</Typography>
                        <Typography variant="body2">
                            Infy Matrimony is a trusted platform to find your perfect match with security & integrity.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Quick Links</Typography>
                        <Typography variant="body2"><a href="/privacy-policy" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</a></Typography>
                        <Typography variant="body2"><a href="/terms" style={{ color: "white", textDecoration: "none" }}>Terms & Conditions</a></Typography>
                        <Typography variant="body2"><a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact Us</a></Typography>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Follow Us</Typography>
                        <Box>
                            <IconButton sx={{ color: "white" }}><FacebookIcon /></IconButton>
                            <IconButton sx={{ color: "white" }}><TwitterIcon /></IconButton>
                            <IconButton sx={{ color: "white" }}><InstagramIcon /></IconButton>
                            <IconButton sx={{ color: "white" }}><LinkedInIcon /></IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Typography variant="body2" sx={{ mt: 3 }}>
                    © {new Date().getFullYear()} Infy Matrimony. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
