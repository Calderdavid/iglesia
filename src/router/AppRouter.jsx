import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useAuthStore } from '../hooks/usAuthStore'
import { IglesiaRoutes } from '../iglesia/routes/IglesiaRoutes'

export const AppRouter = () => {

  const { status } = useAuthStore();

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
                <Route path="/" element={<IglesiaRoutes />}/>
                <Route path="/*" element={ <Navigate to="/" /> } />
              </>
            )
        }
    </Routes>
  )
}