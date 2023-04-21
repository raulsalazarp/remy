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
		diet: [],
		intolerances: [],
		maxReadyTime: 120
	});

	const [playSound] = useSound(
		'/ding.wav',
		{ volume: 0.25 }
	);

	const filterRecipes = async (filts= filters) => {
		console.log(filts);
		const queryParams = new URLSearchParams(filts);
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
		filters.type.forEach(filt => document.getElementById(filt) ? document.getElementById(filt).click() : null);
		filters.cuisine.forEach(filt => document.getElementById(filt) ? document.getElementById(filt).click() : null);
		filters.diet.forEach(filt => document.getElementById(filt) ? document.getElementById(filt).click() : null);
		filters.intolerances.forEach(filt => document.getElementById(filt) ? document.getElementById(filt).click() : null);
		const filts = {
			type: [],
			cuisine: [],
			diet: [],
			intolerances: [],
			maxReadyTime: 120
		}
		setFilters(filts);
	}

	
	const handleIntent = (intent, parameters) => {
		removeFilters();
		console.log("intent: XX_" + intent + "_XX");
		console.log("parameters: ", parameters);
		//cuisine 
		let cuisine = []
		let len = parameters.cuisine.listValue.values.length;
		for(let i = 0; i < len; i++){
			cuisine.push(parameters.cuisine.listValue.values[i].stringValue.toLowerCase());
		}
		//meal type
		let mealType = []
		let len3 = parameters.mealType.listValue.values.length;
		for(let i = 0; i < len3; i++){
			mealType.push(parameters.mealType.listValue.values[i].stringValue.toLowerCase());
		}
		//diet 
		let diet = []
		let len4 = parameters.diet.listValue.values.length;
		for(let i = 0; i < len4; i++){
			diet.push(parameters.diet.listValue.values[i].stringValue.toLowerCase());
		}
		//intolerances 
		let intolerances = []
		let len5 = parameters.intolerances.listValue.values.length;
		for(let i = 0; i < len5; i++){
			intolerances.push(parameters.intolerances.listValue.values[i].stringValue.toLowerCase());
		}
		 
		cuisine.forEach(entry => document.getElementById(entry).click());
		mealType.forEach(entry => document.getElementById(entry).click());
		diet.forEach(entry => document.getElementById(entry).click());
		intolerances.forEach(entry => document.getElementById(entry).click());
		document.getElementById("maxReadyTime").value = parseInt(parameters.maxReadyTime.stringValue);
				
		const filts = {
			type: mealType,
			cuisine: cuisine,
			diet: diet,
			intolerances: intolerances,
			maxReadyTime: parseInt(parameters.maxReadyTime.stringValue)
		}
		console.log("cuisine: "+cuisine)
		console.log("mealType: "+mealType)
		console.log("diet: "+diet)
		console.log("tolerances: "+intolerances)
		console.log("maxReadyTime: "+parseInt(parameters.maxReadyTime.stringValue))
		setFilters(filts);
		filterRecipes(filts);
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

  	return [recipes, loading, filters, setFilters, filterRecipes, transcript, interimTranscript];
};