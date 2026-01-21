import { useWindowDimensions, Platform } from 'react-native'

export function useBreakpoint() {
  const { width } = useWindowDimensions()

  const isWeb = Platform.OS === 'web'
  const isDesktop = isWeb && width >= 1024

  return {
    isWeb,
    isDesktop,
    width,
  }
}
