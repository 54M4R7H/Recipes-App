import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {RecipesContext} from '../context/RecipesContext';
import Container from './reusableComponents/Container';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const FullRecipe = () => {
    const {recipes} = useContext(RecipesContext);
    const {id} = useParams();
    let history = useHistory();
    
    return( 
        <>
        <section className="fullRecipe">
            <Container>
                {recipes && recipes
                .filter((recipeData) => recipeData.recipe.label === id)
                .map((recipeData, index) => (
                    <div key={index} className="fullRecipeCard">
                        <div 
                        style={{background: `url(${recipeData.recipe.image}) no-repeat center/cover`,
                        }} 
                        className="fullRecipeBg">   
                        </div>
                        <div className="fullRecipeInfo">
                            <h2>{recipeData.recipe.label}</h2>
                            {recipeData.recipe.ingredientLines.map((ingredient, index) => (
                                <ul key={index}>
                                    <li>{ingredient}</li>
                                </ul>
                            ))} 
                        </div>

                    
                    </div>
                ))
                }
                <br></br>
                <div className="pagination">
                    <button onClick={()=>{history.push("/recipes");}}>Back</button>
                </div>
                
            </Container>

        </section>
        
        

        </>
        
    )
    
}


export default FullRecipe;