import { View, Text, StyleSheet, Image } from 'react-native';
import { currentUser } from '../data/mockData';
import Header from '../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header showProfilePic username={currentUser.username} />
      <View style={styles.content}>
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{currentUser.displayName}</Text>
        <Text style={styles.handle}>@{currentUser.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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