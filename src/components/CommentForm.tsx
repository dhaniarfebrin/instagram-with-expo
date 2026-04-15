import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { Comment, User } from '../types';
import { feedApi } from '../api';

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment is too long'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  user: User;
  onSuccess: (comment: Comment) => void;
}

export default function CommentForm({ postId, user, onSuccess }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const newComment = await feedApi.postComment(postId, data.comment);
      onSuccess(newComment);
      reset();
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.inputContainer}>
        <TextInput
          {...register('comment')}
          placeholder="Add a comment..."
          placeholderTextColor="#8e8e8e"
          style={styles.input}
          multiline
          maxLength={500}
          onChangeText={(text) => setValue('comment', text)}
        />
        {errors.comment && (
          <Text style={styles.errorText}>{errors.comment.message}</Text>
        )}
      </View>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        style={({ pressed }) => [
          styles.sendButton,
          pressed && styles.sendButtonPressed,
        ]}
      >
        <Feather
          name="send"
          size={20}
          color={isSubmitting ? '#b8d4e8' : '#3897f0'}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 10,
    minHeight: 36,
    maxHeight: 100,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#262626',
    maxHeight: 80,
  },
  errorText: {
    color: '#ed4956',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonPressed: {
    opacity: 0.7,
  },
});