import Password from "../Models/Passwords";
import express, { NextFunction, Request, Response } from "express";
const bcrypt = require("bcryptjs");

export const managerController = {
    checkPassword: async (req: Request, res: Response) => { // function to check whether password is correct
        const {name_, input_} = req.body;
        const hashedPassword = await Password.findOne({ name: name_ });; //get the password as a hash
        const isMatch =  await bcrypt.compare(input_, hashedPassword?.passwordHashed); //compare the hashed input with the password
        if (isMatch){
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    },
    addPassword: async (req: Request, res: Response) => { // function to check whether password is correct
        const hashedPassword = await bcrypt.hash("Bombers30!", 10);
        const newPassword = await new Password({
            name: "manager",
            passwordHashed: hashedPassword,
        });
        const createdPassword = await newPassword.save();
        res.json(createdPassword);
    },
}