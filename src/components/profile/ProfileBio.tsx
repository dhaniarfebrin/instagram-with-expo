import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserProfile } from '../../types';

interface ProfileBioProps {
  user: UserProfile;
}

export function ProfileBio({ user }: ProfileBioProps) {
  return (
    <View style={styles.container}>
      <View style={styles.displayNameRow}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        {user.isVerified && (
          <Feather name="check-circle" size={14} color="#3897f0" style={styles.verifiedIcon} />
        )}
      </View>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  displayNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: '#262626',
    marginTop: 4,
    lineHeight: 18,
  },
});