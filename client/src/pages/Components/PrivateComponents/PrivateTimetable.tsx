import {useState} from "react";
import { getDates, getMonthName, getMonthNum, getYear, getCurrentDayNum } from "../../functions/getDates";
import "../Components.css";
import { Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

type PrivateTimetableProps = {
    showTypes: (show:boolean) => void;
    step2: (date:string, time:string) => void;
}

function PrivateTimetable({showTypes, step2}:PrivateTimetableProps){
    const [timetableState, settimetableState] = useState([-1,-1]);
    const [isCurrentMonth, setisCurrentMonth] = useState(true);
    const [timetableDates, setTimetableDates] = useState(getDates(isCurrentMonth));
    const [currentTimes, setCurrentTimes] = useState({});
    const [selectedTime, setSelectedTime] = useState("");
 
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const timeAvailable = ["7:00am", "9:00am", "11:00am", "1:00pm", "3:00pm", "5:00pm"];

    const handleClick = (week:number, day:number) => {
        showTypes(false);
        getTimes(day, week);
        let currentDate = parseInt(timetableDates[week][day][0]);
        if (currentDate <= getCurrentDayNum() && isCurrentMonth){
            return;
        }
        if (week == timetableState[0] && day == timetableState[1]){
            settimetableState([-1, -1]);
            return;
        }
        let newCoords = [week, day];
        settimetableState(newCoords);
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

    const testDay = {
        month: 6,
        day: 10,
        times: {
            "7:00am":true,
            "9:00am":false,
            "11:00am":false,
            "1:00pm":false,
            "3:00pm":true,
            "5:00pm":true,
        }
    }

    function getTimes(day:number, week:number){
        //here make a backend request to get the available times
        if (parseInt(timetableDates[week][day][0]) == 10 && getMonthNum() == 6){
            setCurrentTimes(testDay.times);
            return;
        }
        setCurrentTimes({});
    }

    function handleTimeClick(time:string){
        setSelectedTime(time);
        showTypes(true);
        step2(getDate(), time);
    }


    return (
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
                            <div className={day[1] === "currentDay" && isCurrentMonth ? "current-day rounded-circle" : "" || (daynum == timetableState[1] && weeknum == timetableState[0]) ? "activeDay rounded-circle": "" || parseInt(timetableDates[weeknum][daynum][0]) <= getCurrentDayNum() && isCurrentMonth ? "text-muted":"cell"}>
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
                    <div className="rounded-circle me-4" style={{backgroundColor:"#EBEBEB", width:"20px", height:"20px"}}>
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
                                    <span>{currentTimes ? (currentTimes[time as keyof typeof currentTimes] ? <div className="p-2" onClick={() => handleTimeClick(time)} style={{backgroundColor:"#EBEBEB", cursor:"pointer", borderRadius:"15px"}}>Select Time</div> : "") : ""}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>}
                <div className="pt-4">
                    {selectedTime ? <><span className="text-muted">Selected:</span> <span style={{fontSize:"27px", paddingLeft:"200px"}}>{selectedTime}{" "}{getDate()}</span></>:<></>}
                </div>
          </div>
          
        </div>
      );
}


export default PrivateTimetable