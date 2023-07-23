import { Button, Card } from "react-bootstrap";
import { useState } from 'react';
import { useCart } from "../context/cartContext";

type AcademyItemProps = {
    name:string,
    time:string,
    start:string,
    Location:string,
    dates:string[]
}


export default function AcademyItem({name, time, start, Location, dates}:AcademyItemProps){
    const [plan, setPlan] = useState(0);
    const [timesChosen, setTimesChosen] = useState<string[]>([]);
    const { addToCart } = useCart();

    function handleClick(Givenplan:number){
        const emptyTimes: string[] = [];
        if (plan === Givenplan){
            setPlan(0);
            setTimesChosen(emptyTimes);
            return;
        }
        setTimesChosen(emptyTimes);
        setPlan(Givenplan);
    }

    function isDateActive(date:string){
        if (timesChosen?.find((item:string) => item === date) == null){
            return false;
        }
        return true;
    }

    function handleTimeClick(date:string){
        if (isDateActive(date)) {
            const newTimes = timesChosen.filter((item:string) => item !== date); 
            setTimesChosen(newTimes);
        }
        else {
            if (timesChosen.length >= plan){
                if (plan === 0){
                    return;
                }
                if (plan === 1){

                }
                const newTimes = [date]
                setTimesChosen(newTimes);
                return;
            }
            const newTimes = timesChosen.length < 1 ? [date] : [...timesChosen, date];
            setTimesChosen(newTimes);
        }
    }

    function handleCartClick(plan:number){
        if (plan === 1){
            addToCart(12, 1);
        } else {
            addToCart(13, 1);
        }
        location.reload();
    }

    return(
        <Card className="mb-5" style={{width: "500px"}}>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                </Card.Title>
                <div className="d-flex justify-content-between fs-5">
                    <span style={{fontWeight:"bold"}}>
                        {time} (1 hr)
                    </span>
                    <span className="text-muted">
                        Starting {start}
                    </span>
                </div>
                <div className="d-flex justify-content-between fs-5">
                    <span>
                        Location:
                    </span>
                    <span className="text-muted">
                        {Location}
                    </span> 
                </div>
                <span className="mt-3">Select Amount of sessions:</span>
                <div className="d-flex justify-content-around fs-5 mt-2">
                    <div className="p-4" style={{backgroundColor: plan != 1 ? "rgb(222, 222, 231)":"#46768E", borderRadius:"20px", cursor:"pointer"}} onClick={() => handleClick(1)}>
                        1 session - $40
                    </div>
                    <div className="p-4" style={{backgroundColor: plan != 4 ? "rgb(222, 222, 231)":"#46768E",borderRadius:"20px", cursor:"pointer"}} onClick={() => handleClick(4)}>
                        4 sessions - $130
                    </div>
                </div>
                <div className="d-flex flex-column mt-4 ms-3 me-3">
                    {dates.map((date) => (
                        <div className="fs-5 mt-3 d-flex justify-content-between">
                            <span>
                                {date}
                            </span>
                            {!isDateActive(date) ? 
                                <div className="p-2" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"10px", cursor:"pointer"}} onClick={() => handleTimeClick(date)}>
                                    Choose Date
                                </div>
                            :   <div className="p-2" style={{backgroundColor:"#46768E", borderRadius:"10px", cursor:"pointer"}} onClick={() => handleTimeClick(date)}>
                                    Date Chosen
                                </div>}
                        </div>
                    ))}
                </div>
                <Button className="mt-3" disabled={!(timesChosen.length === plan && plan !== 0)} onClick={() => handleCartClick(plan)}>
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    )
}