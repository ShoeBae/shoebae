import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, cartCount}) => (
  <div className="navbar flex-center">
    <Link className="navbar-logo" to="/products">
      SHOEBAE
    </Link>
    <div className="navbar-links">
      {isLoggedIn ? (
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      ) : (
        <React.Fragment>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </React.Fragment>
      )}
      <Link to="/cart">Cart {cartCount > 0 ? cartCount : ''}</Link>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cartCount: state.cart.length,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
