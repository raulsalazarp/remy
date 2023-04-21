import { integerPropType } from '@mui/utils';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useSound from 'use-sound';

export default () => {

  	const commands = [];

  	const [recipes, setRecipes] = useState([]);
  	const [loading, setLoading] = useState(true);
	const [time, setTime] = useState(120);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open4, setOpen4] = useState(false);
	const [open5, setOpen5] = useState(false);
	const [lastInterimTranscript, setLastInterimTranscript] = useState('');
	const { transcript, resetTranscript, interimTranscript, listening: isRecognitionListening } = useSpeechRecognition({commands});
	const [filters, setFilters] = useState({
		type: [],
		cuisine: [],
		diet: [],
		intolerances: [],
		maxReadyTime: 120
	});

	const search = async (query) => {
		console.log(query);
		await fetch('http://localhost:5001/text-input', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		})
		.then(response => response.json())  
		.then(data => handleIntent(data.intent, data.parameters)) 
	}

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
		console.log("intent: XX_" + intent + "_XX");
		console.log("parameters: ", parameters);
		if (intent !== "Command Not Recognized") {
			removeFilters();
			playSound();
		}
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

		// Open accordians
		if (len > 0) { setOpen2(true) } else { setOpen2(false) }
		if (len3 > 0) { setOpen1(true) } else { setOpen1(false) }
		if (len4 > 0 || len5 > 0) { setOpen5(true) } else { setOpen5(false) }
		if (parseInt(parameters.maxReadyTime.stringValue) !== 120) { setOpen4(true) } else { setOpen4(false) }
		 
		// Update checkboxes to match
		cuisine.forEach(entry => document.getElementById(entry).click());
		mealType.forEach(entry => document.getElementById(entry).click());
		diet.forEach(entry => document.getElementById(entry).click());
		intolerances.forEach(entry => document.getElementById(entry).click());
		setTime(parseInt(parameters.maxReadyTime.stringValue));
		
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

  	return [recipes, loading, filters, setFilters, filterRecipes, transcript, interimTranscript, 
		time, setTime, open1, setOpen1, open2, setOpen2, open4, setOpen4, open5, setOpen5, search];
};