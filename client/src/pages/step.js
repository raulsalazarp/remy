import React, { useState, useEffect} from "react";
import {Box, Toolbar, Grid, Stepper, StepLabel, Step, Typography, Button,
Divider} from '@mui/material';
import Navbar from "../components/navbar";
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import NextIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { string, shape, number, bool } from "prop-types";
import useService from "../services/stepService";
import Loading from '../components/loading';

export default function RecipeStep() {

    const navigate = useNavigate();
    const [recipe, loading, step, setStep] = useService();
    const [instructions, setInstructions] = useState([]);
    const [titles, setTitles] = useState([]); 
    const lameWords = ["the", "a", "in", "large", "bowl", "medium", "let"];

    const getSteps = () => {
        console.log(recipe)
        let list = recipe.Instructions.split(". ")
        setInstructions(list);
        // create titles
        let tempTitles = [];
        list.forEach(instr => {
            let first = "the";
            let i = 0;
            while (lameWords.indexOf(first.toLowerCase()) > -1) {
                console.log(first)
                first = instr.split(' ')[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
                i++;
            }
            first = first.charAt(0).toUpperCase() + first.substring(1, first.length)
            tempTitles.push(first);
            setTitles(tempTitles);
        });
    }

    useEffect(() => {
        if (!loading)
            getSteps()
    }, [recipe])

    return (
        loading ? <Loading/> :
        <>
            <Navbar />
            <Box sx={{padding: 2}}>
                <Toolbar/>
                <Grid container>
                    <Grid item xs={6}>
                        <img src={`/${recipe.Image_Name}.jpg`} width="100%" height={475} style={{borderRadius: 10, objectFit: "cover"}}/>
                    </Grid>
                    <Grid item xs={6} sx={{padding: 2, height: 475, display: "flex", flexDirection: "column"}}>
                        <Box>
                            <Stepper activeStep={step - 1} alternativeLabel sx={{color: "white.main"}}>
                                {titles ? titles.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                                )) : null}
                            </Stepper>
                            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", marginTop: 2}}>
                                <Typography textAlign="center" variant="overline" fontSize={11}>{`STEP ${step} OF 5`}</Typography>
                                <Typography textAlign="center" variant="h5" fontSize={24}>{titles ? titles[step-1] : null}</Typography>
                                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                    <Typography textAlign="center" variant="body1" fontSize={16} sx={{marginTop: 3, width: "70%"}}>
                                        {instructions ? instructions[step-1] : null}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <div style={{flexGrow: 1}}/>
                        <Box sx={{paddingLeft: 8, paddingRight: 8}}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        onClick={() => setStep(step - 1)}
                                        disabled={step == 1}
                                        color="secondary"
                                        startIcon={<BackIcon sx={{marginLeft: 1}}/>}
                                        sx={{color: "white.main", width: "100%", fontSize: 16, height: "100%"}}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        onClick={() => {step === instructions.length ? navigate("/home") : setStep(step + 1)}}
                                        endIcon={step === instructions.length ? <CheckIcon/> : <NextIcon />}
                                        sx={{color: "white.main", width: "100%", fontSize: 16}}>
                                        {step === instructions.length ? "Finish Recipe" : "Continue to Next Step"}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box>
                                <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                                <Box sx={{display: "flex", gap: 3, alignItems: "center"}}>
                                    <img src="/Remy.png" height={90}/>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Remy is here to help!</Typography>
                                        <Typography variant="body2">Speak to interact and Remy will do the rest. Start with “hey Remy!”</Typography>
                                    </Box>
                                    <img src="/Speak.png" height={40}/>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
