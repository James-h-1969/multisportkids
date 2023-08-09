import NavBar from "./Components/NavBar"
import Header from "./Components/Header"
import insta from "/assets/instagram.png";
import facebook from "/assets/facebook.png"
import { Image, Button } from "react-bootstrap";
import TeamCard from "./Components/ContactComponents/TeamCard";
import { useState } from "react";
import CoachInfo from "./Components/ContactComponents/CoachInfo";



export default function Contact() {
    const [playerShowing, setplayerShowing] = useState("");

    function changeActive(name:string){
        if (name == playerShowing){
            setplayerShowing("");
            return;
        }
        setplayerShowing(name);
    }

    const playerInfo = {
        "Tom O'Leary":{
            role: "Founder/Sydney Coach",
            position: "Midfielder/Small Forward",
            phone: "+61 448 408 920",
            quote: "I want to inspire and develop the next generation of excellent people on and off the field"
        },
        "William Smit":{
            role: "Northern Beaches Head Coach",
            position: "Winger/Small Forward",
            phone: "+61 426 585 152",
            quote: "I want to give back to the game that has given me so much"
        },
        "Kale Gablia":{
            role: "North Shore Head Coach",
            position: "Key/Small Forward",
            phone: "+61 431 036 199",
            quote: "I have built up an interest coaching different teams over the years and would love to gain but also pass on experience through 1:1's"
        },

    }

    return(
        <>
            <NavBar />
            <Header title="Our Team" description="Find out more about our team and get in contact to get the most out of your experience"/>
            <div className="d-flex" style={{fontFamily:"Rubik"}}>
                <div className="mt-5 ms-5 fs-4 ps-3 pt-3 pb-3 mb-5" style={{backgroundColor:"rgb(222, 222, 231)", width:"30%", borderRadius:"15px"}}>
                    <div style={{fontWeight:"bold"}}>Contact Us</div>
                    <div className="pt-3">Email:</div>
                    <div className="ps-5" style={{fontWeight:"lighter"}}>
                        <div>Tomoleary@AFLKids.com.au</div>
                        <div>WillemSmit@AFLKids.com.au</div>
                        <div>KaleGablia@AFLKids.com.au</div>
                    </div>
                    <div className="pt-3">Phone (Between 9-5 Mon-Fri):</div>
                    <div className="ps-5" style={{fontWeight:"lighter"}}>+61 448 408 920</div>
                    <div className="pt-3">Socials</div>
                    <div className="d-flex justify-content-between me-5">
                        <div className="ps-5" style={{fontWeight:"lighter"}}>Instagram</div>
                        <Image src={insta} style={{width:"10%"}}/>
                    </div>
                    <div className="d-flex justify-content-between me-5 mt-3">
                        <div className="ps-5" style={{fontWeight:"lighter"}}>Facebook</div>
                        <Image src={facebook} style={{width:"10%"}}/>
                    </div>
                </div>
                <div className="mt-5 ms-5 fs-4 ps-3 pt-3 pb-3 mb-5" style={{backgroundColor:"rgb(222, 222, 231)", width:"60%", borderRadius:"15px"}}>
                    <div style={{fontWeight:"bold"}}>Our Vision</div>
                    <div className="me-5" style={{fontSize:"20px"}}>
                        Our goal at AFLKids is to help players reach their full potential through experienced and accredited AFL coaches, striving for excellence at a junior level.  Through video analysis, goal setting strategies and mental advice, AFLKids goes above and beyond in order to take players to the next level.
                    </div>
                    <div className="mt-4" style={{fontWeight:"bold"}}>Our Team</div>
                    <div className="d-flex justify-content-around">
                        <div className="d-flex justify-content-around text-align-center pt-3 flex-column">
                            <TeamCard name="Tom O'Leary" changePlayer={changeActive} player={playerShowing}/>
                            <TeamCard name="William Smit" changePlayer={changeActive}  player={playerShowing}/>
                            <TeamCard name="Kale Gablia" changePlayer={changeActive}  player={playerShowing}/>
                        </div>
                        {playerShowing === "" ? <div className="pt-5" style={{width:"70%", fontWeight:"lighter"}}>Choose a team member to learn more</div>: <CoachInfo role={playerInfo[playerShowing as keyof typeof playerInfo].role} position={playerInfo[playerShowing as keyof typeof playerInfo].position} phone={playerInfo[playerShowing as keyof typeof playerInfo].phone} quote={playerInfo[playerShowing as keyof typeof playerInfo].quote}/>}
                    </div>
                </div>
            </div>
        </>
    )
}