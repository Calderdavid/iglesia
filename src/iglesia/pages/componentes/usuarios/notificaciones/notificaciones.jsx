import { Box, VStack, HStack, Link, Image, Flex } from '@chakra-ui/react'
import permisos from '../../../../../assets/images/permisos.png'
import alerta from '../../../../../assets/images/warning.png'
import unused from '../../../../../assets/images/unused_black.png'
import { useState } from 'react'
import Styles from './notificaciones.module.scss'

export default function Notificaciones() {
    const [dataTable, setDataTable] = useState({Headers: ["ID", "Nombre / Apellido", "Correo Electrónico", "Última conexión", "Ver", "Eliminar"],
    Data: []})
    
     return(
        <Box>
            <Box paddingLeft="5vw" fontSize="2.5vw" paddingBottom="4vw" justifyContent="space-around">
                Iglesia Santo Toribio
            </Box>
            <HStack spacing="10%" paddingLeft="5vw" w="100%">
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={unused} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Usuarios Registrados: 11.464
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={permisos} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Usuarios con permisos: 10
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={alerta} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Tu rol: *
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}