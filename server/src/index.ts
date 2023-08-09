import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Camp from "../Models/Camp";
import Coach from "../Models/Coach";
import Academy from "../Models/Academy";
import Tokens from "../Models/Tokens";
import bcrypt from "bcrypt";
config();

import express, { Request, Response } from "express";

const app = express();


app.use(cors({
    origin: "*" //this will be the site name so that only it can access the API
}));

const db = mongoose.connect(process.env.MONGO_URL!).then(()=>{
    app.listen(3000);
});

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
  
    for (let i = 0; i < 5; i++) {
      const token = generateRandomToken(8);
      const hashedToken = await bcrypt.hash(token, 10); // Use your desired salt rounds
      hashedTokens.push(hashedToken);
    }
  
    return hashedTokens;
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
        // const metadata = event.data.object.metadata;
        // const cartItems = JSON.parse(metadata.cartItems); // Convert the JSON string back to an array
        const { metadata } = event.data.object;
        const cartItems = metadata.cartItems;
        const JSONStuff = JSON.parse(cartItems);
        

        //update database
        JSONStuff.forEach(async (val:Item) => {
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
            } else if (val.id == 9 || val.id == 10){
                //create 5 tokens
                const newTokens = await generateHashedTokens();
                //add them onto corresponding database
                const typeOfToken = (val.id == 9) ? "singleTokens":"groupTokens";
                let filter = { };
                newTokens.forEach(async (token) => {
                    let update = { $push: { [typeOfToken]: token } };
                    const updatedToken = await Tokens.findOneAndUpdate(filter, update, { new:true, runValidators:true});
                })
                
            }
            

        });
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
        name: "Goat Worker",
        dates: ["10/8/23", "25/8/23"],
        times: ["1:00pm", "9:00am"],
        location: "North Shore"
    });
    const createdCoach = await newCoach.save();
    res.json(createdCoach);
})

app.post("/camps", async (req: Request, res: Response) => {
    const newCamp = new Camp({
        name: "North Shore Holiday Camp",
        ages: "Ages 9-13",
        date: "26th and 27th of September",
        times: "9am-1pm",
        Price: 130.00,
        Location: "Weldon Oval",
        address: "Curl Curl NSW 2099",
        locPic: "/assets/weldon.png",
        kids: [],
    });
    const createdCamp = await newCamp.save();
    res.json(createdCamp);
});

type hashedTokensType = {
    singleTokens: Array<string>;
    groupTokens: Array<string>
}

app.post("/checkTokens", async (req: Request, res: Response) => {
    try {
        const userProvidedToken = req.body.token
        const id = req.body.id;
    
        // Find all documents in the collection and get an array of hashed tokens
        const allHashedTokens:Array<hashedTokensType> = await Tokens.find();
        const ActualTokens:hashedTokensType = allHashedTokens[0];
        let searching = [""];

        if (id == 3){
            searching = ActualTokens.singleTokens
        } else {
            searching = ActualTokens.groupTokens
        }
    
        // Compare the user-provided token with each hashed token in the array
        const matchFound = searching.some(async (hashedToken) => {
            return await bcrypt.compare(userProvidedToken, hashedToken);
        });
    
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
    [10, { priceInCents: 100000, name: "Group Private Plan"}],
    [11, { priceInCents: 13000, name: "Holiday Camp"}],
    [12, { priceInCents: 4000, name: "1 Academy Prep Session"}],
    [13, { priceInCents: 13000, name: "4 Academy Prep Sessions"}]
])



app.post('/create-checkout-session', async (req: Request, res: Response) => {
    try {
        let items = JSON.stringify(req.body.items);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
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