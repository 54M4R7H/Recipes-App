import React, { useState, useEffect, createContext } from 'react';

export const RecipesContext = createContext();

export const RecipesState = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [firstRecipe, setFirstRecipe] = useState(0);
    const [lastRecipe, setLastRecipe] = useState(9);
    const [isHidden, setIsHidden] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const APP_ID = "78441a09";
    const APP_KEY = "3535e03170d4dd9eef923df8085294df";
    const FIRST_REQ = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}&from=30&to=39`;
    const URL = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${firstRecipe}&to=${lastRecipe}`;

    const getFirstResult = async () => {
        setLoading(true);   
        const response = await fetch(FIRST_REQ);
        const data = await response.json();
        setRecipes(data.hits);
        setLoading(false);
    };

    const searchRecipes = async () => {
        setError(false);
        setLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        if(search.trim() !== '' && !data.more) {
            setLoading(false);
            setError(true);
            return;
        }
        setRecipes(data.hits);
        setLoading(false);
    };

    const getRecipes = e => {
        e.preventDefault();
        if(search.trim() === '') return;
        setIsHidden(true);
        searchRecipes();
    }

    const handlePage = (direction) => {
        if (direction === "next") {
          setFirstRecipe((prevRecipe) => prevRecipe + 9);
          setLastRecipe((prevRecipe) => prevRecipe + 9);
          return;
        }
        if (direction === "previous" && firstRecipe !== 0) {
          setFirstRecipe((prevRecipe) => prevRecipe - 9);
          setLastRecipe((prevRecipe) => prevRecipe - 9);
        }
      };

    useEffect(() => {
        searchRecipes();
    },[firstRecipe, lastRecipe])

    useEffect(()=>{
        getFirstResult();
    }, []);

    

    return(
        <RecipesContext.Provider value={{ recipes, setRecipes, getRecipes, search, setSearch, isHidden, error, loading, handlePage }}>
            {children}
        </RecipesContext.Provider>
    );
};