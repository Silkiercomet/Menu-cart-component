import {ItemCart} from "./App.tsx";

interface SuccessOrder {
    cart : ItemCart[];
    clear_the_cart: () => void;
}

const SuccessOrder = ({ cart, clear_the_cart } : SuccessOrder) => {
    const total = cart.reduce((total, item) => {
        return total + item.product.price * item.amount;
    }, 0);

    return (
        // modal
        <div>
            {/* modal content*/}
            <div>
                <figure><img src={"./assets/images/icon-order-confirmed.svg"} alt={"order confirmed"}/></figure>
                <h3>Order Confirmed</h3>
                <p>We hope you enjoy your food!</p>
                {cart.map((item: ItemCart) => <div key={item.product.name}>
                    <div>
                        <img src={item.product.image.thumbnail} alt={item.product.name}/>
                        <div>
                            <h4>{item.product.name}</h4>
                            <p><span>{item.amount}</span> <span>@{item.product.price}</span></p>
                        </div>
                        <span>{item.amount * item.product.price}</span>
                    </div>
                </div>)}
                <div><span>order total</span> <span>{total}</span></div>
                <button onClick={() => clear_the_cart()}>Start New Oder</button>
            </div>
        </div>
    );
};

export default SuccessOrder;