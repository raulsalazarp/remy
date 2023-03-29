import React, { useEffect, useState } from "react";
import {Box, Toolbar, Grid, Typography, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import Header from "../components/header";
import WriteIcon from '@mui/icons-material/EditRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Ingredients from "../components/ingredients";
import Navbar from "../components/navbar";
import useService from '../services/detailService';
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

export default function Details() {

    const [recipe, loading] = useService();
    const navigate = useNavigate();

    const dummySteps = [
        "Preheat oven to 350 degrees.",
        "Soften butter.",
        "Beat butter, white sugar, and brown sugar with an electric mixer in a large bowl until smooth.",
        "Beat in eggs, one at a time, then stir in vanilla.",
        "Place mix in the oven for 25 minutes."
    ]

    return (
        loading ? <Loading /> :
        <>
            <Navbar />
            <Box sx={{padding: 2}}>
                <Toolbar/>
                <>
                    <Header recipe={recipe}/>
                    <Grid container spacing={3} sx={{paddingLeft: 15, paddingRight: 15, paddingTop: 3}}>
                        <Grid item xs={8} sx={{paddingRight: 5}}>
                            <Typography variant="h5" fontSize={26} sx={{marginBottom: 3}}>Recipe Overview</Typography>
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: recipe.summary }}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Ingredients ingredients={recipe.nutrition.ingredients} onBegin={() => navigate(`/steps/${recipe.id}`)}/>
                        </Grid>
                    </Grid>
                </>
            </Box>
        </>
    )
}
