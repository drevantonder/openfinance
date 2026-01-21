import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useProviderRegistry } from '@/contexts/provider-registry-context';
import { useSession } from '@/contexts/session-context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { setSession } = useSession();
  const router = useRouter();
  const providerRegistry = useProviderRegistry();

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const authProvider = providerRegistry.getAuthProvider();
      const session = await authProvider.signIn({ email: '', password: '' });
      setSession(session);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Welcome
        </ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to track your money</ThemedText>

        <Pressable
          onPress={handleSignIn}
          disabled={isSigningIn}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isSigningIn && styles.buttonDisabled,
          ]}>
          <ThemedText style={styles.buttonText}>
            {isSigningIn ? 'Signing in...' : 'Sign In'}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 24,
  },
  title: {
    fontSize: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
