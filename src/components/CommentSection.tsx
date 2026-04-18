import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Comment, User } from '../types';
import { feedApi } from '../api';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  postId: string;
  user: User;
}

export default function CommentSection({ postId, user }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadComments = async () => {
    try {
      const data = await feedApi.getComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await feedApi.likeComment(postId, commentId);
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                isLiked: !c.isLiked,
                likes: c.isLiked ? c.likes - 1 : c.likes + 1,
              }
            : c,
        ),
      );
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
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

  const renderComment = ({ item }: { item: Comment }) => {
    const isReply = !!item.parentId;

    return (
      <View style={[styles.commentContainer, isReply && styles.replyContainer]}>
        <Image
          source={{ uri: item.user.avatar }}
          style={[styles.avatar, isReply && styles.replyAvatar]}
        />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUsername}>{item.user.username}</Text>
            <View style={styles.chatBubble}>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
          <View style={styles.commentActions}>
            <Text style={styles.timeAgo}>{formatTime(item.createdAt)}</Text>
            {item.likes > 0 && (
              <Text
                style={[styles.likesCount, item.isLiked && styles.likedCount]}
              >
                {item.likes} likes
              </Text>
            )}
            <Pressable
              onPress={() => handleLikeComment(item.id)}
              style={styles.likeButton}
            >
              <Feather
                name="heart"
                size={14}
                color={item.isLiked ? '#ed4956' : '#8e8e8e'}
                style={
                  item.isLiked ? { transform: [{ scale: 1.1 }] } : undefined
                }
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#3897f0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CommentForm postId={postId} onSuccess={handleAddComment} user={user} />
      {comments.length > 0 ? (
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noComments}>No comments yet. Be the first!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  list: {
    marginTop: 12,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  replyContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  replyAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  commentUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
  chatBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 8,
  },
  likeButton: {
    padding: 4,
  },
  likesCount: {
    fontSize: 12,
    color: '#8e8e8e',
    marginLeft: 12,
    fontWeight: '500',
  },
  likedCount: {
    color: '#ed4956',
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  noComments: {
    textAlign: 'center',
    color: '#8e8e8e',
    marginTop: 16,
    fontSize: 14,
  },
});
