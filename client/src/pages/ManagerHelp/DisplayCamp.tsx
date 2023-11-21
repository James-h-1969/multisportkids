import { CampType } from "../../types/campType"
import { Child } from "../../types/kidsType";
import { Button, Form } from "react-bootstrap"
import { useState} from "react"
import ShowKids from "./ShowKids";
import { locations } from "../../types/campType";
import { ColorScheme } from "../../style";

type displayCampType = {
    val: CampType
}

export default function DisplayCamp({val}: displayCampType) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [archived, setIsArchived] = useState(val.archived);

    const [newName, setNewName] = useState("");
    const [newcampAgeRange, setnewCampAgeRange] = useState("");
    const [newcampDate, setnewCampDate] = useState("");
    const [newcampTimes, setnewCampTimes] = useState("");
    const [newcampLocation, setnewCampLocation] = useState("");

    async function updateTheCamp(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        let newAddress = "";
        let newPic = "";

        if (newcampLocation === ""){
            newAddress = val.address.valueOf();
            newPic = val.locPic;
        } else {
            newAddress = locations[newcampLocation].address;
            newPic = locations[newcampLocation].locPic;
        }

        const newCamp = {
            name_: newName || val.name,
            ages_: newcampAgeRange || val.ages,
            date_: newcampDate || val.date,
            times_: newcampTimes || val.times,
            Location_: newcampLocation || val.Location,
            address_: newAddress,
            locPic_: newPic,
            oldName: val.name
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
            body: JSON.stringify(newCamp),
          };

        fetch("https://multisportkids-backend.onrender.com/updatecamp", requestOptions);
        location.reload();

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
                parent: child1.parent,
                sports: []
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
                    parent: child2.parent,
                    sports: []
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
                    parent: child2.parent,
                    sports: []
                };
    
                kiddies.push(kid);
            }
        });
    
        return kiddies;
    };

    async function changeArchive(name: string, archived: boolean){
        const update = {name_: name, archived_:archived}
        setIsArchived(archived);
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };

        const response = await fetch("https://multisportkids-backend.onrender.com/updatecampstatus", requestOptions);
        if (response.ok){
            console.log("Successfully Update the status of the camp.")
        }
    }

    async function deleteCamp() {
        const update = {name_:val.name};
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };

        fetch("https://multisportkids-backend.onrender.com/deletecamp", requestOptions)
        location.reload();
    }


    return(
        <div className="p-3 m-3" style={{backgroundColor:"#D3D3D3", borderRadius:"15px"}}>
                    <span style={{fontWeight:"normal", fontFamily:"Rubik", fontSize:"20px"}}>{val.name}</span>
                    <div style={{ position: "relative", right: "100px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                        <div style={{ fontWeight: "bold", fontSize: "20px" }}>{val.Location}</div>
                        <div style={{ fontWeight: "bold" }}>{val.date}</div>
                        <div>{val.times}</div>
                        <div className="mb-3">{val.ages}</div>
                        <Button onClick={() => setIsUpdating(true)}style={{backgroundColor:ColorScheme.defaultColor, border:"transparent", width:"200px", marginBottom:"20px"}}>Edit</Button>
                        <Button className="bg-danger" style={{border:"transparent", width:"200px"}} onClick={() => deleteCamp()}>Delete Camp</Button>
                        { isUpdating ? <div style={{position:"absolute", width:"400px", height:"500px", backgroundColor:"grey", borderRadius:"10px", padding:"20px", zIndex:"100"}}>
            <div className="circle" onClick={() => setIsUpdating(false)}><div className="plus">x</div>
            </div>
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
            </div>:<></>}
                    </div>
                    <div className="d-flex">
                        <div className="pb-1">
                            {!archived ? <div style={{color:"green"}}>Active</div>:<div style={{color:"red"}}>Archived</div>}</div>
                        </div>
                        <div className="pb-1" style={{fontWeight:"bold"}}>
                            Kids: {getChildList(val.kidsDay1, val.kidsDay2).length}
                        </div>
                        <Button onClick={() => changeArchive(val.name, !val.archived)} style={{marginRight:"20px", backgroundColor:ColorScheme.defaultColor, border:"transparent"}}>Change Status</Button>
                        <ShowKids kids={getChildList(val.kidsDay1, val.kidsDay2)}/>
                    </div>
    )
}