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
                {item.map((item, index) => <Card key={index} id={index} item={item} setCart={add_to_cart}/>)}
            </main>
            <aside>
                <Cart cart={cart}></Cart>
            </aside>
        </section>
      </div>

    </>
  )
}

export default App
