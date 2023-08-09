import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

type PrivateSessionTypeProps = {
    showAdd: (show:boolean) => void;
    step3: (id:number, price:number) => void;
}

function PrivateSessionType({showAdd, step3}:PrivateSessionTypeProps){
    const [isActive, setisActive] = useState([false, false, false, false, false]);
    const [activeIndex, setactiveIndex] = useState(-1);
    const [amountofKids, setamountofKids] = useState(1);

    const handleClick = (index:number, kids:number) => {
        let newState = isActive;
        if (index != activeIndex){
            newState[index] = true;
            newState[activeIndex] = false;
            setactiveIndex(index);
            setisActive(newState);
            if (!isActive[4]){
                setamountofKids(1);
            }
            showAdd(true);
            let price = 80 + 30 * (kids-1);
            step3(kids+2, price);
            return;
        }
        newState[activeIndex] = false;
        setactiveIndex(-1);
        setisActive(newState);
        if (!isActive[4]){
            setamountofKids(1);
        }
        showAdd(false);
    }

    function updateDropDown(val:number){
        if (val == 0 || val > 6){
            return;
        }
        setamountofKids(val);
        let price = 80 + 30 * (val-1);
        step3(val+2, price);
    }

    return(
        <div className="p-4 m-5" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"20px"}}>
            <h1><span className='step1'>Step 3: Pick Session Type</span></h1>
            <div className="d-flex p-3 pt-5 justify-content-around">
                <div className={isActive[0] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(0,1)}>
                    <h1><span className="private-session-type">1 on 1</span></h1>
                    <h2><span className="private-session-price">$80</span></h2>
                </div>
                <div className={isActive[1] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(1,2)}>
                    <h1><span className="private-session-type">2 on 1</span></h1>
                    <h2><span className="private-session-price">$110</span></h2>
                </div>
                <div className={isActive[2] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(2,3)}>
                    <h1><span className="private-session-type">3 on 1</span></h1>
                    <h2><span className="private-session-price">$140</span></h2>
                </div>
                <div className={isActive[3] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(3,5)}>
                    <h1><span className="private-session-type">5 on 1</span></h1>
                    <h2><span className="private-session-price">$200</span></h2>
                </div>
                <div className={isActive[4] ? "session-type-active": "session-type-deactive"} onClick={() => handleClick(4, amountofKids)}>
                    <h1><span className="private-session-type">... on 1</span></h1>
                    <h2><span className="private-session-price">${80 + 30 * (amountofKids-1)}</span></h2>
                    <a>+ $30 per extra AFL kid</a>
                </div>
                <div className="kid-quantity">
                        <InputGroup>
                            <FormControl
                                type="number"
                                value={amountofKids}
                                onChange={(e) => updateDropDown(parseInt(e.target.value))}
                                readOnly={!isActive[4]}
                            />
                        </InputGroup>
                </div>
        </div>

        </div>
        
    );
}

export default PrivateSessionType;