import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Camp from "../Models/Camp";
import Coach from "../Models/Coach";
import Academy from "../Models/Academy";
import Tokens from "../Models/Tokens";
import Product from "../Models/Product";
import Parent from "../Models/Parent";
import CoachBooked from "../Models/coachBooked";
import bcrypt from "bcryptjs";
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// import store from "../data/items.json";
const AWS = require('aws-sdk');
config();

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2"
};
const ses = new AWS.SES(SES_CONFIG);
const senderEmail = 'jameshocking542@gmail.com'; // Replace with your sender email address

import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: "*" //this will be the site name so that only it can access the API
}));

const db = mongoose.connect(process.env.MONGO_URL!).then(()=>{
    app.listen(3000);
});

interface UserData {
    username: string;
    password: string;
}

declare namespace Express {
    interface Request {
    user?: UserData; // Assuming you have an interface named UserData for your user data
    }
}

const SECRET_KEY = 'your-secret-key';

// Simulate user data
const users: Record<string, UserData> = {
  manager: { username: 'Tom Oleary', password: 'Bombers30!' },
};

app.post('/login', (req:Request, res:Response) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace with actual logic)
  const user = users[username];
  if (user && user.password === password) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

// Middleware to check for authentication
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
    const user = users[decoded.username];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'You have manager access' });
});



type hashedTokensType = {
    singleTokens: Array<string>;
    groupTokens: Array<string>
}

type details = {
    childName: string,
    childAge: string,
    childComments: string,
    childClub: string,
    purchaseName: string
}

interface Item {
    id: number;
    quantity: number;
    details?: details
}

function generateRandomToken(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
}

async function generateHashedTokens() {
    const hashedTokens:Array<string> = [];
    const nonhashedTokens:Array<string> = [];
  
    for (let i = 0; i < 5; i++) {
      const token = generateRandomToken(8);
      nonhashedTokens.push(token);
      const hashedToken = bcrypt.hashSync(token, 10); // Use your desired salt rounds
      hashedTokens.push(hashedToken);
    }
  
    return [hashedTokens, nonhashedTokens];
  }


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_42762b3164b7a9048eeca1a3577cc35181d4da78a77b9a95f0d2b23496c2c561";
app.post('/webhook', express.raw({ type: 'application/json' }), async (request: Request, response: Response) => {
    const sig = request.headers['stripe-signature'];
    try {
      const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Webhook verified.");
  
      const data = event.data.object;
      const eventType = event.type;


 
      // Handle the event
      if (eventType === "payment_intent.succeeded") {

        const customerId = data.customer;
        const customer = await stripe.customers.retrieve(customerId);
  

        const { metadata, receipt_email } = data;
        const cartItems = metadata.cartItems;
        const JSONStuff = JSON.parse(cartItems);

        let email = receipt_email;

        //update database
        const kidsChecked: Array<String> = [];
        const agesChecked: Array<String> = [];
        const detailsChecked: Array<String> = [];
        const clubChecked: Array<String> = [];
        const events: Array<String> = []

        JSONStuff.forEach(async (val:Item) => {
            console.log(val);
            if (val.details != null){ //there is a child
                const kidName: String = val.details?.childName;
                console.log(kidName);
                if (!kidsChecked.includes(kidName)){
                    kidsChecked.push(kidName);
                    agesChecked.push(val.details?.childAge);
                    detailsChecked.push(val.details?.childComments);
                    clubChecked.push(val.details?.childClub);
                    events.push(val.details?.purchaseName[0]);
                }
            }
     
            if (val.id == 11){ //holiday camp
                const filter =  { name: val.details?.purchaseName[0] };
                const update = { $push: {kids: val.details }};
                try {
                    const updatedCamp = await Camp.findOneAndUpdate(filter, update, { new:true, runValidators:true});
                  } catch (error) {
                    console.error("Error updating camp:", error);
                }
            } else if (val.id == 12) { //1 academy
                const nameToChange = val.details?.purchaseName[0];
                const dateToChange = val.details?.purchaseName[1];
                const filter =  { name: nameToChange,  [`dates.${dateToChange}`]: { $exists: true } };
                const update = { $push: {[`dates.${dateToChange}`]: val.details }};
                try{
                    const updatedAcademy = await Academy.findOneAndUpdate(filter, update, { new:true, runValidators:true})
                } catch (error) {
                    console.error("Error updating Academy:", error);
                }
            } else if (val.id == 13) { //4 academy
                const nameToChange = val.details?.purchaseName[0];
                const datesToChange = val.details?.purchaseName[1].split(" ");
                datesToChange?.forEach(async (date) => {
                    const filter =  { name: nameToChange,  [`dates.${date}`]: { $exists: true } };
                    const update = { $push: {[`dates.${date}`]: val.details }};
                    try{
                        const updatedAcademy = await Academy.findOneAndUpdate(filter, update, { new:true, runValidators:true})
                    } catch (error) {
                        console.error("Error updating Academy:", error);
                    }
                })
            } else if (val.id >= 3 && val.id <= 8) { //private session
                const coachName = val.details?.purchaseName[0];
                const dateDel = val.details?.purchaseName[1];
                const timeDel = val.details?.purchaseName[2];
 
                const filter = { name: coachName, dates: dateDel };
                const update = { $pull: { dates: dateDel, times: timeDel }};
                try{
                    const updatedCoach = await Coach.findOneAndUpdate(filter, update, { new:true, runValidators:true})
                } catch (error) {
                    console.error("Error updating Coach:", error);
                }
            } else if (val.id == 9 || val.id == 10){ //buying plans
                //create 5 tokens
                let generatedTokens = await generateHashedTokens();
                const newTokens = generatedTokens[1];
                const hashedTokens = generatedTokens[0];
                //add them onto corresponding database
                const typeOfToken = (val.id == 9) ? "singleTokens":"groupTokens";
                let filter = { };
                hashedTokens.forEach(async (token) => {
                    let update = { $push: { [typeOfToken]: token } };
                    const updatedToken = await Tokens.findOneAndUpdate(filter, update, { new:true, runValidators:true});
                })  
                //add them to email details.   
                const tokenString = newTokens.join(", ");
                const subject = (val.id == 9) ? "AFLKIDS 5x 1 on 1 Session Tokens":"AFLKIDS 5x Group Session Tokens";
                const params = {
                    Destination: {
                        ToAddresses: ["jameshocking542@gmail.com"]
                    },
                    Message: {
                        Body: {
                            Html: { Data: `Thanks for purchasing! <br /><br />Use these five codes at any point in the next 6 months by inputting when you are booking a session. Keep them and cross off each one as you use it. <br />They are <br /><br />${tokenString}<br /><br /> Thanks, <br />AFLKIDS` }
                        },
                        Subject: { Data: subject }
                    },
                    Source: senderEmail
                };
            
                try {
                    const result = await ses.sendEmail(params).promise();
                    console.log(`Email sent to ${email}. Message ID: ${result.MessageId}`);
                } catch (error) {
                    console.error(`Error sending email to ${email}:`, error);
                }
                
            } else if (val.id == 14 || val.id == 15){ //using tokens
                //ir3ffJN3
                //remove tokens from backend
                const token = val.details?.purchaseName[3];
                console.log(token);
                const typeOfToken = (val.id == 14) ? "singleTokens":"groupTokens";
                
                let filter = {};

                const allHashedTokens:Array<hashedTokensType> = await Tokens.find();
                const ActualTokens:hashedTokensType = allHashedTokens[0];
                let searching = [""];
        
                if (val.id == 14){
                    searching = ActualTokens.singleTokens;
                } else {
                    searching = ActualTokens.groupTokens;
                }
                
                let index = 0;
                for (let i = 0; i < searching.length; i++){
                    let isMatch = await bcrypt.compareSync(token?token:"", searching[i]);
                    if (isMatch){
                        index = i;
                    }     
                }

                const update = { $pull: { [typeOfToken]: searching[index] } };
                const updatedToken = await Tokens.findOneAndUpdate(filter, update, { new:true, runValidators:true});

                // //handle like a normal private session
                // const coachName = val.details?.purchaseName[0];
                // const dateDel = val.details?.purchaseName[1];
                // const timeDel = val.details?.purchaseName[2];
 
                // filter = { name: coachName, dates: dateDel };
                // update = { $pull: { dates: dateDel, times: timeDel }};
                // try{
                //     const updatedCoach = await Coach.findOneAndUpdate(filter, update, { new:true, runValidators:true})
                // } catch (error) {
                //     console.error("Error updating Coach:", error);
                // }
            }
        });
       //search for parent name
       const existingParent = await Parent.findOne({ name: customer.name });
       if (!existingParent){
           const addingParent = await Parent.create({ 
            parentname: customer.name, 
            email: customer.email, 
            phone: "0433833966",
            childNames: kidsChecked,
            childAge: agesChecked,
            childComments: detailsChecked,
            childEvents: events,
            childClubs: clubChecked
         });
       } else {
            console.log("parent already exists")
       }

        const theyBoughtPromises = JSONStuff.map(async (val: Item) => {
            let item = await Product.findOne({ id: val.id });
            let details = JSON.stringify(val.details);
            return `${item?.name} : ${details}`;
        });
        
        const theyBoughtArray = await Promise.all(theyBoughtPromises);
        const theyBought = theyBoughtArray.join(",<br /><br />");
  
        const params = {
          Destination: {
              ToAddresses: ["jameshocking542@gmail.com"]
          },
          Message: {
              Body: {
                  Html: { Data: `${email} just purchased <br /><br />${theyBought}<br /><br />Good stuff.` }
              },
              Subject: { Data: "AFLKIDS PURCHASE!" }
          },
          Source: senderEmail
        };
    
        try {
            const result = await ses.sendEmail(params).promise();
            console.log(`Email sent to ${email}. Message ID: ${result.MessageId}`);
        } catch (error) {
            console.error(`Error sending email to ${email}:`, error);
        }
      
      }
    
  
      // Return a 200 response to acknowledge receipt of the event
      response.status(200).send('Received').end();
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
      } else {
        // Handle other types of errors or non-Error objects
        console.error('Unexpected error occurred:', err);
        response.status(500).send('Unexpected error occurred.');
      }
    }
  });

app.use(express.json());

// GET REQUESTS //
app.get("/camps", async (req: Request, res: Response) => {
    //TODO: fetch all camps and send to user
    const camps = await Camp.find();
    res.json(camps);
})

app.get("/PrivateTimes", async (req: Request, res: Response) => {
    const coaches = await Coach.find();
    res.json(coaches);
})

app.get("/academy", async (req: Request, res: Response) => {
    //TODO: fetch all camps and send to user
    const academy = await Academy.find();
    res.json(academy);
})


// POST REQUESTS //
app.post("/PrivateTimes", async (req: Request, res: Response) => {
    const newCoach = new Coach({
        name: "Kale Gablia",
        dates: ["11/8/23", "15/8/23", "17/8/23", "22/8/23", "24/8/23", "25/8/23", "25/8/23"],
        times: ["7:00am", "7:00am", "7:00am", "7:00am", "7:00am", "7:00am", "9:00am"],
        location: "North Shore"
    });
    const createdCoach = await newCoach.save();
    res.json(createdCoach);
})

app.post("/product", async (req: Request, res: Response) => {
    const newProduct = new Product({
        id: 15,
        name: "Group Private (Plan)"
    });
    const createdProduct = await newProduct.save();
    res.json(createdProduct);
})

app.post("/camps", async (req: Request, res: Response) => {
    const newCamp = new Camp({
        name: "North Shore Holiday Camp",
        ages: "Ages 5-13",
        date: "5th and 6th of October",
        times: "9am-3pm",
        Price: 150.00,
        Location: "Gore Hill Oval",
        address: "St Leonards, 2065",
        locPic: "/assets/gore.png",
        kids: [],
    });
    const createdCamp = await newCamp.save();
    res.json(createdCamp);
});

app.post("/checkTokens", async (req: Request, res: Response) => {
    try {
        const userProvidedToken = req.body.token
        const id = req.body.id;
    
        // Find all documents in the collection and get an array of hashed tokens
        const allHashedTokens:Array<hashedTokensType> = await Tokens.find();
        const ActualTokens:hashedTokensType = allHashedTokens[0];
        let searching = [""];

        if (id == 3){
            searching = ActualTokens.singleTokens;
        } else {
            searching = ActualTokens.groupTokens;
        }
        
        let matchFound = false;
        for (let i = 0; i < searching.length; i++){
            let isMatch = await bcrypt.compareSync(userProvidedToken, searching[i]);
            if (isMatch){
                matchFound = true;
            }     
        }
        
        if (matchFound) {
          return res.json({ message: 'Token is valid.' });
        } else {
            return res.status(401).json({ error: 'Invalid token.' });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
})

app.post("/academy", async (req: Request, res: Response) => {
    const newAcademy = new Academy({
        name: "St Ives Preparation",
        time: "Monday 9:00am",
        start: "29/7/23",
        Location: "Accron Oval",
        dates: {
            "29/7/23": [],
            "5/8/23": [],
            "12/8/23": [],
            "19/8/23": []
        }
    })
    const createdAcad = await newAcademy.save();
    res.json(createdAcad);
})


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 3499, name:"Hoodie" }],
    [2, { priceInCents: 2499, name: "Training Shirt"}],
    [3, { priceInCents: 8000, name: "1 on 1 Private"}],
    [4, { priceInCents: 11000, name: "2 on 1 Private"}],
    [5, { priceInCents: 14000, name: "3 on 1 Private"}],
    [6, { priceInCents: 17000, name: "4 on 1 Private"}],
    [7, { priceInCents: 20000, name: "5 on 1 Private"}],
    [8, { priceInCents: 23000, name: "6 on 1 Private"}],
    [9, { priceInCents: 37500, name: "1 on 1 Private Plan"}],
    [10, { priceInCents: 50000, name: "Group Private Plan"}],
    [11, { priceInCents: 15000, name: "Holiday Camp"}],
    [12, { priceInCents: 4000, name: "1 Academy Prep Session"}],
    [13, { priceInCents: 13000, name: "4 Academy Prep Sessions"}],
    [14, { priceInCents: 50, name: "1 on 1 Private (Plan)"}],
    [15, { priceInCents: 50, name: "Group Private (Plan)"}],
    [16, { priceInCents: 10000, name: "Holiday Camp (1 day)"}]

])


app.post('/create-checkout-session', async (req: Request, res: Response) => {
    try {
        const customerName = req.body.customerName;
        const customerEmail = req.body.customerEmail;
        const customer = await stripe.customers.create({
            email: customerEmail,
            name: customerName
        });
        let items = JSON.stringify(req.body.items);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer: customer.id,
            line_items: (req.body.items as Item[]).map(item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: "aud",
                        product_data: {
                            name: storeItem?.name,
                        },
                        unit_amount: storeItem?.priceInCents
                    },
                    quantity: item.quantity
                };
            }),
            success_url: 'http://localhost:5173/success', // Replace this with your server route or function
            cancel_url: 'http://localhost:5173/',
            payment_intent_data: {
                metadata: {
                  cartItems: items
                },
              },
        });
        res.json({ url: session.url });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/session-into-cart', async (req: Request, res: Response) => {
    //put into database
    const coachName = req.body.coachName;
    const time = req.body.time;
    const date = req.body.date;
    const kidName = req.body.kidName;
    const newCoachBooked = new CoachBooked({
            coachName: coachName,
            time: time,
            date: date,
            kidName: kidName,
        })
    const createdAcad = await newCoachBooked.save();

    //remove from database
    const filter = { name: coachName, dates: date };
    const update = { $pull: { dates: date, times: time }};
    try{
        const updatedCoach = await Coach.findOneAndUpdate(filter, update, { new:true, runValidators:true})
    } catch (error) {
        console.error("Error updating Coach:", error);
    }
})

app.post('/session-outof-cart', async (req: Request, res: Response) => {
    //remove the session from the database
    const coachName = req.body.coachName;
    const time = req.body.time;
    const date = req.body.date;
    const kidName = req.body.kidName;
    let filter = { coachName: coachName, date: date };
    let update = { $pull: { date: date, time: time }};
    try{
        const updatedCoach = await CoachBooked.findOneAndUpdate(filter, update, { new:true, runValidators:true})
    } catch (error) {
        console.error("Error updating Coach:", error);
    }
    //add into coach
    let filter2 = { name: coachName, date: date };
    let update2 = { $push: { dates: date, times: time }};
    try{
        const updatedCoach = await Coach.findOneAndUpdate(filter2, update2, { new:true, runValidators:true})
    } catch (error) {
        console.error("Error updating Coach:", error);
    }
})

