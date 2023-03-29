import { useState, useEffect } from 'react';

export default () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
        const res = await fetch('http://localhost:5001/spoonacular/recipes');
        const data = await res.json();
        console.log(data);
        setRecipes(data);
        setLoading(false);
    };

    if (loading) {
      fetchRecipes();
    }
  }, []);

  return [recipes, loading];
};