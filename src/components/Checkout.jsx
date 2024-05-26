import Modal from '../UI/Modal.jsx';
import Input from '../UI/Input.jsx';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Buttons from '../UI/Buttons.jsx';
import {useContext} from 'react';
import useHttp from '../Hooks/useHttp.js';

let myConfig = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
}
export default function Checkout(){
    const cartctx = useContext(CartContext);

    const userctx = useContext(UserProgressContext);

    const cartTotal = cartctx.items.reduce((totalAmount,item)=>totalAmount+item.price*item.quantity,0);

    // usinng custom hook
    const {error,data,isLoading,sendRequest,clearInterval} = useHttp('http://localhost:3000/orders',myConfig);

    

    function handleCheckoutClose(){
        userctx.hideCheckout();
    }
    // handling form submission 
    function handleSubmit(event){
        event.preventDefault();
        // By default form data will submit and the will be sent to the server which is running this site.WE dont want that instead we want our data to store at backend.
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        sendRequest(JSON.stringify({
            order:{
                items:cartctx.items,
                customer:customerData
            }
        }));
    }

    function handleFinish(){
        userctx.hideCheckout();
        cartctx.clearCart();
        clearInterval();
    }
    if(isLoading){
        console.log('loading');
    }

    if(data && !error){
        return <Modal open={userctx.progress==='checkout'} onClose={handleCheckoutClose}>
           <h2>Success!</h2>
           <p>Your order is Placed successfully</p>
           <p>WE will be right back with your order info in a minute...</p>
           <p className="modal-actions">
            <Buttons onClick={handleFinish}>Okay</Buttons>
           </p>
        </Modal>
    }

    return (
       <Modal open={userctx.progress==='checkout'} onClose={handleCheckoutClose}>
         <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full-Name" type='text' id="name"/>
            <Input label="E-mail" type='email' id="email"/>
            <Input label="Address" type='text' id="street"/>
            <div className="control-row">
            <Input label="pin-code" type='text' id="postal-code"/>
            <Input label="City" type='text' id="city"/>
            </div>
            {error && <Error title="Failed to submit order" message={error}/>}
            <p>
                <Buttons type="button" onClick={handleCheckoutClose} textOnly>close</Buttons>
                <Buttons>Place Order</Buttons>
            </p>
         </form>
       </Modal>
    );
}