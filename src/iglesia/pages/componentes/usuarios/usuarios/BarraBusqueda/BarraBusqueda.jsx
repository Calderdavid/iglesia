import { VStack, HStack, Box, Input, Image } from "@chakra-ui/react"
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import Plus from '../../../../../../assets/images/plus.png'

import { useDispatch } from "react-redux"
import { onAddUser } from '../../../../../../store/usuarios/addUser'

export default function BarraBusqueda() {
    const dispatch = useDispatch()

    const options = [
        {value: 'NOMBRE', label: 'NOMBRE'},
        {value: 'APELLIDO', label: 'APELLIDO'},
        {value: 'CORREO', label: 'CORREO'},
        {value: 'ID', label: 'ID'}
    ]

    const agregarUsuario = (event) => {
        event.preventDefault();
        dispatch(onAddUser({ Show:true }))
    }

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
                            backgroundColor="white"
                            className={Styles.input}
                            placeholder="Ingresa el texto aquí..."
                            size="xl"
                            focusBorderColor="rgb(112, 172, 181)"
                            // value={data.Frame}
                            name="Frame"
                            // onChange={}
                        />
                    </Box>
                    <Box w="39.7vw" h="2vw" />
                    <Box className={Styles.boton} onClick={(event) => agregarUsuario(event)}>
                        <Box paddingLeft="1vw">
                            <Image src={Plus} alt="Borrar" w="1.2vw" />
                        </Box>
                        <Box paddingLeft=".5vw">
                            Añadir Usuario
                        </Box>
                    </Box>
                </HStack>
            </VStack>
        </Box>
    )
}