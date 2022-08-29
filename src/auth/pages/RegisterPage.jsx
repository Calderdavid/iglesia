import React, { useEffect } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../hooks/usAuthStore'

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {

  const { startRegister, errorMessage } = useAuthStore();

  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  const saveData = async (name,email,password) => {
    let result = await fetch("http://localhost:8000/register",{
        method:"post",
        body: JSON.stringify({name,email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    result = await result.json();
    console.log(result);
    }

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Las contraseñas no coinciden', 'error');
      return
    }
    saveData(registerName,registerEmail,registerPassword);
    // startRegister({name: registerName, email: registerEmail, password: registerPassword});

  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }    
  }, [errorMessage])

  return (     
    <AuthLayout title="Crear cuenta">
      <form onSubmit={registerSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label="Nombre completo" 
                  type="text" 
                  placeholder="Nombre completo"
                  fullWidth
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="ejemplo@gmail.com"
                fullWidth
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Repita la contraseña"
                fullWidth
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type="submit">
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar 
              </Link>
              
            </Grid>


          </Grid>
        </form>
    </AuthLayout>   
        

  )
}
