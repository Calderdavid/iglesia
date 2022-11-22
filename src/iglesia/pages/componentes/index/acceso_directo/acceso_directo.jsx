import { Box, VStack, Image, Link, HStack, Button, Td, Tbody,Table} from '@chakra-ui/react'
import Styles from './acceso_directo.module.scss'
import unused from '../../../../../assets/images/unused_black.png'
import {FaFacebook, FaYoutube} from "react-icons/fa"
import { useState } from "react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'

import { onAddDocument, onVerYEditar } from '../../../../../store/documentos/addDocument';
import { onEdit } from '../../../../../store/documentos/addSacramentos';

export default function AccesoDirecto(){
    const dispatch = useDispatch()

    const [displayRedirecButtonFA, setDisplaySelect] = useState(false)
    const handleButtonOneOnPress = () => {
        setDisplaySelect(displayRedirecButtonFA)
    }
    const [displayRedirecButtonYOU, setDisplaySelectTwo] = useState(false)
    const handleButtoTwoOnPress = () => {
        setDisplaySelect(displayRedirecButtonYOU)
    }
    const addDocumento = async () => {
        dispatch(onAddDocument({Show: true}))
        dispatch(onEdit(false))
        dispatch(onVerYEditar(true))
    } 

    return(
        <Box>
            <Box className={Styles.texto}>
                Accesos Directos
            </Box>
            <VStack spacing="2%">
                <Link onClick={addDocumento}>
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="1.8vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Crear Documento
                        </Box>
                    </Box>
                </Link>

                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="1.8vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            <Table className={Styles.UVregular}>
                            <HStack alignItems="start" marginLeft="1vw">
                                <HStack alignItems="start" marginLeft="1vw" spacing="2%">
                                    <VStack alignItems="start" marginLeft="1vw" spacing="2%">
                                            <Box direction='row' spacing={4} align='center'  >
                                                    <Link href='https://web.facebook.com/Parroquia-Santo-Toribio-de-Las-Condes-474555292658302/' isExternal padding="vw">
                                                        
                                                        <Button colorScheme='facebook' leftIcon={<FaFacebook />} w="8vw">
                                                            Facebook
                                                        </Button>
                                                    </Link>
                                            </Box>
                                    </VStack >
                                </HStack>
                                <HStack alignItems="start" marginLeft="1vw" spacing="2%">
                                    <VStack alignItems="start" marginLeft="1vw" spacing="2%">
                                                <Box direction='row' spacing={4} align='center'  >
                                                        <Link href='https://www.youtube.com/channel/UCro3erV_F9i_WBwLpKvV4EA' isExternal padding="vw">   
                                                            <Button colorScheme='red' leftIcon={<FaFacebook />} w="8vw">
                                                                YouTube
                                                            </Button>
                                                        </Link>
                                                </Box>
                                    </VStack>
                                </HStack>
                            </HStack>
                            </Table>
                        </Box>
                    </Box>

                <Link href="/ExportBaptism">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="1.8vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Ver PDF Bautismo
                        </Box>
                    </Box>
                </Link>
                <Link href="/ExportConfirmacion">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="1.8vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Ver PDF Confirmación
                        </Box>
                    </Box>
                </Link>
                <Link href="/ExportMatrimonio">
                    <Box className={Styles.boton}>
                        <Box className={Styles.boton_imagenes}>
                            <Image src={unused} w="1.8vw" margin=".4vw 0 0 .89vw" />
                        </Box >
                        <Box className={Styles.boton_texto}>
                            Ver PDF Matrimonio
                        </Box>
                    </Box>
                </Link>
            </VStack>
        </Box>
    )
}