import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'
import { ChakraProvider } from '@chakra-ui/react'

export const IglesiaApp = () => {
  return (
    <AppTheme>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </AppTheme>
  )
}
