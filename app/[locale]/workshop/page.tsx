"use client";
import { useState } from 'react';


export default function WorkshopPage() {
const [form, setForm] = useState({
name: '', email: '', phone: '', participants: '1', attendedBefore: 'Non', allergies: '', confirmParticipation: false, confirmCancellation: false, message: ''
});


const handleSubmit = async (e) => {
e.preventDefault();
await fetch('/api/workshop', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form)
});
alert("Inscription envoyée !");
};


return (
<div className="max-w-2xl mx-auto p-6">
<h2 className="text-2xl font-bold mb-4">Inscription à l’atelier</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input type="text" required placeholder="Nom complet" className="w-full border p-2" onChange={e => setForm({ ...form, name: e.target.value })} />
<input type="email" required placeholder="Email" className="w-full border p-2" onChange={e => setForm({ ...form, email: e.target.value })} />
<input type="tel" required placeholder="Téléphone" className="w-full border p-2" onChange={e => setForm({ ...form, phone: e.target.value })} />
<select className="w-full border p-2" onChange={e => setForm({ ...form, participants: e.target.value })}>
<option>1</option><option>2</option><option>Autre</option>
</select>
<select className="w-full border p-2" onChange={e => setForm({ ...form, attendedBefore: e.target.value })}>
<option>Non</option><option>Oui</option>
</select>
<textarea placeholder="Allergies ou remarques" className="w-full border p-2" onChange={e => setForm({ ...form, allergies: e.target.value })}></textarea>
<label className="block"><input type="checkbox" required onChange={e => setForm({ ...form, confirmParticipation: e.target.checked })}/> Je confirme ma participation</label>
<label className="block"><input type="checkbox" required onChange={e => setForm({ ...form, confirmCancellation: e.target.checked })}/> Je m’engage à prévenir en cas d’annulation</label>
<textarea placeholder="Question ?" className="w-full border p-2" onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
<button type="submit" className="bg-primary text-white px-4 py-2 rounded">Envoyer</button>
</form>
</div>
);
}