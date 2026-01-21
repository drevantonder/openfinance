import { BaseModuleRegistry, type ModuleDefinition } from '@openfinance/core'
import { CategoriesSettings } from '@/components/settings/categories-settings'
import { BudgetLimitsSettings } from '@/components/settings/budget-limits-settings'
import { BudgetPeriodsSettings } from '@/components/settings/budget-periods-settings'
import { SavingsGoalsSettings } from '@/components/settings/savings-goals-settings'

export const availableModules: ModuleDefinition[] = [
  {
    id: 'activity',
    label: 'Activity',
    navigation: [
      {
        id: 'activity-dashboard',
        label: 'Activity',
        path: '/(tabs)',
      },
    ],
    settings: [
      {
        id: 'activity-categories',
        label: 'Categories',
        description: 'Manage expense and income categories',
        icon: 'chart.bar.fill',
        slug: 'activity',
        component: CategoriesSettings,
      },
    ],
    widgets: [
      {
        id: 'expenses-by-category',
        label: 'Expenses by Category',
        type: 'expenses-by-category',
      },
      {
        id: 'expenses-vs-income',
        label: 'Expenses vs Income',
        type: 'expenses-vs-income',
      },
    ],
  },
  {
    id: 'budget',
    label: 'Budget',
    navigation: [],
    settings: [
      {
        id: 'budget-limits',
        label: 'Budget Limits',
        description: 'Set and manage budget limits',
        icon: 'gearshape.fill',
        slug: 'budget',
        component: BudgetLimitsSettings,
      },
      {
        id: 'budget-periods',
        label: 'Budget Periods',
        description: 'Configure budget tracking periods',
        icon: 'chart.bar.fill',
        slug: 'budget',
        component: BudgetPeriodsSettings,
      },
    ],
    widgets: [],
  },
  {
    id: 'goals',
    label: 'Goals',
    navigation: [],
    settings: [
      {
        id: 'goals-savings',
        label: 'Savings Goals',
        description: 'Track and manage savings goals',
        icon: 'house.fill',
        slug: 'goals',
        component: SavingsGoalsSettings,
      },
    ],
    widgets: [],
  },
]

export const instanceConfig = {
  enabledModules: ['activity', 'budget'],
}

export const moduleRegistry = BaseModuleRegistry.fromConfig(instanceConfig, availableModules)
