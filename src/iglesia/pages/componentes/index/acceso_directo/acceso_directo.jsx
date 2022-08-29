import { Box, VStack, Image, Link } from '@chakra-ui/react'
import Styles from './acceso_directo.module.scss'
import unused from '../../../../../assets/images/unused_black.png'

export default function AccesoDirecto(){
    return(
        <Box>
            <Box className={Styles.texto}>
                Accesos Directos
            </Box>
            <VStack spacing="2%">
                <Link href="/">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="2vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Crear Documento
                        </Box>
                    </Box>
                </Link>
                <Link href="/">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="2vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Redes Sociales
                        </Box>
                    </Box>
                </Link>
                <Link href="/">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="2vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Unused
                        </Box>
                    </Box>
                </Link>
                <Link href="/">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="2vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Unused
                        </Box>
                    </Box>
                </Link>
            </VStack>
        </Box>
    )
}