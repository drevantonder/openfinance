import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ExpensesByCategoryWidget } from '@/components/widgets/expenses-by-category-widget';
import { ExpensesVsIncomeWidget } from '@/components/widgets/expenses-vs-income-widget';
import { useModuleRegistry } from '@/contexts/module-registry-context';

export default function DashboardScreen() {
  const registry = useModuleRegistry();
  const widgets = registry.getWidgets();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <ThemedText style={styles.subtitle}>Track your money</ThemedText>
      </ThemedView>

      {widgets.length > 0 ? (
        <ThemedView style={styles.widgetContainer}>
          {widgets.map((widget) => {
            switch (widget.type) {
              case 'expenses-by-category':
                return <ExpensesByCategoryWidget key={widget.id} />;
              case 'expenses-vs-income':
                return <ExpensesVsIncomeWidget key={widget.id} />;
              default:
                return null;
            }
          })}
        </ThemedView>
      ) : (
        <ThemedView style={styles.emptyState}>
          <ThemedText type="subtitle">No widgets yet</ThemedText>
          <ThemedText style={styles.emptyText}>
            Enable modules with widgets to see them here
          </ThemedText>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    marginTop: 8,
  },
  widgetContainer: {
    gap: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 8,
    textAlign: 'center',
  },
});
