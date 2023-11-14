import { Button } from "react-bootstrap"
import { Kids, Child } from "../../types/kidsType"
import { useState } from "react"



export default function ShowKids({kids}:Kids){
    const [showKids, setShowKids] = useState(false)

    return(
        <>
            <Button onClick={() => setShowKids(!showKids)} style={{backgroundColor:"#46768E"}}>Show Kids</Button>
        { !showKids? <></>:<>
            {kids.map((value: Child, index) => (
                <div className="d-flex mt-3 p-1" style={{backgroundColor:"white", borderRadius:"10px"}}>
                    <div>{value.childName}</div>
                    <div style={{position:"absolute", left: "40vh"}}>{value.childAge}</div>
                    <div style={{position:"absolute", left: "50vh", paddingRight:"70vh"}}>{value.childComments}</div>
                    <div style={{position:"absolute", left: "130vh"}}>{value.childClub}</div>
                </div>
            ))}
        </>
}
        </>
    )
}