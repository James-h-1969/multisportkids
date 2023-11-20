import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import ManagerLogin from "./Components/ManagerLogin";
import Footer from "./Components/Footer"
import { Button } from "react-bootstrap";
import { ColorScheme } from "../style";
import useMediaQueries from "media-queries-in-react";
import "./Home.css";
import { Link } from "react-router-dom";




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


    return (
        <>
            <NavBar />
            <div className="ps-3" style={{marginTop:"110px", marginLeft:mediaQueries.mobile?"0px":"30px"}}>
                <h1><span className="mt-5" style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik"}}>Delivering quality Holiday Camps{!mediaQueries.mobile?<br />:<></>} for <span style={{color:ColorScheme.defaultColor}}>Kids</span></span></h1>
            </div>
            <div className="ps-3">
                <a><span className="" style={{fontSize:mediaQueries.mobile?"20px":"30px", paddingLeft:mediaQueries.mobile?"0px":"30px", fontWeight:"bold", fontFamily:"Rubik"}}>Fun, safe environment to learn sport</span></a>
            </div>
            <Link to="/camps" className="mb-5 ms-3" style={{paddingLeft:mediaQueries.mobile?"0px":"30px"}}>
                <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{backgroundColor:ColorScheme.defaultColor, border:"transparent", fontWeight:"bold"}}>Book now</Button>
            </Link>
            <div style={{backgroundColor:ColorScheme.defaultColor}}>
                <div className="triangle"></div>
                <HomeDeals />
            </div>
            <Footer />
            {manageLogged ? 
            <div className="d-flex justify-content-center gap-5">
                <Link to="/manager" className="d-flex justify-content-center gap-5 mb-3" style={{ textDecoration: 'none' }}>
                    <Button style={{ fontWeight: "normal", fontFamily: "Rubik", backgroundColor: ColorScheme.defaultColor, border: "transparent" }}>
                        Manage AFLKids
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