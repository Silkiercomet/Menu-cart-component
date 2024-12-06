import {ItemCart} from "./App.tsx";
import React from "react";
import style from "./styles/cart.module.css"

interface cartType {
    cart: ItemCart[],
    removeItem : (id: number) => void,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
const Cart = ({ cart, removeItem, setModal }:cartType ) => {

    const [total_price, total_amount_items] = cart.reduce((total, item) => {
        total[0] += item.product.price * item.amount
        total[1] += item.amount;
        return total
    }, [0,0]);

    if(cart.length){
        return (
            <div className={style.cart}>
                <section>
                    <h2>Your Cart ({total_amount_items})</h2>
                    {cart.map((item: ItemCart) => <div className={style.cart__item} key={item.product.name}>
                        <div className={style.cart__item_details}>
                            <h4>{item.product.name}</h4>
                            <p><span>{item.amount}x</span> <span>@ ${item.product.price}</span>
                                <span>${item.amount * item.product.price}</span></p>
                        </div>
                        <button onClick={() => removeItem(item.id)}><img src={"./assets/images/icon-remove-item.svg"}
                                                                         alt={"remove item"}/></button>
                    </div>)}
                    <div className={style.cart__total}><span>order total</span> <span>${total_price}</span></div>
                </section>
                <span className={style.cart__footer}> <img src={"./assets/images/icon-carbon-neutral.svg"} alt={"carbon neutral order"}/> this is a <b> carbon neutral </b> delivery</span>
                <button onClick={() => setModal(true)} className={style.cart__btn}>Confirm Order</button>
            </div>
        );
    }
    return (
        <>
            <h2>Your Cart (0)</h2>
            <div className="cart__empty">
                <img src={"./assets/images/illustration-empty-cart.svg"} alt="illustration-empty-cart"/>
                <p>Your added items will appear here</p>
            </div>
        </>
    )
};

export default Cart;