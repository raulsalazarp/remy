import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default () => {

    const [listening, setListening] = useState(false);
    const [lastInterimTranscript, setLastInterimTranscript] = useState('');
    // const { transcript, resetTranscript } = useSpeechRecognition({ commands });

    const { transcript, resetTranscript, interimTranscript, listening: isRecognitionListening } = useSpeechRecognition();


    const handleIntent = (intent, parameters) => {
		console.log("intent: XX_"+intent.String+"_XX")
        if(intent == "prev"){
            setStep(step - 1)
        }
        if(intent == "next"){
            setStep(step + 1)
        }
        if(intent == "speak"){
            speakText(instructions[step - 1]);
        }
        else{
            //intent is command not recognized
            //do nothing 
            console.log(intent)
        }
	}
    // const handleIntent = (data) => {
    //     let intent = data.intent
    //     console.log("intent: XX_"+intent+"_XX")
    //     if(intent == "prev"){
    //         setStep(step - 1)
    //     }
    //     if(intent == "next"){
    //         setStep(step + 1)
    //     }
    //     if(intent == "speak"){
    //         speakText(instructions[step - 1]);
    //     }
    //     else{
    //         //intent is command not recognized
    //         //do nothing 
    //         console.log(intent)
    //     }
    // }

    useEffect(() => {
        if (interimTranscript) {
          // Update the last interim transcript
          setLastInterimTranscript(interimTranscript);
        } else if (lastInterimTranscript) {
            let command = lastInterimTranscript
            resetTranscript();
            console.log(command);
            fetch('http://localhost:5001/text-input', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ command })
            })
            .then(response => response.json())  
			.then(data => handleIntent(data.intent, data.parameters)) 
            // .then(intent,parameters => handleIntent(data,parameters))
            // .then(data => console.log(data))
			
    
          // Clear the last interim transcript
          setLastInterimTranscript('');
        }
      }, [interimTranscript]);

    // const commands = [
    //     {
    //       command: "done",
    //       callback: () => {
    //         console.log(transcript);
    //         let command = transcript.substring((transcript.lastIndexOf("Remy")+4),transcript.lastIndexOf("done")-1);
    //         resetTranscript();
    //         console.log(command);
    //         fetch('http://localhost:5001/text-input', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ command })
    //         })
    //         .then(response => response.json()) 
    //         .then(data => handleIntent(data.intent))
    //       },
    //     }
    //   ];

    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [titles, setTitles] = useState([]); 
    const [instructions, setInstructions] = useState([]);
    const {id} = useParams();

    const lameWords = ["the", "a", "in", "large", "bowl", "medium", "let"];

    const getSteps = () => {
        let tempInstr = [];
        recipe.analyzedInstructions[0].steps.forEach(instr => {
            tempInstr.push(instr.step);
        })
        setInstructions(tempInstr);
        // create titles
        let tempTitles = [];
        recipe.analyzedInstructions[0].steps.forEach(instr => {
            let first = "the";
            let i = 0;
            while (lameWords.indexOf(first.toLowerCase()) > -1) {
                console.log(first)
                first = instr.step.split(' ')[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
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

    

    const speakText = (text) => {
        const speaker = new SpeechSynthesisUtterance()
        speaker.text = String(text)
        window.speechSynthesis.speak(speaker)
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await fetch(`http://localhost:5001/spoonacular/recipes/${id}`);
            const data = await res.json();
            console.log(data);
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

        return function cleanup() {
			SpeechRecognition.stopListening();
		}
    }, []);

  return [recipe, loading, step, setStep, instructions, titles];
};