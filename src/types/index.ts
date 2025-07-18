export interface Memory {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
  images: string[];
  location?: string;
  mood?: 'happy' | 'sad' | 'excited' | 'peaceful' | 'nostalgic' | 'grateful';
  category: 'life' | 'travel' | 'family' | 'friends' | 'work' | 'achievement' | 'love' | 'other';
  weather?: string;
  people?: string[];
  music?: string;
  quote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  birthDate?: Date;
  favoriteQuote?: string;
}

export interface TimelineEvent {
  year: number;
  memories: Memory[];
}

export interface Tag {
  name: string;
  count: number;
  color?: string;
}

export interface Statistics {
  totalMemories: number;
  totalImages: number;
  totalTags: number;
  memoriesByCategory: Record<string, number>;
  memoriesByMood: Record<string, number>;
  memoriesByYear: Record<number, number>;
}