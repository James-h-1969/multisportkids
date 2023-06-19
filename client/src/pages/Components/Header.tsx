import React from "react";
import { Container } from "react-bootstrap";
import "./Components.css";
import PropTypes from "prop-types";


interface HeaderProps {
    title: string;
    description: string;
}

const Header: React.FC<HeaderProps> = ({title, description}) => {
  return (
    <>
          <div className="heading">
            <h1><span className="heading-text">{title}</span></h1>
          </div>
          <div className="description">
            <a><span className="heading-description">{description}</span></a>
          </div>
    </>
  )
}




export default Header;
