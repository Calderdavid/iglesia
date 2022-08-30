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

export default function Tablero() {

    // variables de prueba
    
    const dataTable = {
        Headers: ["ID", "Nombre / Apellido", "Fecha inscripción", "Sacramentos", "Ver", "Eliminar"],
        Data: [
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", fecha_inscripcion: "29/12/2021", bautismo: false, confirmacion: false, matrimonio: false},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: false},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", fecha_inscripcion: "29/12/2021" , bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: false, matrimonio: true},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000001", name: "Lucia", lastname: "Jerez", fecha_inscripcion: "29/12/2021", bautismo: false, confirmacion: true, matrimonio: true},
        {_id: "0000000002", name: "Elisa", lastname: "Sánchez", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000003", name: "Ibai", lastname: "Heras", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000004", name: "Brian", lastname: "Melgar", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000005", name: "Máximo", lastname: "Arroyo", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: false},
        {_id: "0000000006", name: "María", lastname: "Elvira Izquierdo", fecha_inscripcion: "29/12/2021", bautismo: false, confirmacion: true, matrimonio: true},
        {_id: "0000000007", name: "Rosana", lastname: "Aguado", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: false, matrimonio: true},
        {_id: "0000000008", name: "Marcos", lastname: "Tejedor", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: true},
        {_id: "0000000009", name: "Mari", lastname: "Perea", fecha_inscripcion: "29/12/2021", bautismo: true, confirmacion: true, matrimonio: false}]
    }
    
    const [dataTablee, setDataTable] = useState({Headers: ["ID", "Nombre / Apellido", "Fecha inscripción", "Sacramentos", "Ver", "Eliminar"],
    Data: []})

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
                            {data._id}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.name} {data.lastname}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            {data.fecha_inscripcion}
                        </Td>
                        <Td color="#646464" borderColor="#70ACB5"  backgroundColor="white" padding=".8vw 0 .8vw 0">
                            <HStack spacing="12%" justifyContent="center">
                                {(data.bautismo === true ) ? ( <Image src={bautismo_black} alt="Ver" w="1.5vw" />): ( <Image src={bautismo_white} alt="Borrar" w="1.4vw" />)}
                                {(data.confirmacion === true ) ? ( <Image src={confirmacion_black} alt="Ver" w="1.5vw" />): ( <Image src={confirmacion_white} alt="Borrar" w="1.4vw" />)}
                                {(data.matrimonio === true ) ? ( <Image src={matrimonio_black} alt="Ver" w="1.5vw" />): ( <Image src={matrimonio_white} alt="Borrar" w="1.4vw" />)}
                            </HStack>
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