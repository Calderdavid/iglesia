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
import { onAddDocument, onVerYEditar } from '../../../../../store/documentos/addDocument'
import { onShowMatrimonio, onShowBautismo, onShowConfirmacion, onEdit } from '../../../../../store/documentos/addSacramentos'

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
    const { Show, DocumentInfo, VerYEditar } = useSelector((state) => state.adddocument)
    const { Bautismo, Confirmacion, Matrimonio, Editar } = useSelector((state) => state.addsacramentos)

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

    const EditandoDocumento = ()  => {
        console.log("asdasdasd")
        dispatch(onVerYEditar(true))
    }

    const agregandoDocumento = async (event) => {
        event.preventDefault();
        if(!Editar)
        {
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
        } else {
            const structuredData = {
                ...data,
                Bautismo: Bautismo,
                Confirmacion: Confirmacion,
                Matrimonio: Matrimonio
            }
            console.log(structuredData)
            const peticion = await iglesiaApi.post('/editdocument', structuredData)
            console.log(peticion.data)
            if(peticion.data.status == true)
            {
                onClose()
                Swal.fire(
                    'Añadido',
                    'El documento ha sido editado correctamente.',
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
        
    }

    const handleClose = async (event)  => {
        if (
            (isOpen === false && Show.Show === true && disable === false) ||
            (Show.Show === true && disable === true && isOpen === false)
          ) {
              dispatch(onAddDocument({ Show:false }))
          }
        
    }

    useEffect(() => {
        if (Show.Show == true && disable == false) {
            if(!Editar)
            {
                setData(defaultData)
            } else {
                setData(DocumentInfo)
            }
            onOpen()
            console.log(VerYEditar)
        }
      }, [Show.Show])

      useEffect(() => {
        handleClose()
        },[Show.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Documento</Box>) : (<>{!Editar ? (<Box>Agregar Documento</Box>) : (<Box>Editar Documento</Box>)}</>)}
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
                            {!VerYEditar ? (
                            <></>) : (
                            <Button colorScheme="orange" variant="solid" onClick={handleButtonPress} >
                                Colocar Fecha Actual
                            </Button>)}
                        </HStack>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleBautismo} >
                        {!VerYEditar ? (<Box>Ver Bautismo</Box>) : (<>{!Bautismo.fecha ? (<Box>Añadir Bautismo</Box>) : (<Box>Editar Bautismo</Box>)}</>)}
                            
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleConfirmacion} >
                        {!VerYEditar ? (<Box>Ver Confirmación</Box>) : (<>{!Confirmacion.fecha ? (<Box>Añadir Confirmación</Box>) : (<Box>Editar Confirmación</Box>)}</>)}
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        <Button colorScheme="orange" variant="solid" onClick={handleMatrimonio} >
                        {!VerYEditar ? (<Box>Ver Matrimonio</Box>) : (<>{!Matrimonio.fecha ? (<Box>Añadir Matrimonio</Box>) : (<Box>Editar Matrimonio</Box>)}</>)}
                        </Button>
                    </Box>
                    <Box paddingBottom="1vw">
                        Referencia
                        <Input name="Referencia" value={data.Referencia} onChange={handleInputText}/>
                    </Box>
                </Box>
            </ModalBody>
            <ModalFooter>
            {!VerYEditar ? (
                <Button
                colorScheme="green"
                variant="solid"
                mr={3}
                onClick={EditandoDocumento}
                >
                    Editar
                </Button>
                ) : (
                <Button
                colorScheme="orange"
                backgroundColor="rgb(238, 152, 81)"
                variant="solid"
                mr={3}
                onClick={agregandoDocumento}
                >
                    {!Editar ? (<Box>Agregar Documento</Box>) : (<Box>Aplicar Cambios</Box>)}
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