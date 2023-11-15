import { CampType } from "../../types/campType"
import { Child } from "../../types/kidsType";
import { Button, Form } from "react-bootstrap"
import { useState} from "react"
import ShowKids from "./ShowKids";

type displayCampType = {
    val: CampType
}

export default function DisplayCamp({val}: displayCampType) {
    const [isUpdating, setIsUpdating] = useState(false);

    const [newName, setNewName] = useState("");
    const [newcampAgeRange, setnewCampAgeRange] = useState("");
    const [newcampDate, setnewCampDate] = useState("");
    const [newcampTimes, setnewCampTimes] = useState("");
    const [newcampLocation, setnewCampLocation] = useState("");

    function updateTheCamp(){
        
    }

    function EditCamp(){
        return(
        <div style={{position:"absolute", width:"400px", height:"500px", backgroundColor:"grey", borderRadius:"10px", padding:"20px"}}>
            <div className="circle" onClick={() => setIsUpdating(false)}><div className="plus">x</div></div>
            <Form className="mt-4" onSubmit={updateTheCamp}>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Name</Form.Label>
                    <Form.Control
                    placeholder={val.name}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Age Range</Form.Label>
                    <Form.Control
                    placeholder={val.ages.valueOf()}
                    value={newcampAgeRange}
                    onChange={(e) => setnewCampAgeRange(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Dates</Form.Label>
                    <Form.Control
                    placeholder={val.date.valueOf()}
                    value={newcampDate}
                    onChange={(e) => setnewCampDate(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Time of Day</Form.Label>
                    <Form.Control
                    placeholder={val.times.valueOf()}
                    value={newcampTimes}
                    onChange={(e) => setnewCampTimes(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Location</Form.Label>
                    <Form.Control
                    placeholder={val.Location.valueOf()}
                    value={newcampLocation}
                    onChange={(e) => setnewCampLocation(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Button type="submit">Update Camp</Button>
            </Form>
        </div>
        )
    }

    const getChildList = (children_day1: Array<Object>, children_day2: Array<Object>) => {
        const uniqueNames = new Set<string>();
        const kiddies: Child[] = [];
    
        children_day1.forEach((child1: any) => {
            const name = child1.childName || "";
            uniqueNames.add(name);
    
            const kid: Child = {
                childName: name,
                childAge: child1.childAge || "",
                childComments: child1.childComments || "",
                childClub: child1.childClub || "",
                day1: true,
                day2: false,
            };
    
            kiddies.push(kid);
        });
    
        children_day2.forEach((child2: any) => {
            const name = child2.childName || "";
    
            if (!uniqueNames.has(name)) {
                const kid: Child = {
                    childName: name,
                    childAge: child2.childAge || "",
                    childComments: child2.childComments || "",
                    childClub: child2.childClub || "",
                    day1: false,
                    day2: true,
                };
    
                kiddies.push(kid);
            } else {
                // Remove the child with the same name from day1
                const index = kiddies.findIndex((k) => k.childName === name && k.day1);
                if (index !== -1) {
                    kiddies.splice(index, 1);
                }
    
                // Add the child for day2
                const kid: Child = {
                    childName: name,
                    childAge: child2.childAge || "",
                    childComments: child2.childComments || "",
                    childClub: child2.childClub || "",
                    day1: true,
                    day2: true,
                };
    
                kiddies.push(kid);
            }
        });
    
        return kiddies;
    };

    async function changeArchive(name: string, archived: boolean){
        const update = {name_: name, archived_:archived}

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };

        const response = fetch("http://localhost:3000/updatecampstatus", requestOptions)
        console.log(response)
        location.reload();
    }


    return(
        <div className="p-3 m-3" style={{backgroundColor:"#D3D3D3", borderRadius:"15px"}}>
                    <span style={{fontWeight:"normal", fontFamily:"Rubik", fontSize:"20px"}}>{val.name}</span>
                    {/* <div className="circle" style={{backgroundColor:"red", position:"absolute", right:"3vw"}} onClick={() => deleteCamp(val.name)}><div className="plus">-</div></div> */}
                    <div style={{ position: "relative", right: "100px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                        <div style={{ fontWeight: "bold", fontSize: "20px" }}>{val.Location}</div>
                        <div style={{ fontWeight: "bold" }}>{val.date}</div>
                        <div>{val.times}</div>
                        <div className="mb-3">{val.ages}</div>
                        <Button onClick={() => setIsUpdating(true)}style={{backgroundColor:"#46768E", border:"transparent", width:"200px"}}>Edit</Button>
                        { isUpdating ? <EditCamp />:<></>}
                    </div>
                    <div className="d-flex">
                        <div className="pb-1">
                            {!val.archived ? <div style={{color:"green"}}>Active</div>:<div style={{color:"red"}}>Archived</div>}</div>
                        </div>
                        <div className="pb-1" style={{fontWeight:"bold"}}>
                            Kids: {getChildList(val.kidsDay1, val.kidsDay2).length}
                        </div>
                        <Button onClick={() => changeArchive(val.name, !val.archived)} style={{marginRight:"20px", backgroundColor:"#46768E", border:"transparent"}}>Change Status</Button>
                        <ShowKids kids={getChildList(val.kidsDay1, val.kidsDay2)}/>
                    </div>
    )
}