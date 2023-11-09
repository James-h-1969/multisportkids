import { Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddCamp from "./ManagerHelp/AddCamp";
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./manager.css"
import { CampType } from "../types/campType";

export default function Manager(){
    const [camps, setCamps] = useState<CampType[]>([]);
    const [showingAddCamp, setshowingAddCamp] = useState(false);


    useEffect(() => {
        async function fetchCamps() {
          const response = await fetch(`http://localhost:3000/camps`);
          const newCamps = await response.json();
          setCamps(newCamps);
        }
        fetchCamps();
      }, [])

    function addCamp(){
        console.log("Adding Camp")
    }


    return(
        <>
        <span className="text-center ps-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Welcome, Tom O'leary</span>
        <div className="ps-5">
            <Link to="/">
                <Button>Back to AFLKids</Button>
            </Link>
        </div>
        <div className="ps-5 pt-3">
            <div className="d-flex justify-content-start">
                <div><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Camps</h1></div>
                <div className="circle" onClick={() => setshowingAddCamp(true)}><div className="plus">+</div></div>
            </div>
            {showingAddCamp ? <AddCamp setShowingAddCamp={setshowingAddCamp}/>: <></>}
            <div> 
                {camps.map((value, index) => (
                <div className="p-3 m-3" style={{backgroundColor:"grey", borderRadius:"15px"}}><span style={{fontWeight:"normal", fontFamily:"Rubik", fontSize:"20px"}}>{value.name}</span></div>
                ))}
            </div>
            <div>

            </div>
        </div>
        <h1>Private Session</h1>
        </>
    )
}