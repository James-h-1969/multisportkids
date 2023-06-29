import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface MyLinkButtonProps {
  to: string;
  color: string;
  textcolor: string;
  text: string;
}

const LinkButton: React.FC<MyLinkButtonProps> = ({ to, color, textcolor, text}) => {
  const buttonStyle = {
    backgroundColor: color,
    color: textcolor,
    border: "none",
  };

  return (
    <Link to={to}>
      <Button style={buttonStyle} className="btn-lg">
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
