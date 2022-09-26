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
    useToast
  } from '@chakra-ui/react'
import { PhoneIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Select from 'react-select'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAddDocument } from '../../../../../store/documentos/addDocument'
import Swal from "sweetalert2";

import iglesiaApi from '../../../../../api/iglesiaApi';
import Styles from './PopUp.module.scss'

export default function PopUp(props) {
    const options = [
        {value: '*', label: '*'},
        {value: 'SECRETARIA', label: 'Secretario/a'},
        {value: 'FELIGRES', label: 'Feligrés'},
        {value: 'NINGUNO', label: 'Sin Rol'}
    ]
    const defaultData = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        rol: "NINGUNO"
    }
    const toast = useToast()
    const dispatch = useDispatch()
    const disable = props.active
    const [displayPassword, setDisplayPassword] = useState(false)
    const [passText, setPassText] = useState("password")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(defaultData)
    const finalRef = useRef()
    const { Show } = useSelector((state) => state.adddocument)

    const handleButtonPress = () => {
        setDisplayPassword(!displayPassword)
    }

    const handleInputText = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }
    const handleChange = (opcion) => {
        setData({
            ...data,
            rol: opcion.value,
        })
    }

    const agregandoUsuario = async (event) => {
        event.preventDefault();
        console.log(data)
        const peticion = await iglesiaApi.post('/register', data)
        console.log(peticion.data)
        if(peticion.data.status == true)
        {
            onClose()
            Swal.fire(
                'Añadido',
                'El usuario ha sido agregado al sistema.',
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
            if (peticion.data.msg == "email already exists")
            {
                mensaje = "El correo ya está registrado en el sistema.";
            }
            if (peticion.data.msg == "email or psswrd cant be blank")
            {
                mensaje = "El correo y/o la contraseña no pueden estar en blanco.";
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
        if(displayPassword == true)
        {
            setPassText("text")
        } else {
            setPassText("password")
        }
    },[displayPassword])

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
                                value={data.texto}
                                onChange={handleInputText}
                            />
                            <Button colorScheme="orange" variant="solid" onClick={handleInputText} >
                            {!displayPassword ? (
                                <ViewIcon color='black' />
                                ) : <ViewOffIcon color='black' />}
                            </Button>
                        </HStack>
                    </Box>
                    <Box paddingBottom="1vw">
                        Bautismo
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <Input type='email' name="email" value={data.email} onChange={handleInputText}/>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Confirmación
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <Input type='email' name="email" value={data.email} onChange={handleInputText}/>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Matrimonio
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <Input type='email' name="email" value={data.email} onChange={handleInputText}/>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Referencia
                        <Input type='email' name="email" value={data.email} onChange={handleInputText}/>
                    </Box>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button
                colorScheme="orange"
                backgroundColor="rgb(238, 152, 81)"
                variant="solid"
                mr={3}
                onClick={agregandoUsuario}
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