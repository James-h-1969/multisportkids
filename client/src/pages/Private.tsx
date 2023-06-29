import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import PrivateLocation from "./Components/PrivateComponents/PrivateLocation";
import PrivateTimetable from "./Components/PrivateComponents/PrivateTimetable";
import PrivateSessionType from "./Components/PrivateComponents/PrivateSessionType";
import Footer from "./Components/Footer";

function Private(){
    const desc = "Get one of our best coaches for personalised assistance. Tailored help to get the most out of your AFL kid."
    return (
        <>
            <NavBar />
            <Header title="Private Sessions" description={desc}/>
            <PrivateLocation />
            <PrivateTimetable />
            <PrivateSessionType />
            <Footer />
        </>
    )
}

export default Private;