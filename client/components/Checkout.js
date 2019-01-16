import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {placeOrder} from '../store/order'
import {removeAllFromCart} from '../store/cart'

class Checkout extends Component {
  state = {
    complete: false
  }

  componentDidUpdate(prevProps) {
    const {orders: prevOrders} = prevProps.orders
    const {orders: {orders}, user: {cartId}} = this.props
    if (prevOrders.length !== orders.length) {
      this.setState(prevState => ({complete: !prevState.complete}))
      this.props.removeAllFromCart(cartId)
      // hook up orders to order history and admin orders
    }
  }

  handleClick = () => {
    const {items} = this.props.cart
    const totalPrice = items.reduce((total, item) => {
      return total + parseFloat(item.product.price)
    }, 0)
    const orderItems = items.map(item => {
      return {
        size: item.selectedSize,
        salePrice: item.product.price,
        productId: item.productId
      }
    })
    const userId = this.props.user ? this.props.user.id : null
    this.props.placeOrder({userId, orderItems, totalPrice})
  }

  render() {
    const {cart: {items, done}, orders: {processing}} = this.props
    const {complete} = this.state
    if (items.length === 0 && done) return <Redirect to="/cart" />
    return (
      <div>
        <div>
          <span>Order Summary</span>
          <Link to="/cart">Edit Cart</Link>
        </div>
        <div>ITEM</div>
        <div>
          <span>Order Total</span>
          <span>$blah</span>
        </div>
        {complete ? (
          <div>
            <div>Thank You, your order has been placed! </div>
            <div>
              To view your order, please click <Link to="/account">here</Link>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={this.handleClick}
            className="button-default active"
          >
            {processing ? 'PROCESSING...' : 'PLACE ORDER'}
          </button>
        )}
      </div>
    )
  }
}

const mapState = ({cart, user, orders}) => ({cart, user, orders})

const mapProps = dispatch => ({
  placeOrder(order) {
    dispatch(placeOrder(order))
  },
  removeAllFromCart(cartId) {
    dispatch(removeAllFromCart(cartId))
  }
})

export default connect(mapState, mapProps)(Checkout)
