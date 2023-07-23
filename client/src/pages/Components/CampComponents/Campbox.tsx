import LinkButton from "../LinkButton";
import { Image, Button } from "react-bootstrap";
import development from "/assets/development.jpg";
import { useState } from "react";
import { useCart } from "../../context/cartContext";


type CampboxProps = {
    name: String,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
    address: String,
    locPic: string
}

function Campbox ({name, Location, ages, date, times, Price, address, locPic}: CampboxProps) {
    const [isBooking, setIsBooking] = useState(false);
    const { addToCart } = useCart();

    function handleAddingCart(){
        addToCart(11, 1);
        location.reload();
    }
    
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
                        <Button style={{backgroundColor:"white", color:"black", width:"50%"}} onClick={() => setIsBooking(!isBooking)}>{!isBooking ? "Show more":"Hide"}</Button>
                    </div>
                </div>
                <div>
                    <Image src={development} style={{contain:"cover", width:"500px"}}/>
                </div>
            </div>
            { isBooking ? 
                <div className="d-flex">
                    <div className="p-5">
                        <div className="pb-5" style={{fontSize:"20px"}}>
                            Our camps are run by Senior AFL players who have been through the Swans Academy, played VFL, play AFLW or play Premier Division AFL. We are a tackle free, and we separate players into groups by age and gender to ensure skills are being matched.
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="fs-5" style={{textAlign:"center"}}>
                                <div>
                                    Location : <span className="ps-4" style={{fontWeight:"bold", fontSize:"30px"}}>{Location}</span><br />
                                    {address}
                                </div>
                                <Image src={locPic} className="pt-4" style={{width:"70%"}}/>
                            </div>
                            <div style={{fontSize:"15px", textAlign:"center", width:"50%"}}>
                                (1) Refunds available for classes, personal coaching and/or holiday camps if;<br />
                                    (a) Player misses AFLKids due to Covid-19<br />
                                    (b) AFLKids calls the session off due to wet weather or unforeseen circumstances<br />
                                    (c) Other refunds must go past Tom O'Leary<br />
                                (2) Players consent to photographs/videos to be put on social media and/or website is provided by booking with AFLKids<br />
                                    (a) These exclude individual photos of players<br />
                                    (b) Individuals have the ability to take away consent with a request directed to Tom O'Leary in writing.<br />
                                (3) The player takes the field at their own risk<br />
                                    (a) We have a no-tackle policy, but accidental or touch contact can still occur.<br />
                                    (b) by booking with AFLKids, AFLKids are not liable for any injury.<br />
                                    <Button className="mt-5"  style={{backgroundColor:"white", color:"black", width:"50%"}} onClick={() => handleAddingCart()}>
                                        Add to cart
                                    </Button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>

                </>
            }
        </div>
        
    )
}

export default Campbox;