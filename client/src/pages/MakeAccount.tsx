import React, { useState } from "react";
import "./MakeAccount.css";



function MakeAccount() {
    let [firstNameInput, setFirstNameInput] = useState("");
    let [lastNameInput, setLastNameInput] = useState("");
    let [emailInput, setEmailInput] = useState("");

    function handleSubmitLogin(e: React.FormEvent){
        e.preventDefault();
        //deal with the values
    }
    
    return (
        <>
            <div className="MakeAccount">
                <div className="container">
                    <div className="make-account-title">
                        <h1>Make an account</h1>
                        <a>Input your details to make an account</a>
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
                                }}
                            />
                        </div>
                        <button className='form-button'>Create account</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MakeAccount;