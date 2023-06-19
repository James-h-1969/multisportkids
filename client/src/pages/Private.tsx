import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";

function Private(){
    const desc = "Get one of our best coaches for personalised assistance. Tailored help to get the most out of your AFL kid."
    return (
        <>
            <NavBar />
            <Header title="Private Sessions" description={desc}/>
        </>
    )
}

export default Private;