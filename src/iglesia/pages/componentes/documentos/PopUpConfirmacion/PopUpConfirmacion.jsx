import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
    Input,
    HStack,
  } from '@chakra-ui/react'

import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onShowConfirmacion, onAddConfirmacion } from '../../../../../store/documentos/addSacramentos'
import Styles from './PopUp.module.scss'

export default function PopUpConfirmacion(props) {
    const defaultData = {
        padrino: "",
        madrina: "",
        fecha: "",
        padre: "",
        lugar: "",
    }

    const { ShowConfirmacion, Confirmacion, Editar } = useSelector((state) => state.addsacramentos)
    const { Show, VerYEditar } = useSelector((state) => state.adddocument)

    const dispatch = useDispatch()
    const disable = props.active
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(Confirmacion)
    const finalRef = useRef()

    const handleButtonPress = () => {
        const date = new Date()
        setData({
            ...data,
            fecha: date.toISOString().split('T')[0],
        })
    }

    const handleInputText = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const agregandoConfirmacion = async (event) => {
        event.preventDefault();
        dispatch(onAddConfirmacion(data))
        onClose()
    }

    useEffect(() => {
        if (ShowConfirmacion.Show == true && disable == false) {
            // setData(defaultData)
            if(Editar)
            {
                setData(Confirmacion)
            }
            onOpen()
        }
      }, [ShowConfirmacion.Show])

    useEffect(() => {
    if (Show.Show == false && Editar == false) {
        setData(defaultData)
        dispatch(onAddConfirmacion(defaultData))
    }
    }, [Show.Show])

    useEffect(() => {
    if (
        (isOpen === false && ShowConfirmacion.Show === true && disable === false) ||
        (ShowConfirmacion.Show === true && disable === true && isOpen === false)
    ) {
        dispatch(onShowConfirmacion({ ShowConfirmacion: false }))
    }},[ShowConfirmacion.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Confirmación</Box>) : (<>{!Confirmacion.fecha ? (<Box>Añadir Confirmación</Box>) : (<Box>Editar Confirmación</Box>)}</>)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box >
                    <Box paddingBottom="1vw">
                        Padrino
                        <Input name="padrino" value={data.padrino} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Madrina
                        <Input name="madrina" value={data.madrina} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Fecha de Celebración
                        <HStack>
                            <Input w="13vw"
                                backgroundColor={"white"}
                                placeholder="Select Date and Time"
                                type="date"
                                size="md"
                                name="fecha"
                                value={data.fecha}
                                onChange={handleInputText}
                            />
                            {!VerYEditar ? (
                            <></>) : (
                            <Button colorScheme="orange" variant="solid" onClick={handleButtonPress} >
                                Colocar Fecha Actual
                            </Button>)}
                        </HStack>
                    </Box>
                    <Box paddingBottom="1vw">
                        Padre
                        <Input name="padre" value={data.padre} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Lugar
                        <Input name="lugar" value={data.lugar} onChange={handleInputText}/>
                    </Box>
                </Box>
            </ModalBody>
            <ModalFooter>
            {!VerYEditar ? (
                <Button colorScheme="green" mr={3} onClick={onClose}>
                    Aceptar
                </Button>) : (
                <Button
                colorScheme="orange"
                backgroundColor="rgb(238, 152, 81)"
                variant="solid"
                mr={3}
                onClick={agregandoConfirmacion}
                >
                {!Editar ? (<Box>Agregar Confirmacion</Box>) : (<Box>Aplicar Cambios</Box>)}
                </Button>
                )}
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}