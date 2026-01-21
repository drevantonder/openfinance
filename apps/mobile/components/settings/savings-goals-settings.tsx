import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@/components/themed-text'

export function SavingsGoalsSettings() {
  return (
    <View style={{ marginTop: 8 }}>
      <ThemedText style={{ fontSize: 14, opacity: 0.7 }}>
        Savings goals will be managed here
      </ThemedText>
    </View>
  )
}
