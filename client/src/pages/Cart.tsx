import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";

function Cart(){
    return (
        <>
            <NavBar />
            <Header title="Cart" description="Pay for your AFL Kids products"/>
        </>
    )
}

export default Cart;