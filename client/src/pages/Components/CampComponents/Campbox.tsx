import LinkButton from "../LinkButton";
import { Image, Button } from "react-bootstrap";
import development from "/assets/development.jpg";
import { useState } from "react";


type CampboxProps = {
    name: String,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
}

function Campbox ({name, Location, ages, date, times, Price}: CampboxProps) {
    const [isBooking, setIsBooking] = useState(false);
    
    return(
        <div className="m-5" style={{backgroundColor:"rgb(70, 118, 142)", fontFamily:"Rubik", borderRadius:"15px"}}>
            <div className="p-5 w-10 d-flex justify-content-between">
                <div className="text-center d-flex flex-column" style={{width:"50%"}}>
                    <span className="mb-3" style={{fontWeight:"bold", fontSize:"30px", color:"white"}}>{name}</span>
                    <span className="mb-1" style={{fontWeight:"400", fontSize:"70px"}}>${Price.toString()}</span>
                    <span style={{fontWeight:"400", fontSize:"30px"}}>{ages}</span>
                    <span style={{fontWeight:"400", fontSize:"20px"}}>{date}</span>
                    <span className="mb-5" style={{fontWeight:"400", fontSize:"20px"}}>{times}</span>
                    <div className="campbox-button">
                        <Button style={{backgroundColor:"white", color:"black", width:"50%"}} onClick={() => setIsBooking(!isBooking)}>Book Now</Button>
                    </div>
                </div>
                <div>
                    <Image src={development} style={{contain:"cover", width:"500px"}}/>
                </div>
            </div>
            { isBooking ? 
                <div>
                    Test
                </div>
                :
                <>
                
                </>
            }
        </div>
        
    )
}

export default Campbox;