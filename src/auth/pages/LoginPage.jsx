import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

export const LoginPage = () => {


  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    // console.log({loginEmail, loginPassword});
  }
 

  return (     
    <AuthLayout title="Iniciar Sesión">
      <form onSubmit={loginSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="ejemplo@gmail.com"
                fullWidth
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type="submit">
                  INICIAR SESIÓN
                </Button>
              </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
              
            </Grid>


          </Grid>
        </form>
    </AuthLayout>   
        

  )
}
