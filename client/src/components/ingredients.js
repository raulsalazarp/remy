import React from "react";
import {Button, Divider, List, ListItem, ListItemIcon, ListItemText, Card, Typography} from '@mui/material';
import {array, shape, string, number, func} from 'prop-types';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import WebsiteIcon from '@mui/icons-material/OpenInBrowserRounded';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Ingredients({ingredients, onBegin}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{padding: 3}}>
            <Typography variant="h5" fontWeight="bold">Ingredients</Typography>
            <Divider sx={{marginTop: 2}}/>
            <List>
                {ingredients.map(i =>
                    <ListItem sx={{paddingBottom: 0}}>
                        <ListItemIcon>
                            <img src="/bullet.svg" height={12}/>
                        </ListItemIcon>
                    <ListItemText sx={{marginLeft: -2}}>{i.name.charAt(0).toUpperCase() + i.name.slice(1)}</ListItemText>
                </ListItem>
                )}
            </List>
            <Divider sx={{marginTop: 2, marginBottom: 2}}/>
            <Button 
                size="large" 
                variant="contained" 
                onClick={() => onBegin()}
                sx={{color: "white.main", width: "100%", fontSize: 16}}>
                    Begin Recipe
            </Button>
        </Card>
    )
}

Ingredients.propTypes = {
    ingredients: array,
    onBegin: func
}