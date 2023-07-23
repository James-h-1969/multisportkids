import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import banner from "/assets/banner.jpg";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import Footer from "./Components/Footer";
import "./Camps.css";

function Camps(){
    const text = "Our camps combine a mix of skill drills and games to create a fun environment for AFL kids. Guarenteed to learn new skills and make friends!";
    return (
        <>
            <NavBar />
            <Header title="Holiday Camps" description={text}/>
            <UpComingCamps />
        </>
    )
}

export default Camps;