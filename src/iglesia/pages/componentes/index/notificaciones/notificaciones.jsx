import { Box, VStack, HStack, Link, Image, Flex } from '@chakra-ui/react'
import calendario from '../../../../../assets/images/calendar.png'
import alerta from '../../../../../assets/images/warning.png'
import unused from '../../../../../assets/images/unused_black.png'

import Styles from './notificaciones.module.scss'

export default function Notificaciones() {
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
                        Solicitudes Pendientes: 50
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={calendario} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        <VStack  alignItems="start">
                            <Box>
                                Siguiente Fecha Importante:
                            </Box>
                            <Box>
                                27 Noviembre 2022
                            </Box>
                        </VStack>
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={alerta} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Quedan 7 Días para el Domingo
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}