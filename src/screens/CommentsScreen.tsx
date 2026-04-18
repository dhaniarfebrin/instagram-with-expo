import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Comment } from '../types';
import { feedApi } from '../api';
import { currentUser, mockPosts } from '../data/mockData';
import CommentForm from '../components/CommentForm';

export default function CommentsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const post = mockPosts.find((p) => p.id === id);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await feedApi.getComments(id as string);
        setComments(data);
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [id]);

  const handleAddComment = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await feedApi.likeComment(id as string, commentId);
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
            : c
        )
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
        <Image source={{ uri: item.user.avatar }} style={[styles.avatar, isReply && styles.replyAvatar]} />
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
              <Text style={[styles.likesCount, item.isLiked && styles.likedCount]}>
                {item.likes} likes
              </Text>
            )}
            <Pressable onPress={() => handleLikeComment(item.id)} style={styles.likeButton}>
              <Feather name="heart" size={14} color={item.isLiked ? '#ed4956' : '#8e8e8e'} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  if (!post) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="#262626" />
          </Pressable>
          <Text style={styles.headerTitle}>Comments</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.postPreview}>
          <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
          <View style={styles.postTextContainer}>
            <Text style={styles.postUsername}>{post.user.username}</Text>
            <Text style={styles.postCaption}>{post.caption}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading comments...</Text>
          </View>
        ) : comments.length > 0 ? (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No comments yet.</Text>
            <Text style={styles.noCommentsSubtext}>Be the first to comment!</Text>
          </View>
        )}

        <View style={[styles.inputWrapper, { paddingBottom: Math.min(insets.bottom, 20) }]}>
          <CommentForm postId={id as string} user={currentUser} onSuccess={handleAddComment} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  headerRight: {
    width: 36,
  },
  postPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  postTextContainer: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 12,
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  postCaption: {
    fontSize: 14,
    color: '#262626',
    marginTop: 2,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  noCommentsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCommentsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  noCommentsSubtext: {
    fontSize: 14,
    color: '#8e8e8e',
    marginTop: 4,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  replyContainer: {
    marginLeft: 20,
    marginBottom: 6,
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
  inputWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
});