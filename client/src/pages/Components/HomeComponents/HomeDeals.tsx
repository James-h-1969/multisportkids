import useMediaQueries from "media-queries-in-react";
import campPhoto from "/assets/CampPhotos/IMG_2368.jpg"
import { ColorScheme } from "../../../globalVar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./home.css"


function HomeDeals(){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });


    
      return (
        <div style={{ height: mediaQueries.mobile?"30vh":"80vh", marginBottom: mediaQueries.mobile?"40px":"100px", position: "relative" }}>
          <div style={{ backgroundColor: ColorScheme.defaultColor, width: "100%", position: "absolute", zIndex: 6, opacity: 0.7,  height:mediaQueries.mobile?"30vh":"80vh" }}></div>
          <div style={{ overflow: "hidden" }}>
            <img src={campPhoto} style={{ width: "98.5vw", zIndex: 5, position: "absolute", height:mediaQueries.mobile?"30vh":"80vh"}} alt="Camp Photo" />
          </div>
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-column" style={{ width:mediaQueries.mobile?"120px": "300px", zIndex: 30, marginTop:mediaQueries.mobile?"100px":"240px", marginLeft:mediaQueries.mobile?"2rem":"5rem" }}>
              <div className="linkbox" >
                <Link to={"/camps"}>
                    <img src={campPhoto} style={{ width:mediaQueries.mobile?"120px": "300px", paddingBottom:"30px" }} alt="Camp Photo" />
                </Link>
              </div>
            </div>
            <div className="" style={{ zIndex: 30, marginTop:mediaQueries.mobile?"90px":"230px", marginLeft:mediaQueries.mobile?"50px":"200px", paddingRight:mediaQueries.mobile?"20px":"100px" }}>
                <span style={{fontSize:mediaQueries.mobile?"15px":"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Holiday Camps<br /></span>
                <span style={{fontSize:mediaQueries.mobile?"7px":"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                    Experience the ultimate holiday camps for kids!  Join us for fun-filled days of skill development, teamwork, and excitement in a safe and supportive environment. 
                    </span>
                    <Link to="/camps" className="mb-5" style={{}}>
                        <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColorScheme.defaultColor, backgroundColor:"white", border:"transparent", fontWeight:"bold"}}>View Upcoming Camps</Button>
                    </Link>
            </div>
          </div>
        </div>
      );
}


export default HomeDeals;