import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserAccountForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      shippingAddress: '',
      billingAddress: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const field = event.target.name
    this.setState({email: event.target.value})
    console.log('email state', this.state.email)
  }

  handleSubmit(event) {
    console.log('submit!')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Shipping Address
          <input
            type="text"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Billing Address
          <input
            type="text"
            value={this.state.billingAddress}
            onChange={this.handleChange}
          />
        </label>
      </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(UserAccountForm)
