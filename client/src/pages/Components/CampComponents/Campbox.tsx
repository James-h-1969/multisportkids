import LinkButton from "../LinkButton";
import { Image, Button, Form } from "react-bootstrap";
import development from "/assets/development.jpg";
import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import camp1 from "/assets/CampPhotos/IMG_2365.jpg"
import camp2 from "/assets/CampPhotos/IMG_2363.jpg"
import camp3 from "/assets/CampPhotos/IMG_2368.jpg"



type CampboxProps = {
    name: string,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
    address: String,
    locPic: string,
    index: number
}

function Campbox ({name, Location, ages, date, times, Price, address, locPic, index}: CampboxProps) {
    const [isBooking, setIsBooking] = useState(false);
    const { addToCart } = useCart();
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const [chosen, setChosen] = useState([false, false]);


    function handleAddingCart(){
        let ID = 0;
        let day = "";
        if ((chosen[0] && !chosen[1]) || (chosen[1] && !chosen[0])){
            ID = 16;
            if (chosen[0]){
                day = "1";
            } else {
                day = "2";
            }
        } else {
            ID = 11;
        }
        const Customdetails = {
            childName: childName,
            childAge: childAge,
            childComments: comments,
            childClub: club,
            purchaseName: [name, day],
        }
        addToCart(ID, 1, Customdetails);
        location.reload();
    }

    function handleDayClick(day:number){
        let newChosen = [...chosen];
        newChosen[day] = !chosen[day];
        setChosen(newChosen);
    }

    const imgs = [camp1, camp2, camp3];

    useEffect(() => {
        
    }, [chosen])

    const brokenDate = date.split(" ");
    const firstDate = [brokenDate[0], brokenDate.slice(-2).join(" ")].join(" ");
    const secondDate = [brokenDate[2], brokenDate.slice(-2).join(" ")].join(" ");

    const isButtonDisabled = !(childName && childAge && club && comments && (chosen[0] || chosen[1]));
    
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
                    <Image src={imgs[index]} style={{contain:"cover", width:"500px", height:"400px"}}/>
                </div>
            </div>
            { isBooking ? 
                <div className="d-flex">
                    <div className="p-5">
                        <div className="pb-5" style={{fontSize:"20px"}}>
                            Our camps are run by Senior AFL players who have been through the Swans Academy, 
                            played VFL, play AFLW or play Premier Division AFL. 
                            We are a tackle free, and we separate players into groups by age and gender to 
                            ensure skills are being matched. Namely, players from ages 5-8 will split from players aged 9-13
                            participating in two seperate camps.
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="fs-5" style={{textAlign:"center"}}>
                                <div>
                                    Location : <span className="ps-4" style={{fontWeight:"bold", fontSize:"30px"}}>{Location}</span><br />
                                    {address}
                                </div>
                                <Image src={locPic} className="pt-4 ms-3" style={{width:"400px", height:"400px"}}/>
                                <div className="mt-5 d-flex justify-content-around">
                                    <div>
                                        Both Days<br/><span style={{fontSize:"50px"}}>$150</span>
                                    </div>
                                    <div>
                                        One Day<br/><span style={{fontSize:"50px"}}>$100</span>
                                    </div>
                                </div>
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
                                    <Form className="mt-5">
                                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ width: "50%" }}>Child name</Form.Label>
                                            <Form.Control
                                            placeholder="Enter name"
                                            value={childName}
                                            onChange={(e) => setChildName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "50%" }}>Child Age</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Age"
                                            value={childAge}
                                            onChange={(e) => setChildAge(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "50%" }}>Club</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Club"
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
                                        Select which days you want to join (Select both for the full experience)
                                        <div className="d-flex mt-4 gap-4 justify-content-center">
                                            <div className="p-3 ps-5 pe-5" style={{backgroundColor: chosen[0] ? "rgb(200, 200, 200)":"white", cursor:"pointer", borderRadius:"15px"}} onClick={() => handleDayClick(0)}>
                                                Day 1<br />
                                                {firstDate}
                                            </div>
                                            <div className="p-3 ps-5 pe-5" style={{backgroundColor: chosen[1] ? "rgb(200, 200, 200)":"white", cursor:"pointer", borderRadius:"15px"}} onClick={() => handleDayClick(1)}>
                                                Day 2<br />
                                                {secondDate}
                                            </div>
                                        </div>
                                        <Button
                                            className="mt-5"
                                            style={{ backgroundColor: "white", color: "black", width: "50%" }}
                                            onClick={() => handleAddingCart()}
                                            disabled={isButtonDisabled}
                                        >
                                            Add to cart
                                        </Button>
                                    </Form>
  
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