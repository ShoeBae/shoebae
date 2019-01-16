import React, {Component} from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

class StripeForm extends Component {
  handleSubmit = evt => {
    evt.preventDefault()
    this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'})
  }

  render() {
    return (
      // <CardSection />
      <form onSubmit={this.handleSubmit}>
        <CardElement style={{base: {fontSize: '18px'}}} />
      </form>
    )
  }
}

export default injectStripe(StripeForm)
