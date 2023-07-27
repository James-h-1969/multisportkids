import { useState, useEffect } from "react";
import { getDates, getMonthName, getMonthNum, getYear, getCurrentDayNum } from "../../functions/getDates";
import "../Components.css";
import { Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

type PrivateTimetableProps = {
    showTypes: (show:boolean) => void;
    step2: (date:string, time:string) => void;
    location: string;
}

function PrivateTimetable({showTypes, step2, location}:PrivateTimetableProps){
    const [timetableState, settimetableState] = useState([-1,-1]);
    const [isCurrentMonth, setisCurrentMonth] = useState(true);
    const [timetableDates, setTimetableDates] = useState(getDates(isCurrentMonth));
    const [currentTimes, setCurrentTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [availableDates, setAvailableDates] = useState({});
    const [currentCoaches, setCurrentCoaches] = useState<string[]>([]);
 
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const colorsList = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet"
    ]      
    const timeAvailable = ["7:00am", "9:00am", "11:00am", "1:00pm", "3:00pm", "5:00pm"];

    const handleClick = (week:number, day:number) => {
        showTypes(false);
        let dateChosen = parseInt(timetableDates[week][day][0]);
        if (dateChosen <= getCurrentDayNum() && isCurrentMonth){
            settimetableState([-1, -1]);
            return;
        }
        let datesAvailable = Object.keys(availableDates);
        let toSet = false;
        datesAvailable.forEach((date) => {
            let brokenDate = date.split("/");
            let monthdays = isCurrentMonth ? getMonthNum() : getMonthNum() + 1;
            if (parseInt(brokenDate[0]) == dateChosen && monthdays == parseInt(brokenDate[1])) {
                toSet = true;
            } 
        })  
        if (toSet){
            let newCoords = [week, day];
            settimetableState(newCoords);
            getTimes(day, week);
            return
        }     
        settimetableState([-1, -1]);



    }

    function changeMonth(){
        let nextState = !isCurrentMonth;
        setisCurrentMonth(nextState);
        let newDates = getDates(nextState);
        setTimetableDates(newDates);
        settimetableState([-1, -1]);
        setSelectedTime("");
        showTypes(false);
    }

    function getDate(){
        if (timetableState[0] == -1){
            return "";
        }
        let date = timetableDates[timetableState[0]][timetableState[1]][0];
        let month = isCurrentMonth ? getMonthNum().toString(): (getMonthNum() + 1).toString();
        return `${date}  /  ${month} / 2023`;
    }

    type CoachType = {
        name: string,
        dates: Array<string>,
        times: Array<string>,
        location: string
    }

    type CoachTimes = {
        times: Array<string>
    }



    interface CoachObject {
        Coachname: string[];
        CoachTimes: string[];
      }

    useEffect(() => {
        async function fetchCoaches() {
          const response = await fetch("http://localhost:3000/PrivateTimes");
          const newCoaches = await response.json();
          const datesFree: {[date:string]: CoachObject } = {};
            newCoaches.forEach((value:CoachType) => {
                value.dates.forEach((date, index) => {
                    if (value.location != location){
                        return;
                    }
                    const Coachname = value.name;
                    const CoachTimes = value.times[index];
                    
                    if (!datesFree[date]) {
                        // The date is not present in datesFree, create a new date object
                        const newDate: CoachObject = {
                        Coachname: [Coachname],
                        CoachTimes: [CoachTimes],
                        };
                    
                        // Now you can do something with the newDate object, like adding it to the datesFree object
                        datesFree[date] = newDate;
                    } else {
                        // The date already exists in datesFree, update the existing date object
                        datesFree[date].CoachTimes.push(CoachTimes);
                        datesFree[date].Coachname.push(Coachname);
                    }
                })
            })
            setAvailableDates(datesFree);
            console.log(datesFree);
        }
        fetchCoaches();
      }, [location])


    function getTimes(day:number, week:number){
        const selectedDate = parseInt(timetableDates[week][day][0]);
        const asDate = `${selectedDate}/${isCurrentMonth ? getMonthNum() : getMonthNum() + 1}/23`;
        const values: {[dates:string]: CoachObject} = availableDates;
        const times = values[asDate].CoachTimes;
        const coaches = values[asDate].Coachname;
        setCurrentTimes(times);
        setCurrentCoaches(coaches);
    }

    function handleTimeClick(time:string){
        setSelectedTime(time);
        showTypes(true);
        step2(getDate(), time);
    }

    function isAvailableDate(day:number, week:number){
        let dateChosen = parseInt(timetableDates[week][day][0]);
        let datesAvailable = Object.keys(availableDates);
        let isavailable = false;
        datesAvailable.forEach((date) => {
            let brokenDate = date.split("/");
            let monthdays = isCurrentMonth ? getMonthNum() : getMonthNum() + 1;
            if (parseInt(brokenDate[0]) == dateChosen && monthdays == parseInt(brokenDate[1])) {
                isavailable = true;
            } 
        })
        return isavailable;
    }


    return (
        <>
            <div className='private-timetable-box p-4 m-5 d-flex justify-content-between'>
            <div className="timetable-box d-flex flex-column pb-3" style={{width: "50%"}}>
                <div className="text-start d-flex justify-content-between">
                    <div className="d-flex justify-content-between align-items-end ms-4" style={{width:"150px"}}>
                        <h1><span className="fs-4">{getMonthName(isCurrentMonth)}</span></h1>
                        <div className="mb-2" onClick={() => changeMonth()} style={{cursor:"pointer"}}>
                            {isCurrentMonth ? <ArrowRight color="black" size={30}/>:<ArrowLeft color="black" size={30}/>}
                        </div>
                    </div>
                    <h1><span className="fs-4 me-4">{getYear()}</span></h1>
                </div>
                <div className="weekday d-flex justify-content-around" style={{height:"60px"}}>
                    {weekDays.map((day) => (
                        <div className=" p-4 text-center text-muted">{day}</div>
                    ))}
                </div>
                <div className="timetable-box">
                    {timetableDates.map((week, weeknum) => (
                        <div className="d-flex justify-content-around" style={{}}>
                        {week.map((day, daynum) => (
                            <div className="d-flex m-4 text-center row" style={{ width: "30px", height: "30px" }} onClick={() => handleClick(weeknum, daynum)}>
                                <div className={day[1] === "currentDay" && isCurrentMonth ? "current-day rounded-circle" : "" || isAvailableDate(daynum, weeknum) ? "box-red rounded-circle":""}>
                                    <div className={day[0] === "invalid" ? "":"show-shadow rounded-circle"}>
                                        <a> <span className="fs-6 d-flex align-items-center justify-content-center" style={{ height: "100%", width: "100%" }}>{day[0] === "invalid"? "":day[0]}</span></a>   
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-around pt-3">
                    <div className="d-flex">
                        <div className="rounded-circle me-4" style={{backgroundColor:"#46768E", width:"20px", height:"20px"}}>
                        </div>
                        Current Day
                    </div>
                    <div className="d-flex">
                        <div className="rounded-circle me-4" style={{backgroundColor:"#6c757d", width:"20px", height:"20px"}}>
                        </div>
                        Available Days
                    </div>
                </div>
            </div>
            <div className="pe-3 border-left">
                    <h1><span className='text-end  fs-0.3'>Step 2: Pick Dates and Times</span></h1>
                    { timetableState[0] == -1 ? <div className="mt-5" style={{fontSize:"30px"}}>Choose a Date</div>:
                    <div className="p-3 mt-5" style={{backgroundColor:"#6c757d", borderRadius:"20px"}}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3>
                                    <span className="fs-4" style={{color:"white"}}>Available Times</span>
                                </h3>
                            </div>
                            <div>
                                <h3>
                                    <span className="fs-4" style={{color:"white"}}>{getDate()}</span>
                                </h3>
                            </div>
                        </div> 
                        <div className="mb-4 p-4">
                            {
                                timeAvailable.map((time) => (
                                    <div className="mt-4 d-flex justify-content-between" style={{height:"30px"}}>
                                        <span>{time}</span>
                                        {currentTimes.includes(time) && 
                                        <div>
                                            
                                            <Button style={{backgroundColor:"#46768E", color:"white", border:"transparent"}} onClick={() => handleTimeClick(time)}>Select Time</Button>
                                        </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="d-flex">
                            {currentCoaches.map((coach, indx) => (
                                <div className="p-2 m-2" style={{backgroundColor:colorsList[indx], borderRadius:"10px", fontWeight:"bold"}}>
                                    {coach}
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div className="pt-4">
                        {selectedTime ? <><span className="text-muted">Selected:</span> <span style={{fontSize:"27px", paddingLeft:"200px"}}>{selectedTime}{" "}{getDate()}</span></>:<></>}
                    </div>
               </div>            
            </div>           
        </>
        
      );
}


export default PrivateTimetable