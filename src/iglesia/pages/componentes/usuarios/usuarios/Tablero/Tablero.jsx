import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Link,
    Select,
    Spinner,
    HStack,
  } from '@chakra-ui/react'
import Styles from './Tablero.module.scss'
import axios from 'axios'
import React from 'react'
import Ver from '../../../../../../assets/images/view.png'
import Borrar from '../../../../../../assets/images/delete.png'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import iglesiaApi from '../../../../../../api/iglesiaApi'







export default function Tablero() {

    // variables de prueba
    /*
    const dataTable = {
        Headers: ["ID", "Nombre / Apellido", "Correo Electrónico", "Última conexión", "Ver", "Eliminar"],
        Data: [
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", email: "ljerez@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", email: "esanchez@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", email: "iheras@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", email: "bmelgar@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", email: "marrollo@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", email: "melvirai@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", email: "raguado@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", email: "mtejedor@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", email: "ljerez@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", email: "esanchez@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", email: "iheras@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", email: "bmelgar@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", email: "marrollo@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", email: "melvirai@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", email: "raguado@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", email: "mtejedor@correo.com", ult_vez: "29/12/2021"},
        {_id: "0000000009", name: "Mari", lastname: "Perea", email: "mperea@correo.com", ult_vez: "29/12/2021"}]
    }
    */
    const [selectedUser, setSelectedUser] = useState({})
    const [preventFirstLoad, setPreventFirstLoad] = useState(0);
    const [dataTable, setDataTable] = useState({Headers: ["ID", "Nombre / Apellido", "Correo Electrónico", "Última conexión", "Ver", "Eliminar"],
    Data: []})

    const getFirstUsers = async () => {
        const peticion = await iglesiaApi.post('/getusers', {search: "default", buscar: ""})
        console.log(peticion.data.users)
        setDataTable({
            ...dataTable,
            Data: peticion.data.users
        })
    }

    const AlertDeleteUsers = async (i)  => {
        setSelectedUser(dataTable.Data[i])
    }

    const handleRemoveItem = () => {
        const backup = dataTable.Data
        const secondBackup = []
        for(var element in backup)
        {
            if (backup[element]._id != selectedUser._id)
            {
                secondBackup.push(backup[element]);
            }
        }
        setDataTable({
            ...dataTable,
            Data: secondBackup
        });
    }

    const DeleteUsers = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres borrar a este usuario?',
            text: `Usuario: ${selectedUser.name} ${selectedUser.lastname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Quiero Borrarlo!'
        }).then( async (result) => {

            const {data} = await iglesiaApi.post('/deleteuser', selectedUser)
            if (result.isConfirmed && data.status == true) {
                Swal.fire(
                    'Borrado',
                    'El usuario ha sido eliminado del sistema.',
                    'success'
                )
                handleRemoveItem()
            }
            if (result.isConfirmed && data.status == false) {
                Swal.fire(
                    'Error',
                    'No puedes borrar a este usuario.',
                    'error'
                )
            }
            if (result.isConfirmed && data.status == undefined) {
                Swal.fire(
                    'Error 500',
                    'Porfavor Informe al administrador',
                    'error'
                )
            }
        })
    }

    useEffect(() => {
        if(preventFirstLoad == 1)
        {
            DeleteUsers()
        } else {
            setPreventFirstLoad(preventFirstLoad+1)
        }
    },[selectedUser])

    useEffect(() => {
        getFirstUsers();
    },[])


    return(
        <Box padding="1vw 0 0 2vw">
            <Box maxHeight="26.5vw" overflowY="scroll" borderRadius="15px" w="74.9vw">
                <Table className={Styles.UVregular} >
                <Thead>
                <Tr>
                    {dataTable.Headers.map((header) => (
                    <Th
                        key={header}
                        color="white"
                        borderColor="white"
                        paddingTop="1%"
                        backgroundColor="rgb(238, 152, 81)"
                    >
                        {header}
                    </Th>
                    ))}
                </Tr>
                </Thead>
                    <Tbody >
                        {dataTable.Data.map((data, i) => (
                        <Tr key={i} >
                        <Td color="#173F8A" borderColor="#70ACB5" backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data._id}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.name} {data.lastname}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.email}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {/* data.ult_vez */}
                            27 diciembre 2021
                        </Td>
                        <Td color="#FF5B59" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            <Box className={Styles.ver}>
                                <Image src={Ver} alt="Ver" w="1.5vw" />
                            </Box>
                        </Td>
                        <Td color="#FF5B59" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            <Box className={Styles.borrar} onClick={(event) => AlertDeleteUsers(i)} >
                                <Image src={Borrar} alt="Borrar" w="1.4vw" />
                            </Box>
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
            </Table>
            </Box>
        </Box>
    )
}
