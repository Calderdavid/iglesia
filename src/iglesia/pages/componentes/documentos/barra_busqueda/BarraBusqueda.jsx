import { Box, HStack, Input, VStack } from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
const options = [
    {value: 'NOMBRE', label: 'Nombre'},
    {value: 'APELLIDO', label: 'Apellido'},
    {value: 'FECHAINSCRIPCION', label: 'Fecha Inscripción'},
    {value: 'BAUTISMO', label: 'Bautismo'},
    {value: 'CONFIRMACION', label: 'Confirmación'},
    {value: 'MATRIMONIO', label: 'Matrimonio'}
]
export default function BarraBusqueda() {
    return(
        <Box padding="1vw">
            <Box  >
                
                <VStack alignItems="start" marginLeft="1vw">
                    <Box >
                            Buscar Por:
                    </Box>

                    <HStack >
                        <Box w="10vw">
                            <Select 
                            className={Styles.Select}
                            options={options}
                            //onChange={(event) => {}}
                            />
                        </Box > 
                            <Input w="13vw"
                                placeHolder = "Ingresa el texto aquí..."
                            />
                        <Box marginLeft= "40vw">
                            ¿Qué Buscas?
                        </Box>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
}