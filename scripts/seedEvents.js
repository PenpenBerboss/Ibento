const admin = require('firebase-admin');
const serviceAccount = require('./ibento-b9d64-firebase-adminsdk-fbsvc-6383f3b80a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ databaseId: 'default' });

const events = [
  { name: 'JAPANIME Yaoundé 2025', imageUrl: 'https://www.agendaculturelducameroun.com/wp-content/uploads/mboaBDFestival8-1024x768.jpg', price: '5000', currency: 'FCFA', type: 'upcoming', category: 'otaku237', location: 'Palais des Congrès, Yaoundé', date: '2025-11-15', description: "Le plus grand festival d'anime et de manga au Cameroun." },
  { name: 'Festival NGONDO 2025', imageUrl: 'https://i0.wp.com/tamtamdumboa.com/wp-content/uploads/2024/12/20241204_202635.jpg?resize=800%2C450&ssl=1', price: 'Gratuit', currency: '', type: 'upcoming', category: 'festival', location: 'Wouri, Douala', date: '2025-12-05', description: "Célébration traditionnelle du peuple Sawa." },
  { name: 'FESTICAM 2025', imageUrl: 'https://monvieuxquebec.com/wp-content/uploads/sites/7/2025/04/agenda-africafest-le-festival-1.png', price: '3000', currency: 'FCFA', type: 'upcoming', category: 'cinema', location: 'Douala', date: '2025-11-25', description: "Festival international du cinéma africain." },
  { name: 'OTAKU 237 Convention', imageUrl: 'https://www.mboabd.org/wp-content/uploads/2023/05/120540593_195887668566991_3996376435866324322_n-1024x683.jpg', price: '2500', currency: 'FCFA', type: 'upcoming', category: 'otaku237', location: 'Institut Français, Yaoundé', date: '2025-10-30', description: "Rassemblement des fans d'anime au Cameroun." },
  { name: 'Salon International du Livre', imageUrl: 'https://tpos.s3.amazonaws.com/events/SLQ/25/04/09/001/slq250409001-1152x648-fr-67b75895.png', price: '1000', currency: 'FCFA', type: 'upcoming', category: 'salon', location: 'Palais des Congrès, Yaoundé', date: '2026-01-15', description: "Salon du livre avec section manga." },
  { name: 'Ecrans Noirs 2025', imageUrl: 'https://kpjevents.com/wp-content/uploads/2025/08/FB_IMG_1755024629818.jpg', price: '3500', currency: 'FCFA', type: 'upcoming', category: 'cinema', location: 'Douala et Yaoundé', date: '2025-12-15', description: "Festival de cinéma africain." },
  { name: 'Cosplay Matsuri', imageUrl: 'https://www.mboabd.org/wp-content/uploads/2023/05/120540593_195887668566991_3996376435866324322_n-1024x683.jpg', price: '2000', currency: 'FCFA', type: 'upcoming', category: 'otaku237', location: "Salle des fêtes d'Akwa, Douala", date: '2025-12-22', description: "Concours de cosplay Demon Slayer et Jujutsu Kaisen." },
  { name: 'Art X Limbe', imageUrl: 'https://c8.alamy.com/compfr/def8x4/l-afrique-cameroun-limbe-folk-art-a-vendre-contre-peinture-murale-a-limbe-wildlife-centre-def8x4.jpg', price: 'Gratuit', currency: '', type: 'upcoming', category: 'salon', location: 'Limbe', date: '2026-02-10', description: "Exposition d'art contemporain." },
  { name: 'Live Concert - Yaoundé Nights', imageUrl: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=60', price: '2000', currency: 'FCFA', type: 'upcoming', category: 'divertement', location: 'Le Bercail, Yaoundé', date: '2025-11-20', description: "Concert live avec artistes locaux." },
  { name: 'Soirée Lounge - Rooftop', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60', price: '5000', currency: 'FCFA', type: 'upcoming', category: 'divertement', location: 'Rooftop Yaoundé', date: '2025-12-01', description: "Soirée VIP avec cocktail et musique lounge." },
  { name: 'Dîner à thème - Saveurs du Monde', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp8Hio_ZGrD9WyIxbrpas5JNkHVRMcjri4P6wX0QRYREsv6pT_TCffoGp77dlx0KGdA8&usqp=CAU', price: '15000', currency: 'FCFA', type: 'upcoming', category: 'divertement', location: 'Restaurant Le Gourmet, Douala', date: '2025-11-30', description: "Dîner gastronomique avec animation musicale." },
];

async function seed() {
  console.log('🔥 Connexion à Firestore...');

  const existing = await db.collection('events').get();
  for (const d of existing.docs) {
    await db.collection('events').doc(d.id).delete();
  }
  console.log(`🗑️  ${existing.size} événements supprimés`);

  for (const event of events) {
    await db.collection('events').add(event);
  }

  console.log(`✅ ${events.length} événements insérés dans Firestore`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
