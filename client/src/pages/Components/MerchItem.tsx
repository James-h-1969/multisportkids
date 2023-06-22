import React, { useState } from "react";
import { Button, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";

interface MerchItemProps{
    name: string,
    price: string,
    image: React.ReactElement;
}


const MerchItem: React.FC<MerchItemProps> = ({name, price, image}) => {
    const [selectedOption, setSelectedOption] = useState("Choose size");

    function handleOptionSelect(eventkey: string | null){
        if (eventkey){
            setSelectedOption(eventkey);
        }
    }
    return(
        <div className="merch-item-box">
            <div className="merch-img">{image}</div>
            <div className="merch-text">
                <h1>{name}</h1>
                <div className="merch-price">{price}</div>
                <div className="merch-size">
                    <a><span className="merch-size-title">Size</span></a>
                    <DropdownButton
                        as={ButtonGroup}
                        title={selectedOption}
                        onSelect={handleOptionSelect}
                        variant="secondary"
                        >
                        <Dropdown.Item eventKey="Small">Small</Dropdown.Item>
                        <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                        <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
                        <Dropdown.Item eventKey="Extra Large">Extra Large</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="merch-quantity">

                </div>
                <Button style={{backgroundColor: "#46768E"}}>Add to cart</Button>
            </div>
        </div>
    )
}

export default MerchItem;