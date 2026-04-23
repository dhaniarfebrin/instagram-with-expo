import { Post, User } from '../types';

export interface StoryHighlight {
  id: string;
  coverImage: string;
  title: string;
}

export interface UserProfile extends User {
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  highlights: StoryHighlight[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'travel_adventures',
    displayName: 'Travel Adventures',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    isVerified: true,
  },
  {
    id: '2',
    username: 'foodie_explorer',
    displayName: 'Foodie Explorer',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    isVerified: true,
  },
  {
    id: '3',
    username: 'nature_shots',
    displayName: 'Nature Shots',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc4a33e80?w=200&h=200&fit=crop',
    isVerified: false,
  },
  {
    id: '4',
    username: 'urban_explorer',
    displayName: 'Urban Explorer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    isVerified: true,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
    caption:
      'Amazing sunset view from the mountains! 🏔️ The beauty of nature never ceases to amaze me. #travel #nature #mountains',
    likes: 12453,
    createdAt: '2024-01-15T10:30:00Z',
    isLiked: false,
    comments: [
      {
        id: 'c1',
        user: mockUsers[1],
        text: 'This is absolutely stunning! 😍',
        likes: 234,
        createdAt: '2024-01-15T11:00:00Z',
        isLiked: false,
      },
      {
        id: 'c1r1',
        user: mockUsers[2],
        text: 'Right?! I want to go there too!',
        likes: 45,
        createdAt: '2024-01-15T11:15:00Z',
        isLiked: false,
        parentId: 'c1',
      },
      {
        id: 'c2',
        user: mockUsers[2],
        text: 'Where is this? I need to visit!',
        likes: 89,
        createdAt: '2024-01-15T11:30:00Z',
        isLiked: false,
      },
      {
        id: 'c3',
        user: mockUsers[3],
        text: 'The colors are incredible! Great shot 📸',
        likes: 156,
        createdAt: '2024-01-15T12:00:00Z',
        isLiked: true,
      },
    ],
  },
  {
    id: '2',
    user: mockUsers[1],
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=800&fit=crop',
    caption:
      'Homemade pizza night! 🍕 Nothing beats a fresh Margherita pizza made from scratch. Who else loves pizza?',
    likes: 8921,
    createdAt: '2024-01-14T18:00:00Z',
    isLiked: true,
    comments: [
      {
        id: 'c4',
        user: mockUsers[0],
        text: 'That looks delicious! Can you share the recipe?',
        likes: 45,
        createdAt: '2024-01-14T18:30:00Z',
        isLiked: false,
      },
      {
        id: 'c5',
        user: mockUsers[3],
        text: 'Now I want pizza! 🍕',
        likes: 123,
        createdAt: '2024-01-14T19:00:00Z',
        isLiked: false,
      },
    ],
  },
  {
    id: '3',
    user: mockUsers[2],
    image:
      'https://images.unsplash.com/photo-1518173946687-a4c036bc5c78?w=800&h=800&fit=crop',
    caption:
      'Morning walk in the forest 🌲 Nature is therapy. Take time to appreciate the little things.',
    likes: 15678,
    createdAt: '2024-01-13T07:00:00Z',
    isLiked: false,
    comments: [
      {
        id: 'c6',
        user: mockUsers[1],
        text: 'So peaceful! I love the forest 🧘‍♀️',
        likes: 289,
        createdAt: '2024-01-13T07:30:00Z',
        isLiked: true,
      },
    ],
  },
  {
    id: '4',
    user: mockUsers[3],
    image:
      'https://images.unsplash.com/photo-1480714378408-67cf0d27bc1b?w=800&h=800&fit=crop',
    caption:
      'City lights never get old 🌃 Night vibes in downtown. This city has so much life! #city #night #urban',
    likes: 22345,
    createdAt: '2024-01-12T21:00:00Z',
    isLiked: true,
    comments: [
      {
        id: 'c7',
        user: mockUsers[0],
        text: 'The lighting is perfect! What camera did you use?',
        likes: 67,
        createdAt: '2024-01-12T21:30:00Z',
        isLiked: false,
      },
      {
        id: 'c8',
        user: mockUsers[1],
        text: 'This is giving me major city vibes! 🏙️',
        likes: 234,
        createdAt: '2024-01-12T22:00:00Z',
        isLiked: false,
      },
      {
        id: 'c9',
        user: mockUsers[2],
        text: 'Love visiting cities at night',
        likes: 89,
        createdAt: '2024-01-12T22:30:00Z',
        isLiked: false,
      },
    ],
  },
];

export const currentUser: UserProfile = {
  id: 'current',
  username: 'my_profile',
  displayName: 'My Profile',
  avatar:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  isVerified: false,
  bio: 'Traveler | Foodie | Dreamer 🌍\nExploring the world one place at a time',
  postsCount: 142,
  followersCount: 12500,
  followingCount: 890,
  highlights: [
    {
      id: 'h1',
      coverImage:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      title: 'Travels',
    },
    {
      id: 'h2',
      coverImage:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
      title: 'Food',
    },
    {
      id: 'h3',
      coverImage:
        'https://images.unsplash.com/photo-1518173946687-a4c036bc5c78?w=200&h=200&fit=crop',
      title: 'Nature',
    },
    {
      id: 'h4',
      coverImage:
        'https://images.unsplash.com/photo-1480714378408-67cf0d27bc1b?w=200&h=200&fit=crop',
      title: 'City',
    },
  ],
};
