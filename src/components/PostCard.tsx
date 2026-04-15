import { useState } from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Post } from '../types';
import { feedApi } from '../api';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = async () => {
    try {
      await feedApi.likePost(post.id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const openComments = () => {
    router.push(`/comments/${post.id}`);
  };

  const formatLikes = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours >= 24) return `${Math.floor(hours / 24)}d`;
    if (hours > 0) return `${hours}h`;
    return `${Math.floor(diff / (1000 * 60))}m`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>{post.user.username}</Text>
            {post.user.isVerified && (
              <Feather name="check-circle" size={14} color="#3897f0" style={styles.verified} />
            )}
          </View>
          <Text style={styles.time}>{formatTime(post.createdAt)}</Text>
        </View>
        <Pressable>
          <Feather name="more-horizontal" size={24} color="#262626" />
        </Pressable>
      </View>

      <Pressable onPress={handleLike}>
        <Image source={{ uri: post.image }} style={styles.image} contentFit="cover" />
      </Pressable>

      <View style={styles.actions}>
        <View style={styles.actionButtons}>
          <Pressable onPress={handleLike} style={styles.actionButton}>
            <Feather
              name="heart"
              size={26}
              color={isLiked ? '#ed4956' : '#262626'}
              style={isLiked ? { transform: [{ scale: 1.1 }] } : undefined}
            />
          </Pressable>
          <Pressable onPress={openComments} style={styles.actionButton}>
            <Feather name="message-circle" size={26} color="#262626" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Feather name="send" size={26} color="#262626" />
          </Pressable>
        </View>
        <Pressable>
          <Feather name="bookmark" size={26} color="#262626" />
        </Pressable>
      </View>

      <View style={styles.likes}>
        <Text style={styles.likesText}>{formatLikes(likesCount)} likes</Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.captionUsername}>{post.user.username}</Text>
        <Text style={styles.captionText}>{post.caption}</Text>
      </View>

      {post.comments.length > 0 && (
        <Pressable onPress={openComments} style={styles.viewComments}>
          <Text style={styles.viewCommentsText}>
            View all {post.comments.length} comments
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  verified: {
    marginLeft: 4,
  },
  time: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  likes: {
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  likesText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  caption: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  captionUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
    marginRight: 6,
  },
  captionText: {
    fontSize: 14,
    color: '#262626',
    flex: 1,
  },
  viewComments: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  viewCommentsText: {
    fontSize: 14,
    color: '#8e8e8e',
  },
});