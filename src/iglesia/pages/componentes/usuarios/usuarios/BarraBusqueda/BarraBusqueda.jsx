import { VStack, HStack, Box, Input, Image } from "@chakra-ui/react"
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import Plus from '../../../../../../assets/images/plus.png'

import { useDispatch } from "react-redux"
import { onAddUser } from '../../../../../../store/usuarios/addUser'
import { onViewUser, onVerYEditar } from "../../../../../../store/usuarios/viewuser"
import { onGetUser } from "../../../../../../store/usuarios/getUser"
import { useState, useEffect } from "react"
import iglesiaApi from '../../../../../../api/iglesiaApi';

export default function BarraBusqueda() {
    const options = [
        {value: 'NOMBRE', label: 'NOMBRE'},
        {value: 'APELLIDO', label: 'APELLIDO'},
        {value: 'CORREO', label: 'CORREO'},
        {value: 'ID', label: 'ID'}
    ]

    const defaultData = {
        search: "",
        buscar: "",
        ordenar: ""
    }

    const dispatch = useDispatch()
    const [data, setData] = useState(defaultData)
    const [users, setUsers] = useState([])
    const [firstLoad, setFirstLoad] = useState(0)

    // esto corresponde al boton para agregar usuarios
    const agregarUsuario = (event) => {
        event.preventDefault();
        dispatch(onAddUser({ Show:true }))
        dispatch(onViewUser(false))
        dispatch(onVerYEditar(true))
    }

    // guardamos los valores del input
    const handleInputText = (event) => {
        setData({
            ...data,
            buscar: event.target.value
        })
    }

    // guardamos los valores de ambos select
    const handleSelectValue = (tag) => (event) => {
        if(tag == "orderby"){
            setData({
                ...data,
                ordenar: event.value
            })
        }
        if(tag == "search"){
            setData({
                ...data,
                search: event.value
            })
        }
    }

    // evitamos que se realize la peticion al momento de cargar la pagina
    useEffect(() => {
        getfiltro()
    },[data.buscar, data.search])

    // consulta y retorna los usuarios que coincidan con los resultados
    const getfiltro = async () => {
        const peticion = await iglesiaApi.post('/getusers', { search: data.search, buscar: data.buscar })
        setUsers(peticion.data.users)
        dispatch(onGetUser(peticion.data.users))
    }

    // para ordenar los usuarios y evita que se ejecute al cargar la página
    useEffect(() => {
        if(firstLoad > 0) {
            filtrar()
        } else {
            setFirstLoad(firstLoad+1)
        }
    },[data.ordenar])

    // funcion que ordena los usuarios
    const filtrar = async () => {
        const usuarios = Array.from(users)

        if (data.ordenar == "NOMBRE")
        {
            usuarios.sort((a,b) => {
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
        if (data.ordenar == "APELLIDO")
        {
            usuarios.sort((a,b) => {
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
        if (data.ordenar == "CORREO")
        {
            usuarios.sort((a,b) => {
                const emailA = a.email
                const emailB = b.email
                
                if (emailA < emailB) {
                    return -1;
                  }
                  if (emailA > emailB) {
                    return 1;
                  }
                
                  // names must be equal
                  return 0;
            })
        }
        if (data.ordenar == "ID")
        {
            usuarios.sort((a,b) => {
                const idA = a._id
                const idB = b._id
                
                if (idA < idB) {
                    return -1;
                  }
                  if (idA > idB) {
                    return 1;
                  }
                
                  // names must be equal
                  return 0;
            })
        }
        dispatch(onGetUser(usuarios))
    }

    return(
        <Box padding="1.5vw 0 0 .8vw">
            <HStack>
                <VStack alignItems="start">
                    <Box paddingLeft="1.2vw">
                        Buscar por:
                    </Box>
                    <HStack>
                        <Box>
                            <Select
                                className={Styles.select}
                                options={options}
                                onChange={handleSelectValue("search")}
                            />
                        </Box>
                        <Box paddingLeft="1vw">
                            <Input
                                backgroundColor="white"
                                className={Styles.input}
                                placeholder="Ingresa el texto aquí..."
                                size="xl"
                                focusBorderColor="rgb(112, 172, 181)"
                                value={data.buscar}
                                name="Frame"
                                onChange={handleInputText}
                            />
                        </Box>
                        <Box w="25vw" h="2vw" />
                        </HStack>
                </VStack>
                <HStack>
                    <VStack alignItems="start">
                        <Box paddingLeft="1.2vw">
                            Ordenar por:
                        </Box>
                        <Box paddingRight="2vw">
                            <Select
                                className={Styles.select}
                                options={options}
                                onChange={handleSelectValue("orderby")}
                            />
                        </Box>
                    </VStack>
                    <Box paddingTop="1.5vw">
                        <Box className={Styles.boton} onClick={(event) => agregarUsuario(event)}>
                            <Box paddingLeft="1vw">
                                <Image src={Plus} alt="Borrar" w="1.2vw" />
                            </Box>
                            <Box paddingLeft=".5vw">
                                Añadir Usuario
                            </Box>
                        </Box>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    )
}