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
import { CheckIcon } from '@chakra-ui/icons'

import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onEditDocument } from '../../../../../store/documentos/addDocument'
import { onShowBautismo } from '../../../../../store/documentos/addSacramentos'

export default function PopUpBautismo(props) {
    const { ShowBautismo, Editar } = useSelector((state) => state.addsacramentos)
    const { DocumentInfo, VerYEditar } = useSelector((state) => state.adddocument)
    
    const dispatch = useDispatch()
    const disable = props.active
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(DocumentInfo)
    const finalRef = useRef()

    const handleButtonOnPress = (event) => {
        event.preventDefault()
        setData({
            ...data,
            parent_Data:{
                ...data.parent_Data,
                p_parent_Status: event.target.name
            }
        })
    }

    const handleButtonPadrinoOnPress = (name ,value) => (event) => {
        event.preventDefault()
        setData({
            ...data,
            Bautismo:{
                ...data.Bautismo,
                b_padrino_data: {
                    ...data.Bautismo.b_padrino_data,
                    [name]: Boolean(value)
                }
            }
        })
    }

    const handleMadrinaOnPress = (name ,value) => (event) => {
        event.preventDefault()
        setData({
            ...data,
            Bautismo:{
                ...data.Bautismo,
                b_madrina_data: {
                    ...data.Bautismo.b_madrina_data,
                    [name]: Boolean(value)
                }
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
        if(event.target.value != "" && event.target.name != "")
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

    const agregandoBautismo = async (event) => {
        event.preventDefault();
        dispatch(onEditDocument(data))
        onClose()
    }

    useEffect(() => {
        if (ShowBautismo.Show == true && disable == false) {
            setData(DocumentInfo)
            onOpen()
        }
      }, [ShowBautismo.Show])

    useEffect(() => {
    if (
        (isOpen === false && ShowBautismo.Show === true && disable === false) ||
        (ShowBautismo.Show === true && disable === true && isOpen === false)
    ) {
        dispatch(onShowBautismo({ ShowBautismo: false }))
    }},[ShowBautismo.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent maxH="400vw" maxW="48vw">
            <ModalHeader>
            {!VerYEditar ? (<Box>Ver Bautismo</Box>) : (<>{!data.Bautismo._id ? (<Box>Añadir Bautismo</Box>) : (<Box>Editar Bautismo</Box>)}</>)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box>
                    <VStack alignItems="initial">
                        <HStack >
                            <Box w="11vw">
                                Nombre del Padre
                            </Box>
                            <Box w="40vw">
                                <Input borderColor="black" placeholder="Nombre y Apellido del Papá" name="p_father" value={data.parent_Data.p_father} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box w="11vw">
                                Nombre de la Madre
                            </Box>
                            <Box w="40vw">
                                <Input borderColor="black" placeholder="Nombre y Apellido de la Mamá" name="p_mother" value={data.parent_Data.p_mother} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box w="11vw">
                                Dirección
                            </Box>
                            <Box w="40vw">
                                <Input name="address" placeholder="Direccion de la residencia del Bautizado" borderColor="black" value={data.Documento.address} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box w="16.3vw">
                                Teléfono
                            </Box>
                            <Box>
                                <Input name="phone" placeholder="Telefono de contacto del Bautizado" borderColor="black" value={data.Documento.phone} readOnly={!VerYEditar} onChange={handleDocumentInputText}/>
                            </Box>
                            <Box>
                            Celular Padre
                            </Box>
                            <Box>
                                <Input name="p_phone_father" placeholder="Telefono de contacto del Papá" borderColor="black" value={data.parent_Data.p_phone_father} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                            <Box>
                            Celular Madre
                            </Box>
                            <Box>
                                <Input name="p_phone_mother" placeholder="Telefono de contacto de la Mamá" borderColor="black" value={data.parent_Data.p_phone_mother} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                    </VStack>
                    <Box backgroundColor="gray" h="1px" w="45vw" margin="1vw 0 1vw 0"></Box>
                    <VStack alignItems="initial">
                        <HStack>
                            <Box w="10vw">
                                Padres casados por la iglesia
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name='IGLESIA' isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == "IGLESIA" ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="6vw" paddingLeft="1vw">
                                Parroquia
                            </Box>
                            <Box w="40vw">
                                <Input name="p_lugar" placeholder="Santo Toribio" borderColor="black" value={data.parent_Data.p_lugar} readOnly={!VerYEditar} onChange={handleParentInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="15vw">
                                Padres casados solo por el Civil
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name="CIVIL" isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == "CIVIL" ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="17vw" paddingLeft="2vw">
                                Padres Actualmente Separados
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name='SEPARADOS' isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == 'SEPARADOS' ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="16vw">
                                Padres separados y vueltos a casar
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name="SEPARADOS_CASADOS" isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == "SEPARADOS_CASADOS" ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="2vw">
                                Padres no casados
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name="NO_CASADOS" isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == "NO_CASADOS" ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="9vw" paddingLeft="2vw">
                                Madre soltera
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" name="SOLTERA" isDisabled={!VerYEditar} onClick={handleButtonOnPress}> 
                                {data.parent_Data.p_parent_Status == "SOLTERA" ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                        </HStack>
                    </VStack>
                    <Box backgroundColor="gray" h="1px" w="45vw" margin="1vw 0 1vw 0"></Box>
                    <VStack alignItems="initial" fontSize=".8vw">
                        <HStack fontSize="1vw">
                            <Box w="12vw" >
                                Nombre del Padrino
                            </Box>
                            <Box w="40vw">
                                <Input name="b_padrino" placeholder="Nombre y Apellido del Padrino" borderColor="black" value={data.Bautismo.b_padrino} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="10vw">
                                Mayor de 16 años
                            </Box>
                            <Box w="2vw">
                            {!data.Bautismo.b_padrino_data.older}
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("older",!data.Bautismo.b_padrino_data.older)}> 
                                {data.Bautismo.b_padrino_data.older == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Bautizado Católico
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("bautizado",!data.Bautismo.b_padrino_data.bautizado)}> 
                                {data.Bautismo.b_padrino_data.bautizado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Primera Comunión
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("p_comunion",!data.Bautismo.b_padrino_data.p_comunion)}> 
                                {data.Bautismo.b_padrino_data.p_comunion == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Confirmado
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("confirmado",!data.Bautismo.b_padrino_data.confirmado)}> 
                                {data.Bautismo.b_padrino_data.confirmado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="8vw" paddingLeft="1vw">
                                Casado
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("casado",!data.Bautismo.b_padrino_data.casado)}> 
                                {data.Bautismo.b_padrino_data.casado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="8vw" paddingLeft="1vw">
                                Casado por la Iglesia
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleButtonPadrinoOnPress("casado_iglesia",!data.Bautismo.b_padrino_data.casado_iglesia)}> 
                                {data.Bautismo.b_padrino_data.casado_iglesia == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                        </HStack>
                    </VStack>
                    <VStack alignItems="initial" fontSize=".8vw" paddingTop="1vw">
                        <HStack fontSize="1vw">
                            <Box w="12vw" >
                                Nombre de la Madrina
                            </Box>
                            <Box w="40vw">
                                <Input name="b_madrina" placeholder="Nombre y Apellido de la Madrina" borderColor="black" value={data.Bautismo.b_madrina} readOnly={!VerYEditar} onChange={handleBaptismInputText}/>
                            </Box>
                        </HStack>
                        <HStack paddingTop="1vw">
                            <Box w="10vw">
                                Mayor de 16 años
                            </Box>
                            <Box w="2vw">
                            {!data.Bautismo.b_madrina_data.older}
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("older",!data.Bautismo.b_madrina_data.older)}> 
                                {data.Bautismo.b_madrina_data.older == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Bautizado Católico
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("bautizado",!data.Bautismo.b_madrina_data.bautizado)}> 
                                {data.Bautismo.b_madrina_data.bautizado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Primera Comunión
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("p_comunion",!data.Bautismo.b_madrina_data.p_comunion)}> 
                                {data.Bautismo.b_madrina_data.p_comunion == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="11vw" paddingLeft="1vw">
                                Confirmado
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("confirmado",!data.Bautismo.b_madrina_data.confirmado)}> 
                                {data.Bautismo.b_madrina_data.confirmado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="8vw" paddingLeft="1vw">
                                Casado
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("casado",!data.Bautismo.b_madrina_data.casado)}> 
                                {data.Bautismo.b_madrina_data.casado == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
                            </Box>
                            <Box w="8vw" paddingLeft="1vw">
                                Casado por la Iglesia
                            </Box>
                            <Box w="2vw">
                                <Button colorScheme='teal' variant='outline' w="1vw" isDisabled={!VerYEditar} onClick={handleMadrinaOnPress("casado_iglesia",!data.Bautismo.b_madrina_data.casado_iglesia)}> 
                                {data.Bautismo.b_madrina_data.casado_iglesia == true ? (
                                    <CheckIcon color='black' />
                                    ) : <></>}
                                </Button>
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
                onClick={agregandoBautismo}
                >
                {!Editar ? (<Box>Agregar Bautismo</Box>) : (<Box>Aplicar Cambios</Box>)}
                </Button>)}
                
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}