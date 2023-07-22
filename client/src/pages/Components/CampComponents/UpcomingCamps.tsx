import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Campbox from "./Campbox";

function UpcomingCamps() {
  const [camps, setCamps] = useState([]);
  
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
      <div className="camp-background-box">
        <div className="upcoming-box">
          <h1>
            <span className="camp-title">Upcoming Camps</span>
          </h1>
          <div className="camp-titles">
            <a>
              <span className="camp-location">Location</span>
            </a>
            <a>
              <span className="camp-week">Week</span>
            </a>
            <a>
              <span className="camp-date">Date</span>
            </a>
          </div>
          <div>
            {camps.map((value, index) => (
              <Campbox location={value.Location} />
            ))}
          </div>
        </div>
      </div>
  );
}

export default UpcomingCamps;
