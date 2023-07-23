import NavBar from "./Components/NavBar"
import Header from "./Components/Header"
import insta from "/assets/instagram.png";
import facebook from "/assets/facebook.png"
import { Image } from "react-bootstrap";

export default function Contact() {
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
                </div>
            </div>
        </>
    )
}