import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { IglesiaRoutes } from '../iglesia/routes/IglesiaRoutes'

export const AppRouter = () => {

  return (
    <Routes>
        {/* Login y Registro */}
        <Route path="/auth/*" element={<AuthRoutes />}/>

        {/* IglesiaAPP  */}
        <Route path="/*" element={<IglesiaRoutes />}/>
    </Routes>
  )
}