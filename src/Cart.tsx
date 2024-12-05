import {ItemCart} from "./App.tsx";
import React from "react";

interface cartType {
    cart: ItemCart[],
    removeItem : (id: number) => void,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const Cart = ({ cart, removeItem, setModal }:cartType ) => {

    const [total_price, total_amount_items] = cart.reduce((total, item) => {
        total[0] = total[0] + item.product.price * item.amount
        total[1] = total[1] + item.amount;
        return total
    }, [0,0]);

    if(cart.length){
        return (
            <div>
                <div>
                    <h2>Your Cart {total_amount_items}</h2>
                    {cart.map((item: ItemCart) => <div key={item.product.name}>
                        <div>
                            <h4>{item.product.name}</h4>
                            <p><span>{item.amount}</span> <span>@{item.product.price}</span>
                                <span>{item.amount * item.product.price}</span></p>
                        </div>
                        <button onClick={() => removeItem(item.id)}><img src={"./assets/images/icon-remove-item.svg"}
                                                                         alt={"remove item"}/></button>
                    </div>)}
                    <div><span>order total</span> <span>{total_price}</span></div>
                </div>
                <span>this is a <b>carbon neutral</b> delivery</span>
                <button onClick={() => setModal(true)}>Confirm Order</button>
            </div>
        );
    }
    return (
        <div>
            <img src={"./assets/images/illustration-empty-cart.svg"} alt="illustration-empty-cart"/>
            <p>Your added items will appear here</p>
        </div>
    )
};

export default Cart;