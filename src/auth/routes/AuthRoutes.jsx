import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { LoginPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}

