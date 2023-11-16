import Parent from "../Models/Parent";
import { Request, Response } from "express";

export const parentController = {
    getParents: async (req: Request, res: Response) => {
        const parents = await Parent.find();
        res.json(parents);
    }
}