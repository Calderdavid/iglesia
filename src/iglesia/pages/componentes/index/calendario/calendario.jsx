import { Box } from '@chakra-ui/react'
import Calendar from 'react-calendar'
import Styles from './calendario.module.scss'

export default function Calendario(){
    const today = new Date()

    return(
        <Box>
            <Box className={Styles.texto}>
                Calendario
            </Box>
            <Box margin="1vw 2vw 0 2vw">
                <Calendar activeStartDate={today} locale="es-ES" />
            </Box>
        </Box>
    )
}