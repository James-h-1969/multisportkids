import LinkButton from "../LinkButton";
import { Image } from "react-bootstrap";
import development from "/assets/development.jpg";

type CampboxProps = {
    name: String,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
}

function Campbox ({name, Location, ages, date, times, Price}: CampboxProps) {
    return(
        <div className="p-5 m-5 w-10 d-flex justify-content-between" style={{backgroundColor:"rgb(70, 118, 142)", fontFamily:"Rubik", borderRadius:"15px"}}>
            <div className="text-center d-flex flex-column" style={{width:"50%"}}>
                <span className="mb-5" style={{fontWeight:"bold", fontSize:"30px"}}>{name}</span>
                <span style={{fontWeight:"bold", fontSize:"20px"}}>{ages}</span>
                <span style={{fontWeight:"bold", fontSize:"20px"}}>{date}</span>
                <span className="mb-5" style={{fontWeight:"bold", fontSize:"20px"}}>{times}</span>
                <span style={{fontWeight:"normal", fontSize:"50px"}}>${Price.toString()}</span>
                <div className="campbox-button">
                    <LinkButton to="/" color="white" textcolor="#46768E" text="Book Now"/>
                </div>
            </div>
            <div>
                <Image src={development} style={{contain:"cover", width:"500px"}}/>
            </div>
        </div>
    )
}

export default Campbox;