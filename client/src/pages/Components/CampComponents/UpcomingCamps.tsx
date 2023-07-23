import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Campbox from "./Campbox";

type CampType = {
  name: String,
  ages: String,
  date: String,
  times: String,
  Price: Number,
  Location: String,
  address:String,
  locPic:string
}

function UpcomingCamps() {
  const [camps, setCamps] = useState<CampType[]>([]);
  
  useEffect(() => {
    async function fetchCamps() {
      const response = await fetch("http://localhost:3000/camps");
      const newCamps = await response.json();
      setCamps(newCamps);
      console.log(newCamps);
    }
    fetchCamps();
  }, [])

  return (
      <div className="m-5 pb-5 pt-4" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"20px"}}>
        <div className="mt-3">
            <span className="fs-1 ps-5" style={{fontFamily:"Rubik", fontWeight:"bold"}}>Upcoming Camps</span>
            {camps.map((value, index) => (
              <Campbox Location={value.Location} name={value.name} ages={value.ages} date={value.date} times={value.times} Price={value.Price} address={value.address} locPic={value.locPic}/>
            ))}
        </div>
      </div>
  );
}

export default UpcomingCamps;
