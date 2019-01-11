import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super()
  }

  render() {
    const {email, userId} = this.props
    console.log(this.props.orders)

    return (
      <div>
        <h3>Welcome, USERNAMEWANTEMAIL</h3>

        {this.props.userInfo.isAdmin ? (
          <React.Fragment>
            <div>ADD ADMIN INFO HERE</div>
            <br />

            <h4>ACTIVE CARTS</h4>
            <ul href="# ">SHOEBAE CLIENTS </ul>
            <ul href="#">GUESTS</ul>
            <br />
            <h4>ORDER HISTORY</h4>
            <ul href="# ">SHOEBAE CLIENTS </ul>
            <ul href="#">GUESTS</ul>
          </React.Fragment>
        ) : (
          <div>
            <React.Fragment>
              <h4>ACCOUNT DETAILS</h4>
              <ul href="# ">{email}</ul>
              <ul href="#">password</ul>
              <button type="button">update account</button>
              <br />
              <h4>ORDER HISTORY</h4>
              {this.props.userInfo.orders ? (
                this.props.userInfo.orders.map(order => {
                  return (
                    <React.Fragment key={order.id}>
                      <ul>
                        {order.id} {order.price}
                      </ul>
                    </React.Fragment>
                  )
                })
              ) : (
                <span>~*NO ORDER HISTORY*~</span>
              )}
            </React.Fragment>
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
    email: state.user.email,
    userId: state.user.id,
    userInfo: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
