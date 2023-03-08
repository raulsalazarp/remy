import React, { useState } from "react";
import {Box, Toolbar, Grid, Typography, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import Header from "../components/header";
import WriteIcon from '@mui/icons-material/EditRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Ingredients from "../components/ingredients";
import Navbar from "../components/navbar";

export default function Details() {

    const dummySteps = [
        "Preheat oven to 350 degrees.",
        "Soften butter.",
        "Beat butter, white sugar, and brown sugar with an electric mixer in a large bowl until smooth.",
        "Beat in eggs, one at a time, then stir in vanilla.",
        "Place mix in the oven for 25 minutes."
    ]

    return (
        <>
            <Navbar />
            <Box sx={{padding: 2}}>
                <Toolbar/>
                <>
                    <Header/>
                    <Grid container spacing={3} sx={{paddingLeft: 15, paddingRight: 15, paddingTop: 3}}>
                        <Grid item xs={8} sx={{paddingRight: 5}}>
                            <Typography variant="h5" fontSize={26} sx={{marginBottom: 3}}>Recipe Overview</Typography>
                            <List>
                                {dummySteps.map((s, i) =>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Typography variant="h6" fontWeight="bold">{i + 1}</Typography>
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography variant="body1">{s}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                )}

                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <Ingredients />
                        </Grid>
                    </Grid>
                </>
            </Box>
        </>
    )
}
