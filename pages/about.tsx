import Counter from '../components/islands/Counter'
import TitlePage from '../components/templates/TitlePage'
import React, { FC, useEffect, useState } from 'react'
import { default as styles } from '../styles/Hello.module.css'
import '../styles/index.css'

const App: FC = () => {

    return (
        <>
            <TitlePage/>
            <Counter/>
        </>
    )
}

export default App