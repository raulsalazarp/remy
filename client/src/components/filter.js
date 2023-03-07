import * as React from 'react';
import { useState } from 'react';
import {Drawer, Toolbar, AccordionSummary, Box, AccordionDetails, Typography, Slider,
FormControl, InputLabel, OutlinedInput, InputAdornment, ToggleButton, ToggleButtonGroup,
FormControlLabel, Grid, Checkbox, Rating} from '@mui/material';
import AddIcon from '@mui/icons-material/AddRounded';
import MinusIcon from '@mui/icons-material/RemoveRounded';
import HouseIcon from '@mui/icons-material/HouseTwoTone';
import TownhomeIcon from '@mui/icons-material/HolidayVillageTwoTone';
import ApartmentIcon from '@mui/icons-material/ApartmentTwoTone';
import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import { func, shape, string, number, bool , arrayOf} from 'prop-types';

const drawerWidth = 284;

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
	'&:before': {
	  display: 'none',
	},
  }));

const CircleButton = styled(ToggleButton)({
	borderRadius: 50,
	width: 35,
	height: 35
});

const StyledRating = styled(Rating) (({ theme }) => ({
	'& .MuiRating-iconFilled': {
		color: theme.palette.primary.main,
	  }
  }));

export default function Filter({dwellings, setDwellings}) {

	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
	const [open4, setOpen4] = useState(false);
	const [open5, setOpen5] = useState(false);

	const filterOutdoor = () => {
		const filtered = dwellings.filter(d => d.amenities.outdoorSpace === true);
		setDwellings(filtered);
	}

  	return (
      	<Drawer
			sx={{
			width: drawerWidth,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				width: drawerWidth,
				boxSizing: 'border-box',
			},
			}}
			variant="permanent"
			anchor="left"
		>
        	<Toolbar />
        	<Box sx={{padding: 2}}>
				<Typography variant="h3" fontSize={18} fontWeight="bold" sx={{marginBottom: "3px"}}>What's Cookin'?</Typography>
				<Typography variant="body1" fontSize={12}>Over 1,000 recipes available</Typography>
				<Accordion expanded={open1} onChange={() => setOpen1(!open1)}>
					<AccordionSummary expandIcon={open1 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Meal</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
						
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open2} onChange={() => setOpen2(!open2)}>
					<AccordionSummary expandIcon={open2 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Cousine</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 1}}>
						
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open3} onChange={() => setOpen3(!open3)}>
					<AccordionSummary expandIcon={open3 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Ratings</Typography>
					</AccordionSummary>
					<AccordionDetails>
						
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open4} onChange={() => setOpen4(!open4)}>
					<AccordionSummary expandIcon={open4 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Time</Typography>
					</AccordionSummary>
					<AccordionDetails>
						
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open5} onChange={() => setOpen5(!open5)}>
					<AccordionSummary expandIcon={open5 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Ingredients</Typography>
					</AccordionSummary>
					<AccordionDetails>
						
					</AccordionDetails>
				</Accordion>			
		    </Box>
        </Drawer>
    );
}