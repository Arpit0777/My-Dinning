import { currencyFormatter } from "../util/formatting";
import CartContext from '../store/CartContext.jsx';
import {useContext} from 'react';

export default function CartItem({item}){

    const cartCtx = useContext(CartContext);

    function handleAdd(){
       cartCtx.addItem(item);
    }
    function handleReduce(){
       cartCtx.removeItem(item.id);
    }
    return (
       <li className="cart-item">
         <p>
            {item.name} - {item.quantity}*{currencyFormatter.format(item.price)}
         </p>
         <p className ="cart-item-actions">
            <button onClick={handleReduce}>-</button>
            <span>{item.quantity}</span>
            <button onClick={handleAdd}>+</button>
         </p>
       </li>
    );
}