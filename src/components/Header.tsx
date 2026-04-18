import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showSearchBar?: boolean;
  showRightIcons?: boolean;
  showProfilePic?: boolean;
  username?: string;
  onSearchChange?: (text: string) => void;
  searchValue?: string;
}

export default function Header({
  title,
  showLogo = false,
  showSearchBar = false,
  showRightIcons = false,
  showProfilePic = false,
  username = 'user',
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top > 0 ? insets.top : 12 }]}>
      <View style={styles.content}>
        {/* Left Section - Logo or Title */}
        <View style={styles.leftSection}>
          {showLogo ? (
            <Text style={styles.logoText}>Instagram</Text>
          ) : title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : null}
        </View>

        {/* Center Section - Search Bar */}
        {showSearchBar && (
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#8e8e8e" style={styles.searchIcon} />
            <View style={styles.searchInput}>
              <Text style={styles.searchPlaceholder}>Search</Text>
            </View>
          </View>
        )}

        {/* Right Section - Icons or Profile Pic */}
        <View style={styles.rightSection}>
          {showRightIcons && (
            <>
              <Pressable style={styles.iconButton} onPress={() => router.push('/messages')}>
                <Feather name="send" size={26} color="#262626" />
              </Pressable>
              <Pressable style={styles.iconButton} onPress={() => router.push('/activity')}>
                <Feather name="heart" size={26} color="#262626" />
              </Pressable>
            </>
          )}
          {showProfilePic && (
            <Pressable style={styles.profileButton}>
              <View style={styles.profilePic}>
                <Feather name="user" size={20} color="#fff" />
              </View>
            </Pressable>
          )}
          {!showLogo && !showSearchBar && !showRightIcons && !showProfilePic && (
            <Text style={styles.usernameText}>@{username}</Text>
          )}
        </View>
      </View>

      {/* Bottom Border */}
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#262626',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#262626',
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8e8e8e',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
  },
  profileButton: {
    padding: 2,
  },
  profilePic: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#efefef',
  },
});