import LinkButton from "./Components/LinkButton";
import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import HomeLocation from "./Components/HomeComponents/HomeLocation";
import HomeQuotes from "./Components/HomeComponents/HomeQuotes";
import Footer from "./Components/Footer";
import { Button } from "react-bootstrap";
import ball from "/assets/ball.png"
import "./Home.css";

type HomeProps = {
    setManageLogged: (logged:boolean) => void;
    manageLogged:boolean;
}

function Home({setManageLogged, manageLogged}:HomeProps){

    function addAcademy(){
        fetch("http://localhost:3000/PrivateTimes",
        {
            method:"POST"
        })
    }

    return (
        <>
            <NavBar />
            <div className="heading">
                <h1><span className="home-heading">Helping kids reach their<br /> full <span className="blue">AFL</span> potential</span></h1>
            </div>
            <div className="description">
                <a><span className="description-text">AFL Holiday Camps, classes, and personal coaching</span></a>
            </div>
            <div className="home-desc-button">
                <LinkButton to="/private" color="#46768E" textcolor="white" text="Book now" />
            </div>
            <img src={ball} style={{position:"absolute", left:"65%", top:"50%", width:"25%", height:"50vh"}}/>
            <div className="home-deals">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#46768E" fill-opacity="1" d="M0,192L80,197.3C160,203,320,213,480,197.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                <HomeQuotes />
                <HomeDeals />
                <div style={{"marginTop":"-280px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,192L80,197.3C160,203,320,213,480,197.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </div>
            {/* <Button onClick={() => setManageLogged(true)}>Add academy</Button> */}
            {/* <div className="home-location">
                <HomeLocation />
            </div> */}
            {/* <div><Footer /></div> */}
        </>
    )
}

export default Home;