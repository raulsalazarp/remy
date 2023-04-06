import { integerPropType } from '@mui/utils';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default () => {

  	const commands = [];

  	const [recipes, setRecipes] = useState([]);
  	const [loading, setLoading] = useState(true);
	const [lastInterimTranscript, setLastInterimTranscript] = useState('');
	const { transcript, resetTranscript, interimTranscript, listening: isRecognitionListening } = useSpeechRecognition({commands});


	const filterRecipes = async (json) => {
		const queryParams = new URLSearchParams(json);
		setLoading(true);
		const res = await fetch('http://localhost:5001/spoonacular/recipes?' + queryParams);
		const data = await res.json();
		setRecipes(data);
		setLoading(false);
	}

	const handleEnd = () => {
		// Process the speech input, for example, execute a command
		console.log('Transcript:', transcript);
	};

	const handleResult = () => {
		// Process the speech input, for example, execute a command
		console.log('Transcript:', transcript);
	};

	const addFilter = (param, value) => {
		//lauren add here 
		return;
	}

	
	const handleIntent = (intent, parameters) => {
		console.log("intent: XX_" + intent + "_XX");
		// console.log("parameters: ", parameters);
		let cuisine = parameters.cuisine.stringValue
		let ingredients = parameters.ingredients.stringValue
		let mealType = parameters.mealType.stringValue
		let filters = {
			type: [mealType],
			cuisine: [cuisine],
			ingredients: [],
			diet: [ingredients],
			intolerances: [],
			maxReadyTime: 120
		}
		console.log("cuisine: "+cuisine)
		console.log("ingredients: "+ingredients)
		console.log("mealType: "+mealType)
		filterRecipes(filters);
		//what to do with these now?
	}

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
    
          // Clear the last interim transcript
          setLastInterimTranscript('');
        }
      }, [interimTranscript]);

  	useEffect(() => {
    	const fetchRecipes = async () => {
			const res = await fetch('http://localhost:5001/spoonacular/recipes');
			const data = await res.json();
			setRecipes(data);
			setLoading(false);
		};

		const listen = () => {
			SpeechRecognition.startListening({
				continuous: true,
				language: 'en-US',
				onResult: handleResult,
				onEnd: handleEnd,
			});
 		}

		if (loading) {
			fetchRecipes();
			listen();
		}

		return function cleanup() {
			SpeechRecognition.stopListening();
		}
  	}, []);

  	return [recipes, loading, filterRecipes, transcript, interimTranscript];
};