export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  cover: string;
  joined: boolean;
  category?: string;
  posts: Post[];
}

export const communitiesMockData: Community[] = [
  {
    id: '1',
    name: 'Fans de Mangas',
    description: 'Communauté pour tous les passionnés de mangas et d\'animés japonais au Cameroun',
    members: 1234,
    cover: 'https://cdn-s-www.ledauphine.com/images/CAAC3F1E-BA71-4878-A0C7-69099AD7392A/NW_raw/amine-17-ans-attend-avec-impatience-la-venue-d-hiroki-takahashi-chanteur-historique-de-dragon-ball-une-icone-des-fans-de-manga-photo-le-dl-audrey-morel-1731524260.jpg',
    joined: false,
    category: 'Manga',
    posts: [
      {
        id: '1',
        author: 'MangaLover237',
        authorAvatar: 'https://otakudome.com/wp-content/uploads/2015/01/Tokyo-Ghoul-Root-A-Episodio-01.jpg',
        content: 'Quelqu\'un a-t-il suivi les derniers épisodes de Jujutsu Kaisen ? Les combats sont incroyables !',
        timestamp: '2025-10-20T12:00:00Z',
        likes: 24,
        comments: [
          {
            id: '1',
            author: 'OtakuYaounde',
            content: 'Oui ! L\'animation est exceptionnelle dans cette saison !',
            timestamp: '2025-10-20T12:30:00Z'
          },
          {
            id: '2',
            author: 'MangaFan225',
            content: 'Je préfère quand même One Piece, mais c\'est vraiment bien fait.',
            timestamp: '2025-10-20T13:15:00Z'
          }
        ]
      },
      {
        id: '2',
        author: 'AnimeDiva',
        authorAvatar: 'https://i.pravatar.cc/150?img=5',
        content: 'Qui sera présent au prochain salon Otaku à Douala le mois prochain ?',
        timestamp: '2025-10-19T09:45:00Z',
        likes: 37,
        comments: [
          {
            id: '1',
            author: 'CosCamCon',
            content: 'Je serai là avec mon cosplay de Demon Slayer !',
            timestamp: '2025-10-19T10:20:00Z'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'OTAKU 237',
    description: 'Communauté officielle des fans d\'anime au Cameroun, événements et rencontres',
    members: 945,
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVVkE9WxwXE7e3mOD5Q9zQpvkwp0lRPwVlw&s',
    joined: true,
    category: 'Manga',
    posts: [
      {
        id: '1',
        author: 'OTAKUAdmin',
        authorAvatar: 'https://instagram.fdla2-1.fna.fbcdn.net/v/t51.2885-19/363323670_806000597846179_4390610118933038076_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby42NTAuYzIifQ&_nc_ht=instagram.fdla2-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QF0a44Yu19i9vINUOb1vYALCcvKx_3X9t9w_QwVi4xnBIITYyRHKTz5uCY3bkQzMk4&_nc_ohc=L2uxJpzKa8cQ7kNvwGulCmJ&_nc_gid=CRKob3UHjOh2BZDlqlpWAg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfcK5NwJo_F4dzi__dzGX8t8wcjMBKh23VZUB9Fvnt8PgQ&oe=6900DFEF&_nc_sid=8b3546',
        content: 'Annonce importante : Notre prochain événement aura lieu le 15 novembre au Palais des Congrès. Nous aurons des invités spéciaux du Japon !',
        timestamp: '2025-10-18T14:00:00Z',
        likes: 89,
        comments: [
          {
            id: '1',
            author: 'MangaFan225',
            content: 'Super nouvelle ! Est-ce qu\'il y aura des stands de merchandising ?',
            timestamp: '2025-10-18T14:10:00Z'
          },
          {
            id: '2',
            author: 'AnimeLover99',
            content: 'J\'ai hâte de voir les costumes !',
            timestamp: '2025-10-18T14:45:00Z'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Ciné-Festicam',
    description: 'Discussions et actualités autour du cinéma camerounais et du festival Festicam',
    members: 721,
    cover: 'https://turismeacatalunya.cat/wp-content/uploads/2021/06/PortadaFesticAM2021.jpg',
    joined: false,
    category: 'Cinéma',
    posts: [
      {
        id: '1',
        author: 'CinéphileCM',
        authorAvatar: 'https://ckoment.com/images/articles/thomas_ngijol.jpg',
        content: 'Les inscriptions pour soumettre votre film au Festicam 2026 sont ouvertes ! Date limite : 31 décembre 2025.',
        timestamp: '2025-10-15T10:30:00Z',
        likes: 42,
        comments: [
          {
            id: '1',
            author: 'FilmMaker237',
            content: 'Merci pour l\'info ! Est-ce qu\'il y a des catégories spécifiques cette année ?',
            timestamp: '2025-10-15T11:20:00Z'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Festival NGONDO',
    description: 'Tout sur la culture Sawa et le festival NGONDO. Partagez vos expériences et photos !',
    members: 1502,
    cover: 'https://z-p3-scontent.fdla2-1.fna.fbcdn.net/v/t39.30808-6/486465153_1089579653197758_7198065998480040007_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pNQFdA-APjAQ7kNvwEkwfFK&_nc_oc=Adl14GocZoQfoPh4vRedKk-kWJpyVGbQsz43CyKXbVKzcxkgv6nziE3RnYPUIUkUwjU&_nc_zt=23&_nc_ht=z-p3-scontent.fdla2-1.fna&_nc_gid=XqrsFT3fMdUuc_hCFDAEjw&oh=00_AfezVUeC4ZAidvxLD1kHVQ1wKlfZ8fsDw9VyU0iL8VmG0g&oe=6900D805',
    joined: false,
    category: 'Festival',
    posts: [
      {
        id: '1',
        author: 'NgondoFan',
        authorAvatar: 'https://mboasawa.com/fr/wp-content/uploads/2023/07/kaba-ngondo-miss-france2022.jpg',
        content: 'Les préparatifs du NGONDO 2025 ont commencé ! Cette année sera exceptionnelle avec plus de pirogues et de nouvelles cérémonies.',
        timestamp: '2025-10-10T09:15:00Z',
        likes: 76,
        comments: [
          {
            id: '1',
            author: 'DoualaLife',
            content: 'J\'attends ce moment toute l\'année !',
            timestamp: '2025-10-10T09:45:00Z'
          },
          {
            id: '2',
            author: 'CultureSawa',
            content: 'Est-ce que la cérémonie Jengu sera ouverte au public cette fois ?',
            timestamp: '2025-10-10T10:30:00Z'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Gamers Cameroun',
    description: 'Communauté des gamers camerounais. eSports, tournois locaux et discussions sur les derniers jeux',
    members: 834,
    cover: 'https://z-p3-scontent.fdla2-1.fna.fbcdn.net/v/t39.30808-6/484313006_1059589029531780_3366460804811771070_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZjRZNMi8xIUQ7kNvwG_IwbZ&_nc_oc=AdnfLB4i6PiOwOSzxHRsqf1AkMrGgq5XYVkegnBH3HZ5HAjYRNXm2V_2X_zPjjRNQhk&_nc_zt=23&_nc_ht=z-p3-scontent.fdla2-1.fna&_nc_gid=Brxy278QvlK3iHD1_9kzCQ&oh=00_AfdNTkwr0VXXFdg41pH3t92z20ogB63o_A0IYCWowbb4HA&oe=69015FAE',
    joined: false,
    category: 'Gaming',
    posts: [
      {
        id: '1',
        author: 'GamerYDE',
        authorAvatar: 'https://www.cameroun24.net/images/news/olivier_madiba_kiroo_games_670.jpg',
        content: 'Qui est partant pour un tournoi FIFA ce weekend à Game+ Yaoundé ?',
        timestamp: '2025-10-17T16:00:00Z',
        likes: 28,
        comments: [
          {
            id: '1',
            author: 'FIFAChamp',
            content: 'Je suis partant ! Quelles sont les modalités d\'inscription ?',
            timestamp: '2025-10-17T16:20:00Z'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Art & Création',
    description: 'Pour les artistes et créatifs camerounais. Partagez vos œuvres et discutez de vos techniques',
    members: 629,
    cover: 'https://africacoeurnews.com/wp-content/uploads/2024/04/image_0_1_compressed-136-64.jpg',
    joined: true,
    category: 'Art',
    posts: [
      {
        id: '1',
        author: 'ArtisteCM',
        authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2G5TB3OpcI7B6IDKNk9YPoGEp9vs6frTMw&s',
        content: 'Voici ma dernière création inspirée par les masques traditionnels du Nord Cameroun. Qu\'en pensez-vous ?',
        timestamp: '2025-10-16T14:30:00Z',
        likes: 53,
        comments: [
          {
            id: '1',
            author: 'ArtLover237',
            content: 'Les couleurs sont magnifiques ! Quelle technique as-tu utilisée ?',
            timestamp: '2025-10-16T14:45:00Z'
          },
          {
            id: '2',
            author: 'GalerieYDE',
            content: 'Très belle œuvre ! Serais-tu intéressé(e) par une exposition dans notre galerie le mois prochain ?',
            timestamp: '2025-10-16T15:30:00Z'
          }
        ]
      }
    ]
  }
];
