import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, userId} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      {props.userInfo.isAdmin ? (
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
            {props.userInfo.orders ? (
              props.userInfo.orders.map(order => {
                return (
                  <Fragment key={order.id}>
                    <ul>{order.id}</ul>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    userInfo: state.user,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
