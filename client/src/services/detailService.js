import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id, ratings, time, cal, serv} = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
        const res = await fetch(`http://localhost:5001/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
        setLoading(false);
    };

    if (loading) {
      fetchRecipe();
    }
  }, []);

  return [recipe, loading, ratings, time, cal, serv];
};