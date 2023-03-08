import React, { useState } from "react";
import {Box, Typography, Rating} from '@mui/material';
import { string, shape, number, bool } from "prop-types";
import {styled} from '@mui/material/styles';
import TimeIcon from '@mui/icons-material/AccessTimeRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StarIcon from '@mui/icons-material/StarBorderRounded';
import { useNavigate } from "react-router-dom";

const StyledRating = styled((props) => (
	<Rating size="small" readOnly {...props} />
  )) (({ theme }) => ({
	'& .MuiRating-iconFilled': {
		color: theme.palette.primary.main,
	  }
  }));

export default function RecipeCard({ recipe }) {

    const navigate = useNavigate();

    return (
        <Box>
            <img src="cookies.png" width="100%" height={125} style={{borderRadius: 7}}
                onClick={() => navigate("/detail")}
            />
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography fontSize={14} sx={{marginTop: "2px"}}>Recipe name</Typography>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <StyledRating value={5}/>
                    <Typography color="secondary" fontSize={10}>(19)</Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", marginBottom: "3px"}}>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <TimeIcon color="secondary" fontSize="small" sx={{height: "18px"}}/>
                    <Typography fontSize={11} color="secondary.dark">Time</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <FireIcon color="secondary" fontSize="small" sx={{height: "16px"}}/>
                    <Typography fontSize={11} color="secondary.dark">Calories</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                    <StarIcon color="secondary" fontSize="small" sx={{height: "16px"}}/>
                    <Typography fontSize={11} color="secondary.dark">Rating</Typography>
                </Box>
            </Box>
            <Typography fontSize={11} color="secondary.dark">description description description description description descrption</Typography>
        </Box>
    )
}