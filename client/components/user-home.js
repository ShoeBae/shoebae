import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'

/**
 * COMPONENT
 */
class UserHome extends Component {
  async componentDidMount() {
    await this.props.fetchAllOrders(this.props.userId)
  }
  render() {
    const {email, userId, orders} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>

        {this.props.userInfo.isAdmin ? (
          <Fragment>
            <div>ADD ADMIN INFO HERE</div>
            <br />

            <h4>ACTIVE CARTS</h4>
            <ul href="# ">SHOEBAE CLIENTS </ul>
            <ul href="#">GUESTS</ul>
            <br />
            <h4>ORDER HISTORY</h4>
            <ul href="# ">SHOEBAE CLIENTS </ul>
            <ul href="#">GUESTS</ul>
          </Fragment>
        ) : (
          <div>
            <Fragment>
              <h4>ACCOUNT DETAILS</h4>
              <ul href="# ">{email}</ul>
              <ul href="#">password</ul>
              <button type="button">update account</button>
              <br />
              <h4>ORDER HISTORY</h4>
              {orders ? (
                orders.map(order => {
                  return (
                    <Fragment key={order.id++}>
                      <ul>{order.id}</ul>
                      <ul>PRODUCT INFORMATION</ul>
                    </Fragment>
                  )
                })
              ) : (
                <span>~*NO ORDER HISTORY*~</span>
              )}
            </Fragment>
          </div>
        )}
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
