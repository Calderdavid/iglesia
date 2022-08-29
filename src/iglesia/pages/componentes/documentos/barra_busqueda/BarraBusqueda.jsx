import { Box, HStack, Input, VStack } from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'

export default function BarraBusqueda() {
    return(
        <Box backgroundColor="black" w="72vw" marginLeft="3vw" paddingTop="2vw">
            <VStack>
                <Box>
                    Buscar por:
                </Box>
                <HStack>
                    <Box>
                        <Select />
                    </Box>
                    <Input />
                </HStack>
            </VStack>
        </Box>
    )
}