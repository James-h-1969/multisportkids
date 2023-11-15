import { Button } from "react-bootstrap"
import { Kids, Child } from "../../types/kidsType"
import { useState } from "react"

export default function ShowKids({kids}:Kids){
    const [showKids, setShowKids] = useState(false)


    return(
        <>
            <Button onClick={() => setShowKids(!showKids)} style={{backgroundColor:"#46768E", border:"transparent"}}>{ !showKids? <>Show Kids</>:<>Hide Kids</>}</Button>
        { !showKids? <></>:<div className="p-3">
            <div className="d-flex mt-3 p-1" style={{fontWeight:"bold"}}>
                <div>Name</div>
                <div style={{position:"absolute", left: "40vh"}}>Age</div>
                <div style={{position:"absolute", left: "50vh", paddingRight:"70vh"}}>Comments</div>
                <div style={{position:"absolute", left: "130vh"}}>Club</div>
                <div  style={{ position: "absolute", left: "160vh"}}>Days</div>
            </div>
    
            {kids.map((value: Child, index) => (
                <div className="d-flex mt-3 p-1" style={{backgroundColor:"white", borderRadius:"10px"}}>
                    <div>{value.childName}</div>
                    <div style={{position:"absolute", left: "40vh"}}>{value.childAge}</div>
                    <div style={{position:"absolute", left: "50vh", paddingRight:"70vh"}}>{value.childComments}</div>
                    <div style={{position:"absolute", left: "130vh"}}>{value.childClub}</div>
                    {value.day1 ? (
                        <div className="rounded-circle" style={{ position: "absolute", left: "160vh", backgroundColor: "grey", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            1
                        </div>
                    ) : (
                        <></>
                    )}
                    {value.day2 ? (
                        <div className="rounded-circle" style={{ position: "absolute", left: "165vh", backgroundColor: "grey", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            2
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
}
        </>
    )
}