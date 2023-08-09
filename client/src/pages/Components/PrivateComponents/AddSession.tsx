import { useCart } from "../../context/cartContext";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import bcrypt from "bcryptjs";


type AddSessionProps = {
    id: number;
    location:string;
    date:string;
    time:string;
    price: number;
    name: string;
}

//add a bunch of backend adding it to the system

export default function AddSession(props:AddSessionProps){
    const { addToCart } = useCart();
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const [token, setToken] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    async function isTokenRight(token:string, id:number){
        let newHash = await bcrypt.hash(token, 10);
        const response = await fetch('http://localhost:3000/checkTokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, token: token }),
            });
        const data = await response.json();
        if (response.ok) {
            return true; // Token is valid
        } else {
            return false; // Invalid token
        }
        return false;
    }

    //m4SBLJeg

    async function handleAddingCart(){


        let Newdate = props.date.split(' ');
        Newdate[Newdate.length - 1] = Newdate[Newdate.length - 1].slice(2);
        let Newerdate = Newdate.join("");


        let ID = props.id;

        if (token.length > 0){
            let isValid = await isTokenRight(token, props.id);
            if (isValid){
                if (props.id == 3){
                    ID = 14;
                } else {
                    ID = 15;
                }
            } else {
                setShowWarning(true);
                return
            }
        }


        
        const Customdetails = {
            childName: childName,
            childAge: childAge,
            childComments: comments,
            childClub: club,
            purchaseName: [props.name, Newerdate, props.time, token]
        }

        addToCart(ID, 1, Customdetails);
        location.reload();
    }
    
    return(
        <div className="p-2 ps-4 pe-4 m-5" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"15px"}}>
            <Form className="mt-5">
                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: "50%" }}>Child name(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter name(s), comma seperated"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Child Age(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter Age(s), comma seperated"
                            value={childAge}
                            onChange={(e) => setChildAge(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Club(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter Club(s), comma seperated"
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Comments for Coach</Form.Label>
                            <Form.Control
                            placeholder="Enter Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Plan Token</Form.Label>
                            <Form.Control
                            placeholder="Enter Token if available"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            />
                        </Form.Group>
                        { showWarning ?                    
                         <div style={{color:"red"}}>
                            Either input a valid token or none at all
                        </div>: <></>}

                    </Form>
            <div className="p-3 ps-5 d-flex justify-content-between m-5">
                <div className="d-flex justify-content-between align-items-center" style={{width:"70%"}}>
                    <div>
                        <span style={{fontSize:"20px"}}>
                            {props.date}
                        </span>
                        <span style={{marginLeft:"30px"}}>
                            {props.time}
                        </span>
                    </div>
                    <span style={{fontSize:"20px"}}>{props.location}</span>
                    <div className="" >
                        <span style={{fontWeight:"bold"}}>${props.price}.00</span>
                    </div>
                </div>
                <Button variant="secondary" style={{width:"300px", cursor:"pointer"}} onClick={() => handleAddingCart()}>Add session</Button>
            </div>
        </div>
    )
}

