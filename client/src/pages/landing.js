import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from '../components/navbar';

export default function Landing() {

    const styles = {
        container: {
            backgroundImage: 'background.png',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        },
        content: {
            position: 'absolute',
            top: 140,
            left: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
        }
    };

    return (
        <>
            <Navbar transparent={true}/>
            <img src="background.png" style={styles.container}/>
            <Box style={styles.content}>
                <Typography variant="h1" fontWeight="bold">Remy</Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary.dark" sx={{marginTop: 2, marginBottom: 2}}>
                    Your Virtual Sous-Chef
                </Typography>
                <Typography variant="h6" sx={{maxWidth: 450, fontSize:16}} color="secondary.main">
                    Complete your favorite step-by-step recipes hands-free with Remy’s voice-based interface
                </Typography>
                <Button variant="contained" size="large" sx={{maxWidth: 300, marginTop: 4, color:"white.main", fontSize: 22, borderRadius: 50}}>
                    Get Started
                </Button>
            </Box>
        </>
    )
}