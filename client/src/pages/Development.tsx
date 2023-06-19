import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";

function Development(){
    const text = 
    "Our development programs are created to develop and enhace the skills of our AFL kids. Our elite players/coaches have all experienced many development programs and are now providing the serice for others.";
    return (
        <>
            <NavBar />
            <Header title="Development Programs" description={text}/>
        </>
    )
}

export default Development;