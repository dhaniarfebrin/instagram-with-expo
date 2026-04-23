import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { StoryHighlight } from '../../types';

interface StoryHighlightsProps {
  highlights: StoryHighlight[];
}

export function StoryHighlights({ highlights }: StoryHighlightsProps) {
  const renderHighlight = ({ item }: { item: StoryHighlight }) => (
    <View style={styles.highlightItem}>
      <View style={styles.highlightCircle}>
        <Image source={{ uri: item.coverImage }} style={styles.highlightImage} />
      </View>
      <Text style={styles.highlightTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={highlights}
        renderItem={renderHighlight}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlightsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  highlightsList: {
    paddingHorizontal: 16,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  highlightCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  highlightTitle: {
    fontSize: 12,
    color: '#262626',
    marginTop: 6,
  },
});