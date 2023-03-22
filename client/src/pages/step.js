import React, { useState, useEffect} from "react";
import {Box, Toolbar, Grid, Stepper, StepLabel, Step, Typography, Button,
Divider} from '@mui/material';
import Navbar from "../components/navbar";
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import NextIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function RecipeStep() {

    const commands = [
        {
          command: "done",
          callback: () => {
            console.log(transcript);
            let command = transcript.substring((transcript.lastIndexOf("Remy")+4),transcript.lastIndexOf("done")-1);
            resetTranscript();
            console.log(command);
            fetch('http://localhost:5001/text-input', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ command })
            })
            .then(response => response.text()) 
            .then(data => handleIntent(data))
          },
        }
      ];

    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [currentStep, setCurrentStep] = useState("");

    const dummyStepTitles = ["Preheat", "Prep", "Beat", "Stir", "Bake"];

    const dummySteps = [
        "Preheat oven to 350 degrees.",
        "Soften butter.",
        "Beat butter, white sugar, and brown sugar with an electric mixer in a large bowl until smooth.",
        "Beat in eggs, one at a time, then stir in vanilla.",
        "Place mix in the oven for 25 minutes."
    ]


    const handleIntent = (data) => {
        let intent = data.substring(9,data.lastIndexOf("\""))
        console.log("intent: XX_"+intent+"_XX")
        if(intent == "prev"){
            setStep(step - 1)
        }
        if(intent == "next"){
            setStep(step + 1)
        }
        if(intent == "speak"){
            speakText("come on bro")
        }
        else{
            //intent is command not recognized
            //do nothing 
            console.log(intent)
        }
    }

    const speakText = (text) => {
        const speaker = new SpeechSynthesisUtterance()
        speaker.text = String(text)
        window.speechSynthesis.speak(speaker)
    }

    
    useEffect(() => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US'
          });
    })

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
