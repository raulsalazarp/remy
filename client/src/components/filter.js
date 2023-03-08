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

function valuetext(time) {
return `${time}°C`;
}

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
	const [rating, setRating] = useState(0);
	const [time, setTime] = useState([0, 2]);

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
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Breakfast"/>
								<FormControlLabel control={<Checkbox />} label="Lunch"/>
								<FormControlLabel control={<Checkbox />} label="Dinner"/>
								<FormControlLabel control={<Checkbox />} label="Dessert"/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Snack"/>
								<FormControlLabel control={<Checkbox />} label="Appetizer"/>
								<FormControlLabel control={<Checkbox />} label="Sides"/>
								<FormControlLabel control={<Checkbox />} label="Bread"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open2} onChange={() => setOpen2(!open2)}>
					<AccordionSummary expandIcon={open2 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Cousine</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 1}}>
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Mexican"/>
								<FormControlLabel control={<Checkbox />} label="Italian"/>
								<FormControlLabel control={<Checkbox />} label="Chinese"/>
								<FormControlLabel control={<Checkbox />} label="Indian"/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Mediterranean"/>
								<FormControlLabel control={<Checkbox />} label="American"/>
								<FormControlLabel control={<Checkbox />} label="Japanese"/>
								<FormControlLabel control={<Checkbox />} label="French"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open3} onChange={() => setOpen3(!open3)}>
					<AccordionSummary expandIcon={open3 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Ratings</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography fontSize={13} sx={{marginBottom: "8px"}}>Minimum Acceptable Rating</Typography>
						<StyledRating
							value={rating}
							onChange={(event, newValue) => setRating(newValue)}
							/>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open4} onChange={() => setOpen4(!open4)}>
					<AccordionSummary expandIcon={open4 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Time</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Slider
							value={time}
							onChange={(e, val) => setTime(val)}
							valueLabelDisplay="auto"
							getAriaValueText={valuetext}
							min={0}
							max={120}
							step={5}
						/>
						<Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
							<Typography fontSize={11} color="secondary">0 min</Typography>
							<Typography fontSize={11} color="secondary">{'>'}120 min</Typography>
						</Box>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={open5} onChange={() => setOpen5(!open5)}>
					<AccordionSummary expandIcon={open5 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Ingredients</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Gluten Free"/>
								<FormControlLabel control={<Checkbox />} label="Dairy Free"/>
								<FormControlLabel control={<Checkbox />} label="Vegetarian"/>
								<FormControlLabel control={<Checkbox />} label="Vegan"/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel control={<Checkbox />} label="Kosher"/>
								<FormControlLabel control={<Checkbox />} label="Keto"/>
								<FormControlLabel control={<Checkbox />} label="Pescetarian"/>
								<FormControlLabel control={<Checkbox />} label="Nut Free"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>			
		    </Box>
        </Drawer>
    );
}