import {ItemCart} from "./App.tsx";
import style from "./styles/successorder.module.css"

interface SuccessOrder {
    cart: ItemCart[];
    clear_the_cart: () => void;
}

const SuccessOrder = ({cart, clear_the_cart}: SuccessOrder) => {
    const total = cart.reduce((total, item) => {
        return total + item.product.price * item.amount;
    }, 0);

    return (
        // modal
        <div className={style.modal}>
            {/* modal content*/}
            <div className={style.modal_content}>
                <figure><img src={"./assets/images/icon-order-confirmed.svg"} alt={"order confirmed"}/></figure>
                <h3>Order Confirmed</h3>
                <p>We hope you enjoy your food!</p>
                {cart.map((item: ItemCart) => <div key={item.product.name} className={style.modal_content_item}>

                    <img src={item.product.image.thumbnail} alt={item.product.name}/>
                    <div>
                        <h4>{item.product.name}</h4>
                        <p><span>{item.amount}x</span>
                            <span>@ ${parseFloat(String(item.product.price)).toFixed(2)}</span></p>
                    </div>
                    <span>${parseFloat(String(item.amount * item.product.price)).toFixed(2)}</span>


                </div>)}
                <div className={style.modal_content_total}><span>Order Total</span>
                    <span>${parseFloat(String(total)).toFixed(2)}</span></div>

                <button onClick={() => clear_the_cart()} className={style.modal_content_btn}>Start New Order</button>
            </div>
        </div>
    );
};

export default SuccessOrder;