import { Typography } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import Navbar from './components/Navbar';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const useStyle = makeStyles({
  BotonPersonalisado: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  }
})


export const IglesiaPage = () => {
  const classes = useStyle()
  return (
    <>
      <div >
          <div>
            <Navbar/>
            
        </div>
          <div>
              <Button
                  variant = "outlined"  href="http://localhost:5173/auth/login" size="small" align='justify' color ="primary" endIcon ={<AppRegistrationIcon/>
                  
                  } paragraph >Registrar Usuarios
              </Button>
          </div>
          <div>
              <Button
                  variant = "outlined"  href="http://localhost:5173/auth/login" size="small" align='justify' color ="primary" endIcon ={<SearchIcon />
                  
                  }>Buscar Documento
              </Button>
          </div>
          <div>
              <Button
                  className={classes.BotonPersonalisado} variant = "outlined"  href="http://localhost:5173/auth/login" size="small" align='justify' color ="primary" endIcon ={<DeleteForeverIcon />
                  
                  }>Eliminar Usuarios
              </Button>
          </div>

          
        </div>

    </>
  )
}