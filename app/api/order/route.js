import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';


export async function POST(req) {
const data = await req.json();
const { name, email, phone, items, paymentMethod, total } = data;


if (!name || !email || !items || !Array.isArray(items)) {
return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
}


const itemListHtml = items.map(item =>
`<li>${item.quantity} × ${item.name} — ${item.price}€</li>`
).join('');


const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT),
secure: false,
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS
}
});


const mailToOwner = {
from: process.env.FROM_EMAIL,
to: 'michaelrantisi2003@gmail.com',
subject: `Nouvelle commande de ${name}`,
html: `
<h2>Commande reçue</h2>
<p><strong>Nom:</strong> ${name}<br/>
<strong>Email:</strong> ${email}<br/>
<strong>Téléphone:</strong> ${phone}<br/>
<strong>Paiement:</strong> ${paymentMethod}</p>
<h3>Détails de la commande :</h3>
<ul>${itemListHtml}</ul>
<p><strong>Total:</strong> ${total} €</p>
`
};


const mailToCustomer = {
from: process.env.FROM_EMAIL,
to: email,
subject: 'Confirmation de votre commande - Kamoune',
html: `
<p>Bonjour ${name},</p>
<p>Merci pour votre commande chez Kamoune.</p>
<p>Résumé :</p>
<ul>${itemListHtml}</ul>
<p>Total : ${total} €</p>
<p>${paymentMethod === 'online' ? 'Votre paiement a été reçu.' : 'Vous paierez sur place.'}</p>
<p>À bientôt !</p>
`
};


try {
await transporter.sendMail(mailToOwner);
await transporter.sendMail(mailToCustomer);
return NextResponse.json({ message: 'Order submitted' });
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Email error' }, { status: 500 });
}
}