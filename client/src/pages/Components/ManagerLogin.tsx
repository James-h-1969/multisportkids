import { Form, Button } from "react-bootstrap";
import { useState } from "react";


type ManagerLoginType = {
    update: (login: boolean) => void
}
export default function ManagerLogin({update}:ManagerLoginType){
    const [incorrect, setIncorrect] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordHidden, setPasswordHidden] = useState("");

    function handlePasswordChange(passwordNew:string) {
        if (passwordHidden.length < passwordNew.length || password.length == 0){
            let newS = password + passwordNew.charAt(passwordNew.length - 1);
            let newString = passwordHidden + "*";
            setPasswordHidden(newString);
            setPassword(newS);
        } else if (passwordHidden.length > passwordNew.length){
            let newString =  passwordHidden.slice(0, -1);
            let newS =  password.slice(0, -1);
            setPasswordHidden(newString);
            setPassword(newS);
        }
    }

    const handleSubmit = (event?:React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (password == "Bombers30!"){
            console.log("The password to login to the manager account is correct.")
            update(true);
            return
        }
        update(false);
        setIncorrect(true)
    }
    
    return(
        <>
            <Form className="d-flex justify-content-center gap-5 mb-3" onSubmit={handleSubmit}>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Manager Login</Form.Label>
                    <Form.Control
                    placeholder="Enter Password"
                    value={passwordHidden}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Button type="submit" style={{fontWeight:"normal", fontFamily:"Rubik", backgroundColor:"#46768E", border:"transparent", width:"300px"}}>Login</Button>
            </Form>            
        { incorrect ?
        <div className="d-flex justify-content-center mb-5 gap-5" style={{color:"red"}}>
            Incorrect Password.
        </div>:<></>
        }
        </>

    )
}