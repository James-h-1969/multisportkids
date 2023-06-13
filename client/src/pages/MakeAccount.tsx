import React, { useState, useEffect } from "react";
import "./MakeAccount.css";
import bcrypt from "bcryptjs";



function MakeAccount() {
    let [firstNameInput, setFirstNameInput] = useState("");
    let [lastNameInput, setLastNameInput] = useState("");
    let [emailInput, setEmailInput] = useState("");
    let [passwordInput, setpasswordInput] = useState("");
    let [validEmail, setValidEmail] = useState(true);
    let [validPassword, setValidPassword] = useState(true);
    let [passwordMesg, setPasswordMesg] = useState("");
    let [overallValid, setOverallValid] = useState(false);


    async function handleSubmitLogin(e: React.FormEvent){
        e.preventDefault();
        const hashedPassword = bcrypt.hashSync(passwordInput, bcrypt.genSaltSync());
        await fetch("http://localhost:5000/customer", {
            method: "POST",
            body: JSON.stringify({
                firstName: firstNameInput,
                lastName: lastNameInput,
                emailAddress: emailInput,
                password: hashedPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setFirstNameInput("");
        setLastNameInput("");
        setEmailInput("");
        setpasswordInput("");
    }

    function ValidateEmail(e: React.ChangeEvent<HTMLInputElement>) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (e.target.value.match(validRegex)) {     
            setValidEmail(true);
            CheckBothValid("email")
        } else {
            setValidEmail(false);
            setOverallValid(false);  
        }
    }

    function ValidatePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      e.target.value.length;
        const uppercasePassword =   uppercaseRegExp.test(e.target.value);
        const lowercasePassword =   lowercaseRegExp.test(e.target.value);
        const digitsPassword =      digitsRegExp.test(e.target.value);
        const specialCharPassword = specialCharRegExp.test(e.target.value);
        const minLengthPassword =   minLengthRegExp.test(e.target.value);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Password is empty";
        }else if(!uppercasePassword){
                errMsg="Must include at least one uppercase";
        }else if(!lowercasePassword){
                errMsg="Must include At least one lowercase";
        }else if(!digitsPassword){
                errMsg="Must include at least one digit";
        }else if(!specialCharPassword){
                errMsg="Must include at least one special character(s)";
        }else if(!minLengthPassword){
                errMsg="Password length must be at least 8 characters";
        }else{
            errMsg="";
        }
        setPasswordMesg(errMsg);
        if (errMsg == ""){
            setValidPassword(true)
            CheckBothValid("password");
        } else {
            setValidPassword(false);
            setOverallValid(false);
        }
    }

    function CheckBothValid(input: String){
        let other = false;
        if (input == "email"){
            other = validPassword;
        } else {
            other = validEmail;
        }
        if (other == true){
            setOverallValid(true);
        } else {
            setOverallValid(false);
        }
    }

    useEffect(() => {
        if (emailInput == ""){
            setValidEmail(true);
            setOverallValid(false);
        }
        if (passwordInput == ""){
            setValidPassword(true);
            setPasswordMesg("");
            setOverallValid(false);
        }
    

      }, [emailInput]);
    
    return (
        <>
            <div className="MakeAccount">
                <div className="container">
                    <div className="make-account-title">
                        <h1><span className="Title">Join <span className="dark-blue">AFL</span>KIDS!</span></h1>
                        <a><span className="desc">Input your details to make an account</span></a>
                    </div>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="Input">
                            <label htmlFor="first-name">First Name</label>
                                <input 
                                    id='firstName'
                                    value={firstNameInput}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFirstNameInput(e.target.value);
                                    }}
                                />
                        </div>
                        <div className="Input">
                            <label htmlFor="last-name">Last Name</label>
                            <input 
                                id='lastName'
                                value={lastNameInput}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setLastNameInput(e.target.value);
                                }}
                            />
                        </div>
                        <div className="Input">
                            <label htmlFor="email-address">Email Address</label>
                            <input 
                                id='email'
                                value={emailInput}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmailInput(e.target.value);
                                    ValidateEmail(e);
                                }}
                            />
                            <div className="valid-email"><a><span>{validEmail? <> </>: <>Please provide a valid email</>}</span></a></div>
                        </div>
                        <div className="Input">
                            <label htmlFor="password">Password</label>
                            <input 
                                id='password'
                                value={passwordInput}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setpasswordInput(e.target.value);
                                    ValidatePassword(e);
                                }}
                            />
                            <div className="valid-email"><a>{passwordMesg}</a></div>
                        </div>
                        
                        <button className={!overallValid ? 'disabled' : ''} disabled={!overallValid}>Create account</button>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default MakeAccount;