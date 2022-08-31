import { Box, VStack, Image, Link, HStack, Button, Td, Tbody,Table} from '@chakra-ui/react'
import Styles from './acceso_directo.module.scss'
import unused from '../../../../../assets/images/unused_black.png'
import {FaFacebook, FaYoutube} from "react-icons/fa"
import { useState } from "react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
export default function AccesoDirecto(){
    const [displayRedirecButtonFA, setDisplaySelect] = useState(false)
    const handleButtonOneOnPress = () => {
        setDisplaySelect(displayRedirecButtonFA)
    }
    const [displayRedirecButtonYOU, setDisplaySelectTwo] = useState(false)
    const handleButtoTwoOnPress = () => {
        setDisplaySelect(displayRedirecButtonYOU)
    }
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
                            <Table className={Styles.UVregular}>
                            <HStack>
                                <Tbody>
                                    <Td>
                                        <Box>

                                        <Button colorScheme='facebook' leftIcon={<FaFacebook />} onClick={handleButtonOneOnPress}>
                                            {!displayRedirecButtonFA ? (
                                                <Link href='https://web.facebook.com/Parroquia-Santo-Toribio-de-Las-Condes-474555292658302/' isExternal>
                                                    <ExternalLinkIcon w='2vw' />
                                                </Link>
                                            ) : <></>}
                                        </Button>
                                        </Box>
                                    </Td>
                                        <Td>
                                            <Box>
                                                <Button colorScheme='red' leftIcon={<FaYoutube />}>
                                                    {!displayRedirecButtonYOU ? (
                                                        <Link href='https://www.youtube.com/channel/UCro3erV_F9i_WBwLpKvV4EA' isExternal>
                                                            <ExternalLinkIcon w='2vw' />
                                                        </Link>
                                                    ) : <></>}
                                                </Button>
                                            </Box>
                                        </Td>
                                    </Tbody>
                            </HStack>
                            </Table>
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