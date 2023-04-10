import { integerPropType } from '@mui/utils';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useSound from 'use-sound';

export default () => {

  	const commands = [];

  	const [recipes, setRecipes] = useState([]);
  	const [loading, setLoading] = useState(true);
	const [lastInterimTranscript, setLastInterimTranscript] = useState('');
	const { transcript, resetTranscript, interimTranscript, listening: isRecognitionListening } = useSpeechRecognition({commands});
	const [filters, setFilters] = useState({
		type: [],
		cuisine: [],
		ingredients: [],
		diet: [],
		intolerances: [],
		maxReadyTime: 120
	});

	const [playSound] = useSound(
		'/ding.wav',
		{ volume: 0.25 }
	);

	const filterRecipes = async (json) => {
		setFilters(json);
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

	const removeFilters = () => {
		filters.type.forEach(filt => document.getElementById(filt).click());
		filters.cuisine.forEach(filt => document.getElementById(filt).click());
		filters.ingredients.forEach(filt => document.getElementById(filt).click());
		filters.diet.forEach(filt => document.getElementById(filt).click());
		filters.intolerances.forEach(filt => document.getElementById(filt).click());
	}

	
	const handleIntent = (intent, parameters) => {
		removeFilters();
		console.log("intent: XX_" + intent + "_XX");
		console.log("parameters: ", parameters);
		let cuisine = parameters.cuisine.stringValue;
		let ingredients = parameters.ingredients.stringValue;
		let mealType = parameters.mealType.stringValue;
		//TODO once Raul makes these parameters lists, the following will also need to be adjusted
		document.getElementById(cuisine.toLowerCase()).click();
		document.getElementById(ingredients).click();
		document.getElementById(mealType).click();
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
			.then(playSound())
    
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