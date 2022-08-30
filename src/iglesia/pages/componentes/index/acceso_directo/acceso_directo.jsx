import { Box, VStack, Image, Link, HStack, Button} from '@chakra-ui/react'
import Styles from './acceso_directo.module.scss'
import unused from '../../../../../assets/images/unused_black.png'
import {FaFacebook, FaTwitter} from "react-icons/fa"

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
                        <HStack>
                            <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
                                Facebook
                            </Button>
                            <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
                                Twitter
                            </Button>
                            </HStack>
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