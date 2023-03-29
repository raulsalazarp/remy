import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default () => {

  	const commands = [];

  	const [recipes, setRecipes] = useState([]);
  	const [loading, setLoading] = useState(true);
  	const { transcript, resetTranscript } = useSpeechRecognition({ commands });

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
				language: 'en-US'
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

  	return [recipes, loading];
};