import { Tabs } from 'expo-router'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { DesktopSidebar } from '@/components/desktop-sidebar'
import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { MoreMenu } from '@/components/more-menu'
import { Colors } from '@/constants/theme'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useModuleRegistry } from '@/contexts/module-registry-context'

function MoreTabButton({ onPress }: { onPress: () => void }) {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 60 }}
      onPress={onPress}
    >
      <IconSymbol
        size={28}
        name="ellipsis.circle"
        color={Colors[colorScheme ?? 'light'].tabIconDefault}
      />
    </TouchableOpacity>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { isDesktop } = useBreakpoint()
  const moduleRegistry = useModuleRegistry()
  const navigationEntries = moduleRegistry.getNavigationEntries()
  const [moreMenuVisible, setMoreMenuVisible] = useState(false)

  const maxPrimaryTabs = 3

  const getTabScreenName = (path: string) => {
    if (path === '/(tabs)' || path === '/(tabs)/index') {
      return 'index'
    }
    if (path.startsWith('/(tabs)/')) {
      return path.replace('/(tabs)/', '')
    }
    return path
  }

  const validNavEntries = navigationEntries.filter(
    (entry) => entry.path === '/(tabs)' || entry.path.startsWith('/(tabs)/')
  )
  const primaryNavEntries = validNavEntries.slice(0, maxPrimaryTabs)
  const moreNavEntries = validNavEntries.slice(maxPrimaryTabs)

  const tabsContent = (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        {primaryNavEntries.map((entry) => (
          <Tabs.Screen
            key={entry.id}
            name={getTabScreenName(entry.path)}
            options={{
              title: entry.label,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
            }}
          />
        ))}
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
          }}
        />
        {moreNavEntries.length > 0 && (
          <Tabs.Screen
            name="more"
            options={{
              title: 'More',
              tabBarButton: () => <MoreTabButton onPress={() => setMoreMenuVisible(true)} />,
            }}
          />
        )}
      </Tabs>
      <MoreMenu
        visible={moreMenuVisible}
        onClose={() => setMoreMenuVisible(false)}
        entries={moreNavEntries}
      />
    </>
  )

  if (isDesktop) {
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <DesktopSidebar />
        <View style={{ flex: 1 }}>{tabsContent}</View>
      </View>
    )
  }

  return tabsContent
}
