import { useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

export default function Success(){
    

    useEffect(() => {

    }, []);

    return(
        <>
        <NavBar />
        <Header title="Success" description="Your payment was a success. Thanks for shopping with AFLKids."/>
        </>
    )
}