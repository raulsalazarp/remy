import React from "react";
import {Button, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@mui/material';
import {arrayOf, shape, string, number} from 'prop-types';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import WebsiteIcon from '@mui/icons-material/OpenInBrowserRounded';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Ingredients() {

    const navigate = useNavigate();
    const dummyIngredients = ["Eggs", "Butter", "Sugar", "Chocolate Chips", "Flour"]

    return (
        <Paper variant="outlined" sx={{padding: 3, minHeight: 315}}>
            <Typography variant="h5" fontWeight="bold">Ingredients</Typography>
            <Divider sx={{marginTop: 2}}/>
            <List>
                {dummyIngredients.map(i =>
                    <ListItem sx={{paddingBottom: 0}}>
                        <ListItemIcon>
                            <img src="bullet.svg" height={12}/>
                        </ListItemIcon>
                    <ListItemText sx={{marginLeft: -2}}>{i}</ListItemText>
                </ListItem>
                )}
            </List>
            <Divider sx={{marginTop: 2, marginBottom: 2}}/>
            <Button 
                size="large" 
                variant="contained" 
                sx={{color: "white.main", width: "100%", fontSize: 16}}>
                    Begin Recipe
            </Button>
        </Paper>
    )
}