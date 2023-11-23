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
    const height = mediaQueries.mobile? 70:200

    const angle = Math.atan(height/viewportWidth) * 180 / Math.PI;

    return (
        <>
            
            <NavBar />
            <div className="ps-3" style={{marginTop:"110px", marginLeft:mediaQueries.mobile?"0px":"30px"}}>
                <h1><span className="mt-5" style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik", color:ColorScheme.defaultColor}}>Discover, Play, Grow - <br /> </span><span style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik", color:ColorScheme.secondaryColor}}>Where champions are born!</span></h1>
            </div>
            <div className="" style={{paddingLeft:mediaQueries.mobile?"1rem":"3rem"}}>
                <a><span className="" style={{fontSize:mediaQueries.mobile?"20px":"30px", fontWeight:"bold", fontFamily:"Rubik"}}>Fun, safe environment to learn sport and meet new friends.< br/> For all ages and abilities!</span></a>
            </div>
            <Link to="/camps" className="mb-5 ms-3" style={{paddingLeft:mediaQueries.mobile?"0px":"30px"}}>
                <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{backgroundColor:ColorScheme.defaultColor, border:"transparent", fontWeight:"bold"}}>Book now</Button>
            </Link>
            <div style={{ backgroundColor: ColorScheme.defaultColor, position: 'relative' }}>
            <div
                style={{
                position: 'absolute',
                left: '2%',
                transform: `rotate(-${angle}deg)`,
                zIndex: '100',
                fontWeight: 'bold',
                fontSize: mediaQueries.mobile ? '2.5vw' : '35px',
                color: ColorScheme.secondaryColor,
                }}
            >
                <span>10 different Sports</span> | <span>Elite Level Coaches</span> | <span>Improve motor Skills</span> | <span>In-depth reports</span>
            </div>

            <div className="triangle" style={{ borderTop: mediaQueries.mobile ? '70px solid white' : '200px solid white' }}></div>
            <HomeDeals />
            </div>
            <ConFooter />
            {!mediaQueries.mobile && (
            <>
                {manageLogged ? (
                <div className="d-flex justify-content-center gap-5">
                    <Link to="/manager" className="d-flex justify-content-center gap-5 mb-3" style={{ textDecoration: 'none' }}>
                    <Button style={{ fontWeight: "normal", fontFamily: "Rubik", backgroundColor: ColorScheme.defaultColor, border: "transparent" }}>
                        Manage MultiSportKids
                    </Button>
                    </Link>
                    <Button onClick={() => logOut()} style={{ fontWeight: "normal", fontFamily: "Rubik", backgroundColor: ColorScheme.defaultColor, border: "transparent", height: "80%" }}>
                    Log Out
                    </Button>
                </div>
                ) : (
                <ManagerLogin />
                )}
            </>
            )}

            
        </>
    )
}

export default Home;