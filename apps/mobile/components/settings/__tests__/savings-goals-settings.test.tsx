import { render } from '@testing-library/react-native'
import { SavingsGoalsSettings } from '../savings-goals-settings'

describe('SavingsGoalsSettings', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SavingsGoalsSettings />)
    expect(getByText('Savings goals will be managed here')).toBeTruthy()
  })
})
