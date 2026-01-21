import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const mockData = [
  { category: 'Food & Dining', amount: 850, percentage: 35 },
  { category: 'Transportation', amount: 420, percentage: 17 },
  { category: 'Housing', amount: 600, percentage: 25 },
  { category: 'Entertainment', amount: 240, percentage: 10 },
  { category: 'Shopping', amount: 180, percentage: 7 },
  { category: 'Other', amount: 138, percentage: 6 },
];

export function ExpensesByCategoryWidget() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Expenses by Category
      </ThemedText>
      <ThemedText style={styles.subtitle}>This month</ThemedText>
      
      <View style={styles.list}>
        {mockData.map((item) => (
          <View key={item.category} style={styles.item}>
            <View style={styles.itemHeader}>
              <ThemedText style={styles.category}>{item.category}</ThemedText>
              <ThemedText style={styles.amount}>${item.amount}</ThemedText>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${item.percentage}%` }]} />
            </View>
            <ThemedText style={styles.percentage}>{item.percentage}%</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
  },
  list: {
    gap: 12,
  },
  item: {
    gap: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0a7ea4',
    borderRadius: 3,
  },
  percentage: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'right',
  },
});
