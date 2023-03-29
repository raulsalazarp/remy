import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
        const res = await fetch(`http://localhost:5001/spoonacular/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
        setLoading(false);
    };

    if (loading) {
      fetchRecipe();
    }
  }, []);

  return [recipe, loading];
};