import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserProfile } from '../../types';

interface ProfileActionsProps {
  user: UserProfile;
  isViewingSelf: boolean;
  onEditPress?: () => void;
  onSharePress?: () => void;
  onFollowPress?: () => void;
}

export function ProfileActions({ user, isViewingSelf, onEditPress, onSharePress, onFollowPress }: ProfileActionsProps) {
  if (isViewingSelf) {
    return (
      <View style={styles.container}>
        <Pressable style={styles.editButton} onPress={onEditPress}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </Pressable>
        <Pressable style={styles.shareButton} onPress={onSharePress}>
          <Feather name="share" size={16} color="#262626" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.followButton} onPress={onFollowPress}>
        <Text style={styles.followButtonText}>Follow</Text>
      </Pressable>
      <Pressable style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
      </Pressable>
      <Pressable style={styles.shareButton}>
        <Feather name="user-plus" size={16} color="#262626" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  shareButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    flex: 1,
    backgroundColor: '#0095f6',
    borderWidth: 1,
    borderColor: '#0095f6',
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
});