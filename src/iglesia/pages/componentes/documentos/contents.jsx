import { Box, HStack } from '@chakra-ui/react'
import BarraBusqueda from './barra_busqueda/BarraBusqueda'

export default function Contents() {
    return(
        <Box marginLeft="20vw" paddingTop="1.5vw" >
            <Box backgroundColor="rgb(247, 192, 134)" h="47vw" w="78vw" borderRadius="15px">
                <BarraBusqueda />
            </Box>
        </Box>
    )
}