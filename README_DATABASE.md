# Modèle de Données - Ibento

Ce document détaille la structure de la base de données Firestore proposée pour l'application Ibento, couvrant le MVP et les fonctionnalités avancées.

## 1. Collection : `users`
Stocke les profils utilisateurs et leurs statistiques de progression.

```typescript
{
  id: string; // UID Firebase Auth
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  avatar: string; // URL Firebase Storage
  level: number; // ex: 32
  experience: number; // ex: 64376
  createdAt: timestamp;
  preferences: {
    categories: string[]; // ['manga', 'cinema']
    notifications: boolean;
  }
}
```

## 2. Collection : `events`
Gestion des événements (Otaku, Festivals, Salons).

```typescript
{
  id: string;
  name: string;
  description: string;
  date: timestamp;
  location: string;
  coordinates: geopoint; // Pour la recherche de proximité
  price: number;
  currency: string; // 'FCFA'
  imageUrl: string;
  category: "otaku" | "cinema" | "festival" | "salon" | "divertissement";
  organizerId: string; // Réf vers users.id
  membersCount: number;
  createdAt: timestamp;
}
```

## 3. Collection : `communities`
Groupes de discussion thématiques.

```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;
  coverUrl: string;
  membersCount: number;
  creatorId: string;
  createdAt: timestamp;
  
  // Sous-collection : posts
  posts: {
    id: string;
    authorId: string;
    content: string;
    mediaUrl?: string;
    likesCount: number;
    createdAt: timestamp;
    
    // Sous-collection : comments
    comments: {
      id: string;
      authorId: string;
      content: string;
      createdAt: timestamp;
    }
  }
}
```

## 4. Collection : `chats`
Messagerie privée et de groupe.

```typescript
{
  id: string;
  type: "private" | "group";
  participants: string[]; // Array de users.id
  lastMessage: {
    text: string;
    senderId: string;
    timestamp: timestamp;
  };
  
  // Sous-collection : messages
  messages: {
    id: string;
    senderId: string;
    text: string;
    mediaUrl?: string;
    readBy: string[]; // users.id ayant lu le message
    createdAt: timestamp;
  }
}
```

## 5. Collection : `ads` (Contenu Sponsorisé)
Gestion du carrousel de vidéos/images publicitaires.

```typescript
{
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string; // URL Cloud Storage
  targetUrl?: string; // Lien vers un événement ou site externe
  active: boolean;
  priority: number;
  expiresAt: timestamp;
}
```

## 6. Collection : `user_lists` (Ma Liste)
Suivi des animes/mangas par utilisateur.

```typescript
{
  id: string; // userId + animeId
  userId: string;
  contentId: string; // ID de l'anime/manga
  status: "watching" | "completed" | "on-hold" | "dropped";
  score: number;
  progress: number; // Épisodes vus
  updatedAt: timestamp;
}
```