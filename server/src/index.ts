import { config } from "dotenv";
import cors from "cors";
config();

import express, { Request, Response } from "express";

const app = express();

app.use(cors({
    origin: "*" //this will be the site name so that only it can access the API
}));
app.use(express.json());

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
    [9, { priceInCents: 26000, name: "7 on 1 Private"}],
    [10, { priceInCents: 29000, name: "8 on 1 Private"}]
])

interface Item {
    id: number;
    quantity: number;
}

app.post('/create-checkout-session', async (req: Request, res: Response) => {
    try {
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
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cancel`,
        });
        res.json({ url: session.url });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000);






