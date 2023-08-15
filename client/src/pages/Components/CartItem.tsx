import { Stack, Button } from "react-bootstrap";
import storeItems from "../data/items.json"
import { useCart } from "../context/cartContext";

type CartItemProps = {
    id: number;
    quantity: number;
}

export function CartItem({id, quantity}: CartItemProps){
    const { removeFromCart } = useCart();
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null;

    async function handleRemoveFromCart(id:number){
        if (id <= 8 && id >= 3){
            const response = await fetch('http://localhost:3000/session-outof-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coachName: item.name,date:Newerdate,time:props.time,kidName:childName  }),
            });
            const data = await response.json();
            }
        removeFromCart(id);
    }
    return (
        <Stack direction="horizontal" gap={2}>
            <img src={item.imgUrl} style ={{width: "75px", height: "75px", objectFit:"cover"}} />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 &&(
                        <span className="text-muted" style={{fontSize:".65rem"}}>
                            {quantity}x
                        </span>
                    )}                                                                                                                            
                </div>
                <div className="text-muted" style={{fontSize:"0.75rem"}}>
                    {item.priceString}
                </div>
            </div>
            <div>
                ${(item.priceNum * quantity).toFixed(2)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => handleRemoveFromCart(item.id)}>x</Button>
        </Stack>
    )
}   