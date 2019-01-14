import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'

/**
 * COMPONENT
 */
class AdminHome extends Component {
  async componentDidMount() {
    const allOrders = await this.props.fetchAllOrders()
  }
  render() {
    const {email, userId, orders} = this.props

    return <div>Hello World</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    userInfo: state.user,
    email: state.user.email,
    orders: state.orders
  }
}

const dispatchProps = dispatch => {
  return {
    fetchAllOrders: () => dispatch(fetchOrders())
  }
}
export default connect(mapState, dispatchProps)(AdminHome)

/**
 * PROP TYPES
 */
