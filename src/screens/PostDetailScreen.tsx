import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockPosts, currentUser } from '../data/mockData';
import { Post } from '../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const POST_ITEM_HEIGHT = screenHeight;

interface PostDetailScreenProps {
  posts?: Post[];
  initialIndex?: number;
}

export default function PostDetailScreen({ posts: propPosts, initialIndex = 0 }: PostDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id: postId } = useLocalSearchParams<{ id: string }>();

  // Use provided posts or default to all mock posts
  const allPosts = propPosts || mockPosts;
  
  // Find the starting index based on postId param
  const getInitialIndex = useCallback(() => {
    if (postId) {
      const foundIndex = allPosts.findIndex((p) => p.id === postId);
      return foundIndex >= 0 ? foundIndex : initialIndex;
    }
    return initialIndex;
  }, [postId, allPosts, initialIndex]);

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const flatListRef = useRef<FlatList<Post>>(null);

  // Scroll to initial index on mount
  useEffect(() => {
    if (currentIndex > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: currentIndex, animated: false });
      }, 100);
    }
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / POST_ITEM_HEIGHT);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < allPosts.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, allPosts.length]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: POST_ITEM_HEIGHT,
    offset: POST_ITEM_HEIGHT * index,
    index,
  }), []);

  const handleScrollToIndexFailed = useCallback((info: { index: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    }, 100);
  }, []);

  // Get current post from allPosts array
  const post = allPosts[currentIndex];

  // Render individual post item for FlatList
  const renderPostItem = ({ item }: { item: Post }) => (
    <PostItemContent post={item} />
  );

  if (!post) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={allPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={POST_ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={handleScroll}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        getItemLayout={getItemLayout}
        initialScrollIndex={currentIndex}
        scrollEventThrottle={16}
        bounces={false}
        removeClippedSubviews
        maxToRenderPerBatch={1}
        windowSize={3}
      />
    </View>
  );
}

// Separate component for post content
function PostItemContent({ post }: { post: Post }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <KeyboardAvoidingView
      style={styles.postItemContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top > 0 ? insets.top : 12 },
        ]}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#262626" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerUsername}>{post.user.username}</Text>
            {post.user.isVerified && (
              <Feather
                name="check-circle"
                size={14}
                color="#3897f0"
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <Pressable style={styles.menuButton}>
            <Feather name="more-vertical" size={24} color="#262626" />
          </Pressable>
        </View>
      </View>

      {/* User Info Row */}
      <View style={styles.userRow}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.user.username}</Text>
        {post.user.isVerified && (
          <Feather
            name="check-circle"
            size={14}
            color="#3897f0"
            style={styles.verifiedIcon}
          />
        )}
        <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
      </View>

      {/* Full-width Image */}
      <Image
        source={{ uri: post.image }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <View style={styles.leftActions}>
          <Pressable onPress={handleLike} style={styles.actionButton}>
            <Feather
              name="heart"
              size={26}
              color={isLiked ? '#ed4956' : '#262626'}
              style={isLiked ? { transform: [{ scale: 1.1 }] } : undefined}
            />
          </Pressable>
          <Pressable
            onPress={() => router.push(`/comments/${post.id}`)}
            style={styles.actionButton}
          >
            <Feather name="message-circle" size={26} color="#262626" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Feather name="send" size={26} color="#262626" />
          </Pressable>
        </View>
        <Pressable style={styles.saveButton}>
          <Feather name="bookmark" size={26} color="#262626" />
        </Pressable>
      </View>

      {/* Likes Count */}
      <View style={styles.likesContainer}>
        <Text style={styles.likesCount}>{formatCount(likesCount)} likes</Text>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionUsername}>{post.user.username}</Text>
        <Text style={styles.captionText}> {post.caption}</Text>
        <Text style={styles.captionHashtags} numberOfLines={2}>
          {' '}
          {post.caption
            .split(' ')
            .filter((word) => word.startsWith('#'))
            .join(' ')}
        </Text>
      </View>

      {/* View All Comments Link */}
      <Pressable
        style={styles.viewCommentsButton}
        onPress={() => router.push(`/comments/${post.id}`)}
      >
        {post.comments.length > 0 && (
          <Text style={styles.viewCommentsText}>
            View all {post.comments.length} comments
          </Text>
        )}
      </Pressable>

      {/* Comments Preview */}
      {post.comments.slice(0, 2).map((comment) => (
        <View key={comment.id} style={styles.commentPreview}>
          <Text style={styles.commentUsername}>{comment.user.username}</Text>
          <Text style={styles.commentText}> {comment.text}</Text>
        </View>
      ))}

      {/* Spacer */}
      <View style={styles.bottomSpacer} />

      {/* Comment Input */}
      <View
        style={[
          styles.commentInputContainer,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 },
        ]}
      >
        <View style={styles.commentInputRow}>
          <Image
            source={{ uri: currentUser.avatar }}
            style={styles.inputAvatar}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#8e8e8e"
            value={commentText}
            onChangeText={setCommentText}
          />
          <Pressable style={styles.emojiButton}>
            <Feather name="smile" size={24} color="#8e8e8e" />
          </Pressable>
          <Pressable
            style={styles.postButton}
            disabled={commentText.trim().length === 0}
          >
            <Feather
              name="send"
              size={20}
              color={commentText.trim().length > 0 ? '#0095f6' : '#b2dffc'}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postItemContainer: {
    height: POST_ITEM_HEIGHT,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  timeAgo: {
    fontSize: 14,
    color: '#8e8e8e',
    marginLeft: 8,
  },
  postImage: {
    width: screenWidth,
    height: screenWidth,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 20,
    padding: 4,
  },
  saveButton: {
    padding: 4,
  },
  likesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  likesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  captionUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  captionText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
  captionHashtags: {
    fontSize: 14,
    color: '#00376b',
    lineHeight: 20,
  },
  viewCommentsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewCommentsText: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  commentPreview: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  commentText: {
    fontSize: 14,
    color: '#262626',
  },
  bottomSpacer: {
    height: 20,
  },
  commentInputContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#efefef',
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    paddingVertical: 8,
  },
  emojiButton: {
    padding: 8,
  },
  postButton: {
    padding: 8,
  },
});