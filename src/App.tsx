import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import '../styles/index.css'
// import AppRoutes from './routes'
import Index from '../pages/index'
import AppRoutes from './routes'


const App: FC = () => {

    return (
        <AppRoutes/>
    )
}

export default App