import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
import App from './App'
import '../styles/index.css'
// import { store } from '../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

const Render: FC = () => {
  return (
      <BrowserRouter>
          <App />
      </BrowserRouter>
  )
}

if( typeof window !== "undefined" ) {

  const container = document.getElementById('root') as HTMLElement
  //@ts-ignore
  if( import.meta.hot || !container?.innerText ) {
    const root = ReactDOM.createRoot( container! )
    root.render( <Render/> )
  } else {
    window.requestIdleCallback( () => {
      console.log( "hydrating app..." )
      const container = document.getElementById('root') as HTMLElement
      ReactDOM.hydrateRoot( container!, <Render/> )
    } )
  }
}