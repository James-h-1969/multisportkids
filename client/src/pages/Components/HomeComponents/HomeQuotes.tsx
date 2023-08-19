import React, { useState, useEffect } from 'react';
import '../Components.css';
import useMediaQueries from "media-queries-in-react";

export default function HomeQuotes() {
  const [transparency, setTransparency] = useState(1);
  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  });
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const middleOfScreen = windowHeight / 2;
      
      let maxDistance;
      if (mediaQueries.mobile) {
        maxDistance = windowHeight * 1.5; // Smaller maxDistance for mobile
      } else {
        maxDistance = windowHeight / 2; // Larger maxDistance for desktop
      }
      
      const distanceToMiddle = Math.abs(scrollY - middleOfScreen);
      const transparencyValue = 1 - (distanceToMiddle / maxDistance);
      setTransparency(transparencyValue);
    }
  
    window.addEventListener('scroll', handleScroll);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mediaQueries.mobile]); // Include mediaQueries.mobile as a dependency
  
  

  return (
    <>
      <div className="d-flex flex-column justify-content-center" style={{ backgroundColor: "#46768E", textAlign: "center", fontFamily: "'Rubik', sans-serif" }}>
        <div className="d-flex flex-column ps-3 pe-3">
          <h1><span style={{ fontSize: mediaQueries.mobile?"20px":"35px", color: `rgba(255, 255, 255, ${transparency})` }}>"As a parent, watching his game improve was a pleasure to watch"</span></h1>
          <a><span style={{ fontWeight: "bold", fontSize: mediaQueries.mobile?"15px":"20px" }}>- about Archer, U10s</span></a>
        </div>
        <div className="d-flex flex-column ps-3 pe-3">
          <h1><span style={{ fontSize: mediaQueries.mobile?"20px":"35px", color: `rgba(255, 255, 255 , ${transparency})` }}>" We strongly encourage other parents to participate to improve their kids skills and confidence"</span></h1>
          <a><span style={{ fontWeight: "bold", fontSize: mediaQueries.mobile?"15px":"20px"}}>- about Patrick, U12s</span></a>
        </div>
      </div>
    </>
  );
}
