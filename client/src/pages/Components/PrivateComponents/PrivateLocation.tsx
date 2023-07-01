import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Components.css';

function PrivateLocation() {
  const [selectedOption, setSelectedOption] = useState('Choose location');

  const handleOptionSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedOption(eventKey);
    }
  };

  return (

      <div className="private-location-box">
        <h1><span className='step1'>Step 1: Choose Location</span></h1>
        <div className="location-button">
          <DropdownButton
            as={ButtonGroup}
            size="lg"
            title={selectedOption}
            onSelect={handleOptionSelect}
            variant="secondary"
          >
            <Dropdown.Item eventKey="Northern Beaches">Northern Beaches</Dropdown.Item>
            <Dropdown.Item eventKey="North Shore">North Shore</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>    
  );
}

export default PrivateLocation;


