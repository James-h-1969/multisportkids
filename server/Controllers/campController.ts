import Camp from "../Models/Camp";
import express, { NextFunction, Request, Response } from "express";

export const campController = {
    getCamps: async (req: Request, res: Response) => {
    //TODO: fetch all camps and send to user
    const camps = await Camp.find();
    res.json(camps);
    },
    
}