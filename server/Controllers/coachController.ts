import Coach from "../Models/Coach";
import { Request, Response } from "express";

export const coachController = {
    getCoaches: async (req: Request, res: Response) => {
        const coaches = await Coach.find();
        res.json(coaches);
    },
    addCoach: async (req: Request, res: Response) => {
        const {name_ } = req.body;
        const newCoach = new Coach({
            name:name_,
            sessions: [],
            imgName: ""
        });
        const createdCoach = await newCoach.save();
        res.json(createdCoach);
    },
    deleteCoach:  async (req: Request, res: Response) => {
        const {name_} = req.body;
        const waiting = await Coach.deleteOne({ name: name_ });
    },
    // addSession: async (req: Request, res: Response) => {

    // },
    // deleteSession: async (req: Request, res: Response) => {

    // },

}