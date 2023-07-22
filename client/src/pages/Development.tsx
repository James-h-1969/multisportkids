import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import AcademyItem from "./Components/AcademyItem";

function Development(){
    const text = 
    "Preparation Sessions run by ex-Swans Academy players who use previous academy drills to prepare your AFL kid.";

    const northTimes = [
        "29/7/23", "5/8/23", "12/8/23", "19/8/23"
    ]
    const stIvesTimes = [
        "31/7/23", "7/8/23", "14/8/23", "21/8/23"
    ]

    return (
        <>
            <NavBar />
            <Header title="Academy Preparation" description={text}/>
            <div className="d-flex justify-content-around mt-5">
                <AcademyItem name="Northern Beaches Preparation" location="Frank Grey Oval" start="29/7/23" time="Saturday 9:00am" dates={northTimes}/>
                <AcademyItem name="St Ives Preparation" location="Accron Oval" start="31/7/23" time="Monday 6:00pm" dates={stIvesTimes}/>
            </div>

        </>
    )
}

export default Development;