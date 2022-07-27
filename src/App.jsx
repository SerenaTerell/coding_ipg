import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import React from 'react'
import Home from './components/Home'

function App() {
  const [loggedin, setloggedin] = React.useState(false);

  function login(){
    setloggedin( prevLoggedin => !prevLoggedin)
    console.log(loggedin)
  }

  return (
    <div className="App">
      {loggedin ? <Home /> : <Login loggedin={loggedin} handleLogin={login}/>}
    </div>
  )
}

export default App
