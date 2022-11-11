import React from 'react'
import { AppRouter } from './router/AppRouter'

import { ChakraProvider } from '@chakra-ui/react'

export const IglesiaApp = () => {
  return (
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
  )
}
