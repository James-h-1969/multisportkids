import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import MerchItem from "./Components/MerchItem";
import "./Merch.css";
import hoodie from "./assets/AFLkids hoodie.jpg";
import shirt from "./assets/AFLkids playing shirt.jpg";

function Merch(){
    return (
        <>
            <NavBar />
            <Header title="Merch" description="Look good, play good. Choose from our range of top quality products below."/>
            <div className="merch-box">
                <MerchItem name="Hoodie" price="$35" image={<img src={hoodie}/>}/>
                <MerchItem name="Training Shirt" price="$25" image={<img src={shirt}/>}/>
            </div>
        </>
    )
}

export default Merch;