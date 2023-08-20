import React from "react";
import { Container } from "react-bootstrap";
import "./Components.css";
import PropTypes from "prop-types";
import useMediaQueries from "media-queries-in-react";

interface HeaderProps {
    title: string;
    description: string;
}


const Header: React.FC<HeaderProps> = ({title, description}) => {
  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  });
  return (
    <>
          <div className="" style={{ paddingTop:mediaQueries.mobile?"100px":"120px", paddingLeft:mediaQueries.mobile?"30px":"90px", zIndex:"-100"}}>
            <h1><span className="heading-text" style={{fontSize:mediaQueries.mobile?"30px":"90px"}}>{title}</span></h1>
          </div>
          <div className="" style={{width:"60%", paddingLeft:mediaQueries.mobile?"30px":"90px"}}>
            <a><span className="heading-description" style={{fontSize:mediaQueries.mobile?"13px":"20px"}}>{description}</span></a>
          </div>
    </>
  )
}




export default Header;
