import React, { useState } from "react";
import {Box, Grid, Typography, Rating, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import TimeIcon from '@mui/icons-material/AccessTimeRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StarIcon from '@mui/icons-material/StarBorderRounded';
import HeartIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import RightIcon from '@mui/icons-material/ArrowCircleRightRounded';

export default function Header() {

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
            <img src="/cookies.png" width="100%" height={475} style={{borderRadius: 10}}/>
            <Box sx={{position: "absolute", top: 350, left: 100, display: "flex"}}>
                <Box sx={{width: 600}}>
                    <Typography variant="h2" fontWeight="bold" color="white.main">Chocolate Chip Cookies</Typography>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <StyledRating value={5}/>
                        <Typography color="secondary.light" fontSize={20}>(19)</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: "15px", marginTop: "3px", marginBottom: "10px"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <TimeIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">45 min</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <FireIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">300 cal</Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: "2px"}}>
                            <StarIcon color="white" sx={{fontSize: 25}}/>
                            <Typography fontSize={14} color="white.main">4.9</Typography>
                        </Box>
                    </Box>
                    <Typography fontSize={13} width={300} color="white.main">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus a justo</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingLeft: 20, width: 260}}>
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