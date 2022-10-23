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
    HStack,
    useToast,
    VStack,
    Textarea,
  } from '@chakra-ui/react'

import Select from 'react-select'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAddDocument, onEditDocument, onVerYEditar } from '../../../../../store/documentos/addDocument'
import { onShowMatrimonio, onShowBautismo, onShowConfirmacion, onAddBautismo, onEdit } from '../../../../../store/documentos/addSacramentos'

import Swal from "sweetalert2";

import iglesiaApi from '../../../../../api/iglesiaApi';

export default function PopUp(props) {
    const defaultData = {
        Documento: {
            n_id: "",
            rut: "",
            name: "",
            lastname: "",
            birth: "",
            birthplace: "",
            email: "",
            Obs: "",
            inscr_Date: "",
            address: "",
            phone: "",
            Referencia: "",
        },
        A_parent: false,
        parent_Data:{
            p_father: "",
            p_mother: "",
            p_phone_father: "",
            p_phone_mother: "",
            p_lugar: "",
            p_parent_Status: "",
            p_relation: "",
        },
        A_bautismo: false,
        Bautismo:{
            b_place1: "",
            b_place2: "",
            b_date: "",
            b_father: "",
            b_padrino: "",
            b_padrino_data: {
                older: false,
                bautizado: false,
                p_comunion: false,
                confirmado: false,
                casado: false,
                casado_iglesia: false,
            },
            b_madrina: "",
            b_madrina_data: {
                older: false,
                bautizado: false,
                p_comunion: false,
                confirmado: false,
                casado: false,
                casado_iglesia: false,
            },
        },
        A_confirmacion: false,
        Confirmacion:{
            c_place1: "IGLESIA_PARROQUIAL",
            c_place2: "",
            c_date: "",
            c_father: "",
            c_padrino: "",
            c_madrina: "",
        },
        A_matrimonio: false,
        Matrimonio:{
            m_place1: "IGLESIA_PARROQUIAL",
            m_place2: "",
            m_partner: "",
            m_date: "",
            m_father: "",
            m_padrino: "",
            m_madrina: "",
        },
    }
    const options = [
        {value: 'IGLESIA_PARROQUIAL', label: 'Iglesia Parroquial'},
        {value: 'CAPILLA_PARROQUIAL', label: 'Capilla Parroquial'}
    ]

    const toast = useToast()
    const dispatch = useDispatch()
    const disable = props.active

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(defaultData)
    const [loading, isLoading] = useState(true)
    const finalRef = useRef()
    const { Show, DocumentInfo, VerYEditar } = useSelector((state) => state.adddocument)
    const { Editar } = useSelector((state) => state.addsacramentos)

    const handleDocumentInputText = (event) => {
        setData({
            ...data,
            Documento:{
                ...data.Documento,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleBaptismInputText = (event) => {
        if(event.target.value != "")
        {
            setData({
                ...data,
                A_bautismo: true,
                Bautismo: {
                    ...data.Bautismo,
                    [event.target.name]: event.target.value
                }
            })
        } else {
            setData({
                ...data,
                A_bautismo: false,
                Bautismo: {
                    ...data.Bautismo,
                    [event.target.name]: event.target.value
                }
            })
        }
    }
    const handleParentInputText = (event) => {
        if(event.target.value != "")
        {
            setData({
                ...data,
                A_parent: true,
                parent_Data:{
                    ...data.parent_Data,
                    [event.target.name]: event.target.value
                }
            })
        } else {
            setData({
                ...data,
                A_parent: false,
                parent_Data:{
                    ...data.parent_Data,
                    [event.target.name]: event.target.value
                }
            })
        }
    }

    const handleSelectValue = (event) => {
        setData({
            ...data,
            Bautismo:{
                ...data.Bautismo,
                b_place1: event.value
            }
        })
    }

    const handleBautismo = ()  => {
        dispatch(onShowBautismo({ Show: true }))
        dispatch(onEditDocument(data))
    }
    const handleConfirmacion = ()  => {
        dispatch(onShowConfirmacion({ Show: true }))
        dispatch(onEditDocument(data))
    }
    const handleMatrimonio = ()  => {
        dispatch(onShowMatrimonio({ Show: true }))
        dispatch(onEditDocument(data))
    }

    const EditandoDocumento = ()  => {
        dispatch(onVerYEditar(true))
    }

    const agregandoDocumento = async (event) => {
        event.preventDefault();
        if(!Editar)
        {
            const peticion = await iglesiaApi.post('/adddocument', data)
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
            const peticion = await iglesiaApi.post('/editdocument', data)
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
              dispatch(onEditDocument(defaultData))
          }
        
    }

    const handleLoadingEvent = async (event) => {
        const peticion = await iglesiaApi.post('/getadjacentdocuments', DocumentInfo)
        const structuredData = {
            ...DocumentInfo,
            parent_Data: {
                ...peticion.data.parent_Data
            },
            Bautismo: {
                ...peticion.data.Bautismo
            },
            Confirmacion: {
                ...peticion.data.Confirmacion
            },
            Matrimonio: {
                ...peticion.data.Matrimonio
            },
        }
        setData(structuredData)
    }

    useEffect(() => {
        if (Show.Show == true && disable == false) {
            if(!Editar)
            {
                setData(defaultData)
                isLoading(false)
            } else {
                isLoading(false)
                handleLoadingEvent()
            }
            onOpen()
        }
    }, [Show.Show])

    useEffect(() => {
        handleClose()
    },[Show.Show])

    const [windowSize, setWindowSize] = useState(getWindowSize());

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        setData(DocumentInfo)
    },[DocumentInfo])
    
    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="5xl" >
        <ModalOverlay />
        <ModalContent maxH="400vw" maxW={(windowSize.innerWidth <= 1596 ? "68vw" : "58vw")}>
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Documento</Box>) : (<>{!Editar ? (<Box>Agregar Documento</Box>) : (<Box>Editar Documento</Box>)}</>)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody >
            {!loading ? (
                <HStack>
                    <Box w="18vw">
                        <VStack paddingTop="1vw" alignItems="initial">
                            <HStack >
                                <Box w="1.5vw">
                                    N°
                                </Box>
                                <Box w="7vw">
                                    <Input name="n_id" borderColor="black" placeholder="001/2022" readOnly={!VerYEditar} value={data.Documento.n_id} onChange={handleDocumentInputText}/>
                                </Box>
                            </HStack>
                            <Box paddingTop="0.5vw">
                                <Button colorScheme="orange" variant="solid" onClick={handleBautismo} >
                                {!VerYEditar ? (<Box>Ver Bautismo</Box>) : (<>{!data.Bautismo._id ? (<Box>Añadir Bautismo</Box>) : (<Box>Editar Bautismo</Box>)}</>)}
                                </Button>
                            </Box>
                            <Box padding=".8vw 0 .8vw 0">
                                <Button colorScheme="orange" variant="solid" onClick={handleConfirmacion} >
                                {!VerYEditar ? (<Box>Ver Confirmación</Box>) : (<>{!data.Confirmacion._id ? (<Box>Añadir Confirmación</Box>) : (<Box>Editar Confirmación</Box>)}</>)}
                                </Button>
                            </Box>
                            <Box>
                                <Button colorScheme="orange" variant="solid" onClick={handleMatrimonio} >
                                {!VerYEditar ? (<Box>Ver Matrimonio</Box>) : (<>{!data.Matrimonio._id ? (<Box>Añadir Matrimonio</Box>) : (<Box>Editar Matrimonio</Box>)}</>)}
                                </Button>
                            </Box>
                            <Box w="12vw">
                                Otras Notas:
                            </Box>
                            <Box w="18vw">
                                <Textarea name="Obs" h="10vw" borderColor="black" value={data.Documento.Obs} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                            <HStack >
                                <Box w="12vw">
                                    Anotado en el índice pág.
                                </Box>
                                <Box w="6vw">
                                    <Input name="Referencia" borderColor="black" placeholder="1" value={data.Documento.Referencia} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                                </Box>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box h="30vw" w="1px" marginLeft="100vw" backgroundColor="gray">

                    </Box>
                    <Box w={(windowSize.innerWidth <= 1596 ? "45vw" : "35vw")} >
                        <HStack>
                            <Box w="3vw">
                                En la
                            </Box >
                            <Box w="12vw" borderColor="black" border="1px" borderRadius="5px">
                                <Select
                                    value={(data.Bautismo.b_place1 == "IGLESIA_PARROQUIAL" ? {label: options[0].label, value: options[0].value}:{label: options[1].label, value: options[1].value})}
                                    onChange={handleSelectValue}
                                    options={options}
                                    readOnly={!VerYEditar}
                                    />
                            </Box>
                            <Box w="15vw">
                                <Input name="b_place2" borderColor="black" placeholder="Santo Toribio" value={data.Bautismo.b_place2} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                            <Box >
                                el
                            </Box>
                            <Box >
                                <Input w="12vw"
                                    borderColor="black"
                                    placeholder="Select Date and Time"
                                    type="date"
                                    size="md"
                                    name="b_date"
                                    value={data.Bautismo.b_date}
                                    readOnly={!VerYEditar}
                                    onChange={handleBaptismInputText}
                                />
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="16vw">
                                bautizó y puso óleo y crisma
                            </Box>
                            <Box w="30vw">
                                <Input name="b_father" borderColor="black" placeholder="Nombre y Apellido del Padre" value={data.Bautismo.b_father} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w=".5vw">
                                a
                            </Box>
                            <Box w="22vw">
                                <Input name="name" borderColor="black" placeholder='Nombre del Bautizado' value={data.Documento.name} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                            <Box w="22vw">
                                <Input name="lastname" borderColor="black" placeholder='Apellido del Bautizado' value={data.Documento.lastname} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="7vw">
                                que nació en
                            </Box>
                            <Box w="23.2vw">
                                <Input name="birthplace" borderColor="black" placeholder='Lugar de Nacimiento' value={data.Documento.birthplace} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                            <Box w="1vw">
                                el
                            </Box>
                            <Box>
                                <Input w="12vw"
                                    borderColor="black"
                                    placeholder="Select Date and Time"
                                    type="date"
                                    size="md"
                                    name="birth"
                                    value={data.Documento.birth}
                                    onChange={handleDocumentInputText}
                                    readOnly={!VerYEditar}
                                    />
                            </Box>
                        </HStack>
                        <HStack padding={(windowSize.innerWidth <= 1596 ? "1vw 0 0 29vw" : "1vw 0 0 24vw")}>
                            <Box >
                                R.U.T.:
                            </Box>
                            <Box w="13vw">
                                <Input name="rut" borderColor="black" placeholder="12.345.678-9" value={data.Documento.rut} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="2vw">
                                hijo
                            </Box>
                            <Box w="8vw" >
                                <Input name="p_relation" borderColor="black" placeholder="Relacion" value={data.parent_Data.p_relation} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                            <Box w="2vw">
                                de
                            </Box>
                            <Box w="32vw">
                                <Input name="p_father" borderColor="black" placeholder="Nombre y Apellido del Papá" value={data.parent_Data.p_father} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="3vw">
                                y de
                            </Box>
                            <Box w="42vw">
                                <Input name="p_mother" borderColor="black" placeholder="Nombre y Apellido de la Mamá" value={data.parent_Data.p_mother} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box >
                                Padrinos:
                            </Box>
                            <Box w="19vw" >
                                <Input name="b_padrino" borderColor="black" placeholder="Nombre y Apellido del Padrino" value={data.Bautismo.b_padrino} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                            <Box w="20vw" >
                                <Input name="b_madrina" borderColor="black" placeholder="Nombre y Apellido de la Madrina" value={data.Bautismo.b_madrina} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                        </HStack>
                    </Box>
                </HStack>
                ) : (<Box padding="15% 0 15% 48%"><Spinner size="xl" thickness='4px' color="blue.500"/></Box>)}
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