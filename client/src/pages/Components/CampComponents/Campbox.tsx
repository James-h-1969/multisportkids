import { Image, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import camp1 from "/assets/CampPhotos/IMG_2365.jpg"
import camp2 from "/assets/CampPhotos/IMG_2363.jpg"
import camp3 from "/assets/CampPhotos/IMG_2368.jpg"
import useMediaQueries from "media-queries-in-react";

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

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });


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
        <div className="m-3 pb-4 " style={{backgroundColor:"rgb(70, 118, 142)", fontFamily:"Rubik", borderRadius:"15px", paddingLeft:mediaQueries.mobile?"0px":"30px", paddingRight:mediaQueries.mobile?"10px":"30px"}}>
            <div className="ps-4 w-10 d-flex justify-content-between" style={{paddingTop:mediaQueries.mobile?"17px":"30px"}}>
                <div className="text-center d-flex flex-column" style={{width:"50%"}}>
                    <span className="mb-2" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"17px":"30px", color:"white"}}>{name}</span>
                    <span className="mb-1" style={{fontWeight:"400", fontSize:mediaQueries.mobile?"20px":"70px"}}>${Price.toString()}</span>
                    <span style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"30px"}}>{ages}</span>
                    <span style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"20px"}}>{date}</span>
                    <span className="mb-2" style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"20px"}}>{times}</span>
                    <Button className="" style={{backgroundColor:"white", color:"black", width:"100%", marginTop:mediaQueries.mobile?"17px":"50px"}} onClick={() => setIsBooking(!isBooking)}>{!isBooking ? "Show more":"Hide"}</Button>
                </div>
                <div>
                    <Image src={imgs[index]} style={{contain:"cover", borderRadius:"10px", width:mediaQueries.mobile?"120px":"500px", height:mediaQueries.mobile?"110px":"400px", marginTop:mediaQueries.mobile?"40px":"0px", paddingLeft:mediaQueries.mobile?"10px":"0px"}}/>
                </div>
            </div>
            { isBooking ? 
                <div className="d-flex">
                    <div className="p-2" style={{width:"100%"}}>
                        <div className="pb-2 " style={{textAlign:"center", fontSize:mediaQueries.mobile?"10px":"20px", paddingTop:mediaQueries.mobile?"15px":"30px"}}>
                            Our camps are run by Senior AFL players who have been through the Swans Academy, 
                            played VFL, play AFLW or play Premier Division AFL. 
                            We are a tackle free, and we separate players into groups by age and gender to 
                            ensure skills are being matched. Namely, players from ages 5-8 will split from players aged 9-13
                            participating in two seperate camps.
                        </div>
                        <div className="d-flex justify-content-between" style={{marginTop:mediaQueries.mobile?"30px":"50px"}}>
                            <div className="" style={{textAlign:"center", fontSize:mediaQueries.mobile?"10px":"25px"}}>
                                <div>
                                    Location : <span className="ps-1" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"12px":"30px"}}>{Location}</span><br />
                                    {address}
                                </div>
                                <Image src={locPic} className="pt-4 ms-3" style={{width:mediaQueries.mobile?"100px":"400px", height:mediaQueries.mobile?"120px":"400px"}}/>
                                <div className="mt-5 d-flex justify-content-around">
                                    <div>
                                        Both Days<br/><span style={{fontSize:mediaQueries.mobile?"20px":"50px"}}>$150</span>
                                    </div>
                                    <div>
                                        One Day<br/><span style={{fontSize:mediaQueries.mobile?"20px":"50px"}}>$100</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{fontSize:mediaQueries.mobile?"7px":"15px", textAlign:"center", width:"50%"}}>
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
                                    <Form className="mt-3">
                                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ width: "60%" }}>Child name</Form.Label>
                                            <Form.Control
                                            placeholder="Enter name"
                                            value={childName}
                                            onChange={(e) => setChildName(e.target.value)}
                                            style={{fontSize:"10px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Child Age</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Age"
                                            value={childAge}
                                            onChange={(e) => setChildAge(e.target.value)}
                                            style={{fontSize:"10px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Club</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Club"
                                            value={club}
                                            onChange={(e) => setClub(e.target.value)}
                                            style={{fontSize:"10px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Comments for Coach</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Comments"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                            style={{fontSize:"10px"}}
                                            />
                                        </Form.Group>
                                        Select which days you want to join (Select both for the full experience)
                                        <div className="d-flex mt-2 gap-2 justify-content-center">
                                            <div className="p-3" style={{backgroundColor: chosen[0] ? "rgb(200, 200, 200)":"white", cursor:"pointer", borderRadius:"15px"}} onClick={() => handleDayClick(0)}>
                                                Day 1<br />
                                                {firstDate}
                                            </div>
                                            <div className="p-3" style={{backgroundColor: chosen[1] ? "rgb(200, 200, 200)":"white", cursor:"pointer", borderRadius:"15px"}} onClick={() => handleDayClick(1)}>
                                                Day 2<br />
                                                {secondDate}
                                            </div>
                                        </div>
                                        <Button
                                            className="mt-3"
                                            style={{ backgroundColor: "white", color: "black", width: "100%" }}
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