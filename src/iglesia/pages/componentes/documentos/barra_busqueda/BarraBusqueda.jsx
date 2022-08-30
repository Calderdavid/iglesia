import { Box, HStack, Input, Stack, VStack } from "@chakra-ui/react";
import Styles from './BarraBusqueda.module.scss'
import Select from 'react-select'
import { Button } from '@chakra-ui/react'
import {CheckIcon} from '@chakra-ui/icons'
import { useState } from "react";

const options = [
    {value: 'NOMBRE', label: 'Nombre'},
    {value: 'APELLIDO', label: 'Apellido'},
    {value: 'FECHAINSCRIPCION', label: 'Fecha Inscripción'},
    {value: 'BAUTISMO', label: 'Bautismo'},
    {value: 'CONFIRMACION', label: 'Confirmación'},
    {value: 'MATRIMONIO', label: 'Matrimonio'}
]

export default function BarraBusqueda() {
    const [displaySelectButtonOne, setDisplaySelect] = useState(false)
    const [displaySelectButtonTwo, setDisplaySelectButtonTwo] = useState(false)
    const [displaySelectButtonThree, setDisplaySelectButtonThree] = useState(false)
    const handleButtonOneOnPress = () => {
        setDisplaySelect(!displaySelectButtonOne)
    }
    const handleButtonTwoOnPress = () => {
        setDisplaySelectButtonTwo(!displaySelectButtonTwo)
    }
    const handleButtonThreeOnPress = () => {
        setDisplaySelectButtonThree(!displaySelectButtonThree)
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
                            <Input w="13vw"
                                placeHolder = "Ingresa el texto aquí..."
                            />
                        <Box marginLeft= "40vw">
                            ¿Qué Buscas?
                        </Box>
                        
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
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
}