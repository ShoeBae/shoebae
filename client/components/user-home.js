import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'

/**
 * COMPONENT
 */
class UserHome extends Component {
  async componentDidMount() {
    await this.props.fetchAllOrders()
  }
  render() {
    const {email, userId, orders} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div>
          <h4>ACCOUNT DETAILS</h4>
          <ul href="# ">{email}</ul>
          <ul href="#">password</ul>
          <button type="button">
            <Link to="/useraccountform">update account</Link>
          </button>
          <br />
          <h4>ORDER HISTORY</h4>
          <table>
            <tbody>
              <tr>
                <td>ORDER ID</td>
                <td>STATUS</td>
                <td>PRODUCT</td>
                <td>PRICE</td>
              </tr>

              {orders ? (
                orders.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.status}</td>
                    </tr>
                  )
                })
              ) : (
                <span>~*NO ORDER HISTORY*~</span>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
export default connect(mapState, dispatchProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
