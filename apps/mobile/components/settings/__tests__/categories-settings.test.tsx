import { render } from '@testing-library/react-native'
import { CategoriesSettings } from '../categories-settings'

describe('CategoriesSettings', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CategoriesSettings />)
    expect(getByText('Categories will be managed here')).toBeTruthy()
  })
})
