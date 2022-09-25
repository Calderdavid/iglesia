import { Box, HStack, Input, Stack, VStack, FormControl,InputGroup,InputLeftElement,chakra, useEditable} from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import { Button } from '@chakra-ui/react'
import {CheckIcon} from '@chakra-ui/icons'
import { useState } from "react"
import React,{useEffect} from "react"
import iglesiaApi from '../../../../../api/iglesiaApi';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
//import { useDispatch } from "react-redux"
import Tablero from "../Tablero/TableroDocumento";

/*import { useForm } from '../../hooks/useForm'*/


export default function BarraBusqueda() {
    const [displaySelectButtonOne, setDisplaySelect] = useState(true)
    const [displaySelectButtonTwo, setDisplaySelectButtonTwo] = useState(true)
    const [displaySelectButtonThree, setDisplaySelectButtonThree] = useState(true)
    const dispatch = useDispatch()
    const options = [
        {value: 'NOMBRE', label: 'Nombre'},
        {value: 'APELLIDO', label: 'Apellido'},
        {value: 'FECHAINSCRIPCION', label: 'Fecha Inscripción'}
    ]
    /*const llamarfiltrado = (event) => {
    event.preventDefault();
    dispatch(onAddUser({ Show:true }))
    }*/
    const handleButtonOneOnPress = () => {
        setDisplaySelect(!displaySelectButtonOne)
    }
    const handleButtonTwoOnPress = () => {
        setDisplaySelectButtonTwo(!displaySelectButtonTwo)
    }
    const handleButtonThreeOnPress = () => {
        setDisplaySelectButtonThree(!displaySelectButtonThree)
    }
    const [ListadoDocumento, setListaDocumento] = useState([])
    const [ id, setId ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ email, setemail ] = useState('')
    const [ buscar, setBuscar ] = useState('')
    const [ texto, setTexto ] = useState('')
    const [ bandera, setBandera ] = useState(true)
    
    




    useEffect(() => {
        getDocumentos()
    },[])

    function filtrado (){
        return ListadoDocumento.filter((documento) =>
            documento.nombre.toLoweCase().indexof(buscar.toLowerCase()) >-1)
    }

    const getfiltro = async () => {
        //const res = await axios.get(URL+'/'+texto)
        const peticion = await iglesiaApi.post('/getdocument', {texto:texto})
        console.log(texto)
        setListaDocumento(res.data)
        dispatch(onActualizarDocumentos(peticion.doc))
        setDataTable({
            ...dataTable,
            Data: peticion.data.users
        })
        
    }


    const refresh = () =>{
        getDocumentos()
        setBuscar('')
      }
      
    const buscando = () => {
        setListaDocumento(filtrado())
    }
    
    const getDocumentos = async () => {
        const res = await axios.get(URL) 
        setListaDocumento(res.data) 
    }
    
    const addDocumento = async () => {
        let obj = { nombre, email } 
        const res = await  axios.post(iglesiaApi, obj) 
        console.log(res.data)
        setNombre('')
        setEdicion('')
    }  
    
    const deleteDocumento = async (id) => {
        const res = await axios.delete(iglesiaApi+'/'+id)
        console.log(res.data)
        getDocumentos()
    }
    
    const getDocumento = async (id) => {
        const res = await axios.get(iglesiaApi+'/obtener/'+id)
        setId(res.data._id)
        setNombre(res.data.nombre)
        setemail(res.data.email)
        setBandera(false)
    }
    
    const AgregarActualizarDocumento = () => {
        bandera? addDocumento() : update()   
    }
    
    const update = async () => {
        const obj = { id, nombre, email }
        const res = await axios.put(iglesiaApi, obj)
        console.log(res.data)
        setBandera(true)
        setNombre('')
        setemail('')
        getDocumentos()
    }
    
    return(
        <Box padding="1vw">
            <Box  >
                
                <VStack alignItems="start" marginLeft="1vw">
                    <Box >
                            Buscar Por:
                    </Box>

                    <HStack >
                        
                        <Box w="10vw">
                            <Select 
                            className={Styles.Select}
                            options={options}
                            
                            //onChange={(event) => {}}
                            />
                            
                        </Box > 
                            <Input w="13vw" className="form-control mb-2"
                                placeHolder = "Ingresa el texto aquí..."
                                
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                onKeyUp={getfiltro}
                                
                            />
                            
                        
                        <Stack direction='row' spacing={4} align='center'>
                            <Button colorScheme='teal' variant='outline' onClick={handleButtonOneOnPress}> 
                            {!displaySelectButtonOne ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Bautismo
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={4} align='center'>
                            <Button colorScheme='teal' variant='outline' onClick={handleButtonTwoOnPress}> 
                            {!displaySelectButtonTwo ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            
                            <Box>
                                Confirmación
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={4} align='center'>
                            <Button colorScheme='teal' variant='outline' onClick={handleButtonThreeOnPress}> 
                            {!displaySelectButtonThree ? (
                                <CheckIcon color='black' />
                                ) : <></>}
                            </Button>
                            <Box>
                                Matrimonio
                            </Box>
                            
                        </Stack>
                        <Input w="13vw"
                            placeholder="Select Date and Time"
                            size="md"
                            type="datetime-local"
                            />
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
}