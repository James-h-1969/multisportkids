import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface MyLinkButtonProps {
  to: string;
  color: string;
}

const LinkButton: React.FC<MyLinkButtonProps> = ({ to, color}) => {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <Link to={to}>
      <Button style={buttonStyle} className="btn-lg">
        Book now
      </Button>
    </Link>
  );
};

export default LinkButton;
