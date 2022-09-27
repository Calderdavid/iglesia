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

import { onEdit } from "../../../../../store/documentos/addSacramentos";
import { onActualizarDocumentos } from "../../../../../store/documentos/actualizardocumento";
import { onAddDocument, onVerYEditar } from '../../../../../store/documentos/addDocument'

/*import { useForm } from '../../hooks/useForm'*/
/*const llamarfiltrado = (event) => {
    event.preventDefault();
    dispatch(onAddUser({ Show:true }))
    }*/

export default function BarraBusqueda() {
    const dispatch = useDispatch()
    const options = [
        {value: 'NOMBRE', label: 'Nombre'},
        {value: 'MAS ANTIGUO', label: 'Mas Antiguo'},
        {value: 'MAS RECIENTE', label: 'Mas Reciente'}
    ]
    const dataConstruct = {
        selectValue: "",
        texto: ""
    }

    const convertirFecha = (fechaString) => {
        let fechaSp= fechaString.split("-");
        let anio = new Date().getFullYear();
        if(fechaSp.length ==3){
            anio = fechaSp[0];
        }
        let mes = fechaSp[2]-1
        let dia = fechaSp[2];
        return new Date(anio,mes,dia);
    }


    const [displaySelectButtonOne, setDisplaySelect] = useState(true)
    const [displaySelectButtonTwo, setDisplaySelectButtonTwo] = useState(true)
    const [displaySelectButtonThree, setDisplaySelectButtonThree] = useState(true)
    const [Eleccion, setEleccion] = useState()
    const [data, setData] = useState(dataConstruct)

    const [ListadoDocumento, setListaDocumento] = useState([])
    const [listaDesordenada, setlistadesordenada]= useState([])
    
    // checkbox usando botones
    const handleButtonOneOnPress = () => {
        setDisplaySelect(!displaySelectButtonOne)
        getfiltrobottonBautismoOffON()
    }
    const handleButtonTwoOnPress = () => {
        setDisplaySelectButtonTwo(!displaySelectButtonTwo)
        getfiltrobottonMatrimonioOffON()
    }
    const handleButtonThreeOnPress = () => {
        setDisplaySelectButtonThree(!displaySelectButtonThree)
        getfiltrobottonConfirmacionOffON()
    }


    const handleSelectValue = (event) => {
        setData({
            ...data,
            selectValue: event.value
        })
        setEleccion(event.value)
        
    }

    useEffect(() => {
        // cada vez que eleccion se ejecute la funcion de abajo se ejecuta
        Ordenado()
    },[Eleccion])

    const handleInputChange = (event) => {
        setData({
            ...data,
            texto: event.target.value
        })
    }
    const getfiltrobottonBautismoOn = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto: ""})
        
        setListaDocumento(peticion.data.Bautismo)
        console.log(peticion.data.Bautismo)
    }

    const getfiltrobottonBautismoOff = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto:""})
        setListaDocumento(peticion.data.doc)

    }
    const getfiltrobottonBautismoOffON = async () => {
        let contador = 2
        console.log(contador)
        {!displaySelectButtonOne ? (
        contador =2 ): (contador = 1)}
        {(contador !=2) ? (getfiltrobottonBautismoOn()): (getfiltrobottonBautismoOff())}
        console.log(contador)
    }
    const getfiltrobottonMatrimonioOn = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto: ""})
        
        setListaDocumento(peticion.data.Matrimonio)
        console.log(peticion.data.Matrimonio)
    }
    const getfiltrobottonMatrimonioOff = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto:""})
        setListaDocumento(peticion.data.doc)

    }
    const getfiltrobottonMatrimonioOffON = async () => {
        let contador = 2
        
        {!displaySelectButtonTwo ? (
        contador =2 ): (contador = 1)}
        {(contador !=2) ? (getfiltrobottonMatrimonioOn()): (getfiltrobottonMatrimonioOff())}
        
    }
    const getfiltrobottonConfirmacionOn = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto: ""})
        
        setListaDocumento(peticion.data.Confirmacion)
        console.log(peticion.data.Confirmacion)
    }
    const getfiltrobottonConfirmacionOff = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto:""})
        setListaDocumento(peticion.data.doc)

    }
    const getfiltrobottonConfirmacionOffON = async () => {
        let contador = 2
        console.log(contador)
        {!displaySelectButtonThree ? (
        contador =2 ): (contador = 1)}
        {(contador !=2) ? (getfiltrobottonConfirmacionOn()): (getfiltrobottonConfirmacionOff())}
        console.log(contador)
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
    
    
    
    const Ordenado = async () => {
        const peticion = await iglesiaApi.post('/getdocument', { texto: data.texto, selectedValue: data.selectValue})
        
        setlistadesordenada(peticion.data.doc)

        const eleccion = Eleccion
        //console.log(eleccion)
        if(eleccion === "NOMBRE"){

            listaDesordenada.sort((a, b) => {
                if(a.name >b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;

            });
        }  
        if(eleccion === "MAS ANTIGUO"){
           
            listaDesordenada.sort((a, b) => {
                return convertirFecha(a.inscr_Date)-convertirFecha(b.inscr_Date);
            });
        
        };
        
        if(eleccion === "MAS RECIENTE"){
            
            listaDesordenada.sort((a, b) => {
                return convertirFecha(b.inscr_Date)-convertirFecha(a.inscr_Date);
            });
        }
        
            console.log(listaDesordenada)
            setListaDocumento(listaDesordenada) 
    }


    /*useEffect(() =>{
        const sortedList = [...listaDesordenada].sort((a,b) => (a>b ? 1 : a < b ? -1 :0))
        setlistadesordenada(sortedList)
    },[])*/

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