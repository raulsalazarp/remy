import React, { useState } from "react";
import {Box, Grid, Typography, Rating, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import TimeIcon from '@mui/icons-material/AccessTimeRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HeartIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import RightIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { string, shape, number, bool, array } from "prop-types";

export default function Header({recipe}) {

    const StyledRating = styled((props) => (
        <Rating size="large" readOnly {...props} />
      )) (({ theme }) => ({
        '& .MuiRating-iconFilled': {
            color: theme.palette.primary.main,
          },
        '& .MuiSvgIcon-root': {
            fontSize: 40,
          },
      }));

    return (
        <>
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '99.2%', backgroundColor: 'rgb(0,0,0,0.5)', borderRadius: 10}}/>
                <img src={recipe.image} width="100%" height={475} style={{borderRadius: 10, objectFit: "cover"}}/>
            </div>
            <Box sx={{position: "absolute", top: 320, left: 100, display: "flex"}}>
                <Box sx={{width: 700}}>
                    <Typography variant="h3" fontWeight="bold" color="white.main">{recipe.title}</Typography>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <StyledRating value={recipe.healthScore / 20} precision={0.1}/>
                        <Typography color="secondary.light" fontSize={20}>({recipe.aggregateLikes})</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: "15px", marginTop: "3px", marginBottom: "10px"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <TimeIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">{recipe.readyInMinutes} min</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <FireIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">
                                {Math.round(recipe.nutrition.nutrients[0].amount)} cal
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <RestaurantIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">{recipe.servings} servings</Typography>
                        </Box>
                    </Box>
                    <Typography
                        fontSize={13}
                        width={400}
                        color="white.main"
                        sx={{ marginTop: "2px"}}>
                            Recipe courtesy of {recipe.creditsText}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingLeft: 15, width: 260}}>
                    <Button size="large" variant="outlined" color="white">See All Photos</Button>
                </Box>
            </Box>
            <Box sx={{position: "absolute", top: 100, right: 50, display: "flex", alignItems: "center", gap: "30px"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <HeartIcon color="white" sx={{fontSize: 25}}/>
                    <Typography fontSize={14} color="white.main">Save</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <ShareIcon color="white" sx={{fontSize: 25}}/>
                    <Typography fontSize={14} color="white.main">Share</Typography>
                </Box>
            </Box>
            <Box sx={{position: "absolute", top: 280, left: 35, width: 1195, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <LeftIcon color="white" fontSize="large"/>
                <RightIcon color="white" fontSize="large"/>
            </Box>
        </>
    )
}

Header.propTypes = {
    recipe: shape({
        id: number,
        title: string,
        analyzedInstructions: string,
        image: string,
        summary: string,
        readyInMinutes: number,
        servings: number,
        aggregateLikes: number,
        healthScore: number,
        creditsText: string,
        nutrition: shape({
            nutrients: array,
            ingredients: array
        })
    })
}