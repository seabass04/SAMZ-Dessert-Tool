import '../styles/globals.css'
import Navbar from '../components/navbar'
import React from 'react'
import Footer from '../components/footer'
import Button from '@mui/material/Button';
import { AuthProvider } from '../components/contexts/CurrentUser'

function App({ Component, pageProps }){
  return(
    <AuthProvider>
      <React.Fragment>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </React.Fragment>
    </AuthProvider>
  )
} 

export default App