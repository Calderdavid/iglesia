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
    Spinner,
    Input,
    InputGroup,
    InputLeftElement,
    NumberInput,
    NumberInputField,
    HStack,
    useToast,
    VStack
  } from '@chakra-ui/react'
import { PhoneIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Select from 'react-select'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAddDocument } from '../../../../../store/documentos/addDocument'
import { onShowMatrimonio, onShowBautismo, onShowConfirmacion } from '../../../../../store/documentos/addSacramentos'

import Swal from "sweetalert2";

import iglesiaApi from '../../../../../api/iglesiaApi';
import Styles from './PopUp.module.scss'

export default function PopUp(props) {
    const defaultData = {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        inscr_Date: "",
        Referencia: "",
    }

    const toast = useToast()
    const dispatch = useDispatch()
    const disable = props.active

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(defaultData)
    const finalRef = useRef()
    const { Show } = useSelector((state) => state.adddocument)
    const { Bautismo, Confirmacion, Matrimonio } = useSelector((state) => state.addsacramentos)

    const handleButtonPress = () => {
        const date = new Date()
        setData({
            ...data,
            inscr_Date: date.toISOString().split('T')[0],
        })
    }

    const handleInputText = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const handleBautismo = ()  => {
        dispatch(onShowBautismo({ Show: true }))
    }
    const handleConfirmacion = ()  => {
        dispatch(onShowConfirmacion({ Show: true }))
    }
    const handleMatrimonio = ()  => {
        dispatch(onShowMatrimonio({ Show: true }))
    }

    const agregandoDocumento = async (event) => {
        event.preventDefault();
        const structuredData = {
            ...data,
            Bautismo: Bautismo,
            Confirmacion: Confirmacion,
            Matrimonio: Matrimonio
        }
        console.log(structuredData)
        const peticion = await iglesiaApi.post('/adddocument', structuredData)
        console.log(peticion.data)
        if(peticion.data.status == true)
        {
            onClose()
            Swal.fire(
                'Añadido',
                'El documento ha sido agregado al sistema.',
                'success'
            )
            toast({
                title: `Atención`,
                description: 'Para reflejar los cambios debe recargar la página o volver a realizar la consulta',
                status: "info",
                isClosable: true,
                duration: 10000,
              })
        } else {
            var mensaje = "";
            if (peticion.data.msg == "document already exists")
            {
                mensaje = "El documento ya está registrado en el sistema.";
            }
            if (peticion.data.msg == "name and lastname cant be blank")
            {
                mensaje = "El Nombre y el Apellido no pueden estar en blanco.";
            }
            toast({
                title: `Error`,
                description: mensaje,
                status: "error",
                isClosable: true,
                duration: 10000,
              })
        }
    }

    useEffect(() => {
        if (Show.Show == true && disable == false) {
            setData(defaultData)
            onOpen()
        }
      }, [Show.Show])

      useEffect(() => {
        if (
          (isOpen === false && Show.Show === true && disable === false) ||
          (Show.Show === true && disable === true && isOpen === false)
        ) {
            dispatch(onAddDocument({ Show:false }))
        }},[Show.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Agregar Documento
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box >
                    <Box paddingBottom="1vw">
                        Nombre
                        <Input name="name" value={data.name} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Apellido
                        <Input name="lastname" value={data.lastname} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Correo
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <Input type='email' name="email" value={data.email} onChange={handleInputText}/>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Numero de Teléfono
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PhoneIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <NumberInput value={data.phone} >
                                <NumberInputField name="phone" type='tel'paddingLeft="2vw" onChange={handleInputText}/>
                            </NumberInput>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Fecha de Inscripción
                        <HStack>
                            <Input w="13vw"
                                backgroundColor={"white"}
                                placeholder="Select Date and Time"
                                type="date"
                                size="md"
                                name="inscr_Date"
                                value={data.inscr_Date}
                                onChange={handleInputText}
                            />
                            <Button colorScheme="orange" variant="solid" onClick={handleButtonPress} >
                                Colocar Fecha Actual
                            </Button>
                        </HStack>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleBautismo} >
                            {!Bautismo.fecha ? (<Box>Añadir Bautismo</Box>) : (<Box>Editar Bautismo</Box>)}
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleConfirmacion} >
                            {!Confirmacion.fecha ? (<Box>Añadir Confirmación</Box>) : (<Box>Editar Confirmación</Box>)}
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleMatrimonio} >
                            {!Matrimonio.fecha ? (<Box>Añadir Matrimonio</Box>) : (<Box>Editar Matrimonio</Box>)}
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        Referencia
                        <Input name="Referencia" value={data.Referencia} onChange={handleInputText}/>
                    </Box>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button
                colorScheme="orange"
                backgroundColor="rgb(238, 152, 81)"
                variant="solid"
                mr={3}
                onClick={agregandoDocumento}
                >
                Agregar Documento
                </Button>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}