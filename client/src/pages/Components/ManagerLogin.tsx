import { Form, Button } from "react-bootstrap";
import { useState } from "react";


type ManagerLoginType = {
    update: (login: Boolean) => void
}
export default function ManagerLogin({update}:ManagerLoginType){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHidden, setPasswordHidden] = useState("");

    function handlePasswordChange(password:string) {
        setPassword(password);
        if (passwordHidden.length < password.length){
            let newString = passwordHidden + "*";
            setPasswordHidden(newString);
        } else if (passwordHidden.length > password.length){
            let newString =  passwordHidden.slice(0, -1);
            setPasswordHidden(newString);
        }
    }

    function handleSubmit(){
        //check whether valid
        update(true);
    }
    
    return(
        <div className="p-3 m-3" style={{width:"30%", backgroundColor:"grey", borderRadius:"10px"}}>
            <>Staff Login</>
            <Form className="mt-3">
                <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ width: "60%" }}>Username</Form.Label>
                    <Form.Control
                    placeholder="Enter UserName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%" }}>Password</Form.Label>
                    <Form.Control
                    placeholder="Enter Password"
                    value={passwordHidden}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>

    )
}