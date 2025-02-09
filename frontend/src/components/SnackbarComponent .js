import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = ({ open, onClose, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;
