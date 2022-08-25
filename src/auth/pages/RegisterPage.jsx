import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {

  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);


  const registerSubmit = (event) => {
    event.preventDefault();
    // console.log({registerName, registerEmail, registerPassword, registerPassword2});
  }

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
