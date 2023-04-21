import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, Select, MenuItem, Grid, Toolbar, Box, Typography,
OutlinedInput, InputAdornment} from '@mui/material';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Filter from "../components/filter";
import Navbar from '../components/navbar';
import RecipeCard from '../components/card';
import useService from '../services/homeService';
import Loading from '../components/loading';
import SearchIcon from '@mui/icons-material/SearchRounded';

const Main = styled((props) => (
	<MuiBox component="main" {...props} />
  ))(({ theme }) => ({
	marginLeft: 284
  }));

export default function Home() {

    const [sortby, setSortby] = useState("Reviews");
    const dummyRecipes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const [recipes, loading, filters, setFilters, filterRecipes, transcript, interimTranscript, 
        time, setTime, open1, setOpen1, open2, setOpen2, open4, setOpen4, open5, setOpen5] = useService();

    return (
        <>
            {console.log(interimTranscript)}
            <Navbar />
            <Filter filters={filters} setFilters={(data) => setFilters(data)} filterRecipes={() => filterRecipes()} time={time} setTime={(data) => setTime(data)}
                open1={open1} setOpen1={(data) => setOpen1(data)} open2={open2} setOpen2={(data) => setOpen2(data)}
                open4={open4} setOpen4={(data) => setOpen4(data)} open5={open5} setOpen5={(data) => setOpen5(data)}/>
            {loading ? <Loading left='60%' right='40%'/> :
            <Main>
                <Grid container>
                    <Grid item xs={12}><Toolbar/></Grid>
                    <Grid item xs={12} sx={{padding: 2}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} justifyContent="space-between" alignItems="center" display="flex">
                                <Typography variant="h4">Popular Recipes</Typography>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
                                        <OutlinedInput
                                            startAdornment={
                                            <InputAdornment position="end">
                                                <SearchIcon/>
                                            </InputAdornment>
                                            }
                                            placeholder="Search"
                                            onKeyDown={(e) => {if (e.key === "Enter") console.log("send search request to server here using e.target.value")}}
                                        />
                                    </FormControl>
                                    <FormControl size="small">
                                        <InputLabel>Sort By</InputLabel>
                                        <Select
                                            value={sortby}
                                            label="Sort By"
                                            onChange={(e) => setSortby(e.target.value)}
                                        >
                                            <MenuItem value={"Reviews"}>Reviews</MenuItem>
                                            <MenuItem value={"Newest"}>Newest</MenuItem>
                                            <MenuItem value={"Oldest"}>Oldest</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            {recipes.length > 0 ?
                            recipes.map(r => <Grid item xs={4}><RecipeCard recipe={r}/></Grid>)
                            : <Typography variant="h5" sx={{minHeight: 445, marginLeft: 10, marginTop: 5}}>
                                No results that match your search
                                </Typography>}
                        </Grid>
                    </Grid>
                </Grid>
            </Main>}
        </>
    )
}