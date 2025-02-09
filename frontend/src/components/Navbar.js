import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
                >
                    Matrimony App
                </Typography>

                {/* Navigation Links */}
                <Box>
                    <Button component={Link} to="/login" color="inherit">
                        Login
                    </Button>
                    <Button component={Link} to="/register" color="inherit">
                        Register
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
