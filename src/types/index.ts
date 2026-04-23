export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

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

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  createdAt: string;
  isLiked: boolean;
  parentId?: string; // For identifying replies
  replies?: Comment[];
}