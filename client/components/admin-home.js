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
    await this.props.fetchAllOrders()
  }

  sortOrdersByStatus(event) {
    console.log(this.props)
  }
  render() {
    const {email, userId, orders} = this.props
    console.log('orders', orders)

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
          <select name="sortBy" onChange={this.sortOrdersByStatus}>
            <option>sort orders by status</option>
            <option value="created">All Categories</option>
            <option value="processing">Boots</option>
            <option value="completed">Dress</option>
            <option value="canceled">Sneakers</option>
          </select>
        </div>
        <table href="#">
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
const mapState = ({user, orders}, ownProps) => {
  const status = ownProps.params.match.status
  let currentStatus
  if (!status) {
    currentStatus = orders.sort()
  } else {
    currentStatus = orders.filter(order => order.status === status)
  }
  return {
    currentStatus,
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
