import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import {StripeProvider} from 'react-stripe-elements';

const App = () => {
  return (
    <div className="app flex-center">
      <Navbar />
      {/* <StripeProvider apiKey="pk_test_yB28R7uMjYczjpjfncMJwAIZ"> */}
      <Routes />
      {/* </StripeProvider> */}
    </div>
  )
}

export default App
