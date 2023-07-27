import React, { useState, useEffect } from 'react';
import '../Components.css';

export default function HomeQuotes() {
  const [transparency, setTransparency] = useState(1);

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const middleOfScreen = windowHeight / 2;
      const distanceToMiddle = Math.abs(scrollY - middleOfScreen);
      const maxDistance = windowHeight / 2;
      const transparencyValue = 1 - (distanceToMiddle / maxDistance);
      setTransparency(transparencyValue);
    }

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center" style={{ backgroundColor: "#46768E", textAlign: "center", fontFamily: "'Rubik', sans-serif" }}>
        <div className="d-flex flex-column">
          <h1><span style={{ fontSize: "35px", color: `rgba(255, 255, 255, ${transparency})` }}>"As a parent, watching his game improve was a pleasure to watch"</span></h1>
          <a><span style={{ fontWeight: "bold", fontSize: "20px" }}>- about Archer, U10s</span></a>
        </div>
        <div className="d-flex flex-column">
          <h1><span style={{ fontSize: "35px", color: `rgba(255, 255, 255 , ${transparency})` }}>" We strongly encourage other parents to participate to improve their kids skills and confidence"</span></h1>
          <a><span style={{ fontWeight: "bold", fontSize: "20px"}}>- about Patrick, U12s</span></a>
        </div>
      </div>
    </>
  );
}
