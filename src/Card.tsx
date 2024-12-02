import {useState} from "react";

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
    setCart: (product: Product,id: number) => void ,
    id : number,
    handle_amount: (id: number, decrease: boolean) => number[]
}
const Card = ({ item, setCart, id, handle_amount }: Card) => {
    const [isAdded, setIsAdded] = useState(false);
    // cuando el elemento es retirado desde el carro se debe actualizar el estado amount y isAdded
    const [amount, setAmount] = useState(1);
    const handle_card = (decrease: boolean = false): void => {
        const [state, amount] = handle_amount(id, decrease);
        if(state === 0) {
            setIsAdded(false);
            return
        }else{
            setIsAdded(true);
        }
        setAmount(amount);
    }
    return (
        <div>
            <img src={item.image.thumbnail}  alt={"thumbnail"}/>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>{item.price}</p>
            {!isAdded
                ? <button onClick={() => {
                    setCart(item, id)
                    setIsAdded(!isAdded);
                }}>add to cart</button>
                : <div><button onClick={() => handle_card(true)}><img src={"./assets/images/icon-decrement-quantity.svg"} alt={"increment quantity"}/></button><span>{amount}</span>
                    <button onClick={() => handle_card()}><img src={"./assets/images/icon-increment-quantity.svg"} alt={"increment quantity"}/></button>
                </div>
            }
        </div>
    );
};

export default Card;