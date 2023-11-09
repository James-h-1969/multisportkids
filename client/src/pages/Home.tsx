import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import HomeQuotes from "./Components/HomeComponents/HomeQuotes";
import ManagerLogin from "./Components/ManagerLogin";
import Footer from "./Components/Footer"
import { Button } from "react-bootstrap";
import ball from "/assets/ball.png"
import useMediaQueries from "media-queries-in-react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";



// type HomeProps = {
//     setManageLogged: (logged:boolean) => void;
//     manageLogged:boolean;
// }

function Home(){
    const [manageLogged, setManageLogged] = useState(false);

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 480px)",
    })

    return (
        <>
            <NavBar />
            <div className="ps-3" style={{marginTop:"110px", marginLeft:mediaQueries.mobile?"0px":"30px"}}>
                <h1><span className="mt-5" style={{fontSize:mediaQueries.mobile?"30px":"70px", fontWeight:"bold", fontFamily:"Rubik"}}>Helping kids reach their{!mediaQueries.mobile?<br />:<></>} full <span style={{color:"#46768E"}}>AFL</span> potential</span></h1>
            </div>
            <div className="ps-3">
                <a><span className="" style={{fontSize:mediaQueries.mobile?"20px":"30px", paddingLeft:mediaQueries.mobile?"0px":"30px", fontWeight:"bold", fontFamily:"Rubik"}}>AFL Holiday Camps, classes, and personal coaching</span></a>
            </div>
            <Link to="/private" className="mb-5 ms-3" style={{paddingLeft:mediaQueries.mobile?"0px":"30px"}}>
                <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{backgroundColor:"#46768E", border:"transparent", fontWeight:"bold"}}>Book now</Button>
            </Link>
            <div style={{backgroundColor:"#46768E"}}>
                <img src={ball} style={{position:"absolute", left:"65%", top:"30vh", width:mediaQueries.mobile?"20%":"", height:mediaQueries.mobile?"7vh":"", zIndex:"100"}}/>
                <div className="triangle"></div>
                {/* <HomeQuotes /> */}
                <HomeDeals />
                {/* <div className="triangle" style={{backgroundColor:"#46768E"}}></div> */}
            </div>
            <Footer />

            {/* {manageLogged ? <>Logged In</>:<ManagerLogin update={setManageLogged} />} */}
        </>
    )
}

export default Home;