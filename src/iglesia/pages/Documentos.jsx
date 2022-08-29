import React from 'react';
import { Box } from '@chakra-ui/react'
import Sidebar from './componentes/Sidebar/Sidebar';
import Contents from './componentes/documentos/contents';

export const Documentos = () => {

  return (
    <Box>
      <Sidebar actual={"Documentos"}/>
      <Contents />
    </Box>
  )
}