import express, { Request, Response } from "express";
import mongoose from "mongoose";

import CustomerModel from "./models/Customer";

const PORT = 5000;

const app = express();

app.use(express.json());

app.post("/customer", async (req: Request, res: Response) => {
    console.log(req.body);
    const newCustomer = new CustomerModel({
        firstName: "James",
        lastName: "Hocking",
        email: "jameshocking@gmail.com",
        password: "Maximoo542"
    });
    const createdCustomer = await newCustomer.save();
    res.json(createdCustomer);

});

mongoose.connect(
    "mongodb+srv://jameshocking542:RXvQzmuOv01yURjt@jameshcluster.2zkgqkh.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
});



