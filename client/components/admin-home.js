import React, {Component, Fragment} from 'react'
import {Link, NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import SearchContainer from './SearchContainer'

/**
 * COMPONENT
 */
class AdminHome extends Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchAllOrders()
  }

  onChange(event) {
    this.setState({status: event.target.value})
  }
  render() {
    const {email, userId, orders: {orders}} = this.props

    return (
      <Fragment>
        <div>Welcome, {email}</div>
        <br />
        <h3>ADD NEW PRODUCT</h3>
        <button type="button">
          <Link to="/admin/add">Add Product</Link>
        </button>
        <h3>ACTIVE CARTS - SHOULD THIS BE AN EVENT TO CHANGE URL?</h3>
        <h4 href="# ">SHOEBAE CLIENTS </h4>
        <ul href="#">GUESTS</ul>
        <br />
        <h3>ORDER HISTORY</h3>
        <div className="orderFilter">
          <select name="sortBy" onChange={this.onChange}>
            <option value="">ALL ORDERS </option>
            <option value="created">CREATED</option>
            <option value="processing">PROCESSING</option>
            <option value="completed">COMPLETED</option>
            <option value="canceled">CANCELED</option>
          </select>
        </div>

        <table href="#">
          <tbody>
            <tr>
              <td>ORDER ID</td>
              <td>USER ID</td>
              <td>STATUS</td>
              <td>PRICE</td>
            </tr>
            {orders
              .sort()
              .filter(
                order =>
                  this.state.status ? order.status === this.state.status : order
              )
              .map(order => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.status}</td>
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
const mapState = ({user, orders}) => {
  return {
    userId: user.id,
    userInfo: user,
    email: user.email,
    orders: orders
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
