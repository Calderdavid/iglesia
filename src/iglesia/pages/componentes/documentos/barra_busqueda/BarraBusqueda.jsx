import { Box, HStack, Input, Stack, VStack, Image, FormControl,InputGroup,InputLeftElement,chakra, useEditable} from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import { Button } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from "react"
import React,{ useEffect } from "react"
import iglesiaApi from '../../../../../api/iglesiaApi';
import { useDispatch } from 'react-redux'

import Plus from '../../../../../assets/images/plus.png'

import { onEdit } from "../../../../../store/documentos/addSacramentos";
import { onActualizarDocumentos } from "../../../../../store/documentos/actualizardocumento";
import { onAddDocument, onVerYEditar } from '../../../../../store/documentos/addDocument'

export default function BarraBusqueda() {
    const options = [
        {value: 'NOMBRE', label: 'Nombre'},
        {value: 'APELLIDO', label: 'Apellido'},
        {value: 'MAS_ANTIGUO', label: 'Mas Antiguo'},
        {value: 'MAS_RECIENTE', label: 'Mas Reciente'}
    ]
    const options2 = [
        {value: 'NOMBRE', label: 'Nombre'},
        {value: 'APELLIDO', label: 'Apellido'},
        {value: 'FECHAINSCRIPCION', label: 'Fecha de Inscripción'},
        {value: 'ID', label: 'id'}
    ]
    const dataConstruct = {
        selectValue: "default",
        search: "",
        orderby: ""
    }

    const dispatch = useDispatch()
    const [data, setData] = useState(dataConstruct)
    const [ListadoDocumento, setListaDocumento] = useState([])
    const [displayButton, setDisplayButton] = useState({
        b1: false,
        b2: false,
        b3: false
    })

    // guardamos el texto de la busqueda
    const handleInputChange = (event) => {
        setData({
            ...data,
            search: event.target.value
        })
    }

    // guardamos los select de ordenar por y buscar por
    const handleSelectValue = (name) => (event) => {
        if(name == "search"){
            setData({
                ...data,
                selectValue: event.value
            })
        }
        if(name == "orderby"){
            setData({
                ...data,
                orderby: event.value
            })
        }
    }

    // cambiar el estado del filtro
    const handleButtonOnPress = (name ,value) => () => {
        setDisplayButton({
            ...displayButton,
            [name]: value
        })
    }

    const getDocumentos = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { search: data.search, selectValue: data.selectValue})
        setListaDocumento(peticion.data.documents)
    }

    const filtrarSacramentos = async () => {
        const peticion = await iglesiaApi.post('/filterdocument', { docs: ListadoDocumento, displayButton: displayButton})
        getFiltro(peticion.data.docs)
        console.log(peticion.data)
    }

    const getFiltro = async (newList) => {
        const Documentos = (newList.length != 0 ? Array.from(newList) : Array.from(ListadoDocumento))

        if (data.orderby == "NOMBRE")
        {
            Documentos.sort((a,b) => {
                const nameA = a.nameE
                const nameB = b.nameE

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                
                // names must be equal
                return 0;
            })
        }
        if (data.orderby == "APELLIDO")
        {
            Documentos.sort((a,b) => {
                const lastnameA = a.lastnameE
                const lastnameB = b.lastnameE
                
                if (lastnameA < lastnameB) {
                    return -1;
                }
                if (lastnameA > lastnameB) {
                    return 1;
                }
                
                // names must be equal
                return 0;
            })
        }
        if (data.orderby == "MAS_RECIENTE")
        {
            Documentos.sort((a,b) => {
                const inscr_DateA = a.inscr_Date
                const inscr_DateB = b.inscr_Date
                
                if (inscr_DateA > inscr_DateB) {
                    return -1;
                }
                if (inscr_DateA < inscr_DateB) {
                    return 1;
                }
                
                // names must be equal
                return 0;
            })
        }
        if (data.orderby == "MAS_ANTIGUO")
        {
            Documentos.sort((a,b) => {
                const inscr_DateA = a.inscr_Date
                const inscr_DateB = b.inscr_Date
                
                if (inscr_DateA < inscr_DateB) {
                    return -1;
                }
                if (inscr_DateA > inscr_DateB) {
                    return 1;
                }
                
                // names must be equal
                return 0;
            })
        }
        console.log("asdasd")
        dispatch(onActualizarDocumentos(Documentos))
    }

    useEffect(() => {
        // queremos que cada vez que ListadoDocumento se actualize, la funcion de abajo se ejecute
        dispatch(onActualizarDocumentos(ListadoDocumento))
    
    },[ListadoDocumento])

    useEffect(() => {
        filtrarSacramentos()
    },[displayButton])

    // esto se ejecuta al cargar la pagina y al actualizar los campos de texto
    useEffect(() => {
        getDocumentos()
    },[data.search, data.selectValue])
    
    useEffect(() => {
        getFiltro([])
    },[data.orderby])

    useEffect(() => {
        setData({
            ...data,
            texto: ""
        })
    },[data.selectValue])

    const addDocumento = async () => {
        dispatch(onAddDocument({Show: true}))
        dispatch(onEdit(false))
        dispatch(onVerYEditar(true))
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
                                onChange={handleSelectValue("search")}
                                options={options2}
                                />
                        </Box > 
                            {!data.selectValue.match("FECHAINSCRIPCION") ? (
                                <Input w="13vw" className="form-control mb-2"
                                placeholder = "Ingresa el texto aquí..."
                                backgroundColor={"white"}
                                value={data.search}
                                onChange={handleInputChange}
                                
                            />
                                ) : ( 
                                <Input w="13vw"
                                backgroundColor={"white"}
                                placeholder="Select Date and Time"
                                type="date"
                                size="md"
                                value={data.search}
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
                            <Button colorScheme='teal' variant='outline' w=".5vw" onClick={handleButtonOnPress("b1", !displayButton.b1)}> 
                            {displayButton.b1 ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Bautismo
                            </Box>
                        </Stack>
                        <Stack direction='row' align='center' padding="0 1vw 0 1vw">
                            <Button colorScheme='teal' variant='outline' w="1vw" onClick={handleButtonOnPress("b2", !displayButton.b2)}> 
                            {displayButton.b2 ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Confirmacion
                            </Box>
                        </Stack>
                        <Stack direction='row' align='center' padding="0 1vw 0 1vw">
                            <Button colorScheme='teal' variant='outline' w="1vw" onClick={handleButtonOnPress("b3", !displayButton.b3)}> 
                            {displayButton.b3 ? (
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
                            onChange={handleSelectValue("orderby")}
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