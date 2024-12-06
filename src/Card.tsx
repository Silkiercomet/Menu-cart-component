
import {ItemCart} from "./App.tsx";
import React from "react";

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
    item : Product,
    add_to_cart: (product: Product,id: number) => void ,
    id : number,
    cart : ItemCart[],
    removeItem : (id: number) => void
    setCart: React.Dispatch<React.SetStateAction<ItemCart[]>>
    screenSize: "mobile" | "tablet" | "desktop"
}

const Card = ({ item, add_to_cart, id, cart,removeItem, setCart, screenSize }: Card) => {
    const handle_amount = (decrease = false) => {
        let new_data = [...cart]
        const cart_item_to_update: ItemCart | any = new_data.find(item => item.id === id);
        if((decrease && cart_item_to_update.amount === 1)) {
            removeItem(id)
            return
        } else if(decrease && cart_item_to_update.amount > 1) {
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
    if(screenSize === "tablet"){
        image = item.image.tablet
    }else if(screenSize === "desktop"){
        image = item.image.desktop
    }else{
        image = item.image.mobile
    }
    return (
        <div>
            <img src={image} alt={item.name}/>
            <p>{item.category}</p>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            {!is_in_cart
                ? <button onClick={() => {
                    add_to_cart(item, id)
                }}>add to cart</button>
                : <div>
                    <button onClick={() => handle_amount(true)}><img src={"./assets/images/icon-decrement-quantity.svg"}
                                                                     alt={"decrement quantity"}/></button>
                    <span>{is_in_cart.amount}</span>
                    <button onClick={() => handle_amount()}><img src={"./assets/images/icon-increment-quantity.svg"}
                                                                 alt={"increment quantity"}/></button>
                </div>
            }
        </div>
    );
};

export default Card;