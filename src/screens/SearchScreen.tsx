import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Header showSearchBar />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Discover content</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#8e8e8e',
    marginTop: 8,
  },
});