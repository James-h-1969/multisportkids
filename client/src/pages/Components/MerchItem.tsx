import React, { useState } from "react";
import { Button, DropdownButton, ButtonGroup, Dropdown, InputGroup, FormControl, Container, Card } from "react-bootstrap";
import { useCart } from "../context/cartContext";

interface MerchItemProps{
    name: string,
    price: string,
    image: string,
    id: number,
}


const MerchItem: React.FC<MerchItemProps> = ({name, price, image, id}) => {
    const [selectedOption, setSelectedOption] = useState("Choose size");
    const [value, setValue] = useState(0);
    const { addToCart } = useCart();

    function handleOptionSelect(eventkey: string | null){
        if (eventkey){
            setSelectedOption(eventkey);
        }
    }

    function updateAmount(change: number){
        let newValue = value + change;
        if (newValue >= 0){
            setValue(newValue);
        }
    }   

    function handleAddingCart(){
        const Customdetails = {
            childName: "",
            childAge: "",
            childComments: "",
            childClub: "",
            purchaseName: [name]
        }

        addToCart(id, value, Customdetails);
        location.reload();
    }

    return(
        <Card>
            <Card.Img variant="top" src={image} style={{height:'400px', objectFit:"cover"}}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{price}</span>
                </Card.Title>
                <div className="merch-size">
                     <a><span className="merch-size-title">Size</span></a>
                     <DropdownButton
                        as={ButtonGroup}
                        title={selectedOption}
                        onSelect={handleOptionSelect}
                        variant="secondary"
                        style={{width:"200px"}}
                        >
                        <Dropdown.Item eventKey="Small">Small</Dropdown.Item>
                        <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                        <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
                        <Dropdown.Item eventKey="Extra Large">Extra Large</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3 ms-3 pe-4" style={{gap:".5rem"}}>
                    <a><span className="merch-size-title">Quantity</span></a>
                    <Button onClick={() => updateAmount(-1)}>-</Button>
                        <span className="fs-3">{value}</span>
                    <Button onClick={() => updateAmount(1)}>+</Button>
                </div>
                {
                    (value > 0 && selectedOption != "Choose size") ?
                    <Button className="mt-3" onClick={() => handleAddingCart()} disabled={true}>
                        Coming Soon
                    </Button>:<></>
                }

            </Card.Body>
        </Card>
    )
}

export default MerchItem;