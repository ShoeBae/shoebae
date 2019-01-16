import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleProduct,
  Cart,
  UserAccountForm,
  AdminHome,
  AllProducts,
  AddProduct,
  EditProduct,
  DeleteProduct,
  Checkout,
  ReviewForm
} from './components'
import {me} from './store'
import {fetchCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCart()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) this.props.fetchCart()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/useraccountform" component={UserAccountForm} />

        <Route exact path="/products" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:id/reviewform" component={ReviewForm} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        {/* move below route later */}
        {isAdmin && (
          <Switch>
            <Route exact path="/admin" component={AdminHome} />
            <Route path="/admin/orders/:status" component={AdminHome} />
            <Route path="/admin/add" component={AddProduct} />
            <Route path="/admin/edit" component={EditProduct} />
            <Route path="/admin/delete" component={DeleteProduct} />
            <Route path="/" component={AllProducts} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={UserHome} />

            <Route path="/" component={AllProducts} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me())
  },
  fetchCart() {
    dispatch(fetchCart())
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
