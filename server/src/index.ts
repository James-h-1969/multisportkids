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
    [1, { priceInCents: 2499, name:"AFLkids Training Shirt" }],
    [2, { priceInCents: 3499, name: "AFLkids Hoodie"}]
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






