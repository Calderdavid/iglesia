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
    VStack
  } from '@chakra-ui/react'

import Select from 'react-select'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onEditDocument } from '../../../../../store/documentos/addDocument'
import { onShowConfirmacion } from '../../../../../store/documentos/addSacramentos'

export default function PopUpConfirmacion(props) {
    const options = [
        {value: 'COLEGIO', label: 'Colegio'},
        {value: 'IGLESIA_PARROQUIAL', label: 'Iglesia Parroquial'},
        {value: 'CAPILLA_PARROQUIAL', label: 'Capilla Parroquial'}
    ]
    const { ShowConfirmacion, Editar } = useSelector((state) => state.addsacramentos)
    const { DocumentInfo, VerYEditar } = useSelector((state) => state.adddocument)

    const dispatch = useDispatch()
    const disable = props.active
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(DocumentInfo)
    const finalRef = useRef()

    const handleSelectValue = (event) => {
        setData({
            ...data,
            Confirmacion:{
                ...data.Confirmacion,
                c_place1: event.value
            }
        })
    }

    const handleDocumentInputText = (event) => {
        setData({
            ...data,
            Documento:{
                ...data.Documento,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleConfirmacionInputText = (event) => {
        setData({
            ...data,
            A_confirmacion: true,
            Confirmacion:{
                ...data.Confirmacion,
                [event.target.name]: event.target.value
            }
        })
    }

    const agregandoConfirmacion = async (event) => {
        event.preventDefault();
        dispatch(onEditDocument(data))
        onClose()
    }

    const openPDF = async (event) => {
        window.location.href = '/ExportConfirmacion?View=true&' + data._id
    }

    useEffect(() => {
        if (ShowConfirmacion.Show == true && disable == false) {
            setData(DocumentInfo)
            onOpen()
        }
      }, [ShowConfirmacion.Show])

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
            {!VerYEditar ? (<Box>Ver Confirmación</Box>) : (<>{!data.Confirmacion.c_date ? (<Box>Añadir Confirmación</Box>) : (<Box>Editar Confirmación</Box>)}</>)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box>
                <VStack alignItems="initial">
                    <HStack >
                        <Box w="3vw">
                            El día
                        </Box>
                        <Box>
                            <Input w="10vw"
                                borderColor="black"
                                backgroundColor={"white"}
                                placeholder="Select Date and Time"
                                type="date"
                                size="md"
                                name="c_date"
                                readOnly={!VerYEditar}
                                value={data.Confirmacion.c_date}
                                onChange={handleConfirmacionInputText}
                            />
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box w="22vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Nombre de la persona' name="name" value={data.Documento.name} onChange={handleDocumentInputText}/>
                        </Box>
                        <Box w="22vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Apellido de la persona' name="lastname" value={data.Documento.lastname} onChange={handleDocumentInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box w="6vw">
                            se confirmó por
                        </Box>
                        <Box w="26vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido del Ministro" name="c_father" value={data.Confirmacion.c_father} onChange={handleConfirmacionInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box>
                            En
                        </Box>
                        <Box w="15vw" borderColor="black" border="1px" borderRadius="5px">
                            <Select
                                value={(data.Confirmacion.c_place1 == "COLEGIO" ? {label: options[0].label, value: options[0].value} : (data.Confirmacion.c_place1 == "CAPILLA_PARROQUIAL" ? {label: options[2].label, value: options[2].value}:{label: options[1].label, value: options[1].value}))}
                                onChange={handleSelectValue}
                                options={options}
                                readOnly={!VerYEditar}
                            />
                        </Box>
                        <Box w="27.4vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Santo Toribio" name="c_place2" value={data.Confirmacion.c_place2} onChange={handleConfirmacionInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box>
                            Los cuales fueron testigos
                        </Box>
                        <Box w="15.5vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido del Padrino" name="c_padrino" value={data.Confirmacion.c_padrino} onChange={handleConfirmacionInputText}/>
                        </Box>
                        <Box>
                            y
                        </Box>
                        <Box w="15.4vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido de la Madrina" name="c_madrina" value={data.Confirmacion.c_madrina} onChange={handleConfirmacionInputText}/>
                        </Box>
                    </HStack>
                </VStack>
                </Box>
            </ModalBody>
            <ModalFooter>
            {!VerYEditar ? (
                <Button colorScheme="yellow" mr={3} onClick={openPDF}>
                    Ver en PDF
                </Button>) : (<></>)}
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