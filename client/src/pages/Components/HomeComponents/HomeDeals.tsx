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
        <div style={{ height: mediaQueries.mobile?"270px":"100vh", marginBottom: mediaQueries.mobile?"40px":"100px", position: "relative" }}>
          <div style={{ backgroundColor: ColorScheme.defaultColor, width: "100%", position: "absolute", zIndex: 6, opacity: 0.7,  height:mediaQueries.mobile?"270px":"100vh" }}></div>
          <div style={{ overflow: "hidden" }}>
            <img src={campPhoto} style={{ width: "98.5vw", zIndex: 5, position: "absolute", height:mediaQueries.mobile?"270px":"100vh"}} alt="Camp Photo" />
          </div>
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-column" style={{ width:mediaQueries.mobile?"120px": "300px", zIndex: 30, marginTop:mediaQueries.mobile?"100px":"240px", marginLeft:mediaQueries.mobile?"2rem":"5rem" }}>
              <div className="linkbox" >
                <Link to={"/camps"}>
                    <img src={campPhoto} style={{ width:mediaQueries.mobile?"120px": "300px", paddingBottom:"30px" }} alt="Camp Photo" />
                </Link>
              </div>
            </div>
            <div className="" style={{ zIndex: 30, marginTop:mediaQueries.mobile?"100px":"230px", marginLeft:mediaQueries.mobile?"50px":"200px", paddingRight:mediaQueries.mobile?"20px":"100px",lineHeight:mediaQueries.mobile?"0.8":"1" }}>
                <span style={{fontSize:mediaQueries.mobile?"15px":"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Holiday Camps<br /></span>
                <span style={{fontSize:mediaQueries.mobile?"7px":"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                    Experience the ultimate holiday camps for kids!  Join us for fun-filled days of skill development, teamwork, and excitement in a safe and supportive environment. 
                  </span>
                  <Link to="/camps" className="mb-5" style={{}}>
                      <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColorScheme.defaultColor, backgroundColor:"white", border:"transparent", fontWeight:"bold", fontSize:mediaQueries.mobile?"10px":""}}>View Upcoming Camps</Button>
                  </Link>
            </div>
              <div className="d-flex justify-content-center ps-5 pe-5 mt-5 mb-5" style={{color:"white", fontSize:"20px", fontWeight:"bold"}}>
                <div>
                    "At AllSport Kids, our mission is to ignite a passion for sports and physical 
                    activity in children aged 4-11. By experiencing and discover a wide range of sports, 
                    children develop gross motor skills and coordination to benefit their future. Our program 
                    is developed and coached by athletes that have excelled in their field aged 19-22, providing 
                    a fresh perspective on their sport. We have found that children respond well to young 
                    adults and see coaches as a positive mentor. Following the camp we will provide personalised 
                    reports to help parents understand their child's strengthens and enjoyment in various sports. 
                    The report will also include potential clubs for registration and their details. These sports 
                    include Soccer, Touch, Basketball, Cricket, Netball, AFL, Tennis, Athletics, Tee Ball and Hockey.
                     AllSport Kids offers an exciting opportunity for young learners to engage in physical activity,
                      develop new skills, and make lasting friendships." - Tom O'leary, Head Coach
                </div>
            </div>
          </div>
        </div>
      );
}


export default HomeDeals;
