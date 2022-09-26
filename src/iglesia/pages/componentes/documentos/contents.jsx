import { Box, HStack } from '@chakra-ui/react'
import BarraBusqueda from './barra_busqueda/BarraBusqueda'
import Tablero from  './Tablero/TableroDocumento'
import React from 'react';
import PopUp from './PopUp/PopUp'
import PopUpBautismo from './PopUpBautismo/PopUpBautismo';
import PopUpConfirmacion from './PopUpConfirmacion/PopUpConfirmacion';
import PopUpMatrimonio from './PopUpMatrimonio/PopUpMatrimonio';

export default function Contents() {
    return(
        <Box marginLeft="20vw" paddingTop="1.5vw" >
            <Box backgroundColor="rgb(247, 192, 134)" h="47vw" w="78vw" borderRadius="15px">
                <BarraBusqueda />
                <Tablero />
            </Box>
            <PopUpBautismo active={false} />
            <PopUpMatrimonio active={false} />
            <PopUpConfirmacion active={false} />
            <PopUp active={false} />
        </Box>
    )
}