import {useState} from "react";
import { getDates, getMonthName, getMonthNum, getYear } from "../../functions/getDates";
import "../Components.css";
import { Button } from "react-bootstrap";

function PrivateTimetable(){
    const [timetableState, settimetableState] = useState([-1,-1]);

    const timetableDates = getDates();

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

    const handleClick = (week:number, day:number) => {
        if (week == timetableState[0] && day == timetableState[1]){
            settimetableState([-1, -1]);
            return;
        }
        let newCoords = [week, day];
        settimetableState(newCoords);
    }


    return (
        <div className='private-timetable-box p-4 m-5 d-flex justify-content-between'>
          <div className="timetable-box d-flex flex-column pb-5" style={{width: "50%"}}>
            <div className="text-start d-flex justify-content-between">
                <div className="d-flex justify-content-between align-items-baseline" style={{width:"100px"}}>
                    <h1><span className="fs-4">{getMonthName()}</span></h1>
                    <Button style={{height: "50%", alignItems:"baseline"}}>{">"}</Button>
                </div>
                <h1><span className="fs-4">{getYear()}</span></h1>
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
                        <div className="d-flex m-4 text-center cell row" style={{ width: "30px", height: "30px" }}>
                            <div className={day[1] === "currentDay" ? "current-day rounded-circle" : ""}>
                                <a> <span className="fs-6 d-flex align-items-center justify-content-center" style={{ height: "100%", width: "100%" }}>{day[0]}</span></a>
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
            <div className="rounded-circle" style={{backgroundColor:"red", width:"20px", height:"20px"}}>
                    Current Day
            </div>
            <div className="rounded-circle" style={{backgroundColor:"red", width:"20px", height:"20px"}}>
                    Current Day
            </div>
          </div>
          <div className="text-end pe-3">
                <h1><span className='fs-0.3'>Step 2: Pick Dates and Times</span></h1>
            </div>
        </div>
      );
}


export default PrivateTimetable