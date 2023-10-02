import Coach from "../Models/Coach";
import express, { NextFunction, Request, Response } from "express";

export const privateController = {
    getCoachTimes: async (req: Request, res: Response) => { // function to get all of the coach times available
        const coaches = await Coach.find();
        res.json(coaches);
    },
    setCoachTimes: async (req: Request, res: Response) => { // function to set the coach times
        const {name_, dates_, times_, location_} = req.body;
        const newCoach = new Coach({
            name: name_,
            dates: dates_,
            times: times_,
            location: location_,
        });
        const createdCoach = await newCoach.save();
        res.json(createdCoach);
    }
}