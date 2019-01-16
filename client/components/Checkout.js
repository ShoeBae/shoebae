import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {placeOrder} from '../store/order'

class Checkout extends Component {
  componentDidUpdate(prevProps) {
    const {orders: prevOrders} = prevProps.orders
    const {orders} = this.props.orders
    if (prevOrders.length > orders.length) {
      // dispatch cart action to empty cart and cart-items in db
      // display success component, link to order
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
    // can I just do the above in the route? ^^^
    this.props.placeOrder({userId, orderItems, totalPrice})
  }

  render() {
    const {cart, orders: {processing}} = this.props
    if (cart.items.length === 0) return <Redirect to="/cart" />
    return (
      <div>
        <button
          type="button"
          onClick={this.handleClick}
          className="button-default"
        >
          {processing ? 'PROCESSING...' : 'PLACE ORDER'}
        </button>
      </div>
    )
  }
}

const mapState = ({cart, user, orders}) => ({cart, user, orders})

const mapProps = dispatch => ({
  placeOrder(order) {
    dispatch(placeOrder(order))
  }
})

export default connect(mapState, mapProps)(Checkout)
