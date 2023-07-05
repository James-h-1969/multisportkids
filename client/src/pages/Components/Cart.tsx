import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import {CartItem} from "./CartItem";
import storeItems from "../data/items.json"

type CartProps = {
    isOpen: boolean;
}

export function Cart({isOpen}:CartProps){
    const { closeCart, cartItems } = useCart();
    return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart 
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map((item) => (
                    <CartItem key={item.id}{...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {" $"}
                    {cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.priceNum || 0)  * cartItem.quantity;
                    }, 0).toFixed(2)}
                </div>
                <Button variant="secondary">
                    Checkout
                </Button>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    );
}