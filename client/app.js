import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app flex-center">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
