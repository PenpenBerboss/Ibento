export interface Anime {
  id: string;
  title: string;
  type: 'TV' | 'Movie' | 'OVA' | 'Special';
  episodes: number;
  watchedEpisodes: number;
  rating: number;
  season: string;
  year: number;
  image: string;
  status: 'watching' | 'completed' | 'on-hold' | 'dropped';
  genres: string[];
}

export const animeList: Anime[] = [
  {
    id: '1',
    title: 'One Piece',
    type: 'TV',
    episodes: 1000,
    watchedEpisodes: 700,
    rating: 8.9,
    season: 'Fall',
    year: 1999,
    image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p186423_b_v8_ae.jpg',
    status: 'watching',
    genres: ['Action', 'Adventure', 'Comedy']
  },
  {
    id: '2',
    title: 'Dragon Ball Daima',
    type: 'TV',
    episodes: 20,
    watchedEpisodes: 15,
    rating: 7.7,
    season: 'Fall',
    year: 2024,
    image: 'https://media.animationdigitalnetwork.com/images/show/e529ed60-9716-4162-a419-65395c2b3ac7/affiche.width=500,height=714,quality=70',
    status: 'watching',
    genres: ['Action', 'Adventure']
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen',
    type: 'TV',
    episodes: 24,
    watchedEpisodes: 11,
    rating: 9.0,
    season: 'Fall',
    year: 2020,
    image: 'https://m.media-amazon.com/images/M/MV5BNmI1MmYxNWQtY2E5NC00ZTlmLWIzZGEtNzM1YmE3NDA5NzhjXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg',
    status: 'watching',
    genres: ['Action', 'Supernatural']
  },
  {
    id: '4',
    title: 'Kimetsu no Yaiba: Hashira G...',
    type: 'TV',
    episodes: 8,
    watchedEpisodes: 8,
    rating: 9.4,
    season: 'Spring',
    year: 2024,
    image: 'https://www.nautiljon.com/images/anime/00/09/kimetsu_no_yaiba_hashira_gou_kaigi_-_chouyashiki_hen_10290.webp',
    status: 'completed',
    genres: ['Action', 'Historical']
  },
  {
    id: '5',
    title: 'Attack on Titan',
    type: 'TV',
    episodes: 25,
    watchedEpisodes: 25,
    rating: 9.2,
    season: 'Spring',
    year: 2013,
    image: 'https://snworksceo.imgix.net/ttd/dd98cc9a-86ba-4ff5-8395-3084026f7efd.sized-1000x1000.jpg?w=1000&dpr=2',
    status: 'completed',
    genres: ['Action', 'Drama']
  }
];