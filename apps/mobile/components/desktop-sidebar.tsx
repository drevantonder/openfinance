import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import { useModuleRegistry } from '@/contexts/module-registry-context'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'

export function DesktopSidebar() {
  const router = useRouter()
  const moduleRegistry = useModuleRegistry()
  const { isDesktop } = useBreakpoint()
  const colorScheme = useColorScheme()

  if (!isDesktop) {
    return null
  }

  const navigationEntries = moduleRegistry.getNavigationEntries()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <View
      style={[
        styles.sidebar,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
      ]}>
      {navigationEntries.map((entry) => (
        <TouchableOpacity
          key={entry.id}
          style={styles.navItem}
          onPress={() => handleNavigate(entry.path)}>
          <Text
            style={[
              styles.navText,
              { color: Colors[colorScheme ?? 'light'].text },
            ]}>
            {entry.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#e5e5e5',
    paddingTop: 20,
  },
  navItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
  },
})
