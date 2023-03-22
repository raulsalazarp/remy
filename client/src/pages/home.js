import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, Select, MenuItem, Grid, Toolbar, Box, Typography} from '@mui/material';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Filter from "../components/filter";
import Navbar from '../components/navbar';
import RecipeCard from '../components/card';
import useService from '../service';
import Loading from '../components/loading';

const Main = styled((props) => (
	<MuiBox component="main" {...props} />
  ))(({ theme }) => ({
	marginLeft: 284
  }));

export default function Home() {

    const [sortby, setSortby] = useState("Reviews");
    const dummyRecipes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const [recipes, loading] = useService();

    return (
        loading ? <Loading/> :
        <>
            {recipes.forEach(r => console.log(r))}
            <Navbar />
            <Filter />
            <Main>
                <Grid container>
                    <Grid item xs={12}><Toolbar/></Grid>
                    <Grid item xs={12} sx={{padding: 2}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
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
            </Main>
        </>
    )
}