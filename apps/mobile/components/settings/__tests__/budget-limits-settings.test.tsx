import { render } from '@testing-library/react-native'
import { BudgetLimitsSettings } from '../budget-limits-settings'

describe('BudgetLimitsSettings', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BudgetLimitsSettings />)
    expect(getByText('Budget limits will be managed here')).toBeTruthy()
  })
})
