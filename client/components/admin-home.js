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
    console.log('orders', orders)

    return (
      <Fragment>
        <div>Welcome, {email}</div>
        <br />
        <h3>ACTIVE CARTS - SHOULD THIS BE AN EVENT TO CHANGE URL?</h3>
        <h4 href="# ">SHOEBAE CLIENTS </h4>
        <ul href="#">GUESTS</ul>
        <br />
        <h3>ORDER HISTORY</h3>

        <ul href="# ">SHOEBAE CLIENTS </ul>
        <table>
          <tbody>
            <tr>
              <td>ORDER ID</td>
              <td>STATUS</td>
              <td>PRODUCT</td>
              <td>PRICE</td>
            </tr>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>PRODUCT DETAILS</td>
                  <td>{order.totalPrice}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ul href="#">GUESTS</ul>
      </Fragment>
    )
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
