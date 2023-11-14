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


    const getChildList = (children: Array<Object>) => {
        const kiddies: Child[] = children.map((kid: any) => { // Replace 'any' with the actual type of kid
            return {
                childName: kid.childName || "",
                childAge: kid.childAge || "", 
                childComments: kid.childComments || "",
                childClub: kid.childClub || "",
            };
          });
        return kiddies
    }


    return(
        <>
        <span className="text-center ps-5 me-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Welcome, Tom O'leary</span>
        <Link to="/">
            <Button style={{backgroundColor:"#46768E"}}>Back to AFLKids</Button>
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
                    <div style={{position:"absolute", left:"80vw"}}>
                        <div style={{fontWeight:"bold", fontSize:"20px"}}>{value.Location}</div>
                        <div style={{fontWeight:"bold"}}>{value.date}</div>
                        <div>{value.times}</div>
                        <div>{value.ages}</div>
                    </div>
                    <div className="d-flex">
                        <div className="pb-5">
                            {!value.archived ? <div style={{color:"green"}}>Active</div>:<div style={{color:"red"}}>Archived</div>}</div>
                        </div>
                        <Button onClick={() => changeArchive(value.name, !value.archived)} style={{marginRight:"20px", backgroundColor:"#46768E"}}>Change Status</Button>
                        <ShowKids kids={getChildList(value.kidsDay1.concat(value.kidsDay2))}/>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </div>
        <h1>Private Session</h1>
        </>
    )
}