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
    this.setState({[event.target.name]: event.target.value})
    console.log('email state', this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('submitted!')
  }

  render() {
    return (
      <form on onSubmit={this.handleSubmit}>
        <label>
          Update email
          <input
            type="text"
            name="email"
            placeholder={this.props.user.email}
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Shipping Address
          <input
            type="text"
            name="shippingAddress"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Billing Address
          <input
            type="text"
            name="billingAddress"
            value={this.state.billingAddress}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Update Information</button>
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
