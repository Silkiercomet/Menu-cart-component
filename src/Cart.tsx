import {ItemCart} from "./App.tsx";

interface cartType {
    cart: ItemCart[]
}
const Cart = ({ cart }:cartType ) => {
    return (
        <div>
            <h2>Your Cart {cart.length || 0}</h2>
            {cart.map((item: ItemCart) => <div key={item.product.name}>
                <div>
                    <h4>{item.product.name}</h4>
                    <p><span>{item.amount}</span> <span>@{item.product.price}</span> <span>{item.amount * item.product.price}</span></p>
                </div>
                <button><img src={"./assets/images/icon-remove-item.svg"}/></button>
            </div>)}

        </div>
    );
};

export default Cart;