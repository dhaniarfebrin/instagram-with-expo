import { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { Post } from '../types';
import { feedApi } from '../api';
import PostCard from '../components/PostCard';
import Header from '../components/Header';

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = useCallback(async () => {
    try {
      const data = await feedApi.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const renderPost = ({ item }: { item: Post }) => <PostCard post={item} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Header showLogo showRightIcons />
        <ActivityIndicator size="large" color="#3897f0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showLogo showRightIcons />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#3897f0"
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 100,
  },
});