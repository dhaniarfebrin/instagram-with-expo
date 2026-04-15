import { useRouter, useSegments } from 'expo-router';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { name: 'index', label: 'Home', icon: 'home', route: '/' },
  { name: 'search', label: 'Search', icon: 'search', route: '/search' },
  { name: 'reels', label: 'Reels', icon: 'play-circle', route: '/reels' },
  { name: 'profile', label: 'Profile', icon: 'user', route: '/profile' },
];

export default function FloatingTabBar() {
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  const isCommentsRoute = segments[0] === 'comments';
  if (isCommentsRoute) return null;

  const handlePress = (route: string) => {
    console.log(route);
    router.replace(route);
  };

  const currentPath = '/' + segments.join('/');

  const isActive = (route: string) => {
    if (route === '/') {
      // @ts-expect-error - segments can be empty
      return currentPath === '/' || segments.length === 0;
    }
    return currentPath.startsWith(route);
  };

  return (
    <View
      style={[styles.container, { paddingBottom: Math.min(insets.bottom, 20) }]}
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const active = isActive(tab.route);
          return (
            <Pressable
              key={tab.name}
              onPress={() => handlePress(tab.route)}
              style={({ pressed }) => [
                styles.tab,
                pressed && styles.tabPressed,
              ]}
            >
              <Feather
                name={tab.icon as any}
                size={26}
                color={active ? '#262626' : '#8e8e8e'}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabPressed: {
    opacity: 0.7,
  },
});
