import {ItemCart} from "./App.tsx";

interface cartType {
    cart: ItemCart[],
    removeItem : (id: number) => void
}
const Cart = ({ cart, removeItem }:cartType ) => {

    const total = cart.reduce((total, item) => {
        return total + item.product.price * item.amount;
    }, 0);
    if(cart.length){
        return (
            <div>
                <div>
                    <h2>Your Cart {cart.length || 0}</h2>
                    {cart.map((item: ItemCart) => <div key={item.product.name}>
                        <div>
                            <h4>{item.product.name}</h4>
                            <p><span>{item.amount}</span> <span>@{item.product.price}</span>
                                <span>{item.amount * item.product.price}</span></p>
                        </div>
                        <button onClick={() => removeItem(item.id)}><img src={"./assets/images/icon-remove-item.svg"}
                                                                         alt={"remove item"}/></button>
                    </div>)}
                    <div><span>order total</span> <span>{total}</span></div>
                </div>
                <span>this is a <b>carbon neutral</b> delivery</span>
                <button>Confirm Order</button>
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