const cors = require("cors");
const mongoose = require("mongoose");
import { campController } from "../Controllers/campController";
import { privateController } from "../Controllers/privateController";
import { stripeController } from "../Controllers/stripeController";
import {tokenController} from "../util/randomToken";
import { managerController } from "../Controllers/managerController";
const express = require("express");

//setup server
const app = express();
app.use(cors({
    origin: process.env.FRONT_URL //this will be the site name so that only it can access the API
}));

const PORT = process.env.PORT || 3000;

const db = mongoose.connect(process.env.MONGO_URL!).then(()=>{ //connects the backend to the database at mongo db
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

// PRIVATE ROUTES //
app.get("/PrivateTimes", privateController.getCoachTimes);
app.post("/PrivateTimes", privateController.setCoachTimes);

// TOKEN ROUTES //
app.post("/checkTokens", tokenController.checkToken);

// STRIPE ROUTES //
app.post('/create-checkout-session', stripeController.createSession);

// MANAGER LOGIN ROUTE //
app.post('/managercheckpassword', managerController.checkPassword)
// app.post('/managercheckpassword', managerController.addPassword)





