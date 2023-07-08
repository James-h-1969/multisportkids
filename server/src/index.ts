import { config } from "dotenv";
import cors from "cors";
config();

import express, { Request, Response } from "express";

const PORT = 5000;

const app = express();

app.use(cors({
    origin: "*" //this will be the site name so that only it can access the API
}));
app.use(express.json());






