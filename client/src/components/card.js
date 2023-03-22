import React, { useEffect, useState } from "react";
import {Box, Typography, Rating} from '@mui/material';
import { string, shape, number, bool } from "prop-types";
import {styled} from '@mui/material/styles';
import TimeIcon from '@mui/icons-material/AccessTimeRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from "react-router-dom";

const StyledRating = styled((props) => (
	<Rating size="small" readOnly {...props} />
  )) (({ theme }) => ({
	'& .MuiRating-iconFilled': {
		color: theme.palette.primary.main,
	  }
  }));

function rand(min, max, mult) {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.ceil(random/mult)*mult
}

export default function RecipeCard({ recipe }) {

    const navigate = useNavigate();
    const [ratings, setRatings] = useState(0);
    const [time, setTime] = useState(0);
    const [cal, setCal] = useState(0);
    const [serv, setServ] = useState(0);

    useEffect(() => {
        setRatings(rand(20, 200, 1));
        setTime(rand(35, 70, 5));
        setCal(rand(300, 700, 10));
        setServ(rand(5, 15, 1));
    }, [])

    return (
        <Box>
            <img src={`${recipe.Image_Name}.jpg`} width="100%" height={125} style={{borderRadius: 7, objectFit: "cover"}}
                onClick={() => navigate(`/detail/${recipe._id}/${ratings}/${time}/${cal}/${serv}`)}
            />
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography 
                    fontSize={14} 
                    sx={{
                        marginTop: "2px",
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                    }}>
                        {recipe.Title}
                </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <StyledRating value={5}/>
                <Typography color="secondary" fontSize={10}>({ratings})</Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", marginBottom: "3px"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <TimeIcon color="secondary" fontSize="small" sx={{height: "18px"}}/>
                    <Typography fontSize={11} color="secondary.dark">{time} min</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <FireIcon color="secondary" fontSize="small" sx={{height: "16px"}}/>
                    <Typography fontSize={11} color="secondary.dark">{cal} cal</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <RestaurantIcon color="secondary" fontSize="small" sx={{height: "16px"}}/>
                    <Typography fontSize={11} color="secondary.dark">{serv} servings</Typography>
                </Box>
            </Box>
            <Typography
                fontSize={11}
                color="secondary.dark"
                sx={{
                    marginTop: "2px",
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                }}>
                    {recipe.Title}; {recipe.Instructions}
            </Typography>
        </Box>
    )
}

RecipeCard.propTypes = {
    recipe: shape({
        _id: string,
        Title: string,
        Instructions: string,
        Ingredients: string,
        Image_Name: string,
        Cleaned_Ingredients: string
    })
}