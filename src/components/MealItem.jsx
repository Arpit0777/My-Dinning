import {useContext} from 'react';
import { currencyFormatter } from "../util/formatting.js";
import Buttons from '../UI/Buttons.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
    const value = useContext(CartContext);
    function handleAddCart(){
       value.addItem(meal);
    }
    return (
        <li className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-description">{meal.description}</p>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                </div>
                <p className="meal-item-actions">
                    <Buttons textOnly={false} onClick={handleAddCart}>Add to Cart</Buttons>
                </p>
            </article>
        </li>
    )
}