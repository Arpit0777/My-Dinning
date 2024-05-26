import {createContext,useReducer} from 'react';

const CartContext = createContext({
    items:[],
    addItem:(item) => {},
    removeItem:(id) => {},
    clearCart:()=>{},
});
function cartReducer(state,action){
    if(action.type==='ADD_ITEM'){
        // code to add item in our item state.
        
        // """"state.item.push(action.item);
        // above code will work but we will mutate the state instead of updating it bcz of push which will edit the current value of state before the execution of this cartReducer function.
        const existingCartIndex = state.items.findIndex((item)=>item.id===action.item.id);
        const updatedItems = [...state.items];
        // const existingItem  = state.items[existingCartIndex];
        if(existingCartIndex>-1){
            const updatedItem = {
                ...state.items[existingCartIndex],
                quantity: state.items[existingCartIndex].quantity+1,
            }
            updatedItems[existingCartIndex] = updatedItem;
        }
        else{
            updatedItems.push({...action.item,quantity:1});
        }
        return {...state,items:updatedItems};
    }
    if(action.type==='REMOVE_ITEM'){
        // code to remove item.
        const existingCartIndex = state.items.findIndex((item)=>item.id===action.id);
        const existingItem = state.items[existingCartIndex];
        const updatedItems = [...state.items];
        if(existingItem.quantity>1){
            const updatedItem = {
                ...existingItem,
                quantity:existingItem.quantity-1,
            }
            updatedItems[existingCartIndex] = updatedItem;
        }
        if(existingItem.quantity===1){
          
           updatedItems.splice(existingCartIndex,1);
        }
       
        return {...state,items:updatedItems};
    }
    if(action.type==='CLEAR_CART'){
        return {...state,items:[]};
    }
    return state;
}
export function CartContextProvider({children}){
    const [cart,dispatchCartAction] = useReducer(cartReducer,{items:[]});


    function addCart(item){
       dispatchCartAction({type:'ADD_ITEM',item:item});
    }

    function removeCart(id){
       dispatchCartAction({type:'REMOVE_ITEM',id:id});
    }

    function clearCart(){
        dispatchCartAction({type:'CLEAR_CART'})
    }

    const cartContext={
        items:cart.items,
        addItem:addCart,
        removeItem:removeCart,
        clearCart,
    }
    console.log(cartContext);

    return (<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>);
}
export default CartContext;