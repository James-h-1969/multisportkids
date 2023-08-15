import { Card, Row, Col } from "react-bootstrap";
import PlanItem from "./PlanItem";
import Oneon1 from "/assets/1on1.png";
import Banner from "/assets/banner.jpg"

export default function PrivatePlans(){
    const indDesc = ["5x sessions", "Mental rehearsal, Video Analysis, Goal-Setting", "Save $25", "Valid for up to 10 weeks", "Will be emailed 5 codes to redeem after purchase"];
    const groupDesc = ["5x sessions", "Group work, constructive feedback, engaging drills", "Valid for up to 10 weeks", "Will be emailed 5 codes to redeem after purchase"]

    return(
        <div className="pt-4 ps-2">
            <h1><span className="ms-5" style={{color:"#46768E", fontFamily:"Rubik", fontWeight:"bold", fontSize:"50px"}}>Plans</span></h1>
            <div className="d-flex p-2 merch-box" style={{marginLeft:"50px", marginTop:"50px"}}>
                <Row className="g-3 ml-1" xs={1} lg={2} >
                    <Col>
                        <PlanItem name="1 on 1 Private Plan" price="$375 overall" image={Oneon1} desc={indDesc} id={9}/>
                    </Col>
                    <Col>
                        <PlanItem name="2 on 1 Private Plan" price="$500 overall" image={Banner} desc={groupDesc} id={10}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}