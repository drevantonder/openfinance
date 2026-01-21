import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { ModuleRegistryProvider } from '@/contexts/module-registry-context'
import { ProviderRegistryProvider } from '@/contexts/provider-registry-context'
import { SessionProvider, useSession } from '@/contexts/session-context'

export const unstable_settings = {
  anchor: '(tabs)',
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const { session, isLoading } = useSession()

  if (isLoading) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <ProviderRegistryProvider>
      <ModuleRegistryProvider>
        <SessionProvider>
          <RootLayoutNav />
        </SessionProvider>
      </ModuleRegistryProvider>
    </ProviderRegistryProvider>
  )
}
