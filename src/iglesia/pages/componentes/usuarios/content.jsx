import { Box, HStack } from '@chakra-ui/react'
import Notificaciones from './notificaciones/notificaciones.jsx'
import Styles from './content.module.scss'
import BarraBusqueda from './usuarios/BarraBusqueda/BarraBusqueda.jsx'
import Tablero from './usuarios/Tablero/Tablero.jsx'
import PopUp from './usuarios/PopUp/PopUp.jsx'

export default function Contents() {
    return(
        <Box marginLeft="20vw" paddingTop="1.5vw" >
            <Box h="47vw" w="78vw" borderRadius="15px">
                <Notificaciones />
                <Box className={Styles.boxusuarios}>
                    <BarraBusqueda />
                    <Tablero />
                </Box>
            </Box>
            <PopUp active={false} />
        </Box>
    )
}