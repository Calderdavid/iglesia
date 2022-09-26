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

import { onShowBautismo, onAddBautismo } from '../../../../../store/documentos/addSacramentos'

import Styles from './PopUp.module.scss'

export default function PopUpBautismo(props) {
    const defaultData = {
        padrino: "",
        madrina: "",
        fecha: "",
        padre: "",
        lugar: "",
    }
    const { ShowBautismo, Bautismo } = useSelector((state) => state.addsacramentos)
    const { Show } = useSelector((state) => state.adddocument)
    
    const dispatch = useDispatch()
    const disable = props.active
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState(Bautismo)
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

    const agregandoBautismo = async (event) => {
        event.preventDefault();
        dispatch(onAddBautismo(data))
        onClose()
    }

    useEffect(() => {
        if (ShowBautismo.Show == true && disable == false) {
            // setData(defaultData)
            onOpen()
        }
      }, [ShowBautismo.Show])

    useEffect(() => {
    if (Show.Show == false) {
        setData(defaultData)
    }
    }, [Show.Show])

    useEffect(() => {
    if (
        (isOpen === false && ShowBautismo.Show === true && disable === false) ||
        (ShowBautismo.Show === true && disable === true && isOpen === false)
    ) {
        dispatch(onShowBautismo({ ShowBautismo: false }))
    }},[ShowBautismo.Show])

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Agregar Bautismo
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
                            <Button colorScheme="orange" variant="solid" onClick={handleButtonPress} >
                                Colocar Fecha Actual
                            </Button>
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
                <Button
                colorScheme="orange"
                backgroundColor="rgb(238, 152, 81)"
                variant="solid"
                mr={3}
                onClick={agregandoBautismo}
                >
                Agregar Bautismo
                </Button>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}