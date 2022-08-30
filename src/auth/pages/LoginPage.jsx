import React, { useEffect, useState } from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from '../../hooks/useForm'
import { useAuthStore } from '../../hooks/usAuthStore'
import Swal from 'sweetalert2'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    // console.log({loginEmail, loginPassword});
    startLogin({email: loginEmail, password: loginPassword});
  }

  useEffect(() => {
    if( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])
 

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="rgb(238, 152, 81)" />
        <Heading color="rgb(238, 152, 81)">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={loginSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                    type="email" 
                    placeholder="Correo" 
                    name="loginEmail"
                    value={loginEmail}
                    onChange={onLoginInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={onLoginInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                backgroundColor="rgb(238, 152, 81)"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* <Box>
        New to us?{" "}
        <Link color="rgb(238, 152, 81)" href="#">
          Sign Up
        </Link>
      </Box> */}
    </Flex>
  );
};
