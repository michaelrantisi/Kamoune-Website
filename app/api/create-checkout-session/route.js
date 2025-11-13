import Stripe from 'stripe';
import { NextResponse } from 'next/server';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: '2022-11-15'
});


export async function POST(req) {
const { items, email } = await req.json();


try {
const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],
line_items: items.map(item => ({
price_data: {
currency: 'eur',
product_data: { name: item.name },
unit_amount: Math.round(item.price * 100)
},
quantity: item.quantity
})),
mode: 'payment',
customer_email: email,
success_url: `${req.headers.get('origin')}/order-success`,
cancel_url: `${req.headers.get('origin')}/order?canceled=true`
});


return NextResponse.json({ sessionId: session.id });
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
}
}