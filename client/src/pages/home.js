import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, Select, MenuItem, Grid, Toolbar, Box, Typography} from '@mui/material';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Filter from "../components/filter";
import Navbar from '../components/navbar';

const Main = styled((props) => (
	<MuiBox component="main" {...props} />
  ))(({ theme }) => ({
	marginLeft: 284
  }));

export default function Home() {

    const [sortby, setSortby] = useState("Reviews");

    return (
        <>
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
                            <div style={{marginLeft: 100}}>TBD</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Main>
        </>
    )
}