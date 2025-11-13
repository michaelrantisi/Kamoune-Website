

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';


export async function POST(req) {
const data = await req.json();
const {
name, email, phone, participants,
attendedBefore, allergies, confirmParticipation, confirmCancellation, message
} = data;


if (!name || !email || !participants || !confirmParticipation || !confirmCancellation) {
return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
}


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
subject: `Nouvelle inscription atelier - ${name}`,
html: `
<h2>Nouvelle inscription à l’atelier</h2>
<p><strong>Nom:</strong> ${name}<br/>
<strong>Email:</strong> ${email}<br/>
<strong>Téléphone:</strong> ${phone}<br/>
<strong>Participants:</strong> ${participants}<br/>
<strong>Déjà participé :</strong> ${attendedBefore}<br/>
<strong>Allergies :</strong> ${allergies || 'Aucune'}<br/>
<strong>Message :</strong> ${message || '—'}</p>
`
};


const mailToCustomer = {
from: process.env.FROM_EMAIL,
to: email,
subject: 'Confirmation de votre inscription - Atelier Kamoune',
html: `
<p>Bonjour ${name},</p>
<p>Merci pour votre inscription à notre atelier de cuisine palestinienne. Vous recevrez un message de confirmation très bientôt.</p>
<p>Nous avons hâte de cuisiner avec vous !</p>
`
};


try {
await transporter.sendMail(mailToOwner);
await transporter.sendMail(mailToCustomer);
return NextResponse.json({ message: 'Workshop registration sent' });
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Email error' }, { status: 500 });
}
}

