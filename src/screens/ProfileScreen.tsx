import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUser } from '../data/mockData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Profile</Text>
      <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{currentUser.displayName}</Text>
      <Text style={styles.handle}>@{currentUser.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
    marginTop: 16,
  },
  handle: {
    fontSize: 16,
    color: '#8e8e8e',
    marginTop: 4,
  },
});