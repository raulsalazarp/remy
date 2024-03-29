import * as React from 'react';
import { useState } from 'react';
import {Drawer, Toolbar, AccordionSummary, Box, AccordionDetails, Typography, Slider,
FormControl, InputLabel, OutlinedInput, InputAdornment, ToggleButton, ToggleButtonGroup,
FormControlLabel, Grid, Checkbox, Rating, Divider} from '@mui/material';
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

export default function Filter({filters, setFilters, filterRecipes, time, setTime, open1, setOpen1, open2, setOpen2, open4, setOpen4, open5, setOpen5}) {

	const formatFilter = (category, filt, apply) => {
		// if (apply) {
		// 	const data = `${category}=${filt}`;
		// 	console.log(data);
		// 	filterRecipes(data);
		// }
		let temp = filters;
		if (category === "maxReadyTime") {
			temp[category] = filt;
			setFilters(temp);
		}
		else if (apply) {
			temp[category].push(filt);
			setFilters(temp);
		}
		else {
			let index = temp[category].indexOf(filt);
			if (index !== -1) {
				temp[category].splice(index, 1);
			}
			temp.forEach(x => console.log(x))
			setFilters(temp);
		}
		filterRecipes();
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
				<Box sx={{display: "flex", gap: 1, alignItems: "center", marginTop: 2, marginBottom: 2}}>
					<img src="/Remy.png" height={50}/>
					<Box>
						<Typography variant="h6" fontWeight="bold" fontSize={13}>Remy is here to help!</Typography>
						<Typography variant="body2" fontSize={10}>Speak to interact and Remy will do the rest. Start with “hey Remy!”</Typography>
					</Box>
					<img src="/Speak.png" height={20}/>
				</Box>
				<Divider/>
				<Accordion id="mealType" expanded={open1} onChange={() => setOpen1(!open1)}>
					<AccordionSummary expandIcon={open1 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Meal</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel
									control={<Checkbox id="breakfast" onChange={e => formatFilter("type", "breakfast", e.target.checked)}/>}
									label="Breakfast"/>
								<FormControlLabel
									control={<Checkbox id="main course" onChange={e => formatFilter("type", "main course", e.target.checked)}/>}
									label="Main Course"/>
								<FormControlLabel
									control={<Checkbox id="side dish" onChange={e => formatFilter("type", "side dish", e.target.checked)}/>}
									label="Side Dish"/>
								<FormControlLabel
									control={<Checkbox id="dessert" onChange={e => formatFilter("type", "dessert", e.target.checked)}/>}
									label="Dessert"/>
								<FormControlLabel
									control={<Checkbox id="salad" onChange={e => formatFilter("type", "salad", e.target.checked)}/>}
									label="Salad"/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									control={<Checkbox id="snack" onChange={e => formatFilter("type", "snack", e.target.checked)}/>}
									label="Snack"/>
								<FormControlLabel
									control={<Checkbox id="appetizer" onChange={e => formatFilter("type", "appetizer", e.target.checked)}/>}
									label="Appetizer"/>
								<FormControlLabel
									control={<Checkbox id="drink" onChange={e => formatFilter("type", "drink", e.target.checked)}/>}
									label="Drink"/>
								<FormControlLabel
									control={<Checkbox id="bread" onChange={e => formatFilter("type", "bread", e.target.checked)}/>}
									label="Bread"/>
								<FormControlLabel
									control={<Checkbox id="soup" onChange={e => formatFilter("type", "soup", e.target.checked)}/>}
									label="Soup"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Accordion id="cuisine" expanded={open2} onChange={() => setOpen2(!open2)}>
					<AccordionSummary expandIcon={open2 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Cuisine</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{display: "flex", flexDirection: "column", gap: 1}}>
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel
									control={<Checkbox id="american" onChange={e => formatFilter("cuisine", "american", e.target.checked)}/>}
									label="American"/>
								<FormControlLabel
									control={<Checkbox id="mexican" onChange={e => formatFilter("cuisine", "mexican", e.target.checked)}/>}
									label="Mexican"/>
								<FormControlLabel
									control={<Checkbox id="italian" onChange={e => formatFilter("cuisine", "italian", e.target.checked)}/>} 
									label="Italian"/>
								<FormControlLabel
									control={<Checkbox id="chinese" onChange={e => formatFilter("cuisine", "chinese", e.target.checked)}/>}
									label="Chinese"/>
								<FormControlLabel
									control={<Checkbox id="indian" onChange={e => formatFilter("cuisine", "indian", e.target.checked)}/>}
									label="Indian"/>
								<FormControlLabel
									control={<Checkbox id="cajun" onChange={e => formatFilter("cuisine", "cajun", e.target.checked)}/>}
									label="Cajun"/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									control={<Checkbox id="mediterranean" onChange={e => formatFilter("cuisine", "mediterranean", e.target.checked)}/>}
									label="Mediterranean"/>
								<FormControlLabel
									control={<Checkbox id="thai" onChange={e => formatFilter("cuisine", "thai", e.target.checked)}/>}
									label="Thai"/>
								<FormControlLabel
									control={<Checkbox id="caribbean" onChange={e => formatFilter("cuisine", "caribbean", e.target.checked)}/>}
									label="Caribbean"/>
								<FormControlLabel
									control={<Checkbox id="japanese" onChange={e => formatFilter("cuisine", "japanese", e.target.checked)}/>}
									label="Japanese"/>
								<FormControlLabel
									control={<Checkbox id="french" onChange={e => formatFilter("cuisine", "french", e.target.checked)}/>}
									label="French"/>
								<FormControlLabel
									control={<Checkbox id="greek" onChange={e => formatFilter("cuisine", "greek", e.target.checked)}/>}
									label="Greek"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				{/* <Accordion expanded={open3} onChange={() => setOpen3(!open3)}>
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
				</Accordion> */}
				<Accordion id="maxReadyTime" expanded={open4} onChange={() => setOpen4(!open4)}>
					<AccordionSummary expandIcon={open4 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Time</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Slider
							id="maxReadyTime"
							value={time}
							onChange={(e, val) => setTime(val)}
							onChangeCommitted={() => formatFilter("maxReadyTime", time, true)}
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
				<Accordion id="diet" expanded={open5} onChange={() => setOpen5(!open5)}>
					<AccordionSummary expandIcon={open5 ? <MinusIcon /> : <AddIcon/>}>
						<Typography variant="h6" fontSize={16}>Ingredients</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container>
							<Grid item xs={6}>
								<FormControlLabel
									control={<Checkbox id="gluten" onChange={e => formatFilter("intolerances", "gluten", e.target.checked)}/>}
									label="Gluten Free"/>
								<FormControlLabel
									control={<Checkbox id="dairy" onChange={e => formatFilter("intolerances", "dairy", e.target.checked)}/>}
									label="Dairy Free"/>
								<FormControlLabel
									control={<Checkbox id="vegetarian" onChange={e => formatFilter("diet", "vegetarian", e.target.checked)}/>}
									label="Vegetarian"/>
								<FormControlLabel
									control={<Checkbox id="vegan" onChange={e => formatFilter("diet", "vegan", e.target.checked)}/>}
									label="Vegan"/>
							</Grid>
							<Grid item xs={6}>
							<FormControlLabel
									control={<Checkbox id="shellfish" onChange={e => formatFilter("intolerances", "shellfish", e.target.checked)}/>}
									label="Shellfish Free"/>
								<FormControlLabel
									control={<Checkbox id="ketogenic" onChange={e => formatFilter("diet", "ketogenic", e.target.checked)}/>}
									label="Keto"/>
								<FormControlLabel
									control={<Checkbox id="pescetarian" onChange={e => formatFilter("diet", "pescetarian", e.target.checked)}/>}
									label="Pescetarian"/>
								<FormControlLabel
									control={<Checkbox id="tree nut" onChange={e => formatFilter("intolerances", "tree nut", e.target.checked)}/>}
									label="Nut Free"/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>			
		    </Box>
        </Drawer>
    );
}

Filter.propTypes = {
	filters: shape({
		type: arrayOf(string),
		cuisine: arrayOf(string),
		diet: arrayOf(string),
		intolerances: arrayOf(string),
		maxReadyTime: number
	}),
	setFilters: func,
	filterRecipes: func,
	time: number,
	setTime: func,
	open1: bool,
	setOpen1: func,
	open2: bool,
	setOpen2: func,
	open4: bool,
	setOpen4: func, 
	open5: bool,
	setOpen5: func
}