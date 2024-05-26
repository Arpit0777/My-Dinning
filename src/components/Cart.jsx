import {useContext} from 'react';
import Modal from '../UI/Modal.jsx';
import CartItem from './CartItem.jsx';
import CartContext from '../store/CartContext.jsx';
import Buttons  from '../UI/Buttons.jsx';
import { currencyFormatter } from '../util/formatting.js';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart(){
    const cartctx = useContext(CartContext); 
    const cartTotal = cartctx.items.reduce((totalAmount,item)=>totalAmount+item.price*item.quantity,0);
     
    const progressCtx = useContext(UserProgressContext);

    function handleCloseCart(){
        progressCtx.hideCart();
    }

    function handleGoToCheckout(){
        progressCtx.showCheckout();
    }
   return (
    <Modal className="cart" open={progressCtx.progress==='cart'} onClose={progressCtx.progress==='cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartctx.items.map((item)=>(
               <CartItem item={item}/>
            ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Buttons textOnly onClick={handleCloseCart}>Close</Buttons>
            {cartctx.items.length>0 && <Buttons onClick={handleGoToCheckout}>Go to Checkout</Buttons>}
        </p>
    </Modal>
   )
}