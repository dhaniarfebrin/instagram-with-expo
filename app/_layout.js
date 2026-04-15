import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import FloatingTabBar from '../src/components/FloatingTabBar';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="search" />
          <Stack.Screen name="reels" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="comments/[id]" />
        </Stack>
        <FloatingTabBar />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}