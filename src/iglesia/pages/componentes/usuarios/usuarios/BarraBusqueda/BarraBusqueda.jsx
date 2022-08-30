import { VStack, HStack, Box, Input } from "@chakra-ui/react"
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'

export default function BarraBusqueda() {
    const options = [
        {value: 'NOMBRE', label: 'NOMBRE'},
        {value: 'APELLIDO', label: 'APELLIDO'},
        {value: 'CORREO', label: 'CORREO'},
        {value: 'ID', label: 'ID'}
    ]
    return(
        <Box padding="1.5vw 0 0 .8vw">
            <VStack alignItems="start">
                <Box paddingLeft="1.2vw">
                    Buscar por:
                </Box>
                <HStack>
                    <Box>
                        <Select
                            className={Styles.select}
                            options={options}
                            //onChange={(event) => {}}
                        />
                    </Box>
                    <Box paddingLeft="1vw">
                        <Input
                            className={Styles.input}
                            placeholder="Ingresa el texto aquí..."
                            size="xl"
                            focusBorderColor="rgb(112, 172, 181)"
                            // value={data.Frame}
                            name="Frame"
                            // onChange={}
                        />
                    </Box>
                </HStack>
            </VStack>
        </Box>
    )
}