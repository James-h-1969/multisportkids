import React from "react";
import LinkButton from "./../LinkButton";
import campPhoto from "/assets/camps.jpg";
import privatePhoto from "/assets/flag.jpg";
import devPhoto from "/assets/development.jpg";



function HomeDeals(){
    return(
        <div className="page-box">
            <div className="individual-page-box">
                <h1><span className="holiday-box-heading">Holiday Camps</span></h1>
                <img src={campPhoto} style={{"width":"400px", "height": "400px", position: "absolute", marginLeft:"60%", "objectFit": "cover", "borderRadius": "30px", marginTop: "-30px"}}/>
                <div className="holiday-box-box">
                    <a>Our camps combine a mix of skill drills and games to create a fun environemnt for AFL kids. Guaranteed to learn new skills and make friends!</a>
                    <div className="holiday-button">
                        <LinkButton to="/camps" color="#46768E" textcolor="white" text="View Holiday Camps"/>
                    </div>
                </div>
            </div>
            <div className="individual-page-box">
                <h1><span className="private-box-heading">Private Coaching</span></h1>
                <img src={privatePhoto} style={{"width":"400px", "height": "400px", position: "absolute", marginLeft:"5%", "objectFit": "cover", "borderRadius": "30px", marginTop: "-30px"}}/>
                <div className="private-box-box">
                    <a>Our camps combine a mix of skill drills and games to create a fun environemnt for AFL kids. Guaranteed to learn new skills and make friends!</a>
                    <div className="holiday-button">
                        <LinkButton to="/private" color="#46768E" textcolor="white" text="View Private Coaching"/>
                    </div>
                </div>
            </div>
            <div className="individual-page-box">
                <h1><span className="dev-box-heading">Development Plans</span></h1>
                <img src={devPhoto} style={{"width":"400px", "height": "400px", position: "absolute", marginLeft:"60%", "objectFit": "cover", "borderRadius": "30px", marginTop: "-30px"}}/>
                <div className="holiday-box-box">
                    <a>Our camps combine a mix of skill drills and games to create a fun environemnt for AFL kids. Guaranteed to learn new skills and make friends!</a>
                    <div className="holiday-button">
                        <LinkButton to="/development" color="#46768E" textcolor="white" text="View Development Plans"/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomeDeals;