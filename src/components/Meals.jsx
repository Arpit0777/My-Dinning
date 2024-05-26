import MealItem from './MealItem.jsx';
import useHttp from '../Hooks/useHttp.js';
import Error from './Error.jsx';

let config = {};
export default function Meals() {
   
    const {error,data:loadedMeals,isLoading} = useHttp('http://localhost:3000/meals',config,[]);
    
    // if we define this fethcMeals function outside the useEffect:
    // ->we have to add fetchMeals in dependency Array.
    // ->we have to use useCallback to avoid the remaking of this function.
    // Therefor putting it inside the useEffect is best.
    if(isLoading){
        return <p>Fetching details please wait....</p>
    }

    if(error){
       return <Error title="Failed to fetch meals" message="Not found"/>
    }

    
    return (
        <ul id="meals">
            {loadedMeals.map((item)=>(
                <MealItem key={item.id} meal={item}/>
            ))}
        </ul>
    )
}