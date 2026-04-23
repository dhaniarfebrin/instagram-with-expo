import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUser, mockPosts, mockUsers } from '../data/mockData';
import { UserProfile } from '../types';
import {
  ProfileHeader,
  ProfileBio,
  ProfileActions,
  StoryHighlights,
  ProfileTabs,
  ContentGrid,
  ProfileEmptyState,
  TabType,
} from '../components/profile';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabType>('posts');
  const { userId } = useLocalSearchParams<{ userId?: string }>();

  const [profileUser, setProfileUser] = useState<UserProfile>(currentUser);
  const isViewingSelf = !userId || userId === currentUser.id;

  useEffect(() => {
    if (userId && userId !== 'current') {
      const foundUser = mockUsers.find((u) => u.id === userId);
      if (foundUser) {
        const otherProfile: UserProfile = {
          ...foundUser,
          bio: 'Welcome to my profile! 🎨 Creating memories one post at a time.',
          postsCount: 89,
          followersCount: 2340,
          followingCount: 456,
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
          ],
        };
        setProfileUser(otherProfile);
      }
    } else {
      setProfileUser(currentUser);
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top > 0 ? insets.top : 12 },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerUsername}>{profileUser.username}</Text>
          <View style={styles.headerIcons}>
            <Pressable style={styles.headerIcon}>
              <Feather name="plus-square" size={24} color="#262626" />
            </Pressable>
            <Pressable style={styles.headerIcon}>
              <Feather name="menu" size={24} color="#262626" />
            </Pressable>
          </View>
        </View>
        <View style={styles.headerBorder} />
      </View>

      {/* Profile Content */}
      <View style={styles.profileContent}>
        {/* Profile Photo & Stats Row */}
        <ProfileHeader user={profileUser} />

        {/* Bio Section */}
        <ProfileBio user={profileUser} />

        {/* Edit Profile Button or Follow Button */}
        <ProfileActions user={profileUser} isViewingSelf={isViewingSelf} />

        {/* Story Highlights */}
        {isViewingSelf && (
          <StoryHighlights highlights={profileUser.highlights} />
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Tab Bar */}
        <ProfileTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      </View>

      {/* Content Grid */}
      {selectedTab === 'posts' && <ContentGrid posts={mockPosts} />}

      {/* Empty State for Reels/Tags */}
      {selectedTab === 'reels' && <ProfileEmptyState type="reels" />}
      {selectedTab === 'tags' && <ProfileEmptyState type="tags" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerUsername: {
    fontSize: 22,
    fontWeight: '600',
    color: '#262626',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 20,
  },
  headerBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#efefef',
  },
  profileContent: {
    paddingBottom: 0,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#efefef',
    marginTop: 20,
  },
});
