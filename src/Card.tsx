import {ItemCart} from "./App.tsx";
import React from "react";
import style from "./styles/card.module.css"

interface Product {
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
}

interface Card {
    item: Product,
    add_to_cart: (product: Product, id: number) => void,
    id: number,
    cart: ItemCart[],
    removeItem: (id: number) => void
    setCart: React.Dispatch<React.SetStateAction<ItemCart[]>>
    screenSize: "mobile" | "tablet" | "desktop"
}

const Card = ({item, add_to_cart, id, cart, removeItem, setCart, screenSize}: Card) => {
    const handle_amount = (decrease = false) => {
        let new_data = [...cart]
        const cart_item_to_update: ItemCart | any = new_data.find(item => item.id === id);
        if ((decrease && cart_item_to_update.amount === 1)) {
            removeItem(id)
            return
        } else if (decrease && cart_item_to_update.amount > 1) {
            cart_item_to_update.amount = cart_item_to_update.amount - 1
            setCart(new_data)
            return
        }
        cart_item_to_update.amount = cart_item_to_update.amount + 1
        setCart(new_data)
        return
    }
    const is_in_cart = cart.find((element) => element.id === id)
    let image
    if (screenSize === "tablet") {
        image = item.image.tablet
    } else if (screenSize === "desktop") {
        image = item.image.desktop
    } else {
        image = item.image.mobile
    }
    return (
        <div className={style.card}>
            <figure className={style.card_image}>
                <img src={image} alt={item.name}/>
                {!is_in_cart
                    ? <button className={style.card_image_select} onClick={() => {
                        add_to_cart(item, id)
                    }}><i><img src={"./assets/images/icon-add-to-cart.svg"} alt="add yo cart"/></i>Add to Cart</button>
                    : <div className={style.card_image_selected}>
                        <button onClick={() => handle_amount(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none"
                                 viewBox="0 0 10 2">
                                <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                            </svg>
                        </button>
                        <span>{is_in_cart.amount}</span>
                        <button onClick={() => handle_amount()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none"
                                 viewBox="0 0 10 10">
                                <path fill="#fff"
                                      d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                            </svg>
                        </button>
                    </div>
                }
            </figure>
            <p>{item.category}</p>
            <h3>{item.name}</h3>
            <p className={style.card_price}>${parseFloat(String(item.price)).toFixed(2)}</p>

        </div>
    );
};

export default Card;