import { useState, useEffect } from 'react'
import './App.css'
import Card from "./Card.tsx";
import Cart from "./Cart.tsx";
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
export interface ItemCart {
    id: number;
    product: Product;
    amount: number;

}

function App() {
  const [cart, setCart] = useState<ItemCart[]>([]);
  const [item, setItem] = useState<Product[]>([]);
    const add_to_cart = (product: Product, id:number) => {
        const new_cart_item : ItemCart = {id: id, product: product, amount: 1};
        setCart([...cart, new_cart_item]);
        console.log(cart)
    }
    const remove_from_cart = (id: number) => {
        const updated_cart = [...cart].filter(item => item.id !== id);
        setCart(updated_cart);
    }
    const handle_amount = (id: number, decrease = false):number[] => {
        let new_data = [...cart]
        const cart_item_to_update: ItemCart | any = new_data.find(item => item.id === id);
        if((decrease && cart_item_to_update.amount === 1)) {
            remove_from_cart(id)
            return [0, 0]
        } else if(decrease && cart_item_to_update.amount > 1) {
            cart_item_to_update.amount = cart_item_to_update.amount - 1
            setCart(new_data)
            return [1, cart_item_to_update.amount]
        }
        cart_item_to_update.amount = cart_item_to_update.amount + 1
        setCart(new_data)
        return [1, cart_item_to_update.amount]
    }
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch("http://localhost:5173/src/data.json");
                const data: Product[] = await response.json();

                setItem(data);
                return data;
            } catch (err){
                console.log(err);
            }
        }
        fetchData().then(r => console.log(r));
    }, [])

  return (
    <>
      <div className={"wrapper"}>
        <section>
            <h1>Desserts</h1>
            <main>
                {item.map((item, index) => <Card key={index} id={index} item={item} setCart={add_to_cart} handle_amount={handle_amount}/>)}
            </main>
            <aside>
                <Cart cart={cart} removeItem={remove_from_cart}></Cart>
            </aside>
        </section>
      </div>

    </>
  )
}

export default App
