import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* cualquier otra ruta que no sea ninguna de login o register */}
        {/* va a navegar a login */}
        {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
    </Routes>
  )
}

