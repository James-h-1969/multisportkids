import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function PrivateSessionType(){
    const [isActive, setisActive] = useState([true, false, false, false, false]);
    const [activeIndex, setactiveIndex] = useState(0);
    const [amountofKids, setamountofKids] = useState(1);

    const handleClick = (index:number) => {
        let newState = isActive;
        if (!isActive[4]){
            setamountofKids(1);
        }
        if (index != activeIndex){
            newState[index] = true;
            newState[activeIndex] = false;
            setactiveIndex(index);
            setisActive(newState);
            return;
        }
        newState[activeIndex] = false;
        setactiveIndex(-1);
        setisActive(newState);
    }
    return(
        <div>
            <h1><span className='step1'>Step 3: Pick Session Type</span></h1>
            <div className="d-flex p-4 m-5" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"20px"}}>
                <div className={isActive[0] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(0)}>
                    <h1><span className="private-session-type">1 on 1</span></h1>
                    <h2><span className="private-session-price">$80</span></h2>
                </div>
                <div className={isActive[1] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(1)}>
                    <h1><span className="private-session-type">2 on 1</span></h1>
                    <h2><span className="private-session-price">$110</span></h2>
                </div>
                <div className={isActive[2] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(2)}>
                    <h1><span className="private-session-type">3 on 1</span></h1>
                    <h2><span className="private-session-price">$140</span></h2>
                </div>
                <div className={isActive[3] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(3)}>
                    <h1><span className="private-session-type">5 on 1</span></h1>
                    <h2><span className="private-session-price">$200</span></h2>
                </div>
                <div className={isActive[4] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(4)}>
                    <h1><span className="private-session-type">... on 1</span></h1>
                    <h2><span className="private-session-price">$80</span></h2>
                    <a>+ $30 per extra AFL kid</a>
                    <div className="kid-quantity">
                        <InputGroup>
                            <FormControl
                                type="number"
                                value={amountofKids}
                                onChange={(e) => setamountofKids(parseInt(e.target.value))}
                                style={{}}
                            />
                        </InputGroup>
                    </div>
                </div>
        </div>

        </div>
        
    );
}

export default PrivateSessionType;