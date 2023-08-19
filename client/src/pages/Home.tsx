import LinkButton from "./Components/LinkButton";
import NavBar from "./Components/NavBar";
import HomeDeals from "./Components/HomeComponents/HomeDeals";
import HomeLocation from "./Components/HomeComponents/HomeLocation";
import HomeQuotes from "./Components/HomeComponents/HomeQuotes";
import Footer from "./Components/Footer";
import { Button } from "react-bootstrap";
import ball from "/assets/ball.png"
import useMediaQueries from "media-queries-in-react";
import "./Home.css";
import { Link } from "react-router-dom";

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

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 480px)",
    })

    return (
        <>
            <NavBar />
            <div className="ps-3" style={{marginTop:"110px"}}>
                <h1><span className="mt-5" style={{fontSize:mediaQueries.mobile?"30px":"50px", fontWeight:"bold", fontFamily:"Rubik"}}>Helping kids reach their{!mediaQueries.mobile?<br />:<></>} full <span style={{color:"#46768E"}}>AFL</span> potential</span></h1>
            </div>
            <div className="ps-3">
                <a><span className="" style={{fontSize:mediaQueries.mobile?"20px":"50px", fontWeight:"bold", fontFamily:"Rubik"}}>AFL Holiday Camps, classes, and personal coaching</span></a>
            </div>
            <Link to="/private" className="mb-5 ms-3">
                <Button className="mt-2" style={{backgroundColor:"#46768E", border:"transparent"}}>Book now</Button>
            </Link>
            <img src={ball} style={{position:"absolute", left:"65%", top:mediaQueries.mobile?"32%":"50%", width:mediaQueries.mobile?"20%":"", height:mediaQueries.mobile?"12vh":""}}/>
            <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#46768E" fill-opacity="1" d="M0,192L80,197.3C160,203,320,213,480,197.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                <HomeQuotes />
                <HomeDeals />
                <div style={{"marginTop":"-80px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,192L80,197.3C160,203,320,213,480,197.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </div>
            <Button onClick={() => setManageLogged(true)}>Login</Button>
            {/* <div className="home-location">
                <HomeLocation />
            </div> */}
            {/* <div><Footer /></div> */}
        </>
    )
}

export default Home;