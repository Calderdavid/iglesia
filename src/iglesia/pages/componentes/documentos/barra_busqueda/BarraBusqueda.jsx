import { Box, HStack, Input, Stack, VStack, Image, FormControl,InputGroup,InputLeftElement,chakra, useEditable} from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import { Button } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from "react"
import React,{ useEffect } from "react"
import iglesiaApi from '../../../../../api/iglesiaApi';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'

import Plus from '../../../../../assets/images/plus.png'

import { onActualizarDocumentos } from "../../../../../store/documentos/actualizardocumento";
import { onAddDocument } from '../../../../../store/documentos/addDocument'

/*import { useForm } from '../../hooks/useForm'*/
/*const llamarfiltrado = (event) => {
    event.preventDefault();
    dispatch(onAddUser({ Show:true }))
    }*/

export default function BarraBusqueda() {
    const dispatch = useDispatch()
    const options = [
        {value: 'NOMBRE', label: 'Nombre'},
        {value: 'APELLIDO', label: 'Apellido'},
        {value: 'FECHAINSCRIPCION', label: 'Fecha Inscripción'}
    ]
    const dataConstruct = {
        selectValue: "",
        texto: ""
    }

    const [displaySelectButtonOne, setDisplaySelect] = useState(true)
    const [displaySelectButtonTwo, setDisplaySelectButtonTwo] = useState(true)
    const [displaySelectButtonThree, setDisplaySelectButtonThree] = useState(true)

    const [data, setData] = useState(dataConstruct)

    const [ListadoDocumento, setListaDocumento] = useState([])
    
    // checkbox usando botones
    const handleButtonOneOnPress = () => {
        setDisplaySelect(!displaySelectButtonOne)
    }
    const handleButtonTwoOnPress = () => {
        setDisplaySelectButtonTwo(!displaySelectButtonTwo)
    }
    const handleButtonThreeOnPress = () => {
        setDisplaySelectButtonThree(!displaySelectButtonThree)
    }
    const handleSelectValue = (event) => {
        setData({
            ...data,
            selectValue: event.value
        })
    }
    const handleInputChange = (event) => {
        setData({
            ...data,
            texto: event.target.value
        })
    }

    useEffect(() => {
        // queremos que cada vez que ListadoDocumento se actualize, la funcion de abajo se ejecute
        dispatch(onActualizarDocumentos(ListadoDocumento))

    },[ListadoDocumento])

    useEffect(() => {
        setData({
            ...data,
            texto: ""
        })
    },[data.selectValue])

    useEffect(() => {
        getfiltro()
    },[data.texto])

    const getfiltro = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto: data.texto, selectedValue: data.selectValue })
        setListaDocumento(peticion.data.doc)
    }

    const addDocumento = async () => {
        dispatch(onAddDocument({Show: true}))
    }  
    
    return(
        <Box padding="1vw" className={Styles.Buscar} >
            <HStack >
                <VStack alignItems="start" marginLeft="1vw">
                    <Box w="7vw">
                            Buscar Por:
                    </Box>
                    <HStack w="23vw">
                        <Box w="10vw">
                            <Select
                                value={undefined}
                                className={Styles.Select}
                                onChange={handleSelectValue}
                                options={options}
                                />
                        </Box > 
                            {!data.selectValue.match("FECHAINSCRIPCION") ? (
                                <Input w="13vw" className="form-control mb-2"
                                placeholder = "Ingresa el texto aquí..."
                                backgroundColor={"white"}
                                value={data.texto}
                                onChange={handleInputChange}
                                
                            />
                                ) : ( 
                                <Input w="13vw"
                                backgroundColor={"white"}
                                placeholder="Select Date and Time"
                                type="date"
                                size="md"
                                value={data.texto}
                                onChange={handleInputChange}
                                />
                                )
                            }
                    </HStack>
                </VStack>
                <VStack alignItems="start" marginLeft="1vw">
                    <Box paddingLeft="1vw">
                            ¿Qué Buscas?
                    </Box>
                    <HStack >
                        <Stack direction='row' align='center' padding="0 1vw 0 1vw">
                            <Button colorScheme='teal' variant='outline' w=".5vw" onClick={handleButtonOneOnPress}> 
                            {!displaySelectButtonOne ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Bautismo
                            </Box>
                        </Stack>
                        <Stack direction='row' align='center' padding="0 1vw 0 1vw">
                            <Button colorScheme='teal' variant='outline' w="1vw" onClick={handleButtonTwoOnPress}> 
                            {!displaySelectButtonTwo ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            
                            <Box>
                                Confirmación
                            </Box>
                        </Stack>
                        <Stack direction='row' align='center' padding="0 1vw 0 1vw">
                            <Button colorScheme='teal' variant='outline' w="1vw" onClick={handleButtonThreeOnPress}> 
                            {!displaySelectButtonThree ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Matrimonio
                            </Box>
                        </Stack>
                    </HStack>
                </VStack>
                <VStack alignItems="start" marginLeft="1vw">
                    <Box>
                        Ordenar por
                    </Box>
                    <Box w="10vw">
                        <Select
                            value={undefined}
                            className={Styles.Select}
                            onChange={handleSelectValue}
                            options={options}
                        />
                    </Box>
                </VStack>
                <Box padding="1vw 0 0 1vw">
                    <Box className={Styles.ver} onClick={addDocumento}>
                        <Image src={Plus} alt="Ver" w="1.3vw" h="1.3vw" />
                    </Box>
                </Box>
            </HStack >
        </Box>
    )
}