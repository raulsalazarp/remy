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

    const [recipe, loading, ratings, time, cal, serv] = useService();
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading)
            getIngredients(recipe.Ingredients)
    }, [loading]);

    function getIngredients(ingredients) {
        ingredients = ingredients.substring(2, ingredients.length - 2);
        let list = ingredients.split("', '")
        setIngredients(list);
    }

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
                    <Header recipe={recipe} ratings={ratings} time={time} cal={cal} serv={serv}/>
                    <Grid container spacing={3} sx={{paddingLeft: 15, paddingRight: 15, paddingTop: 3}}>
                        <Grid item xs={8} sx={{paddingRight: 5}}>
                            <Typography variant="h5" fontSize={26} sx={{marginBottom: 3}}>Recipe Overview</Typography>
                            <Typography variant="body1">
                                <p>This is the best {recipe.Title} recipe ever! No funny ingredients, no chilling time, etc. Just a simple, straightforward, amazingly delicious, doughy yet still fully cooked, {recipe.Title} that turns out perfectly every single time!</p>
                                <p>Everyone needs a {recipe.Title} recipe in their repertoire, and this is mine. It is seriously the Best {recipe.Title} Recipe Ever! I have been making these for many, many years and everyone who tries them agrees they’re out-of-this-world delicious!</p>
                                <p>Plus, there's no funny ingredients, no chilling, etc. Just a simple, straightforward, amazingly delicious, doughy yet still fully cooked, {recipe.Title} that turns out perfectly every single time! These are everything {recipe.Title} should be. Crispy and chewy. Doughy yet fully baked. Perfectly buttery and sweet.</p>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Ingredients ingredients={ingredients} onBegin={() => navigate(`/steps/${recipe._id}`)}/>
                        </Grid>
                    </Grid>
                </>
            </Box>
        </>
    )
}
