import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabType = 'posts' | 'reels' | 'tags';

interface ProfileTabsProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ProfileTabs({ selectedTab, onTabChange }: ProfileTabsProps) {
  const renderTabIcon = (tab: TabType) => {
    switch (tab) {
      case 'posts':
        return selectedTab === 'posts' ? (
          <Ionicons name="grid" size={24} color="#262626" />
        ) : (
          <Ionicons name="grid-outline" size={24} color="#8e8e8e" />
        );
      case 'reels':
        return selectedTab === 'reels' ? (
          <Ionicons
            name="play"
            size={24}
            color="#262626"
            style={styles.reelIcon}
          />
        ) : (
          <Ionicons
            name="play-outline"
            size={24}
            color="#8e8e8e"
            style={styles.reelIcon}
          />
        );
      case 'tags':
        return selectedTab === 'tags' ? (
          <Ionicons name="person" size={24} color="#262626" />
        ) : (
          <Ionicons name="person-outline" size={24} color="#8e8e8e" />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, selectedTab === 'posts' && styles.tabActive]}
        onPress={() => onTabChange('posts')}
      >
        {renderTabIcon('posts')}
      </Pressable>
      <Pressable
        style={[styles.tab, selectedTab === 'reels' && styles.tabActive]}
        onPress={() => onTabChange('reels')}
      >
        {renderTabIcon('reels')}
      </Pressable>
      <Pressable
        style={[styles.tab, selectedTab === 'tags' && styles.tabActive]}
        onPress={() => onTabChange('tags')}
      >
        {renderTabIcon('tags')}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  reelIcon: {
    transform: [{ rotate: '90deg' }],
  },
});
