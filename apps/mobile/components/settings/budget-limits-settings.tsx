import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@/components/themed-text'

export function BudgetLimitsSettings() {
  return (
    <View style={{ marginTop: 8 }}>
      <ThemedText style={{ fontSize: 14, opacity: 0.7 }}>
        Budget limits will be managed here
      </ThemedText>
    </View>
  )
}
