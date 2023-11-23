import  { useState } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import PrivateLocation from "./Components/PrivateComponents/PrivateLocation";
import PrivateTimetable from "./Components/PrivateComponents/PrivateTimetable";
import PrivateSessionType from "./Components/PrivateComponents/PrivateSessionType";
import AddSession from "./Components/PrivateComponents/AddSession";
import PrivatePlans from "./Components/PrivateComponents/PrivatePlans";
import "./Components/Components.css";
import Footer from "./Components/Footer"

function Private() {
    const desc = "Get one of our best coaches for personalised assistance. Tailored help to get the most out of your AFL kid.";
    const [stepStates, setStepStates] = useState([true, false, false, false]);
    const [overallSession, setOverallSession] = useState({
        id: 0,
        location:"",
        date:"",
        time:"",
        price: 0,
        coachName: "",
    })

    function showTimetable(){
        let currentStates = [true, true, false, false];
        setStepStates(currentStates);
    }

    function step1(location:string){
        setOverallSession((prevState) => ({
            ...prevState,
            location: location,
        }));
    }

    function step3(id:number, price:number){
        setOverallSession((prevState) => ({
            ...prevState,
            id: id,
            price:price
        }));
    }

    function step2(date:string, time:string, coach:string){
        setOverallSession((prevState) => ({
            ...prevState,
            date:date,
            time:time,
            coachName:coach,
        }));
    }

    // function overallDate(location:string){
    //     setOverallSession((prevState) => ({
    //         ...prevState,
    //         location: location,
    //     }));
    // }


    function showType(show:boolean){
        let currentStates = [];
        if (show){
            currentStates = [true, true, true, false];
        } else {
            currentStates = [true, true, false, false];
        }     
        setStepStates(currentStates);
    }

    function showAdd(show:boolean){
        let currentStates = [];
        if (show){
            currentStates = [true, true, true, true];
        } else {
            currentStates = [true, true, true, false];
        }     
        setStepStates(currentStates);
    }

    return (
      <>
        <NavBar />
        <Header title="Private Sessions" description={desc}/>
        <PrivatePlans />
        <PrivateLocation showTimetable={showTimetable} step1={step1}/>
        {stepStates[1] ? <PrivateTimetable showTypes={showType} step2={step2} location={overallSession.location}/> :<></>}
        {stepStates[2] ? <PrivateSessionType showAdd={showAdd} step3={step3}/>:<></>}
        {stepStates[3] ? <AddSession time={overallSession.time} date={overallSession.date} id={overallSession.id} location={overallSession.location} price={overallSession.price} name={overallSession.coachName}/>:<></>}
        <Footer />
      </>
    )
  }

  export default Private;