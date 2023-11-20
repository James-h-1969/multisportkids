const cors = require("cors");
const mongoose = require("mongoose");
import { campController } from "../Controllers/campController";
import { stripeController } from "../Controllers/stripeController";
import { managerController } from "../Controllers/managerController";
import { parentController } from "../Controllers/parentController";
const express = require("express");

//setup server
const app = express();
app.use(cors({
    origin: process.env.FRONT_URL //this will be the site name so that only it can access the API
}));

const PORT = process.env.PORT || 3000;

const dbName = "AllSportKids"

const db = mongoose.connect(process.env.MONGO_URL+ dbName!).then(()=>{ //connects the backend to the database at mongo db
    console.log(`Listening on Port: ${PORT}`);
    app.listen(PORT);
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
app.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleSuccessfulPayment);

app.use(express.json());

/////////   ROUTES!!!!  ////////

// CAMP ROUTES //
app.get("/camps", campController.getCamps);
app.post("/camps", campController.addCamp);
app.post("/updatecampstatus", campController.changeArchive)
app.post("/deletecamp", campController.deleteCamp)
app.post("/updatecamp", campController.updateCamp)

// STRIPE ROUTES //
app.post('/create-checkout-session', stripeController.createSession);

// MANAGER LOGIN ROUTE //
app.post('/managercheckpassword', managerController.checkPassword)
// app.post('/managercheckpassword', managerController.addPassword)

// PARENTS ROUTES //
app.get("/Parents", parentController.getParents)






