import { useCart } from "../../context/cartContext";
import { Button } from "react-bootstrap";


type AddSessionProps = {
    id: number;
    location:string;
    date:string;
    time:string;
    price: number;
}

//add a bunch of backend adding it to the system

export default function AddSession(props:AddSessionProps){
    const { addToCart } = useCart();

    function handleAddingCart(id:number){
        addToCart(props.id, 1);
        location.reload();
    }
    
    return(
        <div className="p-3 ps-5 d-flex justify-content-between m-5" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"15px"}}>
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
            <Button variant="secondary" style={{width:"300px", cursor:"pointer"}} onClick={() => handleAddingCart(props.id)}>Add session</Button>
        </div>
    )
}

