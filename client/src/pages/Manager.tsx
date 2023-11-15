import { Link } from "react-router-dom";
import AddCamp from "./ManagerHelp/AddCamp";
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./manager.css"
import { CampType } from "../types/campType";
import ShowKids from "./ManagerHelp/ShowKids";
import { Child, Kids } from "../types/kidsType";

export default function Manager(){
    const [camps, setCamps] = useState<CampType[]>([]);
    const [showingAddCamp, setshowingAddCamp] = useState(false);

    useEffect(() => {
        async function fetchCamps() {
          const response = await fetch(`http://localhost:3000/camps`);
          const newCamps = await response.json();
          setCamps(newCamps);
        }
        fetchCamps();
      }, [])


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

    async function deleteCamp(name:string) {
        const update = {name_:name};
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

    return(
        <>
        <span className="text-center ps-5 me-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Welcome, Tom O'leary</span>
        <Link to="/">
            <Button style={{backgroundColor:"#46768E", border:"transparent"}}>Back to AFLKids</Button>
        </Link>

        <div className="ps-5 pt-3">
            <div className="d-flex justify-content-start">
                <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Camps</h1></div>
                <div className="circle" onClick={() => setshowingAddCamp(true)}><div className="plus">+</div></div>
            </div>
            {showingAddCamp ? <AddCamp setShowingAddCamp={setshowingAddCamp}/>: <></>}
            <div> 
                {camps.reverse().map((value, index) => (
                <div className="p-3 m-3" style={{backgroundColor:"#D3D3D3", borderRadius:"15px"}}>
                    <span style={{fontWeight:"normal", fontFamily:"Rubik", fontSize:"20px"}}>{value.name}</span>
                    {/* <div className="circle" style={{backgroundColor:"red", position:"absolute", right:"3vw"}} onClick={() => deleteCamp(value.name)}><div className="plus">-</div></div> */}
                    <div style={{ position: "relative", right: "100px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                        <div style={{ fontWeight: "bold", fontSize: "20px" }}>{value.Location}</div>
                        <div style={{ fontWeight: "bold" }}>{value.date}</div>
                        <div>{value.times}</div>
                        <div>{value.ages}</div>
                    </div>
                    <div className="d-flex">
                        <div className="pb-1">
                            {!value.archived ? <div style={{color:"green"}}>Active</div>:<div style={{color:"red"}}>Archived</div>}</div>
                        </div>
                        <div className="pb-1" style={{fontWeight:"bold"}}>
                            Kids: {getChildList(value.kidsDay1, value.kidsDay2).length}
                        </div>
                        <Button onClick={() => changeArchive(value.name, !value.archived)} style={{marginRight:"20px", backgroundColor:"#46768E", border:"transparent"}}>Change Status</Button>
                        <ShowKids kids={getChildList(value.kidsDay1, value.kidsDay2)}/>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </div>
        </>
    )
}