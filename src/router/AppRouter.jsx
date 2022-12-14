import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages'
import { useAuthStore } from '../hooks/usAuthStore'
import { Documentos } from '../iglesia/pages/Documentos'
import { Usuarios } from '../iglesia/pages/Usuarios'
import { IglesiaPage } from "../iglesia/pages/IglesiaPage"
import { ExportBaptism } from '../iglesia/pages/ExportBaptism'
import { ExportConfirmacion } from '../iglesia/pages/ExportConfirmacion'
import { ExportMatrimonio } from '../iglesia/pages/ExportMarriage'


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
  
  

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
        {
          (status === 'not-authenticated')
            ? (
              <>
                <Route path="/auth/*" element={<LoginPage />}/>
                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
              </>
            )
            : (
              <>
                <Route path="/" element={<IglesiaPage />}/>
                <Route path="/Documentos" element={<Documentos/>} />
                <Route path="/Usuarios" element={<Usuarios/>} />
                <Route path="/ExportBaptism" element={ <ExportBaptism/> } />
                <Route path="/ExportConfirmacion" element={ <ExportConfirmacion/> } />
                <Route path="/ExportMatrimonio" element={ <ExportMatrimonio/> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
              </>
            )
        }
    </Routes>
  )
}