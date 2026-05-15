import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1d2e' },
          headerTintColor: '#e2e8f0',
          contentStyle: { backgroundColor: '#0f1117' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add"
          options={{ presentation: 'modal', title: 'Add Expense' }}
        />
      </Stack>
    </>
  );
}
