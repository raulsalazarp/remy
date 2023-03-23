import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default () => {
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

    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const {id} = useParams();

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
            speakText(dummySteps[step - 1]);
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
        const fetchRecipe = async () => {
            const res = await fetch(`http://localhost:5001/recipes/${id}`);
            const data = await res.json();
            setRecipe(data);
            setLoading(false);
        };
        const listen = () => {
            SpeechRecognition.startListening({
                continuous: true,
                language: 'en-US'
            });
        }

        if (loading) {
            fetchRecipe();
            listen();
        }
    }, []);

  return [recipe, loading, step, setStep];
};