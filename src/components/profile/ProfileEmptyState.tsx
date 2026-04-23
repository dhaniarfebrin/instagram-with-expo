import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileEmptyStateProps {
  type: 'reels' | 'tags';
}

export function ProfileEmptyState({ type }: ProfileEmptyStateProps) {
  return (
    <View style={styles.container}>
      {type === 'reels' ? (
        <Ionicons name="play-circle-outline" size={64} color="#8e8e8e" />
      ) : (
        <Ionicons name="person-outline" size={64} color="#8e8e8e" />
      )}
      <Text style={styles.emptyStateText}>
        No {type.charAt(0).toUpperCase() + type.slice(1)} yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8e8e8e',
    marginTop: 8,
  },
});