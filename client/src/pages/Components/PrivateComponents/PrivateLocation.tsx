import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Components.css';

type PrivateLocationProps = {
  showTimetable: () => void;
  step1: (location:string) => void;
}

function PrivateLocation({showTimetable, step1}:PrivateLocationProps) {
  const [selectedOption, setSelectedOption] = useState('Choose location');

  const handleOptionSelect = (eventKey: string | null) => {
    showTimetable();
    if (eventKey) {
      setSelectedOption(eventKey);
      step1(eventKey);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center private-location-box p-4 m-5">
      <h1 className="mr-auto"><span className="step1" style={{fontSize:"3vw"}}>Step 1: Choose Location</span></h1>
      <div className="ml-auto">
        <DropdownButton
          as={ButtonGroup}
          size="lg"
          title={selectedOption}
          onSelect={handleOptionSelect}
          variant="secondary"
          style = {{width: "40vw"}}
        >
          <Dropdown.Item eventKey="Northern Beaches">Northern Beaches</Dropdown.Item>
          <Dropdown.Item eventKey="North Shore">North Shore</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>    
  );
  
}

export default PrivateLocation;


