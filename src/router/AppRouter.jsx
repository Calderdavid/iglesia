import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../auth/pages'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useAuthStore } from '../hooks/usAuthStore'
import { IglesiaRoutes } from '../iglesia/routes/IglesiaRoutes'
import { Documentos } from '../iglesia/pages/Documentos'
import { Usuarios } from '../iglesia/pages/Usuarios'
export const AppRouter = () => {

  // const { status } = useAuthStore();

  const status = "authenticated"

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
                <Route path="/auth/register" element={<RegisterPage />}/>
                <Route path="/auth/*" element={<LoginPage />}/>
                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
              </>
            )
            : (
              <>
                <Route path="/Documentos" element={<Documentos/>} />
                <Route path="/Usuarios" element={<Usuarios/>} />
                <Route path="/" element={<IglesiaRoutes />}/>
                <Route path="/*" element={ <Navigate to="/" /> } />
              </>
            )
        }
        {/* <Route path="/" element={<IglesiaRoutes />}/> */}
        {/* <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/*" element={<LoginPage />}/> */}
    </Routes>
  )
}