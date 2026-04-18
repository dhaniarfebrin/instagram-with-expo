import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function ReelsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Reels" />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Short videos coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e8e',
    marginTop: 8,
  },
});