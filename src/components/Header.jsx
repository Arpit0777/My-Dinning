import logo from '../assets/logo.jpg';
import Buttons from '../UI/Buttons.jsx';
import {useContext} from 'react';
import CartContext  from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header(){
    const cartctxt  = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const totalCartItems = cartctxt.items.reduce((totalNumberofItems,item) => {
        return totalNumberofItems+item.quantity;
    },0);

    function handleCart(){

        progressCtx.showCart();
    }
    return (
        <div id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>Your Dinner</h1>
            </div>
            <Buttons textOnly onClick={handleCart}>Cart ({totalCartItems})</Buttons>
        </div>
    );
}