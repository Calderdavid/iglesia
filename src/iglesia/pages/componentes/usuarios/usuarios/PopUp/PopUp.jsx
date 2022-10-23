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
import { onAddUser } from '../../../../../../store/usuarios/addUser'
import Swal from "sweetalert2";

import iglesiaApi from '../../../../../../api/iglesiaApi'
import Styles from './PopUp.module.scss'
import { onVerYEditar, onViewUser } from '../../../../../../store/usuarios/viewuser'

export default function PopUp(props) {
    const options = [
        {value: '*', label: '*'},
        {value: 'SECRETARIA', label: 'Secretario/a'},
        {value: 'FELIGRES', label: 'Feligrés'},
        {value: 'NINGUNO', label: 'Sin Rol'}
    ]
    const defaultData = {
        userData:{
            _id: "",
            name: "",
            lastname: "",
            email: "",
            password_id: "",
            phone: "",
            rol: "NINGUNO",
            lastSeen: ""
        },
        password: {
            password: ""
        }
    }
    const toast = useToast()
    const dispatch = useDispatch()
    const disable = props.active
    const [displayPassword, setDisplayPassword] = useState(false)
    const [passText, setPassText] = useState("password")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(defaultData)
    const finalRef = useRef()
    const { Show } = useSelector((state) => state.adduser)
    const { Ver, VerYEditar, UserData } = useSelector((state) => state.viewuser)

    const handleButtonPress = () => {
        setDisplayPassword(!displayPassword)
    }

    const handleInputText = (event) => {
        setData({
            ...data,
            userData:{
                ...data.userData,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handlePassInputText = (event) => {
        setData({
            ...data,
            password:{
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleChange = (opcion) => {
        setData({
            ...data,
            userData:{
                ...data.userData,
                rol: opcion.value,
            }
        })
    }

    const EditandoDocumento = ()  => {
        dispatch(onVerYEditar(true))
    }

    const agregandoUsuario = async (event) => {
        event.preventDefault();
        if(!Ver) {
            const peticion = await iglesiaApi.post('/register', data)
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
        } else {
            const peticion = await iglesiaApi.post('/edituser', data)
            if(peticion.data.status == true)
            {
                onClose()
                Swal.fire(
                    'Añadido',
                    'El usuario ha sido editado correctamente.',
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
                if (peticion.data.msg == "email cant be blank")
                {
                    mensaje = "El correo y/o la contraseña no pueden estar en blanco.";
                }
                if (peticion.data.msg == "user not found")
                {
                    mensaje = "El usuario no se ha encontrado ¿A lo mejor lo borraste anteriormente?.";
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
            if(!Ver) {
                setData(defaultData)
                
            } else {
                setData({
                    ...data,
                    userData:{
                        ...UserData,
                    }
                })
            }
            onOpen()
        }
      }, [Show.Show])

      useEffect(() => {
        if (
          (isOpen === false && Show.Show === true && disable === false) ||
          (Show.Show === true && disable === true && isOpen === false)
        ) {
            dispatch(onAddUser({ Show:false }))
        }},[Show.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Usuario</Box>) : (<>{!Ver ? (<Box>Agregar Usuario</Box>) : (<Box>Editar Usuario</Box>)}</>)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box >
                    <Box paddingBottom="1vw">
                        Nombre
                        <Input name="name" readOnly={!VerYEditar} value={data.userData.name} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Apellido
                        <Input name="lastname" readOnly={!VerYEditar} value={data.userData.lastname} onChange={handleInputText}/>
                    </Box>
                    <Box paddingBottom="1vw">
                        Correo
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <Input type='email' name="email" readOnly={!VerYEditar} value={data.userData.email} onChange={handleInputText}/>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Numero de Teléfono
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PhoneIcon color='rgb(238, 152, 81)' />
                            </InputLeftElement>
                            <NumberInput value={data.userData.phone} readOnly={!VerYEditar} >
                                <NumberInputField name="phone" type='tel'paddingLeft="2vw" onChange={handleInputText}/>
                            </NumberInput>
                        </InputGroup>
                    </Box>
                    <Box paddingBottom="1vw">
                        Rol
                        <Select
                            value={(data.userData.rol == "*" ? {label: options[0].label, value: options[0].value} : (data.userData.rol == "SECRETARIA" ? {label: options[1].label, value: options[1].value}:(data.userData.rol == "FELIGRES" ? {label: options[2].label, value: options[2].value}:{label: options[3].label, value: options[3].value})))}
                            className={Styles.select}
                            options={options}
                            readOnly={!VerYEditar}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box paddingBottom="1vw">
                        Contraseña
                        <HStack>
                            <Input type={passText} w="14vw" readOnly={!VerYEditar} value={data.password.password} name="password" onChange={handlePassInputText}/>
                            <Button colorScheme="orange" variant="solid" onClick={handleButtonPress} >
                            {!displayPassword ? (
                                <ViewIcon color='black' />
                                ) : <ViewOffIcon color='black' />}
                            </Button>
                        </HStack>
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
                    onClick={agregandoUsuario}
                    >
                    {!Ver ? (<Box>Agregar Usuario</Box>) : (<Box>Aplicar Cambios</Box>)}
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