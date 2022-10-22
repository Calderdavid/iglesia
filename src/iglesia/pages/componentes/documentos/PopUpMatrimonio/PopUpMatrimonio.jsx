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
    VStack,
  } from '@chakra-ui/react'
import Select from 'react-select'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onEditDocument } from '../../../../../store/documentos/addDocument'
import { onShowMatrimonio } from '../../../../../store/documentos/addSacramentos'

export default function PopUpMatrimonio(props) {
    const options = [
        {value: 'DOMICILIO', label: 'Domicilio'},
        {value: 'IGLESIA_PARROQUIAL', label: 'Iglesia Parroquial'},
        {value: 'CAPILLA_PARROQUIAL', label: 'Capilla Parroquial'}
    ]

    const { ShowMatrimonio, Editar } = useSelector((state) => state.addsacramentos)
    const { DocumentInfo, VerYEditar } = useSelector((state) => state.adddocument)

    const dispatch = useDispatch()
    const disable = props.active
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(DocumentInfo)
    const finalRef = useRef()

    const handleSelectValue = (event) => {
        setData({
            ...data,
            Matrimonio:{
                ...data.Matrimonio,
                m_place1: event.value
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
    const handleMarriageInputText = (event) => {
        setData({
            ...data,
            A_matrimonio: true,
            Matrimonio:{
                ...data.Matrimonio,
                [event.target.name]: event.target.value
            }
        })
    }

    const agregandoMatrimonio = async (event) => {
        event.preventDefault();
        dispatch(onEditDocument(data))
        onClose()
    }

    useEffect(() => {
        if (ShowMatrimonio.Show == true && disable == false) {
            setData(DocumentInfo)
            onOpen()
        }
      }, [ShowMatrimonio.Show])
    
    useEffect(() => {
    if (
        (isOpen === false && ShowMatrimonio.Show === true && disable === false) ||
        (ShowMatrimonio.Show === true && disable === true && isOpen === false)
    ) {
        dispatch(onShowMatrimonio({ ShowMatrimonio: false }))
    }},[ShowMatrimonio.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent maxH="400vw" maxW="43.5vw">
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Matrimonio</Box>) : (<>{!data.Matrimonio.m_date ? (<Box>Añadir Matrimonio</Box>) : (<Box>Editar Matrimonio</Box>)}</>)}
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
                                name="m_date"
                                value={data.Matrimonio.m_date}
                                readOnly={!VerYEditar}
                                onChange={handleMarriageInputText}
                            />
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box w="22vw" paddingLeft="1vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Nombre de la persona' name="name" value={data.Documento.name} onChange={handleDocumentInputText}/>
                        </Box>
                        <Box w="22vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Apellido de la persona' name="lastname" value={data.Documento.lastname} onChange={handleDocumentInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box >
                            y 
                        </Box>
                        <Box w="21vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Nombre de la pareja' name="m_partner_name" value={data.Matrimonio.m_partner_name} onChange={handleMarriageInputText}/>
                        </Box>
                        <Box w="22vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder='Apellido de la pareja' name="m_partner_lastname" value={data.Matrimonio.m_partner_lastname} onChange={handleMarriageInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box paddingRight=".8vw">
                            Fueron bendecidos en sagrado Matrimonio por
                        </Box>
                        <Box w="22vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido del Padre" name="m_father" value={data.Matrimonio.m_father} onChange={handleMarriageInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box>
                            En
                        </Box>
                        <Box w="15vw" borderColor="black" border="1px" borderRadius="5px">
                            <Select
                                value={(data.Matrimonio.m_place1 == "DOMICILIO" ? {label: options[0].label, value: options[0].value} : (data.Matrimonio.m_place1 == "CAPILLA_PARROQUIAL" ? {label: options[2].label, value: options[2].value}:{label: options[1].label, value: options[1].value}))}
                                onChange={handleSelectValue}
                                options={options}
                                readOnly={!VerYEditar}
                            />
                        </Box>
                        <Box w="27.4vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Santo Toribio" name="m_place2" value={data.Matrimonio.m_place2} onChange={handleMarriageInputText}/>
                        </Box>
                    </HStack>
                    <HStack paddingTop="1vw">
                        <Box>
                            Los cuales fueron testigos
                        </Box>
                        <Box w="15.5vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido del Padrino" name="m_padrino" value={data.Matrimonio.m_padrino} onChange={handleMarriageInputText}/>
                        </Box>
                        <Box>
                            y
                        </Box>
                        <Box w="15.4vw">
                            <Input borderColor="black" readOnly={!VerYEditar} placeholder="Nombre y Apellido de la Madrina" name="m_madrina" value={data.Matrimonio.m_madrina} onChange={handleMarriageInputText}/>
                        </Box>
                    </HStack>
                </VStack>
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
                onClick={agregandoMatrimonio}
                >
                {!Editar ? (<Box>Agregar Matrimonio</Box>) : (<Box>Aplicar Cambios</Box>)}
                </Button>)}
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}