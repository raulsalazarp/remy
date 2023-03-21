import React, { useState, useEffect, useRef} from "react";
import {Box, Toolbar, Grid, Stepper, StepLabel, Step, Typography, Button,
Divider} from '@mui/material';
import Navbar from "../components/navbar";
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import NextIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from "react-router-dom";

export default function RecipeStep() {

    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const dummyStepTitles = ["Preheat", "Prep", "Beat", "Stir", "Bake"];

    const dummySteps = [
        "Preheat oven to 350 degrees.",
        "Soften butter.",
        "Beat butter, white sugar, and brown sugar with an electric mixer in a large bowl until smooth.",
        "Beat in eggs, one at a time, then stir in vanilla.",
        "Place mix in the oven for 25 minutes."
    ]

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const mic = new SpeechRecognition()
    const [isListening, setIsListening] = useState(false)


    // mic.interimResults = true //commenting out prevents the double triple requests 
    mic.continuous = true
    mic.lang = 'en-US'
    if(!isListening){
        mic.start()
    }



    

    const handleListen = () => {

        mic.onresult = event => {
            let transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            console.log(transcript)

            mic.onerror = event => {
                console.log(event.error)
            }

            if(transcript.indexOf("done") != -1){
                let command = transcript.substring((transcript.lastIndexOf("Remy")+4),transcript.lastIndexOf("done")-1)
                // mic.stop()
                setIsListening(false)
                // mic.start() // error = Failed to execute 'start' on 'SpeechRecognition': recognition has already started.
                
                transcript = ""
                console.log(command);
                fetch('http://localhost:5001/text-input', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ command })
                })
                .then(response => response.text()) // convert the response to JSON format
                .then(data => handleIntent(data))


                // mic.start()
            }
        }
    }

    const goBackRef = useRef(null);
    const goNextRef = useRef(null);

    const handleIntent = (data) => {
        let intent = data.substring(9,data.lastIndexOf("\""))
        console.log("intent: "+intent)
        if(intent == "prev"){
            // goBackRef.current.click() //these lines break the microphone after changin the step
        }
        if(intent == "next"){
            // goNextRef.current.click() //these lines break the microphone after changin the step
        }
        if(intent == "speak"){

        }
        else{
            //intent is command not recognized
            //do nothing 
            console.log(intent)
        }
    }

    
    useEffect(() => {
        handleListen()
    },[true])

    return (
        <>
            <Navbar />
            <Box sx={{padding: 2}}>
                <Toolbar/>
                <Grid container>
                    <Grid item xs={6}>
                        <img src="/cookies.png" width="100%" height={475} style={{borderRadius: 10}}/>
                    </Grid>
                    <Grid item xs={6} sx={{padding: 2, height: 475, display: "flex", flexDirection: "column"}}>
                        <Box>
                            <Stepper activeStep={step - 1} alternativeLabel sx={{color: "white.main"}}>
                                {dummyStepTitles.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", marginTop: 2}}>
                                <Typography textAlign="center" variant="overline" fontSize={11}>{`STEP ${step} OF 5`}</Typography>
                                <Typography textAlign="center" variant="h5" fontSize={24}>{dummyStepTitles[step-1]}</Typography>
                                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                    <Typography textAlign="center" variant="body1" fontSize={16} sx={{marginTop: 3, width: "70%"}}>
                                        {dummySteps[step-1]}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <div style={{flexGrow: 1}}/>
                        <Box sx={{paddingLeft: 8, paddingRight: 8}}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <Button
                                        ref={goBackRef}
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
                                        ref={goNextRef}
                                        size="large"
                                        variant="contained"
                                        onClick={() => {step === dummySteps.length ? navigate("/home") : setStep(step + 1)}}
                                        endIcon={step === dummySteps.length ? <CheckIcon/> : <NextIcon />}
                                        sx={{color: "white.main", width: "100%", fontSize: 16}}>
                                        {step === dummySteps.length ? "Finish Recipe" : "Continue to Next Step"}
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
