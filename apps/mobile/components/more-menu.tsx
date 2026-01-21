import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native'
import { useRouter } from 'expo-router'

import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

type MoreMenuProps = {
  visible: boolean
  onClose: () => void
  entries: { id: string; label: string; path: string }[]
}

export function MoreMenu({ visible, onClose, entries }: MoreMenuProps) {
  const router = useRouter()
  const colorScheme = useColorScheme()

  const handleNavigate = (path: string) => {
    onClose()
    router.push(path)
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View
          style={[
            styles.menu,
            { backgroundColor: Colors[colorScheme ?? 'light'].background },
          ]}
        >
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.menuItem}
              onPress={() => handleNavigate(entry.path)}
            >
              <Text
                style={[
                  styles.menuText,
                  { color: Colors[colorScheme ?? 'light'].text },
                ]}
              >
                {entry.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  menu: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
  },
})
