import { useState, useEffect } from 'react';

export default () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
        const res = await fetch('http://localhost:5001/recipes');
        const data = await res.json();
        setRecipes(data);
        setLoading(false);
    };

    if (loading) {
      fetchRecipes();
    }
  }, []);

  return [recipes, loading];
};