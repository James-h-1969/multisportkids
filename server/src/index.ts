import { config } from "dotenv";
import cors from "cors";
config();

import express, { Request, Response } from "express";

import mongoose from "mongoose";

import CustomerModel from "./models/Customer";

const PORT = 5000;

const app = express();

app.use(cors({
    origin: "*" //this will be the site name so that only it can access the API
}));
app.use(express.json());


app.post("/customer", async (req: Request, res: Response) => {
    const newCustomer = new CustomerModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    });
    const createdCustomer = await newCustomer.save();
    res.json(createdCustomer);

});

mongoose.connect(
    process.env.MONGO_URL!
).then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
});



