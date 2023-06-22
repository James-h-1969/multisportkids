import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import MerchItem from "./Components/MerchItem";

function Merch(){
    return (
        <>
            <NavBar />
            <Header title="Merch" description="Look good, play good. Choose from our range of top quality products below."/>
            <div className="merch-box">
                <MerchItem />
                <MerchItem />
            </div>
        </>
    )
}

export default Merch;