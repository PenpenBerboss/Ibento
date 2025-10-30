export interface Event {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  currency: string;
  type: string;
  category: string;
  location?: string;
  date?: string;
  description?: string;
}

export const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'manga', name: 'Manga & Anime' },
  { id: 'cinema', name: 'Cinéma' },
  { id: 'festival', name: 'Festivals' },
  { id: 'salon', name: 'Salons' },
  { id: 'otaku', name: 'OTAKU 237' }
];

export const upcomingEvents: Event[] = [
  {
    id: '1',
    name: 'JAPANIME Yaoundé 2025',
    imageUrl: 'https://www.agendaculturelducameroun.com/wp-content/uploads/mboaBDFestival8-1024x768.jpg',
    price: '5000',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'manga',
    location: 'Palais des Congrès, Yaoundé',
    date: '2025-11-15',
    description: 'Le plus grand festival d\'anime et de manga au Cameroun avec des compétitions de cosplay et des ateliers de dessin manga.'
  },
  {
    id: '2',
    name: 'Festival NGONDO 2025',
    imageUrl: 'https://i0.wp.com/tamtamdumboa.com/wp-content/uploads/2024/12/20241204_202635.jpg?resize=800%2C450&ssl=1',
    price: 'Gratuit',
    currency: '',
    type: 'upcoming',
    category: 'festival',
    location: 'Wouri, Douala',
    date: '2025-12-05',
    description: 'Célébration traditionnelle du peuple Sawa, avec des courses de pirogues et des cérémonies culturelles.'
  },
  {
    id: '3',
    name: 'FESTICAM 2025',
    imageUrl: 'https://monvieuxquebec.com/wp-content/uploads/sites/7/2025/04/agenda-africafest-le-festival-1.png',
    price: '3000',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'cinema',
    location: 'Douala',
    date: '2025-11-25',
    description: 'Festival international du cinéma avec projections de films africains et ateliers de production cinématographique.'
  },
  {
    id: '4',
    name: 'OTAKU 237 Convention',
    imageUrl: 'https://www.mboabd.org/wp-content/uploads/2023/05/120540593_195887668566991_3996376435866324322_n-1024x683.jpg',
    price: '2500',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'otaku',
    location: 'Institut Français, Yaoundé',
    date: '2025-10-30',
    description: 'Rassemblement des fans d\'anime et de culture japonaise au Cameroun avec des concours et des stands.'
  },
  {
    id: '5',
    name: 'Salon International du Livre',
    imageUrl: 'https://tpos.s3.amazonaws.com/events/SLQ/25/04/09/001/slq250409001-1152x648-fr-67b75895.png',
    price: '1000',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'salon',
    location: 'Palais des Congrès, Yaoundé',
    date: '2026-01-15',
    description: 'Salon du livre avec section dédiée aux mangas et bandes dessinées camerounaises.'
  },
  {
    id: '6',
    name: 'Ecrans Noirs 2025',
    imageUrl: 'https://kpjevents.com/wp-content/uploads/2025/08/FB_IMG_1755024629818.jpg',
    price: '3500',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'cinema',
    location: 'Douala et Yaoundé',
    date: '2025-12-15',
    description: 'Festival de cinéma mettant en avant les productions africaines et les talents émergents.'
  },
  {
    id: '7',
    name: 'Cosplay Matsuri',
    imageUrl: 'https://www.mboabd.org/wp-content/uploads/2023/05/120540593_195887668566991_3996376435866324322_n-1024x683.jpg',
    price: '2000',
    currency: 'FCFA',
    type: 'upcoming',
    category: 'manga',
    location: 'Salle des fêtes d\'Akwa, Douala',
    date: '2025-12-22',
    description: 'Concours de cosplay avec focus sur les personnages populaires de Demon Slayer et Jujutsu Kaisen.'
  },
  {
    id: '8',
    name: 'Art X Limbe',
    imageUrl: 'https://c8.alamy.com/compfr/def8x4/l-afrique-cameroun-limbe-folk-art-a-vendre-contre-peinture-murale-a-limbe-wildlife-centre-def8x4.jpg',
    price: 'Gratuit',
    currency: '',
    type: 'upcoming',
    category: 'salon',
    location: 'Limbe',
    date: '2026-02-10',
    description: 'Exposition d\'art contemporain incluant des œuvres inspirées des mangas et des comics.'
  }
];

export interface FeaturedItem {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  currency: string;
  category: string;
  type: string;
  description?: string;
}

export const featuredItems: FeaturedItem[] = [
  {
    id: '1',
    name: 'Jujutsu Kaisen - Saison 3',
    imageUrl: 'https://www.mangamag.fr/wp-content/uploads/2023/04/Jujutsu-Kaisen-saison-2-personnage-principaux-trio-1024x576.jpg',
    price: '3500',
    currency: 'FCFA',
    category: 'manga',
    type: 'featured',
    description: 'Projection en avant-première des premiers épisodes de la saison 3'
  },
  {
    id: '2',
    name: 'Festival du Film Camerounais',
    imageUrl: 'https://armellesitchoma.com/wp-content/uploads/2022/10/LFCAwards.jpeg',
    price: '5000',
    currency: 'FCFA',
    category: 'cinema',
    type: 'featured',
    description: 'Célébration du cinéma camerounais avec des projections exclusives'
  },
  {
    id: '3',
    name: 'Exposition Manga Art',
    imageUrl: 'https://bdzoom.com/wp-content/uploads/2018/02/Tezuka-expo.jpg',
    price: '2000',
    currency: 'FCFA',
    category: 'salon',
    type: 'featured',
    description: 'Exposition d\'art manga par des artistes camerounais'
  },
  {
    id: '4',
    name: 'NGONDO - Rites Sawa',
    imageUrl: 'https://z-p3-scontent.fdla2-1.fna.fbcdn.net/v/t39.30808-6/486465153_1089579653197758_7198065998480040007_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pNQFdA-APjAQ7kNvwEkwfFK&_nc_oc=Adl14GocZoQfoPh4vRedKk-kWJpyVGbQsz43CyKXbVKzcxkgv6nziE3RnYPUIUkUwjU&_nc_zt=23&_nc_ht=z-p3-scontent.fdla2-1.fna&_nc_gid=XqrsFT3fMdUuc_hCFDAEjw&oh=00_AfezVUeC4ZAidvxLD1kHVQ1wKlfZ8fsDw9VyU0iL8VmG0g&oe=6900D805',
    price: 'Gratuit',
    currency: '',
    category: 'festival',
    type: 'featured',
    description: 'Présentation des rites sacrés du peuple Sawa pendant le NGONDO'
  },
  {
    id: '5',
    name: 'One Piece Day',
    imageUrl: 'https://a.storyblok.com/f/178900/4096x2303/186447a46e/one-piece-day-2023.jpg',
    price: '1500',
    currency: 'FCFA',
    category: 'otaku',
    type: 'featured',
    description: 'Journée dédiée à l\'univers de One Piece avec cosplay et quiz'
  },
  {
    id: '6',
    name: 'Salon du Gaming',
    imageUrl: 'https://www.parismatch.be/resizer/v2/7ZXJZLHAHVEPBHC3NVBYJECXVU.jpg?auth=4a5a8a2477833d0ce69dd69a2475e8eecc0fc6ac580b169edd7933c7bebb5a76&width=1200&height=800&quality=85&focal=2835%2C1886',
    price: '3000',
    currency: 'FCFA',
    category: 'salon',
    type: 'featured',
    description: 'Tournois de jeux vidéo et démonstrations de jeux inspirés d\'anime'
  }
];
