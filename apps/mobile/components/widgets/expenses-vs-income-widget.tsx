import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const mockData = {
  income: 5000,
  expenses: 2428,
  balance: 2572,
  months: [
    { month: 'Jan', income: 4800, expenses: 2300 },
    { month: 'Feb', income: 5000, expenses: 2650 },
    { month: 'Mar', income: 5200, expenses: 2100 },
    { month: 'Apr', income: 5000, expenses: 2428 },
  ],
};

export function ExpensesVsIncomeWidget() {
  const maxValue = Math.max(...mockData.months.map((m) => Math.max(m.income, m.expenses)));

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Expenses vs Income
      </ThemedText>
      <ThemedText style={styles.subtitle}>4 months</ThemedText>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>Income</ThemedText>
          <ThemedText style={[styles.summaryValue, styles.income]}>
            ${mockData.income.toLocaleString()}
          </ThemedText>
        </View>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>Expenses</ThemedText>
          <ThemedText style={[styles.summaryValue, styles.expenses]}>
            ${mockData.expenses.toLocaleString()}
          </ThemedText>
        </View>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>Balance</ThemedText>
          <ThemedText style={[styles.summaryValue, styles.balance]}>
            ${mockData.balance.toLocaleString()}
          </ThemedText>
        </View>
      </View>

      <View style={styles.chart}>
        {mockData.months.map((month) => (
          <View key={month.month} style={styles.chartBar}>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  styles.incomeBar,
                  { height: `${(month.income / maxValue) * 100}%` },
                ]}
              />
              <View
                style={[
                  styles.bar,
                  styles.expensesBar,
                  { height: `${(month.expenses / maxValue) * 100}%` },
                ]}
              />
            </View>
            <ThemedText style={styles.monthLabel}>{month.month}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.incomeDot]} />
          <ThemedText style={styles.legendText}>Income</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.expensesDot]} />
          <ThemedText style={styles.legendText}>Expenses</ThemedText>
        </View>
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
    marginBottom: 4,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  income: {
    color: '#22c55e',
  },
  expenses: {
    color: '#ef4444',
  },
  balance: {
    color: '#0a7ea4',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    height: 100,
  },
  chartBar: {
    alignItems: 'center',
    gap: 4,
  },
  barContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
    height: 80,
  },
  bar: {
    width: 16,
    borderRadius: 4,
    minHeight: 4,
  },
  incomeBar: {
    backgroundColor: '#22c55e',
  },
  expensesBar: {
    backgroundColor: '#ef4444',
  },
  monthLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  incomeDot: {
    backgroundColor: '#22c55e',
  },
  expensesDot: {
    backgroundColor: '#ef4444',
  },
  legendText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
