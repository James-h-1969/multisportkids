import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import ManagerLogin from "./ManagerHelp/ManagerLogin";
import { Button } from "react-bootstrap";
import { ColorScheme } from "../globalVar";
import useMediaQueries from "media-queries-in-react";
import "./Home.css";
import { Link } from "react-router-dom";
import ConFooter from "./Components/ConFooter";




type HomeProps = {
    manageLogged:boolean;
}

function Home({ manageLogged}:HomeProps){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 480px)",
    })

    function logOut() {
        sessionStorage.clear();
        location.reload();
    }

    // do something here to get the angle perfect for the text
    let viewportWidth: number;

    // Add an event listener to update the variable when the window is resized
    window.addEventListener('resize', () => {
    viewportWidth = window.innerWidth;
    });

    // Initialize the variable with the current viewport width
    viewportWidth = window.innerWidth;

    const angle = Math.atan(200/viewportWidth) * 180 / Math.PI;

    return (
        <>
            
            <NavBar />
            <div className="ps-3" style={{marginTop:"110px", marginLeft:mediaQueries.mobile?"0px":"30px"}}>
                <h1><span className="mt-5" style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik", color:ColorScheme.defaultColor}}>Discover, Play, Grow - <br /> </span><span style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik", color:ColorScheme.secondaryColor}}>Where champions are born!</span></h1>
            </div>
            <div className="ps-5">
                <a><span className="" style={{fontSize:mediaQueries.mobile?"20px":"30px", fontWeight:"bold", fontFamily:"Rubik"}}>Fun, safe environment to learn sport and meet new friends.< br/> For all ages and abilities!</span></a>
            </div>
            <Link to="/camps" className="mb-5 ms-3" style={{paddingLeft:mediaQueries.mobile?"0px":"30px"}}>
                <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{backgroundColor:ColorScheme.defaultColor, border:"transparent", fontWeight:"bold"}}>Book now</Button>
            </Link>
            <div style={{backgroundColor:ColorScheme.defaultColor}}>
                <div style={{ transform: `rotate(-${angle}deg)`, position: "absolute", left: "5%", top: "57vh", zIndex: "100", fontWeight:"bold", fontSize:"35px" }}>
                    <span style={{color:ColorScheme.secondaryColor}}>10 different Sports</span> <span style={{color:ColorScheme.defaultColor}}>|</span> <span style={{color:ColorScheme.secondaryColor}}>Elite Level Coaches</span> <span style={{color:ColorScheme.defaultColor}}>|</span> <span style={{color:ColorScheme.secondaryColor}}>Improve motor Skills</span> <span style={{color:ColorScheme.defaultColor}}>|</span> <span style={{color:ColorScheme.secondaryColor}}>In-depth reports</span>
                </div>

                <div className="triangle"></div>
                <HomeDeals />
            </div>
            <ConFooter />
            {manageLogged ? 
            <div className="d-flex justify-content-center gap-5">
                <Link to="/manager" className="d-flex justify-content-center gap-5 mb-3" style={{ textDecoration: 'none' }}>
                    <Button style={{ fontWeight: "normal", fontFamily: "Rubik", backgroundColor: ColorScheme.defaultColor, border: "transparent" }}>
                        Manage MultiSportKids
                    </Button>
                </Link>
                <Button onClick={() => logOut()} style={{ fontWeight: "normal", fontFamily: "Rubik", backgroundColor: ColorScheme.defaultColor, border: "transparent", height:"80%" }}>
                        Log Out
                </Button>
            </div>
            :<ManagerLogin />}
            
        </>
    )
}

export default Home;