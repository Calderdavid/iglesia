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
//import { useDispatch } from "react-redux"

import Ver from '../../../../../assets/images/view.png'
import Borrar from '../../../../../assets/images/delete.png'
import bautismo_black from '../../../../../assets/images/bautismo_black.png'
import bautismo_white from '../../../../../assets/images/bautismo_white.png'
import confirmacion_black from '../../../../../assets/images/confirmacion_black.png'
import confirmacion_white from '../../../../../assets/images/confirmacion_white.png'
import matrimonio_black from '../../../../../assets/images/matrimonio_black.png'
import matrimonio_white from '../../../../../assets/images/matrimonio_white.png'

import { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import iglesiaApi from '../../../../../api/iglesiaApi'

import { useSelector, useDispatch } from 'react-redux'

import { onAddBautismo, onAddConfirmacion, onAddMatrimonio, onEdit } from '../../../../../store/documentos/addSacramentos'
import { onAddDocument, onEditDocument, onVerYEditar } from '../../../../../store/documentos/addDocument' 

export default function Tablero() {
    const dispatch = useDispatch()
    // variables de prueba
    
    /*const dataTable = {
        Headers: ["ID", "Nombre / Apellido", "Fecha inscripción", "Sacramentos", "Ver", "Eliminar"],
        Data: [
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", fecha_inscripcion: "29/12/2021", Bautismo: false, Confirmacion: false, Matrimonio: false},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: false},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", fecha_inscripcion: "29/12/2021" , Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: false, Matrimonio: true},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", fecha_inscripcion: "29/12/2021", Bautismo: false, Confirmacion: true, Matrimonio: true},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: false},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", fecha_inscripcion: "29/12/2021", Bautismo: false, Confirmacion: true, Matrimonio: true},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: false, Matrimonio: true},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: true},
        {_id: "0000000009", name: "Mari", lastname: "Perea", fecha_inscripcion: "29/12/2021", Bautismo: true, Confirmacion: true, Matrimonio: false}]
    }*/
    const [selectedDocument, setSelecteddocument] = useState({})
    const [preventFirstLoad, setPreventFirstLoad] = useState(0);
    const [dataTable, setDataTable] = useState({Headers: ["ID", "Nombre / Apellido", "Fecha inscripción", "Sacramentos", "Ver", "Eliminar"],
    Data: []})
    
    const getFirstDocumentos = async () => {
        const peticion = await iglesiaApi.post('/getdocument', {search: "default", buscar: ""})
        console.log(peticion.dataTable)
        setDataTable({
            ...dataTable,
            Data: peticion.data.documents
        })
    }
    const { documento } = useSelector((state) => state.actualizardocumentos)

    useEffect(() => {
        setDataTable({
            ...dataTable,
            Data: documento
        })
    },[documento])

    const AlertDeleteDocument= async (i)  => {
        setSelecteddocument(dataTable.Data[i])
    }

    const ViewDocument= async (i)  => {
        dispatch(onEditDocument({
            _id: dataTable.Data[i]._id,
            Documento:{
                n_id: dataTable.Data[i].n_id,
                rut: dataTable.Data[i].rut, 
                name: dataTable.Data[i].name, 
                lastname: dataTable.Data[i].lastname, 
                birth: dataTable.Data[i].birth, 
                birthplace: dataTable.Data[i].birthplace, 
                email: dataTable.Data[i].email,
                Obs: dataTable.Data[i].Obs, 
                inscr_Date: dataTable.Data[i].inscr_Date,
                address: dataTable.Data[i].address,
                phone: dataTable.Data[i].phone,
                Referencia: dataTable.Data[i].Referencia,
                parent_Data:{
                    p_id: dataTable.Data[i].parent_Data.p_id,
                },
                Bautismo:{
                    b_id: dataTable.Data[i].Bautismo.b_id,
                },
                Confirmacion:{
                    c_id: dataTable.Data[i].Confirmacion.c_id,
                },
                Matrimonio:{
                    m_id: dataTable.Data[i].Matrimonio.m_id,
                },
                
            },
            parent_Data:{
                p_id: dataTable.Data[i].parent_Data.p_id,
            },
            Bautismo:{
                b_id: dataTable.Data[i].Bautismo.b_id,
            },
            Confirmacion:{
                c_id: dataTable.Data[i].Confirmacion.c_id,
            },
            Matrimonio:{
                m_id: dataTable.Data[i].Matrimonio.m_id,
            },
        }))
        dispatch(onEdit(true))
        dispatch(onVerYEditar(false))
        dispatch(onAddDocument({Show: true}))
    }

    const handleRemoveItem = () => {
        const backup = dataTable.Data
        const secondBackup = []
        for(var element in backup)
        {
            if (backup[element]._id != selectedDocument._id)
            {
                secondBackup.push(backup[element]);
            }
        }
        setDataTable({
            ...dataTable,
            Data: secondBackup
        });
    }
    const Deletedocument = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres borrar este documento?',
            text: `Documento: ${selectedDocument.name} ${selectedDocument.lastname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Quiero Borrarlo!'
        }).then( async (result) => {
            if (result.isConfirmed)
            {
                const {data} = await iglesiaApi.post('/deletedocument', selectedDocument)
                if (result.isConfirmed && data.status == true) {
                    Swal.fire(
                        'Borrado',
                        'El documento ha sido eliminado del sistema.',
                        'success'
                    )
                    handleRemoveItem()
                }
                if (result.isConfirmed && data.status == false) {
                    Swal.fire(
                        'Error',
                        'No puedes borrar este documento.',
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
            }
        })
    }
    useEffect(() => {
        if(preventFirstLoad == 1)
        {
            Deletedocument()
        } else {
            setPreventFirstLoad(preventFirstLoad+1)
        }
    },[selectedDocument])
    useEffect(() => {
        getFirstDocumentos();
    },[])
    return(
        <Box padding="1vw 0 0 2vw">
            <Box maxHeight="39vw" overflowY="scroll" borderRadius="15px" w="74.9vw">
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
                            {data.n_id}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.name} {data.lastname}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.inscr_Date}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                        <HStack spacing="12%" justifyContent="center">
                                {(data.Bautismo.b_id!= "" ) ? ( <Image src={bautismo_black} alt="Ver" w="1.5vw" />): ( <Image src={bautismo_white} alt="Borrar" w="1.4vw" />)}
                                {(data.Confirmacion.c_id != "" ) ? ( <Image src={confirmacion_black} alt="Ver" w="1.5vw" />): ( <Image src={confirmacion_white} alt="Borrar" w="1.4vw" />)}
                                {(data.Matrimonio.m_id != "" ) ? ( <Image src={matrimonio_black} alt="Ver" w="1.5vw" />): ( <Image src={matrimonio_white} alt="Borrar" w="1.4vw" />)}*/
                            </HStack>
                        </Td>
                        <Td color="#FF5B59" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            <Box className={Styles.ver} onClick={(event) => ViewDocument(i)}>
                                <Image src={Ver} alt="Ver" w="1.5vw" />
                            </Box>
                        </Td>
                        <Td color="#FF5B59" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            <Box className={Styles.borrar} onClick={(event) => AlertDeleteDocument(i)} >
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
