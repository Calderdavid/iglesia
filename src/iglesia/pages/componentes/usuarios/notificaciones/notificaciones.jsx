import { Box, VStack, HStack, Link, Image, Flex } from '@chakra-ui/react'
import permisos from '../../../../../assets/images/permisos.png'
import alerta from '../../../../../assets/images/warning.png'
import unused from '../../../../../assets/images/unused_black.png'
import { useState, useEffect } from 'react'
import Styles from './notificaciones.module.scss'
import iglesiaApi from '../../../../../api/iglesiaApi'

export default function Notificaciones() {
    const [dataTable, setDataTable] = useState({Headers: ["ID", "Nombre / Apellido", "Correo Electrónico", "Última conexión", "Ver", "Eliminar"],
    Data: []})
    const date = new Date()

    const [data, setData] = useState({
        data1: 0,
        data2: 0,
        data3: `${date.getDate()} de ${new Intl.DateTimeFormat('es-ES', {month: "long"}).format(date)} de ${date.getFullYear()}`
    })

    const RequestData = async (trim) => {
    const getusuarios = await iglesiaApi.post('/getnotifications', {})
        setData({...data, data1: getusuarios.data.usuarios, data2: getusuarios.data.permisos})
        console.log(getusuarios)
    }
    useEffect(() => {
        RequestData()
    }, [])
     return(
        <Box>
            <Box paddingLeft="5vw" fontSize="2.5vw" paddingBottom="4vw" justifyContent="space-around">
                Parroquia Santo Toribio
            </Box>
            <HStack spacing="10%" paddingLeft="5vw" w="100%">
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={unused} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Usuarios Registrados: {data.data1}
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={permisos} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <Box className={Styles.Notif_texto}>
                        Usuarios con permisos: {data.data2}
                    </Box>
                </Box>
                <Box className={Styles.notificaciones}>
                    <Box className={Styles.Notif_imagenes}>
                        <Image src={alerta} w="2vw" margin=".4vw 0 0 .7vw" />
                    </Box >
                    <VStack  alignItems="start">
                        <Box className={Styles.Notif_texto}>
                            Fecha de Hoy: 
                        </Box>
                        <Box className={Styles.Notif_texto}>
                            {data.data3}    
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    )
}