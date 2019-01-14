import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'

// going to need a cart item component

class Cart extends Component {
  render() {
    const {cart} = this.props
    return (
      <div className="cart flex-center">
        {/*
          REVIEW: if (!cart[0]) is a little bit of a head trip

          consider:
          const cartIsEmpty = !cart.length
          ...
          { cartIsEmpty ? this.renderEmpty() : this.renderWithItems() }
          */}
        {!cart[0] ? (
          <div className="empty">
            <div>Shopping cart is empty</div>
            <div>You have no items in your cart</div>
            <div>
              Click <Link to="/products">here</Link> to continue shopping
            </div>
          </div>
        ) : (
          <div className="nonempty">
            <div className="header">My Cart</div>
            {/* <div>You have {cart.length} item in your cart</div> */}
            <main>
              <div className="products">
                {cart.map(product => (
                  <CartItem {...product} key={product.id + product.brand} />
                ))}
              </div>
              <div className="summary" />
            </main>
          </div>
        )}
      </div>
    )
  }
}

// my cart or your shopping cart is empty

const mapState = ({cart}) => ({cart})

const mapProps = () => ({})

export default connect(mapState, mapProps)(Cart)
