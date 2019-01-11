import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, userId} = props
  console.log('USER INFO', props.userInfo)

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h2>ORDER HISTORY</h2>
      <a>Account Settings - MAKE THIS ACTIVELY SHOW DETAILS ON CLICK</a>

      <div>{props.userInfo.email}</div>
      <div>{props.userInfo.email}</div>
      <button type="button">update account</button>
    </div>
  )
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
