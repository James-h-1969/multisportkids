import React, { useState } from "react";
import { useCart } from "../../context/cartContext";
import { Card, Button, Form } from "react-bootstrap";

type PlanItemProps = {
    name: string,
    price: string,
    image: string,
    desc: string[],
    id: number
}

export default function PlanItem({name, price, image, desc, id}:PlanItemProps){
    const { addToCart } = useCart();

    function handleAddingCart(id:number){
        const Customdetails = {
            childName: "",
            childAge: "",
            childComments: "",
            childClub: "",
            purchaseName: [name]
        }
        addToCart(id, 1, Customdetails);
        location.reload();
    }
    
    return(
        <Card>
            
            <Card.Img variant="top" src={image} style={{height:'400px', width:"500px", objectFit:"cover"}}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{price}</span>
                </Card.Title>
                {desc?.map((line) => (
                    <div className="fs-5">
                        - {line}
                    </div>
                ))}
                <Button className="mt-3" onClick={() => handleAddingCart(id)}>
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    )
}