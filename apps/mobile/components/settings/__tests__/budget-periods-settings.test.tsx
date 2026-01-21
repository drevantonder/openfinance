import { render } from '@testing-library/react-native'
import { BudgetPeriodsSettings } from '../budget-periods-settings'

describe('BudgetPeriodsSettings', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BudgetPeriodsSettings />)
    expect(getByText('Budget periods will be managed here')).toBeTruthy()
  })
})
