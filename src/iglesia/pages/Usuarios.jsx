import React from 'react';
import { Box } from '@chakra-ui/react'
import Sidebar from './componentes/Sidebar/Sidebar';
import Contents from './componentes/usuarios/content.jsx';

export const Usuarios = () => {

  return (
    <Box>
      <Sidebar actual={"Usuarios"}/>
      <Contents />
    </Box>
  )
}