import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>SHOEBAE</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/products/boots">Boots</Link>
        <Link to="/products/dress">Dress</Link>
        <Link to="/products/sneakers">Sneakers</Link>

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
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
