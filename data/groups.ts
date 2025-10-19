export interface Group {
  id: string;
  name: string;
  nameArabic?: string;
  members: number;
  lastMessage: string;
  image: string;
  isOnline?: boolean;
}

export const groups: Group[] = [
  {
    id: '1',
    name: 'MBAYANR\'s Group',
    members: 14,
    lastMessage: '1:45 PM',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Asraa\'s Group',
    nameArabic: 'مجموعة أسراء',
    members: 302,
    lastMessage: '1:32 PM',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Darkness☆',
    members: 59,
    lastMessage: '1:31 PM',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Ruha\'s Group',
    nameArabic: 'مجموعة رها',
    members: 219,
    lastMessage: '1:05 PM',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
  },
  {
    id: '5',
    name: '<<**ANIME_RA...',
    members: 26,
    lastMessage: '12:35 PM',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  },
  {
    id: '6',
    name: 'WORLD_ANIME',
    members: 180,
    lastMessage: '12:25 PM',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  },
  {
    id: '7',
    name: 'Aadoan♡♡',
    members: 80,
    lastMessage: '12:25 PM',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
  {
    id: '8',
    name: '....♥....',
    nameArabic: 'مجموعة الأنمي',
    members: 132,
    lastMessage: '12:25 PM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: '9',
    name: 'Anime Lovers',
    members: 245,
    lastMessage: '11:45 AM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  }
];