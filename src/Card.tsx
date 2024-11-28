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
    id : number
}
const Card = ({ item, setCart, id }: Card) => {
    return (
        <div>
            <img src={item.image.thumbnail}  alt={"thumbnail"}/>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <button onClick={() => setCart(item, id)}>add to cart</button>
        </div>
    );
};

export default Card;