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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    status: 'completed',
    genres: ['Action', 'Drama']
  }
];