import axios from 'axios';
import { Post, Comment } from '../types';
import { mockPosts, currentUser } from '../data/mockData';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const feedApi = {
  getPosts: async (): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPosts;
  },

  likePost: async (postId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    }
  },

  getComments: async (postId: string): Promise<Comment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const post = mockPosts.find((p) => p.id === postId);
    return post?.comments || [];
  },

  postComment: async (postId: string, text: string): Promise<Comment> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const post = mockPosts.find((p) => p.id === postId);
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
    };
    if (post) {
      post.comments.unshift(newComment);
    }
    return newComment;
  },

  likeComment: async (postId: string, commentId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const post = mockPosts.find((p) => p.id === postId);
    const comment = post?.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
    }
  },
};

export default api;