import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import banner from "/assets/banner.jpg";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import Footer from "./Components/Footer";
import "./Camps.css";
import useMediaQueries from "media-queries-in-react";
import campVideo from "/assets/aflkidsvid.mp4";

function Camps(){
    const text = "Our camps combine a mix of skill drills and games to create a fun environment for AFL kids. Guarenteed to learn new skills and make friends!";
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return (
        <>
            <NavBar />
            <Header title="Holiday Camps" description={text}/>
            <div className="" style={{position:"absolute", left:mediaQueries.mobile?"63%":"63%", top:mediaQueries.mobile?"15%":"18%"}}>
            <video autoPlay src={campVideo} loop controls width={mediaQueries.mobile?"130":"360"} height={mediaQueries.mobile?"100":"200"} >

            </video>
            </div>
            <UpComingCamps />
        </>
    )
}

export default Camps;